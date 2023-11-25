import { render, screen } from "@testing-library/react";
import ChatHeader from './ChatHeader';

describe("ChatHeader component", () => {
    it("renders ChatHeader component with a heading", () => {
        render(<ChatHeader heading={"Test Heading"} />);
        const headingElement = screen.getByRole("heading");
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent("Topic: Test Heading");
    });

    it("renders ChatHeader component with a default message when no heading is provided", () => {
        render(<ChatHeader />);
        const defaultHeadingElement = screen.getByText("Welcome to your personal assistant!", { exact: false });
        expect(defaultHeadingElement).toBeInTheDocument();
    });

    it("renders ChatHeader component with center-aligned text when no heading is provided", () => {
        render(<ChatHeader />);
        const defaultHeadingElement = screen.getByText("Welcome to your personal assistant!", { exact: false });
        expect(defaultHeadingElement).toHaveStyle({ textAlign: "center" });
    });

    it("renders ChatHeader component with a custom ID", () => {
        const result = render(<ChatHeader heading={"Test Heading"} />);
        const chatHeaderElement = result.container.querySelector("#chat-header");
        expect(chatHeaderElement).toBeInTheDocument();
    });
});
