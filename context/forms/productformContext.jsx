import { Team } from '@/repositories/team_repository/models/team';
import { createContext, useContext, useState } from 'react';
import { useAuth } from '../authContext';
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/firebaseClient';

const TeamFormContext = createContext(null);

export default function TeamFormProvider({ children }) {
    const [team, setTeam] = useState(Team.empty)
    const [image, setImage] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [rendered, setRendered] = useState(1)


    const { user } = useAuth()
    const renderUI = () => { setRendered(rendered + 1) }


    const setUid = () => {
        renderUI();
        const newTeam = team;
        newTeam.uid = user.uid;;
        setTeam(newTeam);
    }

    const setName = (teamName) => {
        renderUI();
        const newTeam = team;
        newTeam.name = teamName;
        setTeam(newTeam);
        setUid()
    }

    const setAvatar = (avatarUrl) => {
        renderUI();
        const newTeam = team;
        newTeam.avatar = avatarUrl;
        setTeam(newTeam);
    }

    const setCategory = (teamCategory) => {
        renderUI();
        const newTeam = team;
        newTeam.category = teamCategory;
        setTeam(newTeam);
    }

    const setLocation = (teamLocation) => {
        renderUI();
        const newTeam = team;
        newTeam.location = teamLocation;
        setTeam(newTeam);
    }

    const clearteam = () => {
        renderUI();
        setTeam(Team.empty);
    }

    const handleImageSelect = (e) => {
        renderUI();
        e.preventDefault()
        setImage(e.target.files[0]);
    }

    // uploadImage to firebase function
    const handelUploadImage = async (e) => {
        renderUI();
        e.preventDefault();
        if (!image) return;
        setImageUploading(true);
        const imageLink = await uploadAndGetImageLink(user.uid, image)
        setAvatar(imageLink)
        setImageUploading(false);
    }

    const uploadAndGetImageLink = async (useruid, image) => {
        if (!image || !useruid) {
            alert("Please select image")
            return;
        }
        const storageRef = ref(storage, `images/${useruid}/${image.name}_${Timestamp.now().seconds}.jpg`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL
    }

    // upload team to firebase function
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!team.name || !team.category || !team.avatar) {
            alert("Please fill all fields")
            return;
        }
        setIsLoading(true);
        await uploadTeam({ team: team, uid: user.uid });
        setIsLoading(false);
        clearteam();
    }

    const uploadTeam = async ({ team, useruid }) => {
        const teamId = doc(collection(db, 'ids')).id;
        const docdRef = doc(db, `users/${user.uid}/my_team/${teamId}`);
        await setDoc(docdRef, team.toJson());
        renderUI();
    }
    return (
        <TeamFormContext.Provider
            value={{
                team,
                image,
                setImage,
                setUid,
                setName,
                setAvatar,
                setCategory,
                setLocation,
                clearteam,
                handleImageSelect,
                handelUploadImage,
                handelSubmit,
                imageUploading,
                isLoading
            }}
        >
            {children}
        </TeamFormContext.Provider>
    )
}

export const useTeamForm = () => useContext(TeamFormContext)
