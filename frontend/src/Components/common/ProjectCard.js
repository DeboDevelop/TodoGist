import React, { useState } from "react";
import "../../assets/ProjectCard.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function ProjectCard({ item, index, handleProject }) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = value => {
        setTitle(value);
    };
    const updateProject = e => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/project/${item._id}`, {
                token: token,
                title: title,
            })
            .then(res => {
                setTitle("");
                setShow(false);
                handleProject(res.data, index);
            })
            .catch(err => console.log(err));
    };
    const openTodo = () => {
        console.log("Wait!!!!");
    };
    return (
        <>
            <div className="d-flex flex-row justify-content-between mx-4 my-2 p-1 card-div">
                <div>
                    <button className="btn green-button" onClick={handleShow}>
                        Edit
                    </button>
                    <span className="txt mx-4">{item.title}</span>
                </div>
                <div className="px-2">
                    <span className="txt px-2">{item.listOfTodo} Items</span>
                    <button className="btn green-button" onClick={() => openTodo()}>
                        Open Todo
                    </button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header className="modal-body" closeButton>
                    <Modal.Title className="txt">Update Project Title</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <form className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={e => handleChange(e.target.value)}
                        />
                        <button className="btn green-button mt-2" onClick={e => updateProject(e)}>
                            Update
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer className="modal-body">
                    <button className="btn green-button" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProjectCard;
