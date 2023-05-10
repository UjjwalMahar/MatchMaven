import { rtdb } from "@/firebaseClient";
import { ref, onValue, push, onDisconnect, set, serverTimestamp } from "firebase/database";
import { useEffect, useState } from "react";

export const rtdbUserRef = (userId) => {
    return ref(rtdb, `users/${userId}`);
}

export const getRTDBUserDetailsSnapshot = (userId) => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) {
            return;
        }
        const unsubscribe = onValue(rtdbUserRef(userId), (snapshot) => {
            setLoading(false)
            if (snapshot.exists) {
                setUser(snapshot.val());
            }
        });

        return unsubscribe;
    })

    return {
        user,
        isLoading,
    }
}