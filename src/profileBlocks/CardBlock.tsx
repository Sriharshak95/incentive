import React, { useRef, useState } from 'react';
import Button from '../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Message } from './mainBlock';

interface CardBlockProps {
    selectedMessage: Message | {};
}

const CardBlock: React.FC<CardBlockProps> = ({ selectedMessage }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isValidFileSize, setValidFileSize] = useState(true);

    // Type guard to check if selectedMessage is of type Message
    const isMessage = (message: any): message is Message => {
        return (message as Message)._id !== undefined;
    };

    // Function to download attachment
    const handleDownloadAttachments = () => {
        if (isMessage(selectedMessage) && selectedMessage.attachments?.length > 0) {
            selectedMessage.attachments.forEach((fileUrl: string) => {
                const link = document.createElement('a');
                link.href = fileUrl;
                const firstSplit = fileUrl.split('?')[0];

                link.download = firstSplit || 'download'; // Use the file name from the URL
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    };

    return (
        <>
            {isMessage(selectedMessage) ? (
                <div>
                    <div className="text-gray-800 p-4 flex items-end">
                        <span className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 mr-2">
                            {selectedMessage.first_name}
                        </span>
                        <span className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 mr-2">
                            {selectedMessage.dropdown_connect}
                        </span>
                        <span className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 mr-2">
                            {selectedMessage.second_name}
                        </span>
                    </div>
                    <div className="text-gray-800 p-4 relative">
                        <p className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg">
                            {selectedMessage.message}
                        </p>
                    </div>
                    <div className={`text-gray-800 ${selectedMessage.attachments.length > 0 ? `p-2 mt-2` : ``} relative`}>
                        {selectedMessage.attachments.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-700 dark:text-gray-400">Attachments</p>
                                <ul className="list-disc pl-4 h-20 overflow-auto">
                                    {selectedMessage.attachments.map((file, index) => {

                                        const pathParts = file.split('?')[0].split('/');
                                        const fileName = pathParts[pathParts.length - 1];
                                        
                                        return (
                                            <li key={index} className="text-sm text-blue-400 hover:text-blue-700">
                                                <a target='_blank' href={file} download={true}>{fileName}</a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="text-gray-800 shadow mt-5 p-2 flex flex-col">
                        <Button label="Say Thanks" addClass="mb-3" onClick={() => { }} />
                        <div className="flex w-full justify-center">
                            <Button
                                onClick={handleDownloadAttachments}
                                label=""
                                icon={<FontAwesomeIcon icon={faPaperclip} />}
                            />
                            <Button
                                onClick={handleDownloadAttachments}
                                label=""
                                icon={<FontAwesomeIcon icon={faGift} />}
                            />
                        </div>
                    </div>
                    {!isValidFileSize && (
                        <p className="text-xs text-rose-500 p-4">
                            Cannot upload file size more than 10mb.
                        </p>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default CardBlock;
