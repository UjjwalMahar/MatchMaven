import RecieveRequestWidget from "@/components/AllRequests/RecieveRequestWidget";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/authContext";
import { recieveRequestTeamData } from "@/repositories/team_repository/teamRepoData";
import { useEffect, useState } from "react";

function recieveRequests() {
    const [recieveRequestData, setrecieveRequestData] = useState()
    const [loading, setloading] = useState(true)

    const { user } = useAuth();

    const callrecieveRequestTeamData = async (user) => {
        const responce = await recieveRequestTeamData(user);
        setrecieveRequestData(responce)
        setloading(false);
    }

    useEffect(() => {
        if (user) {
            callrecieveRequestTeamData(user);
        }
    }, [user]);

    // console.log(recieveRequestData)
    return (
        <>
            {loading && <Spinner />}
            <div class="container mx-auto px-4 py-8">
                <h1 class="mb-4 text-2xl font-bold">Recieved Notifications</h1>
                <ul class="space-y-4">
                    {recieveRequestData?.map((values) => {
                        return <RecieveRequestWidget recieveRequestData={values} />
                    })}
                </ul>
            </div>
        </>
    )
}

export default recieveRequests