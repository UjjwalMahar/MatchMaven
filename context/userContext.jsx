import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebaseClient";
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './authContext';
import { User } from "@/repositories/user_repository/models/user";
import { UserLocation } from "@/repositories/user_repository/models/userLocation";
import { GeoPoint } from "firebase/firestore";
const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    useEffect(() => {
        if (!user) {
            setIsLoading(false)
            setError(null)
            return;
        }
        const unsub = onSnapshot(doc(db, `users/${user.uid}`), (doc) => {
            if (doc.exists) {
                setCurrentUser(User.fromJSON(doc.data()))
            } else {
                setError("User Not Found")
            }
            setIsLoading(false)
        });
        return unsub;
    }, [user])


    useEffect(() => {
        if ('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            })
        }
    }, [user]);

    useEffect(() => {
        if (location) {
            addLocation(location);
        }
    }, [location]);

    const addLocation = async ({ latitude, longitude }) => {
        if (!user || !location) {
            return;
        }
        const myGeoLocation = new GeoPoint(latitude, longitude);
        const newId = doc(collection(db, 'ids')).id;
        const docRef = doc(db, `users/${user.uid}/location/${newId}`)
        const userLocation = new UserLocation({
            geoLocation: myGeoLocation,
            ipAddress: (await fetch('https://api.ipify.org/?format=json').then(async (v) => await v.json())).ip,
        })

        await setDoc(docRef, userLocation.toJson());
    };

    return (
        <UserContext.Provider value={{
            currentUser,
            isLoading,
            error,
            location,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)