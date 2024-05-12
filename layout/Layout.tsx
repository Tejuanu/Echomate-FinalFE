import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import { Toolbar } from '@mui/material'

export default function Layout() {
  return (
    <div>
      <Topbar />
      <Toolbar />
      <Outlet />
    </div>
  )
}
