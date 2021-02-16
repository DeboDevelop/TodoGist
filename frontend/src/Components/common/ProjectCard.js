import React from "react";
import "../../assets/ProjectCard.css";

function ProjectCard({ item }) {
    return (
        <div className="d-flex flex-row justify-content-between mx-4 my-2 p-1 card-div">
            <div>
                <button className="btn green-button ">Edit</button>
                <span className="txt mx-4">{item.title}</span>
            </div>
            <div className="mt-2 px-2">
                <span className="txt">{item.listOfTodo} Items</span>
            </div>
        </div>
    );
}

export default ProjectCard;
