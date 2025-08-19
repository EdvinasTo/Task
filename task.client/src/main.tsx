import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/navbar.tsx'
//import Table from './components/table.tsx'
import PackageListTable from './components/packagesTable.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
    <PackageListTable rows={[]}/>
    <App />
  </StrictMode>,
)
