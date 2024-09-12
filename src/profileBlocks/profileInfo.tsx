import { faCheck, faPencilAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react';

interface ProfileInfoInterface {
    profileImage: string,
    isEditing: boolean,
    handleSaveClick: () => void,
    isLoading: boolean,
    profile: {
        displayName: string,
        bio: string
    },
    setNewBio: (e:any) => void,
    handleEditClick: () => void,
    content_length: number,
    newBio: string
}

const ProfileInfo:React.FC<ProfileInfoInterface> = ({profileImage = "", isEditing = false, handleSaveClick = () => {}, isLoading = false, profile, setNewBio, handleEditClick = () => {}, content_length, newBio = ""}) => {
    return (
        <div className="text-center my-4">
            <img className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src={profileImage} alt="profile Image" />
            <div className="py-1">
                <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">{profile?.displayName}</h3>
                <div className="inline-flex text-sm text-gray-700 dark:text-gray-300 items-center justify-center w-full">
                    {isEditing ? (
                        <div className="flex items-center w-full">
                            <textarea placeholder="Write your thoughts here..." className="w-full" onChange={(e) => setNewBio(e.target.value)} maxLength={content_length} value={newBio}></textarea>
                            <button onClick={handleSaveClick} className="ml-2" disabled={isLoading}>

                                {isLoading ? <FontAwesomeIcon icon={faSpinner} spin className="text-gray-500" /> :
                                    <FontAwesomeIcon icon={faCheck} className="text-green-500" />}
                            </button>
                        </div>
                    ) : profile ? (
                        <>
                            {profile?.bio || "Tell us your story?"}
                            <button onClick={handleEditClick} className="ml-2">
                                <FontAwesomeIcon icon={faPencilAlt} className="text-gray-500 hover:text-gray-700" />
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default ProfileInfo;