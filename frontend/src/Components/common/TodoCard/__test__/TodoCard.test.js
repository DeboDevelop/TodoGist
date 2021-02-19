import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

import TodoCard from "../TodoCard";

const item = {
    _id: "12345",
    description: "Testing",
};

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <TodoCard item={item} index={0} handleProject={null} hanldeDeleteTodo={null} project={null} />,
        div
    );
});

it("renders component correctly", () => {
    const { getByTestId } = render(
        <TodoCard item={item} index={0} handleProject={null} hanldeDeleteTodo={null} project={null} />
    );
    expect(getByTestId("description")).toHaveTextContent("Testing");
});

it("matches snapshot", () => {
    const tree = renderer
        .create(<TodoCard item={item} index={0} handleProject={null} hanldeDeleteTodo={null} project={null} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
