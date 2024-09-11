import React, { ReactNode } from 'react';

interface ButtonInterface {
    onClick: () => void,
    label?: string,
    icon?: null | ReactNode,
    disabled?: boolean,
    addClass?: string
}

const Button:React.FC<ButtonInterface> = ({onClick = () => {}, label = "", icon = null, disabled=false, addClass=""}) => {

    return (
        <button type="button" onClick={onClick} className={`text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${!disabled && `hover:bg-gray-100`} ${addClass}`} disabled={disabled}>
            {icon ? <span className="flex self-center">{icon}</span> : label}
        </button>
    )
}

export default Button;