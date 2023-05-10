import { auth, rtdb } from "@/firebaseClient";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { rtdbUserRef } from "@/repositories/chat_repository/presenceRepository";
import { onDisconnect, onValue, ref, serverTimestamp, update } from "firebase/database";
const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter()
    const loginWithGoogle = async () => {
        await signInWithPopup(auth, new GoogleAuthProvider())
        // router.push("/adminpannel")
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    const logout = async () => {
        await signOut(auth)
    }


    useEffect(() => {
        if (!user) {
            return;
        }
        const userRef = rtdbUserRef(user.uid);
        const connectedRef = ref(rtdb, `.info/connected`);
        const unsubscribe = onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                update(userRef, {
                    isOnline: true,
                    lastSeen: serverTimestamp(),
                    deviceType: 'website',
                })
                onDisconnect(userRef).update({
                    isOnline: false,
                    lastSeen: serverTimestamp(),
                    deviceType: 'website',
                })
            }
        });

        return unsubscribe;
    }, [user]);

    return (
        <UserAuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
}
export const useAuth = () => useContext(UserAuthContext);