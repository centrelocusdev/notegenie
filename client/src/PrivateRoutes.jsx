import { useState } from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const redirectTo = window.location.pathname

  let auth = Cookies.get('notegenie')
  return auth ? <Outlet /> : <Navigate to='/login' state={{from: redirectTo}} />
}

export default PrivateRoutes