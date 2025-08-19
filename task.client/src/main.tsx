import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/navbar.tsx'
import PackageListTable from './components/packagesTable.tsx'
import Button from './components/button.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
    <PackageListTable rows={[]}/>
    <Button label={'Create Package'}/>
    <App />
  </StrictMode>,
)
