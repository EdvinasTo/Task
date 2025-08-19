import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PackageListPage from './pages/packageListPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PackageListPage/>
    <App />
  </StrictMode>,
)
