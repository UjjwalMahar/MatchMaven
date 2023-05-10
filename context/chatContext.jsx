import { createContext, useContext, useState } from "react";
const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [chatRoom, setChatRoom] = useState(null)
    const [opponentUser, setOpponentUser] = useState(null)
    return (
        <ChatContext.Provider value={{ chatRoom, setChatRoom, opponentUser, setOpponentUser }}>
            {children}
        </ChatContext.Provider>
    );
}
export const useChat = () => useContext(ChatContext);