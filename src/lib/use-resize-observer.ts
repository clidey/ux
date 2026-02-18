import { useRef, useState, useEffect } from "react";

export default function useResizeObserver<T extends HTMLElement = HTMLElement>() {
  const [size, setSize] = useState<{ width?: number; height?: number }>({});
  const ref = useRef<T | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    observerRef.current = new ResizeObserver(([entry]) => {
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observerRef.current.observe(element);
    return () => observerRef.current?.disconnect();
  }, []);

  return { ref, ...size };
}
