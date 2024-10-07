import GridComponent from './components/gridComponent';
import DynamicForm from './components/dynamicForm';
import { ProfileCard } from './profileBlocks/profileCard';
import Testimonials from './profileBlocks/testimonials';
import MainBlock from './profileBlocks/mainBlock';
import Navbar from './profileBlocks/navbar';
import { useEffect, useState } from 'react';
import './style.css';
import { AuthenticationContext } from './context';
import Button from './components/button';
import MessageBlock from './profileBlocks/MessageBlock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const AppLayout = () => {
    const MAX = 10;
    const [profile, setProfile] = useState(null);
    const [isCreate, setCreate] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [messages, setMessages] = useState([]);
    const [selectedID, setSelectedID] = useState('');
    const [customWidth, setCustomWidth] = useState(0);

    const getAllMessages = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                credentials: 'include'
            });
            const messages = await response.json();
            setMessages(messages);
        } catch (error) {
            console.log(error);
        }
    }

    const getSelectedId = (id:string) => {
        setSelectedID(id);
    }

    useEffect(() => {
        getAllMessages();
    }, []);

    const toggleSidebar = () => {
        setCustomWidth((prevState) => {
            if(prevState === 0){
                return 80;
            } else {
                return 0;
            }
        });
    }

    return (
        <AuthenticationContext.Provider value={{ profile, setProfile }}>
            <div className="md:flex md:items-center md:justify-center bg-slate-200 h-screen">
                <div className="grid drop-shadow-lg grid-cols-1 bg-white md:grid-cols-[auto,1fr] grid-flow-col rounded-md h-full md:h-[700px]">
                    <div className={`bg-grey-200 fixed h-full w-${customWidth} md:static md:w-auto shadow md:block border-r border-grey-400 py-4 overflow-auto`}>
                        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden">

                            {!isExpanded && (
                                <div className="flex justify-left mx-2">
                                    <img
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        src={profile?.photo}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full transition-all duration-300 cursor-pointer"
                                    />
                                </div>
                            )}
                            <div className="border-b px-4 pb-6">
                                {isExpanded && <ProfileCard isExpanded={isExpanded} setIsExpanded={setIsExpanded} toggleSidebar={toggleSidebar} />}
                                {profile !== null && <div className="text-center"><Button addClass={isCreate && "bg-slate-300"} onClick={() => setCreate(true)} label={"Create"} disabled={isCreate} /></div>}
                            </div>
                            <div className='mt-3'></div>
                            {/* <Testimonials /> */}

                            {
                                messages.map((msg, i) => <MessageBlock key={msg._id} {...msg} getSelectedId={getSelectedId} />)
                            }
                        </div>
                    </div>
                    <div className="bg-grey-400 grid grid-rows-[0.1fr,auto] raw md:w-[400px] w-full">
                        <Navbar toggleSidebar={toggleSidebar} />
                        <div className="overflow-y-auto h-[626px]">
                            <MainBlock isCreate={isCreate} setCreate={setCreate} messages={messages} setMessages={setMessages} selectedID={selectedID} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticationContext.Provider>
    )
}