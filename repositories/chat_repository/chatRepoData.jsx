import { useAuth } from "@/context/authContext";
import { rtdb } from "@/firebaseClient";
import { child, get, onValue, push, ref, update } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function getChatIds() {
    const { user } = useAuth();
    const [chatIds, setChatIds] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const fetchChatRoom = async (user) => {
        if (!user) {
            return;
        }
        try {
            const userChatIdRef = ref(rtdb, `user_chatIds/${user?.uid}`)
            const unsubscribe = onValue(userChatIdRef, (snapshot) => {
                setChatIds(Object.keys(snapshot?.val() || {}));
                setIsLoading(false)
            })
            return () => unsubscribe();
        } catch (error) {
            alert(error.message)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchChatRoom(user)
    }, [user])
    console.log(chatIds)

    return { chatIds, isLoading }
}

export function getChatRoom({ chatId }) {
    const [chatRoom, setChatRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const fetchChatRoom = async () => {
        if (!chatId) {
            return;
        }
        // try {
        const chatRoomRes = await get(child(ref(rtdb), `chat_rooms/${chatId}`))
        if (chatRoomRes.exists()) {
            setChatRoom(chatRoomRes.val());
        }
        // } catch (error) {
        //     alert(error.message)
        // }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchChatRoom()
    }, [chatId])
    console.log(chatRoom)

    return { chatRoom, isLoading }
}


export function getMessages({ chatId }) {
    const [messageList, setMessageList] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const fetchMessages = async () => {
        if (!chatId) {
            return;
        }
        try {
            const messageRef = ref(rtdb, `messages/${chatId}`)
            const unsubscribe = onValue(messageRef, (snapshot) => {
                setMessageList(Object.values(snapshot?.val() || {}));
                // alert(JSON.stringify(Object.values(snapshot?.val() || {})))
                setIsLoading(false)
            })
            return () => unsubscribe();
        } catch (error) {
            alert(error.message)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchMessages()
    }, [chatId])
    console.log(messageList)

    return { messageList, isLoading }
}

export const sendMessage = async ({ chatId, message, uid }) => {
    const messageId = `messageId_${push(ref(rtdb, 'id')).key}`
    const messageData = {
        message,
        uid,
        chatId,
        messageId,
    }
    const updates = {}
    updates[`messages/${chatId}/${messageId}`] = messageData;

    await update(ref(rtdb), updates)
}