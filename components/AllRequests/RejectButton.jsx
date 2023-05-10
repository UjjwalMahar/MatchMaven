import { useAuth } from "@/context/authContext";
import { rejectRequestButton } from "@/repositories/team_repository/teamRepoData";

function RejectButton({id}) {
    const { user } = useAuth();
    const onhandelAcceptRequest = async () => {
        await rejectRequestButton(user, id);
        alert("Function onhandelRejectRequest called");
    }
    return (
        <button onClick={onhandelAcceptRequest} class="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">Reject</button>
    )
}

export default RejectButton