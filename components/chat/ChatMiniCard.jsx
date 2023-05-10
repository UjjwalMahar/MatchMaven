import { useAuth } from "@/context/authContext";
import { useChat } from "@/context/chatContext";
import { getChatRoom } from "@/repositories/chat_repository/chatRepoData";
import { getRTDBUserDetailsSnapshot } from "@/repositories/chat_repository/presenceRepository";
import { getUser } from "@/repositories/user_repository/chatRepository";
import Link from "next/link";

export default function ChatMiniCard({ chatId }) {
    const { user: authUser } = useAuth();
    const { chatRoom, isLoading } = getChatRoom({ chatId })
    const { chatRoom: selectedChatRoom, setChatRoom, setOpponentUser, opponentUser } = useChat()
    const { user, isLoding: userIsLoading } = getUser(((authUser != null) && (chatRoom != null)) ?
        chatRoom.uid1 === authUser.uid ? chatRoom.uid2 : chatRoom.uid1 : null)
    const { user: presenceStatus } = getRTDBUserDetailsSnapshot(((authUser != null) && (chatRoom != null)) ?
        chatRoom.uid1 === authUser.uid ? chatRoom.uid2 : chatRoom.uid1 : null)
    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    if (userIsLoading) {
        return <h1>User Data Loading ...</h1>
    }
    if (!user) {
        return <h1></h1>
    }
    return <div onClick={() => {
        setChatRoom(chatRoom)
        setOpponentUser(user)
    }} class="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
        <img class="h-10 w-10 rounded-full object-cover" src={user?.photoURL} alt="username" />
        <div class="w-full pb-2">
            <div class="flex justify-between">
                <span class="ml-2 block font-semibold text-gray-600">{user?.displayName}</span>
                <span class="ml-2 block text-sm text-gray-600">{(new Date(presenceStatus?.lastSeen)).toLocaleTimeString()}</span>
            </div>
            {presenceStatus && <div className="flex gap-[1px] items-center justify-start px-3">
                <div className={`
                w-3 h-3 rounded-full
${presenceStatus.isOnline ? "bg-green-600" : "bg-red-600"}
`}></div>
                <span class="ml-2 block text-sm text-gray-600">{presenceStatus?.isOnline ? "ONLINE" : "OFFLINE"}</span>
            </div>}
        </div>
    </div>
}