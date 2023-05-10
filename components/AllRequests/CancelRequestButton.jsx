import { useAuth } from "@/context/authContext";
import { cancelRequestButton } from "@/repositories/team_repository/teamRepoData"

function CancelRequestButton({ id }) {
    const { user } = useAuth();
    const onhandelCancelRequest = async () => {
        await cancelRequestButton(user, id);
    }

    return (
        <div class="flex space-x-2">
            <button onClick={onhandelCancelRequest} class="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">Cancel</button>
        </div>)
}

export default CancelRequestButton