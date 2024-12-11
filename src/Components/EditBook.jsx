import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { deleteBookAPI, updateBookAPI } from '../Services/allAPI';
import { bookRemovedResponseContext, bookUpdateResponseContext } from '../ContextAPI/ResponseAPI';
import SERVER_URL from '../Services/SERVER_URL';

const EditBook = ({ allBooks }) => {

    const { bookUpdateResponse, setBookUpdateResponse } = useContext(bookUpdateResponseContext)
    const { bookRemovedResponse, setBookRemoveResponse } = useContext(bookRemovedResponseContext)

    const [preview, setPreview] = useState("")
    const [fileStatus, setFileStatus] = useState(false)
    const [bookDetails, setBookDetails] = useState({
        title: allBooks.title, author: allBooks.author, publisher: allBooks.publisher, copies: allBooks.copies || 0, bookPic: allBooks.bookPic
    })

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setBookDetails({
            title: allBooks.title, author: allBooks.author, publisher: allBooks.publisher, copies: allBooks.copies, bookPic: allBooks.bookPic
        })
    }
    const handleShow = () => {
        setBookDetails({
            title: allBooks.title, author: allBooks.author, publisher: allBooks.publisher, copies: allBooks.copies, bookPic: allBooks.bookPic
        })
        setShow(true);
    }
    // image validation
    useEffect(() => {
        if (bookDetails.bookPic.type == "image/png" || bookDetails.bookPic.type == "image/jpg" || bookDetails.bookPic.type == "image/jpeg") {
            setFileStatus(true)
            setPreview(URL.createObjectURL(bookDetails.bookPic))
        } else {
            setPreview("")
            setFileStatus(false)
            setBookDetails({ ...bookDetails, bookPic: "" })
        }
    }, [bookDetails.bookPic])

    // removeBook function
    const removeBook = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const removeBook = await deleteBookAPI(id, reqHeader)
                if (removeBook.status == 200) {
                    // bookremove response 
                    alert("Book Removed Successfully!!!")
                    setBookRemoveResponse(removeBook)
                }
            } catch (error) {

            }
        } else {
            alert("Token missing... Please login!!!")
        }
    }

    // handleSubmit function
    const handleSubmit = async (id) => {
        const { title, author, publisher, copies, bookPic } = bookDetails
        if (title && author && publisher && copies !== null && copies !== undefined) {
            // alert("api")
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("author", author)
            reqBody.append("publisher", publisher)
            reqBody.append("copies", copies)
            preview ? reqBody.append("bookPic", bookPic) : reqBody.append("bookPic", allBooks.bookPic)
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const updateBook = await updateBookAPI(id, reqBody, reqHeader)
                    if (updateBook.status == 200) {
                        alert("Book Updated Successfully!!!")
                        setBookUpdateResponse(updateBook)
                        handleClose()
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            alert("Please Fill The Form Completely!!!")
        }
    }

    return (
        <>
            <button onClick={handleShow} style={{ border: "solid", borderWidth: "4px" }} className='px-2 py-1 rounded text-center text-dark bg-warning'><i class="fa-solid fa-file-pen"></i></button>
            <Modal centered size='lg' className='' show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header className='bg-dark text-light'>
                    <Modal.Title className='fw-bolder fs-1'>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark d-flex justify-content-evenly align-items-center flex-wrap'>
                    <div>
                        <label>
                            <input onChange={(e) => setBookDetails({ ...bookDetails, bookPic: e.target.files[0] })} type="file" className='d-none' />
                            <img width={"200px"} height={"200px"} src={preview ? preview : `${SERVER_URL}/uploads/${allBooks.bookPic}`} alt="" />
                        </label>
                        {!fileStatus &&
                            <p className=' mt-1 text-center fw-bold text-warning'>(Upload Only JPG, PNG, JPEG files!!!)</p>}
                    </div>
                    <div>
                        <Form>
                            <Form.Group className="mb-3 mt-2" controlId="Title">
                                <Form.Control onChange={e => setBookDetails({ ...bookDetails, title: e.target.value })} value={bookDetails.title} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Author">
                                <Form.Control onChange={e => setBookDetails({ ...bookDetails, author: e.target.value })} value={bookDetails.author} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Author" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Publisher">
                                <Form.Control onChange={e => setBookDetails({ ...bookDetails, publisher: e.target.value })} value={bookDetails.publisher} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Publisher" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Copies">
                                <Form.Control onChange={e => setBookDetails({ ...bookDetails, copies: e.target.value })} value={bookDetails.copies} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="number" placeholder="Copies" />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-dark'>
                    <Button variant="secondary" className='fw-bolder' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit(allBooks?._id)} className='fw-bolder text-light' variant="info">Submit</Button>
                </Modal.Footer>
            </Modal>
            <button onClick={() => removeBook(allBooks?._id)} style={{ border: "solid", borderWidth: "4px" }} className='px-2 py-1 rounded text-center text-dark bg-danger ms-2'><i class="fa-solid fa-trash"></i></button>
        </>
    )
}

export default EditBook