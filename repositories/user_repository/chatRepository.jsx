import { db } from "@/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function getUser(uid) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        if (!uid) {
            return;
        }
        const res = await getDoc(doc(db, `users/${uid}`))
        if (res.exists()) {
            setUser(res.data());
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [uid])

    return { user, isLoading }
}