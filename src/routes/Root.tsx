import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
    <div>
      <Link to='/'>Home</Link>
      <Link to='/Products'>Products</Link>
      <Link to='/login'>Login</Link>
    </div>
      <Outlet/> 
    </>
  )
}

export default Root