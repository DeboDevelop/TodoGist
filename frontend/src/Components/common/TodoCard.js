import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function TodoCard({ item, index, handleTodo, hanldeDeleteTodo, project }) {
    const [state, setState] = useState({
        show: false,
        description: "",
        status: item.status,
    });
    const handleClose = () => setState({ ...state, show: false });
    const handleShow = () => setState({ ...state, show: true });
    const handleChange = value => {
        setState({ ...state, description: value });
    };
    const handleStatus = () => {
        setState({ ...state, status: !state.status });
    };
    const updateTodo = e => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/todo/${item._id}`, {
                token: token,
                description: state.description,
                status: state.status,
            })
            .then(res => {
                setState({
                    show: false,
                    description: "",
                    state: res.data.status,
                });
                handleTodo(res.data, index);
            })
            .catch(err => console.log(err));
    };
    const deleteTodo = e => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/todo/${item._id}`, {
                token: token,
                project: project,
            })
            .then(res => {
                hanldeDeleteTodo(index);
            })
            .catch(err => console.log(err));
    };
    return (
        <>
            <div className="d-flex flex-row justify-content-between mx-4 my-2 p-1 card-div">
                <div>
                    <button className="btn green-button" onClick={handleShow}>
                        Edit
                    </button>
                    <span
                        className="txt mx-4"
                        style={{
                            textDecoration: item.status ? "line-through" : "",
                        }}>
                        {item.description}
                    </span>
                </div>
                <div className="px-2">
                    <button className="btn green-button" onClick={e => deleteTodo(e)}>
                        Delete
                    </button>
                </div>
            </div>
            <Modal show={state.show} onHide={handleClose} animation={false}>
                <Modal.Header className="modal-body" closeButton>
                    <Modal.Title className="txt">Update Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <form className="form-group">
                        <label for="description" className="txt">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            className="form-control mb-2"
                            value={state.description}
                            onChange={e => handleChange(e.target.value)}
                        />
                        <input
                            type="checkbox"
                            class="form-check-input ml-1"
                            defaultChecked={state.status}
                            onChange={() => handleStatus()}
                        />
                        <span className="txt ml-4">Completed</span>
                        <br />
                        <button className="btn green-button mt-2" onClick={e => updateTodo(e)}>
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

export default TodoCard;
