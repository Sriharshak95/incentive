
import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/button';
import SendIcon from '../components/sendIcon';
import CancelIcon from '../components/closeIcon';
import { faGift, faPaperclip, faRemove } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CreateInterface {
    handleChange: (e: any) => void,
    handleSubmit: () => void,
    first_name: string,
    dropdown_connect: string,
    second_name: string,
    message: string,
    sendDisable: boolean,
    CONTENT_LENGTH?: number,
    handleCancel: (isCreate: boolean) => void,
    attachments: any[]
    setAttachments: (files: any[]) => void
}

const Create: React.FC<CreateInterface> = ({ handleChange = () => { }, handleSubmit = () => { }, first_name = "", dropdown_connect = "", second_name = "", message = "", sendDisable = false, CONTENT_LENGTH = 200, handleCancel = () => { }, attachments = [], setAttachments = () => { } }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isValidFileSize, setValidFileSize ] = useState(true);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length) {
            setValidFileSize(false);
            const fileArray = Array.from(files);
            const fileSize = fileArray[0].size/1024/1024;
            if(fileSize > 10) {
                setValidFileSize(false);
            } else {
                setValidFileSize(true);
                setAttachments([...attachments, ...fileArray]);
            }
        }
    };

    const handlePaperclipClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveAttachment = (index: number) => {
        const updatedAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(updatedAttachments);
    };

    return (
        <>
            <div className="text-gray-800 p-4 flex items-end">
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2" placeholder="You" value={first_name} required onChange={handleChange} />
                <select name="cars" id="dropdown_connect" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={handleChange} value={dropdown_connect} >
                    <option value="Should talk to">Should talk to</option>
                    <option value="Should get interviewed">Should get interviewed</option>
                    <option value="Need to Meet">Need to Meet</option>
                </select>
                <input type="text" id="second_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2" placeholder="Me" required onChange={handleChange} value={second_name} />
            </div>
            <div className="text-gray-800 p-4 relative">
                <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={handleChange} maxLength={CONTENT_LENGTH} value={message}></textarea>
                <p className={`text-xs absolute ${message.length >= CONTENT_LENGTH ? `text-rose-500 dark:text-rose-400` : `text-gray-400 dark:text-gray-400`} mt-2`}>{message.length >= CONTENT_LENGTH ? `You have reached ${message.length} characters.` : `Please enter up to ${CONTENT_LENGTH} characters.`}</p>
            </div>
            <div className={`text-gray-800 ${attachments.length > 0 ? `p-2 mt-2` : ``} relative`}>
                {attachments.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-700 dark:text-gray-400">Selected files:</p>
                        <ul className="list-disc pl-4 h-20 overflow-auto">
                            {attachments.map((file, index) => (
                                <li key={index} className="text-sm text-gray-400">
                                    {file.name}   <FontAwesomeIcon onClick={() => handleRemoveAttachment(index)} icon={faRemove} className="text-gray-500 hover:text-rose-700 cursor-pointer" />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="text-gray-800 shadow mt-5 p-2 flex">
                <div className="flex w-full">
                    <Button onClick={() => { }} label="" icon={<FontAwesomeIcon icon={faGift} className="text-gray-500 hover:text-rose-700" />} />
                    <Button onClick={handlePaperclipClick} label="" icon={<FontAwesomeIcon icon={faPaperclip} className="text-gray-500 hover:text-gray-700" />} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        multiple
                    />
                </div>
                <div className="text-right w-full">
                    <Button onClick={() => handleCancel(false)} label="" icon={<CancelIcon />} />
                    <Button onClick={() => handleSubmit()} label="" icon={<SendIcon />} disabled={sendDisable} />
                </div>
            </div>
            <div>
                {!isValidFileSize && <p className={`text-xs text-rose-500 dark:text-rose-400 p-4`}>Cannot upload file size more than 10mb.</p>}
            </div>
        </>
    )
}

export default Create;