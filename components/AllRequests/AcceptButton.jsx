import { useAuth } from "@/context/authContext";
import { useButtonContext } from "@/context/utils/AcceptRejectButtonContext";
import { acceptRequestButton } from "@/repositories/team_repository/teamRepoData"
import { useState } from "react";

function AcceptButton({ id }) {
  // const {isAccepted, setIsAccepted} = useButtonContext()
  const { user } = useAuth();
  const onhandelAcceptRequest = async () => {
    await acceptRequestButton(user, id);
    // setIsAccepted(true)
    alert("Function onhandelAcceptRequest called");
  }
  return (
    <div>
     <button onClick={onhandelAcceptRequest} class="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">Accept</button> 
         </div>
  )
}

export default AcceptButton