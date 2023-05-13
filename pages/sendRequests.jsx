import SendRequestWidget from "@/components/AllRequests/SendRequestWidget";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/authContext";
import { db } from "@/firebaseClient";
import { sendRequestTeamData } from "@/repositories/team_repository/teamRepoData"
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

function sendRequests() {
  const { user } = useAuth();
  const [sendRequestData, setSendRequestData] = useState()
  const [loading, setloading] = useState(true)
  const sendRequestTeamData = async (user) => {
    const q = query(collection(db, `users/${user?.uid}/send_request`));
    return onSnapshot(q, (querySnapshot) => {
      const sendRequestList = [];
      querySnapshot.forEach((doc) => {
        sendRequestList.push((doc.data()));
      });
      setSendRequestData(sendRequestList);
      setloading(false);
    });
  }

  useEffect(() => {
    sendRequestTeamData(user)
  }, [user])


  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="mb-4 text-2xl font-bold">Send Notifications</h1>
      <ul class="space-y-4">
        {loading && <Spinner/>}
        {sendRequestData?.map((values) => {
          return <SendRequestWidget sendRequestData={values} />
        })}
      </ul>
    </div>
  )
}

export default sendRequests