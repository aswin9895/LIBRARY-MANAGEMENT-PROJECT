import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import booklogo from '../assets/booklogo.png'

const EditBook = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                </Modal.Body>
                <Modal.Footer className='bg-dark'>
                    <Button variant="secondary" className='fw-bolder' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='fw-bolder text-light' variant="info">Submit</Button>
                </Modal.Footer>
            </Modal>
            <button style={{ border: "solid", borderWidth: "4px" }} className='px-2 py-1 rounded text-center text-dark bg-danger ms-2'><i class="fa-solid fa-trash"></i></button>
        </>
    )
}

export default EditBook