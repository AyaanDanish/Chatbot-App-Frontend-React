import { render, screen } from "@testing-library/react";
import ChatHeader from './ChatHeader';

describe("ChatHeader component", () => {
    it("should render ChatHeader component correctly", () => {
        render(<ChatHeader heading={"Saad"} />);
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
    });
});