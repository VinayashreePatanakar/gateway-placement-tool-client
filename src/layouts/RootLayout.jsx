import { Outlet } from 'react-router'
import React from 'react'
import Navbar from '../pages/Home/Home/shared/Navbar.jsx'

function rootLayout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  )
}

export default rootLayout

