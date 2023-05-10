import { useAuth } from "@/context/authContext";
import { rtdb } from "@/firebaseClient";
import { getChatIds } from "@/repositories/chat_repository/chatRepoData";
import { onValue, ref } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react"
import ChatMiniCard from "./ChatMiniCard";
import ChatBox from "./ChatBox";

function ChatboxFeed() {
  const { chatIds, isLoading } = getChatIds();

  return (
    <div class="container mx-auto">
      {isLoading && <h1>Loading ...</h1>}
      <div class="min-w-full rounded border lg:grid lg:grid-cols-3">
        <div class="border-r border-gray-300 lg:col-span-1">
          {/* <!-- searchbar --> */}
          <div class="mx-3 my-3">
            <div class="relative text-gray-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="h-6 w-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" class="block w-full rounded bg-gray-100 py-2 pl-10 outline-none" name="search" placeholder="Search" required />
            </div>
          </div>
          {/* <!-- Mobile Veiw --> */}
          <ul class="h-[32rem] overflow-auto">
            <h2 class="my-2 mb-2 ml-2 text-lg font-semibold text-gray-600">All Chats</h2>
            <li>
              {chatIds?.map((e, key) => {
                return <ChatMiniCard chatId={e} key={key} />
              })}
            </li>
          </ul>
        </div>
        <ChatBox />
      </div>
    </div>
  )
}

export default ChatboxFeed