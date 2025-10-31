
// user will be redirected to this login page once they logged out, have not added redirection yet 
import React from 'react'
import { Outlet } from 'react-router'

function Authleyout() {
  return (
   <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
       <Outlet></Outlet>       
    </div>
  </div>
</div>
  )
}

export default Authleyout
// user will be redirected to this login page once they logged out, have not added redirection yet 