import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import { ThemeProvider } from './components/theme/provider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="@clidey/ux/theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
