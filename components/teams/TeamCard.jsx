import { useAuth } from "@/context/authContext";
import SendRequestButton from "./SendRequestButton";

export default function TeamCard({ team }) {
    const { name, avatar, category, location, uid } = team;
    // console.log(uid)
    const { user } = useAuth()
    return (
        // <article className="relative">
        //     {/* <!-- Image --> */}
        //     <div className="h-64 items-end overflow-hidden rounded-lg bg-cover object-contain" style={{ backgroundImage: `url(${avatar})` }} />                        {/* <!-- Content --> */}

        //     {/* Content */}
        //     <div class="mt-2 w-full rounded-b-lg px-8 py-4 backdrop-blur-sm dark:bg-gray-800/60">
        //         <h2 class="text-xl font-semibold capitalize text-gray-800 dark:text-white">{name}</h2>
        //         <div class="flex justify-between">
        //             <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">{category}</p>
        //             <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">{location}</p>
        //         </div>
        //         {uid === user?.uid && <div className="absolute bg-blue-600 text-white px-2 py-1 rounded-full">
        //             <h1>My Team</h1>
        //         </div>}
        //         {uid != user?.uid && <SendRequestButton uid={uid} name={name} avatar={avatar} location={location} category={category} />}
        //     </div>
        // </article>
        <div key={uid} className="flex flex-col rounded-lg shadow-xl overflow-hidden">
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover" src={avatar} alt="" />
        </div>
        <div className="flex-1 bg-[#FEF2F4] p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600 flex justify-between">
              <p className="text-lg">
               {location}
              </p>
              <p className="text-lg">
               {category}
              </p>
            </p>
            <p className="block mt-2 mb-2">
              <p className="text-xl font-semibold text-gray-900">{name}</p>
            </p>
            {uid === user?.uid && <div className="absolute bg-blue-600 text-white  rounded-lg mt-2 px-3 py-2">
                    <h1 className="font-semibold">My Team</h1>
         </div>}
            {uid != user?.uid && <SendRequestButton uid={uid} name={name} avatar={avatar} location={location} category={category} />}
          </div>
        </div>
      </div>
        )
}

