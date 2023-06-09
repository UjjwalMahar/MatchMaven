import { useAuth } from "@/context/authContext"
import { useChat } from "@/context/chatContext"
import { getMessages, sendMessage } from "@/repositories/chat_repository/chatRepoData"
import { useState } from "react"

export default function ChatBox() {
    const { user } = useAuth()
    const { chatRoom, setChatRoom, opponentUser } = useChat()
    const { messageList, isLoading } = getMessages(chatRoom ? { chatId: chatRoom.chatId } : {})
    const [input, SetInput] = useState("")
    const [isSending, setIsSending] = useState(false)
    if (!chatRoom) {
        return;
    }
    const onSendMessage = async () => {
        if (input === "") {
            return;
        }
        setIsSending(true)
        try {
            await sendMessage({ chatId: chatRoom.chatId, message: input, uid: user.uid })
            SetInput("")
        } catch (error) {
            alert(error.message)
        }
        setIsSending(false)
    }
    return <div class="hidden lg:col-span-2 lg:block">
        <div class="w-full">
            <div class="relative flex items-center border-b border-gray-300 p-3">
                <img class="h-10 w-10 rounded-full object-cover" src={opponentUser.photoURL} alt="username" />
                <span class="ml-2 block font-bold text-gray-600">{opponentUser.displayName}</span>
                <span class="absolute left-10 top-3 h-3 w-3 rounded-full bg-green-600"> </span>
            </div>
            {isLoading && <h1>Loading ...</h1>}
            <div class="relative h-[40rem] w-full overflow-y-auto p-6">
                <ul class="space-y-2">
                    {messageList && messageList.map((message) => {
                        if (message.uid === 'superAdmin') {
                            return <li class="flex justify-center">
                                <div class="relative max-w-xl rounded-full px-4 py-2 text-white shadow bg-slate-500">
                                    <span class="block">{message.message}</span>
                                </div>
                            </li>
                        }
                        if (message.uid === user.uid) {
                            return <li class="flex justify-end">
                                <div class="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                                    <span class="block">{message.message}</span>
                                </div>
                            </li>
                        } else {
                            return <li class="flex justify-start">
                                <div class="relative max-w-xl rounded px-4 py-2 text-gray-700 shadow">
                                    <span class="block">{message.message}</span>
                                </div>
                            </li>
                        }
                    })}

                    {/* <li class="flex justify-end">
                        <div class="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                            <span class="block">how are you?</span>
                        </div>
                    </li>
                    <li class="flex justify-start">
                        <div class="relative max-w-xl rounded px-4 py-2 text-gray-700 shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </span>
                        </div>
                    </li> */}
                </ul>
            </div>
            {/* Input */}
            <div class="flex w-full items-center justify-between border-t border-gray-300 p-3">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                </button>

                <input value={input} onChange={(e) => { SetInput(e.target.value) }} type="text" placeholder="Message" class="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700" name="message" required />
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
                {!isSending && <button onClick={() => onSendMessage()}  type="button">
                    <svg class="h-5 w-5 origin-center rotate-90 transform text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>}
                {isSending && <h1>Sending ...</h1>}
            </div>
        </div>
    </div>
}