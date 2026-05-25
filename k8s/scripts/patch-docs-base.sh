#!/bin/sh
# Patches Dory's static build output to work under a subpath (e.g., /docs).
# Usage: ./patch-docs-base.sh <dist-dir> <base-path>

DIST_DIR="$1"
BASE_PATH="$2"

if [ -z "$DIST_DIR" ] || [ -z "$BASE_PATH" ]; then
  echo "Usage: $0 <dist-dir> <base-path>"
  exit 1
fi

# 1. Rewrite asset references in HTML files from root-relative to subpath-relative
find "$DIST_DIR" -name '*.html' -exec sed -i \
  -e "s|src=\"/assets/|src=\"${BASE_PATH}/assets/|g" \
  -e "s|href=\"/assets/|href=\"${BASE_PATH}/assets/|g" \
  -e "s|src=\"/embed|src=\"${BASE_PATH}/embed|g" \
  {} +

# 2. Patch wouter's path reader in the JS bundle to strip the base path.
#    wouter v3 defines: sr=()=>location.pathname
#    We replace it with a function that strips the base prefix.
find "$DIST_DIR" -name '*.js' -exec sed -i \
  -e "s#()=>location.pathname#()=>{var p=location.pathname;var b=\"${BASE_PATH}\";if(p===b||p===b+\"/\")return\"/\";if(p.startsWith(b+\"/\"))return p.slice(b.length);return p}#g" \
  {} +

# 3. Create the base-path routing shim JS file.
#    This patches pushState/replaceState to prefix navigations with base path.
cat > "${DIST_DIR}/base-shim.js" << EOF
(function(){var b="${BASE_PATH}";var op=history.pushState.bind(history);var or=history.replaceState.bind(history);function f(u){if(typeof u==="string"&&u.startsWith("/")&&!u.startsWith(b+"/")&&!u.startsWith(b+"?"))return b+u;return u}history.pushState=function(s,t,u){return op(s,t,f(u))};history.replaceState=function(s,t,u){return or(s,t,f(u))}})();
EOF

# 4. Inject script tag referencing the shim before </head> in all HTML files
find "$DIST_DIR" -name '*.html' -exec sed -i \
  -e "s|</head>|<script src=\"${BASE_PATH}/base-shim.js\"></script></head>|" \
  {} +

echo "Patched docs for base path: ${BASE_PATH}"
