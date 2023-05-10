import { useAuth } from "@/context/authContext";
import SendRequestButton from "./SendRequestButton";

export default function TeamCard({ team }) {
    const { name, avatar, category, location, uid } = team;
    // console.log(uid)
    const { user } = useAuth()
    return (
        <article className="relative">
            {/* <!-- Image --> */}
            <div className="h-64 items-end overflow-hidden rounded-lg bg-cover object-contain" style={{ backgroundImage: `url(${avatar})` }} />                        {/* <!-- Content --> */}

            {/* Content */}
            <div class="mt-2 w-full rounded-b-lg px-8 py-4 backdrop-blur-sm dark:bg-gray-800/60">
                <h2 class="text-xl font-semibold capitalize text-gray-800 dark:text-white">{name}</h2>
                <div class="flex justify-between">
                    <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">{category}</p>
                    <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">{location}</p>
                </div>
                {uid === user?.uid && <div className="absolute bg-blue-600 text-white px-2 py-1 rounded-full">
                    <h1>My Team</h1>
                </div>}
                {uid != user?.uid && <SendRequestButton uid={uid} name={name} avatar={avatar} location={location} category={category} />}
            </div>
        </article>)
}

