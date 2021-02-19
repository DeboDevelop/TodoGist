import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

import ProjectCard from "../ProjectCard";

const item = {
    _id: "12345",
    title: "Testing",
    listOfTodo: 5,
};

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProjectCard item={item} index={0} handleProject={null} />, div);
});

it("renders component correctly", () => {
    const { getByTestId } = render(<ProjectCard item={item} index={0} handleProject={null} />);
    expect(getByTestId("title")).toHaveTextContent("Testing");
    expect(getByTestId("listOfTodo")).toHaveTextContent(5);
});

it("matches snapshot", () => {
    const tree = renderer.create(<ProjectCard item={item} index={0} handleProject={null} />).toJSON();
    expect(tree).toMatchSnapshot();
});
