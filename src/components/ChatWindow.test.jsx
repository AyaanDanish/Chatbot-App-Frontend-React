import { render, screen } from "@testing-library/react";
import ChatWindow from './ChatWindow';

const sampleChat = [
    { role: "user", content: "Hello!" },
    { role: "assistant", content: "Hi there!" },
];

describe("ChatWindow component", () => {
    it("renders ChatWindow component correctly with a chat", () => {
        const result = render(<ChatWindow currentChat={sampleChat} />);
        const chatWindowElement = result.container.querySelector("#chat-window");
        expect(chatWindowElement).toBeInTheDocument();

        const messageElements = screen.getAllByRole("listitem");
        expect(messageElements).toHaveLength(sampleChat.length);

        sampleChat.forEach((message, index) => {
            const messageElement = messageElements[index];
            const roleIcon = screen.getAllByAltText("No Image")[index];
            const messageText = screen.getByText(message.content);

            expect(messageElement).toBeInTheDocument();
            expect(messageElement).toHaveStyle({
                backgroundColor: message.role === "user" ? "#047ef9" : "#ff612c",
            });

            if (message.role === "user") {
                expect(roleIcon).toHaveAttribute("src", "./user.png");
            } else {
                expect(roleIcon).toHaveAttribute("src", "./openai.jpg");
            }

            expect(messageText).toBeInTheDocument();
        });
    });

    it("renders ChatWindow component correctly without chat", () => {
        const result = render(<ChatWindow />);
        const chatWindowElement = result.container.querySelector("#chat-window");
        expect(chatWindowElement).toBeInTheDocument();

        const messageElements = screen.queryAllByRole("listitem");
        expect(messageElements).toHaveLength(0);
    });

    it("renders ChatWindow component with user-aligned and assistant-aligned messages", () => {
        render(<ChatWindow currentChat={sampleChat} />);
        const userMessage = screen.getByText("Hello!").parentElement.parentElement;
        const assistantMessage = screen.getByText("Hi there!").parentElement.parentElement;

        expect(userMessage).toHaveStyle({ alignSelf: "flex-end" });
        expect(assistantMessage).toHaveStyle({ alignSelf: "flex-start" });
    });

    it("renders user icon for assistant messages and vice versa", () => {
        const chatWithUserMessage = [sampleChat[0]];
        render(<ChatWindow currentChat={chatWithUserMessage} />);
        const userIcon = screen.getByAltText("No Image");
        expect(userIcon).toHaveAttribute("src", "./user.png");

        const chatWithAssistantMessage = sampleChat;
        render(<ChatWindow currentChat={chatWithAssistantMessage} />);
        const assistantIcon = screen.getAllByAltText("No Image")[2];
        expect(assistantIcon).toHaveAttribute("src", "./openai.jpg");
    });
});
