import { db } from "@/firebaseClient"
import { collection, deleteDoc, doc, getDocs, query, setDoc, onValue, onSnapshot } from "firebase/firestore"
import { Team } from "./models/team";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

export const getPublicTeamList = async () => {
    const queryRef = query(collection(db, "public_teams"));
    const responce = await getDocs(queryRef);
    const teams = [];
    responce.docs.forEach((doc) => {
        teams.push(Team.fromJSON(doc.data()));
    });
    return teams;
}

// TODO--------->>>Apni detail lekar aao and add it below function.
export const SendRequestToTeam = async (user, uid, name, avatar, category, location,) => {
    const id = doc(collection(db, 'ids')).id;
    const docRef = doc(db, `users/${user.uid}/send_request/${id}`)
    await setDoc(docRef, {
        id: `${id}`,
        uid: `${user.uid}`,
        opponentUid: uid,
        opponentname: name,
        opponentavatar: avatar,
        opponentcategory: category,
        opponentlocation: location,
        runFunction: true,
    });
}


export const recieveRequestTeamData = async (user) => {
    const queryRef = query(collection(db, `users/${user.uid}/recieved_request`));
    const responce = await getDocs(queryRef);
    const recieveRequestList = [];
    responce.docs.forEach((doc) => {
        recieveRequestList.push((doc.data()));
    });
    return recieveRequestList;
}

export const cancelRequestButton = async (user, id) => {
    await deleteDoc(doc(db, `users/${user.uid}/send_request/${id}`));
}

export const acceptRequestButton = async (user, id) => {
    const docRef = doc(db, `users/${user.uid}/recieved_request/${id}`)
    await setDoc(docRef, {
        isAccepted: true,
        runFunction: true,
    }, { merge: true }
    );
}

export const rejectRequestButton = async (user, id) => {
    await deleteDoc(doc(db, `users/${user.uid}/recieved_request/${id}`));
}