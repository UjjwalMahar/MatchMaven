import { useAuth } from "@/context/authContext";
import CancelRequestButton from "./CancelRequestButton";
import Link from "next/link";
import { getUser } from "@/repositories/user_repository/chatRepository";

function SendRequestWidget({ sendRequestData }) {
  const { user: authUser } = useAuth();
  const { opponentUid, name, category, avatar, location, id, isAccepted } = sendRequestData;
  const { user, isLoding: userIsLoading } = getUser(opponentUid)
  if (userIsLoading || !user) {
    return <h1>Loading ...</h1>
  }

  return (
    <li class="rounded-lg bg-white p-4 shadow hover:bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="mr-4 h-8 w-8 rounded-full" src={avatar} alt="Profile Image" />
          <div class="flex-1">
            <div class="font-bold">{user.displayName}</div>
            <div class="text-sm text-gray-500">Liked your post</div>
            <div class="text-sm text-gray-500">2m ago</div>
          </div>
        </div>
        {!isAccepted && <CancelRequestButton id={id} />}
        {isAccepted && <div class="flex space-x-2">
          <Link href={'/chats'}>
            <div className="bg-blue-400 rounded-2xl text-white px-3 py-2">
              Chat Karo
            </div>
          </Link>
        </div>}
      </div>
    </li>)
}

export default SendRequestWidget