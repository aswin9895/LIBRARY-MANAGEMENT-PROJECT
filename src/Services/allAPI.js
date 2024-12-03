import commonAPI from "./commonAPI";
import SERVER_URL from "./SERVER_URL.JS";

// registerUserAPI called by register page 
export const registerUserAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// loginUserAPI called by login page
export const loginUserAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

// getAllUsers called by admin manage user page
export const getAllUsers = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getalluser`, {}, reqHeader)
}

// deleteUserAPI called by manageStudents page 
export const deleteUserAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/removeuser/${id}/remove`, {}, reqHeader)
}

// addBookAPI called by add book page
export const addBookAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/addBook`, reqBody, reqHeader)
}

// getBookAPI called by allBook page
export const getBookAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getbook`, {}, reqHeader)
}

// deleteBookAPI called by editbook page
export const deleteBookAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/deletebook/${id}/delete`, {},reqHeader)
}