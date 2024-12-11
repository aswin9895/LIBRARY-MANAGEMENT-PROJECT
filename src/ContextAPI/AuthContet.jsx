import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContext = createContext()
export const adminAuthContext = createContext()
export const userAuthContext = createContext()

const AuthContextAPI = ({ children }) => {

  const [isAuthorised, setIsAuthorised] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [isUser, setisUser] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorised(true)
      const logged = JSON.parse(sessionStorage.getItem("users"))
      if (logged.role == "admin") {
        setisAdmin(true)
      } else {
        setisAdmin(false)
      }
      if (logged.role == "student") {
        setisUser(true)
      } else {
        setisUser(false)
      }
    } else {
      setIsAuthorised(false)
    }
  }, [isAuthorised, isAdmin, isUser])

  return (
    <userAuthContext.Provider value={{ isUser, setisUser }}>
      <adminAuthContext.Provider value={{ isAdmin, setisAdmin }}>
        <tokenAuthContext.Provider value={{ isAuthorised, setIsAuthorised }}>
          {children}
        </tokenAuthContext.Provider>
      </adminAuthContext.Provider>
    </userAuthContext.Provider>
  )
}

export default AuthContextAPI