import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import booklogo from '../../assets/booklogo.png'
import { Form } from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router'
import { addBookAPI } from '../../Services/allAPI'

const AddBook = () => {

    const [preview, setPreview] = useState("")
    const [imageFileStatus, setImageFileStatus] = useState(false)
    const [bookDetails, setBookDetails] = useState({
        title: "", author: "", publisher: "", copies: "", bookPic: ""
    })
    console.log(bookDetails);
    const [copyStatus, setCopyStatus] = useState(false)
    const navigate = useNavigate()

    // bookcopies validation
    useEffect(() => {
        if (bookDetails.copies) {
            !!bookDetails.copies.match(/^[0-9]+$/) ? setCopyStatus(false) : setCopyStatus(true)
        }
    }, [bookDetails.copies])

    useEffect(() => {
        // bookDetails and validations
        if (bookDetails.bookPic.type == "image/png" || bookDetails.bookPic.type == "image/jpg" || bookDetails.bookPic.type == "image/jpeg") {
            setImageFileStatus(true)
            setPreview(URL.createObjectURL(bookDetails.bookPic))
        } else {
            setBookDetails({
                bookPic: ""
            })
            setImageFileStatus(false)
            setPreview("")
        }
    }, [bookDetails.bookPic])

    // add book function
    const addBook = async (e) => {
        e.preventDefault()
        const { title, author, publisher, copies, bookPic } = bookDetails
        if (title && author && publisher && copies && bookPic) {
            // alert("api call")
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("author", author)
            reqBody.append("publisher", publisher)
            reqBody.append("copies", copies)
            reqBody.append("bookPic", bookPic)
            const token = sessionStorage.getItem("token")
            try {
                if (token) {
                    const reqHeader = {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                    const admin = JSON.parse(sessionStorage.getItem("users"))
                    if (admin.role == "admin") {
                        try {
                            const addBook = await addBookAPI(reqBody, reqHeader)
                            if (addBook.status == 200) {
                                alert("Book Added Successfully!!!")
                                setBookDetails({
                                    title: "", author: "", publisher: "", copies: "", bookPic: ""
                                })
                                
                            } else {
                                if (addBook.status == 406) {
                                    alert(addBook.response.data)
                                }
                            }
    
                        } catch (error) {
                            console.log(error);
                        }
                    }else{
                        navigate('/login')
                    }
                    
                } else {
                    alert("Token is Missing... Please Login!!!")
                }
            } catch (error) {
                console.log(error);

            }

        } else {
            alert("Please Fill The Form Completely!!!")
        }
    }

    return (
        <div>
            <Header AdminHeader={true} />
            <div style={{ paddingTop: "170px", paddingBottom: "100px", backgroundColor: "black", minHeight: "100vh" }} className='d-flex justify-content-center align-items-center'>
                <div className='border p-5 w-75 container text-center'>
                    <div className='text-center'>
                        <h1 className='text-light fw-bolder'>Add New Book</h1>
                        <hr style={{ color: "white" }} />
                    </div>
                    <div className='d-flex mt-5 justify-content-evenly align-items-center flex-wrap'>
                        <div>
                            <label>
                                <input onChange={e => setBookDetails({ ...bookDetails, bookPic: e.target.files[0] })} type="file" className='d-none' />
                                <img width={"200px"} height={"200px"} src={preview ? preview : booklogo} alt="" />
                            </label>
                            {!imageFileStatus &&
                                <p className=' mt-1 text-center fw-bold text-warning'>(Upload Only JPG, PNG, JPEG files!!!)</p>
                            }
                        </div>
                        <div>
                            <Form>
                                <Form.Group className="mb-3 mt-2" controlId="Title">
                                    <Form.Control value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Author">
                                    <Form.Control value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Author" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Publisher">
                                    <Form.Control value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Publisher" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Copies">
                                    <Form.Control value={bookDetails.copies} onChange={(e) => setBookDetails({ ...bookDetails, copies: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="number" placeholder="Copies" />
                                </Form.Group>
                                {copyStatus&&
                                    <p className='text-start text-danger fw-bold'>*Invalid Input!!!</p>}
                            </Form>
                        </div>
                    </div>
                    <button disabled={copyStatus} onClick={addBook} style={{ backgroundColor: "lightseagreen" }} className='fw-bolder text-light mt-5 px-3 rounded py-2'>Submit</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddBook