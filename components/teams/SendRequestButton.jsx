import { useAuth } from "@/context/authContext";
import { SendRequestToTeam } from "@/repositories/team_repository/teamRepoData";
import { collection, query } from "firebase/firestore";
import { useState } from "react";



function SendRequestButton({ name, avatar, category, location, uid }) {
    const [isloading, setIslLoading] = useState(false)
    const { user } = useAuth();

    const handelSendRequest = async () => {
        if (!user) {
            alert("First login required");
            return;
        }
        setIslLoading(true);
        if (uid !== user.uid) {
            await SendRequestToTeam(user, uid, name, avatar, category, location);
        } else {
            alert("Please request to your opponent")
        }
        setIslLoading(false);
    }
    return (
        <div>
            <button onClick={handelSendRequest} className="bg-[#917FB3] text-white font-semibold px-4 py-2 rounded-md mt-2 hover:bg-[#9384D1]">{isloading ? "Sending..." : "SendRequest"}</button>
        </div>
    )
}
export default SendRequestButton