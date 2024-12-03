import React, { createContext, useState } from 'react'
export const newUserRegisterResponseContext = createContext()
export const bookRemovedResponseContext = createContext()


const ResponseAPI = ({ children }) => {

    const [newUserRegisterResponse, setNewUserRegisterResponse] = useState("")
    const [bookRemovedResponse, setBookRemoveResponse] = useState("")

    return (
        <bookRemovedResponseContext.Provider value={{bookRemovedResponse, setBookRemoveResponse}}>
            <newUserRegisterResponseContext.Provider value={{ newUserRegisterResponse, setNewUserRegisterResponse }}>
                {children}
            </newUserRegisterResponseContext.Provider>
        </bookRemovedResponseContext.Provider>

    )

}

export default ResponseAPI