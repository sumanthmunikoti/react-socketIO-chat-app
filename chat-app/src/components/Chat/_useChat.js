import SocketIOClient from "socket.io-client"
import { useEffect, useRef, useState } from "react"

const useChat = () => {

    const [messages, setMessages] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = SocketIOClient('http://localhost:5000');

        socketRef.current.on("newChatMessage", ({ message }) => {
            setMessages(messages => [...messages, message])
            console.log("messages: ", {messages})
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [])

    const sendMessage = ({ message }) => {
        console.log("emit ", {message})
        socketRef.current.emit("newChatMessage", {message})
    }

    return { messages, sendMessage }
}

export default useChat