import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faCheck, faChevronDown, faChevronUp, faClose, faPencilAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/button';
import ProfileInfo from './profileInfo';

export const ProfileCard: React.FC<{ setIsExpanded: (isExpanded: boolean) => void, isExpanded: boolean, toggleSidebar: () => void }> = ({ setIsExpanded = () => {}, isExpanded = false, toggleSidebar }) => {
    const { profile, setProfile } = useContext(AuthenticationContext);
    const [profileImage, setProfileImage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [newBio, setNewBio] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const CONTENT_LENGTH = 200;

    useEffect(() => {
        if (profile === null)
            return;
        const { photo, bio } = profile;
        setProfileImage(photo);
        setNewBio(bio || "");
    }, [profile]);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle the state
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsLoading(true); // Start loading spinner
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${profile.googleId}/bio`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ bio: newBio }),
                credentials: 'include'
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setProfile(updatedUser); // Update context with the updated user data
                setIsEditing(false);     // Exit editing mode
            } else {
                console.error('Failed to update bio');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false); // Stop loading spinner
        }
    };


    return (
        <>
            <div className={`transition-all duration-800 ${isExpanded ? 'h-auto' : 'h-20'}`}>
                <div className="flex justify-between items-center">
                    <Button onClick={handleToggleExpand} addClass="text-right" icon={<FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className='text-gray-500' />} />
                    <Button onClick={() => toggleSidebar()} addClass='md:hidden' icon={<FontAwesomeIcon icon={faArrowAltCircleLeft} className='text-gray-500' />} />
                </div>
                {isExpanded && (<ProfileInfo
                    profileImage={profileImage} 
                    profile={profile}
                    setNewBio={setNewBio} 
                    handleSaveClick={handleSaveClick} 
                    handleEditClick={handleEditClick}
                    isLoading={isLoading}
                    content_length={CONTENT_LENGTH}
                    isEditing={isEditing}
                    newBio={newBio}
                />)}
            </div>
        </>
    )
}