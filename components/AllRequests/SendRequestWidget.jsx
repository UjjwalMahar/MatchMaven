import { useAuth } from "@/context/authContext";
import CancelRequestButton from "./CancelRequestButton";
import Link from "next/link";
import { getUser } from "@/repositories/user_repository/chatRepository";

function SendRequestWidget({ sendRequestData }) {
  const { user: authUser } = useAuth();
  const { opponentUid, name, category, avatar, location, id, isAccepted } = sendRequestData;
  const { user } = getUser(opponentUid)


  return (
    <li class="rounded-lg bg-white p-4 shadow hover:bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="mr-4 h-8 w-8 rounded-full" src={user?.photoURL} alt="Profile Image" />
          <div class="flex-1">
            <div class="font-bold">{user?.displayName}</div>
          </div>
        </div>
        {!isAccepted && <CancelRequestButton id={id} />}
        {isAccepted && <div class="flex space-x-2">
          <Link href={'/chats'}>
            <div className="bg-blue-400 hover:bg-blue-500 rounded-lg font-semibold text-white px-3 py-2">
             Lets Chat 
            </div>
          </Link>
        </div>}
      </div>
    </li>)
}

export default SendRequestWidget