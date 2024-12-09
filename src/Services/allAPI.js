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
export const getBookAPI = async (field,value) => {
    return await commonAPI("GET", `${SERVER_URL}/getbook?field=${field}&value=${value}`, {})
}

// deleteBookAPI called by editbook page
export const deleteBookAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/deletebook/${id}/delete`, {},reqHeader)
}

// updateBookAPI called by editpage
export const updateBookAPI = async (id,reqBody,reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/editbook/${id}/edit`, reqBody, reqHeader)
}

// getSingleBookAPI called by allBook Page
export const getSingleBookAPI = async (id,reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getsinglebook/${id}/get`, {}, reqHeader)
}

// requestBookAPI called by all book page 
export const requestBookAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/requestbook`, reqBody, reqHeader)
}

// getRequestedBookAPI called by requestedbooksAdmin
export const getRequestedBookAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/allrequestedbooks`, {}, reqHeader)
}

// rejectrequestBookAPI called by requestedbooksAdmin
export const rejectrequestBookAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/rejectrequestbook/${id}/reject`, {},reqHeader)
}

// singlebookrequestdetailAPI called by requestedbooksAdmin
export const singlebookrequestdetailAPI = async (id,reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/singlebookrequestdetail/${id}/get`,{},reqHeader)
}

// issueBookAPI called by requested book page 
export const issueBookAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/issuebook`, reqBody, reqHeader)
}

// updateCopies called by requested page
export const updateCopies = async (id,reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/updatebookcopies/${id}/update`, {},reqHeader)
}

// getIssuedBooksAPI called by issuedbooks page 
export const getIssuedBooksAPI = async (field,value,reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getissuedbooks?field=${field}&value=${value}`, {}, reqHeader)
}

// removeIssuedBooksAPI called by issuedbooksadmin
export const removeIssuedBooksAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/removeissuedbooks/${id}/remove`,{},reqHeader)
}

// IncrementBookCopiesAPI called by issuedboooksadmin
export const IncrementBookCopiesAPI = async (id,reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/updateincrementbook/${id}/update`,{},reqHeader)
}

// getSingleIssuedBookAPI 
export const getSingleIssuedBookAPI = async (id,reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getsingleissuedbook/${id}/get`,{},reqHeader)
}

// getIssuedUserAPI
export const getIssuedUserAPI = async (id,reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getissuedbooksuser/${id}/get`,{},reqHeader)
}

// recommendBookAPI
export const recommendBookAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/recommendbook`, reqBody, reqHeader)
}

// getrecomendbooks
export const getrecomendbooksAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getallrecomendbooks`,{},reqHeader)
}

// removerecomendbookAPI
export const removerecomendbookAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/removereccomendbook/${id}/remove`,{},reqHeader)
}