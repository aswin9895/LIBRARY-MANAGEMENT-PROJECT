import React from 'react'
import Header from '../../Components/Header'
import booklogo from '../../assets/booklogo.png'
import { Form } from 'react-bootstrap'
import Footer from '../../Components/Footer'

const AddBook = () => {
    return (
        <div>
            <Header AdminHeader={true} />
            <div style={{ paddingTop: "170px",paddingBottom:"100px", backgroundColor: "black", minHeight: "100vh" }} className='d-flex justify-content-center align-items-center'>
                <div className='border p-5 w-75 container text-center'>
                    <div className='text-center'>
                        <h1 className='text-light fw-bolder'>Add New Book</h1>
                        <hr style={{color:"white"}}/>
                    </div>
                    <div className='d-flex mt-5 justify-content-evenly align-items-center flex-wrap'>
                        <div>
                        <label>
                            <input type="file" className='d-none' />
                            <img width={"200px"} height={"200px"} src={booklogo} alt="" />
                        </label>
                        <p className=' mt-1 text-center fw-bold text-warning'>(Upload Only JPG, PNG, JPEG files!!!)</p>
                        </div>
                        <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="Title">
                                <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Author">
                                <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Author" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Publisher">
                                <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Publisher" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Copies">
                                <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="number" placeholder="Copies" />
                            </Form.Group>
                        </Form>
                        </div>
                    </div>
                    <button style={{backgroundColor:"lightseagreen"}} className='fw-bolder text-light mt-5 px-3 rounded py-2'>Submit</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddBook