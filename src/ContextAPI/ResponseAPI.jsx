import React, { createContext, useState } from 'react'
export const newUserRegisterResponseContext = createContext()
export const bookRemovedResponseContext = createContext()
export const bookUpdateResponseContext = createContext()

const ResponseAPI = ({ children }) => {

    const [newUserRegisterResponse, setNewUserRegisterResponse] = useState("")
    const [bookRemovedResponse, setBookRemoveResponse] = useState("")
    const [bookUpdateResponse, setBookUpdateResponse] = useState("")

    return (
                    <bookUpdateResponseContext.Provider value={{ bookUpdateResponse, setBookUpdateResponse }}>
                        <bookRemovedResponseContext.Provider value={{bookRemovedResponse, setBookRemoveResponse}}>
                            <newUserRegisterResponseContext.Provider value={{ newUserRegisterResponse, setNewUserRegisterResponse }}>
                                {children}
                            </newUserRegisterResponseContext.Provider>
                        </bookRemovedResponseContext.Provider>
                    </bookUpdateResponseContext.Provider>
    )
    
}

export default ResponseAPI