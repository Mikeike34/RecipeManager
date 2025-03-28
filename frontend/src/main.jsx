import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Provider>
          <App />
       </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>,
)
