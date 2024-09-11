import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/button';
import SendIcon from '../components/sendIcon';
import axios from 'axios';
import { faGift, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageBlock from './MessageBlock';
import Create from './Create';
import CardBlock from './CardBlock';
import { AuthenticationContext } from '../context';

export interface Message {
    createdAt?: string;
    dropdown_connect?: string;
    first_name?: string;
    message?: string;
    second_name?: string;
    __v?: number;
    _id?: string;
    attachments?: any[]
}

interface inputValuesInterface {
    first_name: string,
    second_name: string,
    message: string,
    dropdown_connect: string,
    attachments: any[]
}

const MainBlock: React.FC<{ isCreate: boolean; setCreate: (isCreate: boolean) => void; messages: Message[] | [], setMessages: (messages: Message[] | []) => void, selectedID: string }> = ({ isCreate, setCreate, messages, setMessages, selectedID }) => {
    const initialInputValues: inputValuesInterface = {
        first_name: '',
        second_name: '',
        message: '',
        dropdown_connect: 'Should talk to',
        attachments: []
    };
    const [inputValues, setInputValues] = useState<inputValuesInterface>(initialInputValues);
    const [sendDisable, setSendDisable] = useState(false);
    const { profile, setProfile } = useContext(AuthenticationContext);
    const [selectedMessage, setSelectedMessage] = useState<Message | {}>({});

    const handleChange = (e: any) => {
        const { id, value } = e.target;

        setInputValues((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            formData.append('first_name', inputValues.first_name);
            formData.append('second_name', inputValues.second_name);
            formData.append('message', inputValues.message);
            formData.append('dropdown_connect', inputValues.dropdown_connect);

            inputValues.attachments.forEach((file) => {
                formData.append('attachments', file);
            });

            const response = await fetch(`http://localhost:5001/api/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
                credentials: 'include'
            });
            const message = await response.json();
            setMessages([...messages, message]);
            setCreate(false);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    };

    const handleSetAttachments = (files: any[]) => {
        setInputValues((prevState) => ({
            ...prevState,
            attachments: files
        }));
    };

    const clearInputValues = () => {
        setCreate(false);
        setInputValues(initialInputValues);
    }

    useEffect(() => {
        setSendDisable(Object.values(inputValues).includes(''));
    }, [inputValues])

    useEffect(() => {
        if (selectedID !== "") {
            const selectedMessage = messages.filter((message: Message) => message._id === selectedID);
            setCreate(false);
            setSelectedMessage(selectedMessage[0]);
        }

    }, [selectedID]);

    console.log(selectedMessage);

    if (profile) {
        return (

            <div className='overflow-auto'>
                {isCreate ? <Create
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    sendDisable={sendDisable}
                    handleCancel={clearInputValues}
                    attachments={inputValues.attachments}
                    setAttachments={handleSetAttachments}
                    {...inputValues}
                /> : <CardBlock
                        selectedMessage={selectedMessage}
                    />}

            </div>
        )
    } else {
        return (<div>Please sign in.</div>);
    }
}

export default MainBlock;