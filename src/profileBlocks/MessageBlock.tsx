interface MessageBlockInterface {
    _id: string,
    first_name: string,
    dropdown_connect: string,
    second_name: string,
    message: string,
    getSelectedId: (_id: string) => void
}
const MessageBlock:React.FC<MessageBlockInterface> = ({_id = "", first_name = "", dropdown_connect = "", second_name = "", message = "", getSelectedId = () => {}}) => {
    return (
        <div className="text-gray-800 shadow p-4 flex items-end cursor-pointer hover:bg-slate-300" key={_id} onClick={() => {
            getSelectedId(_id);
        }}>
            {/* <img src="https://pbs.twimg.com/profile_images/1285454989565911040/UK485eH_x96.jpg" alt={e.first_name} className="inline-block rounded-full h-10 w-10 mr-2" /> */}
            <span className="italic text-slate-400">{first_name}</span>
            <span className='mx-2 text-sm text-gray-500'>{dropdown_connect}</span>
            {/* <img src="https://pbs.twimg.com/profile_images/1792591716668551168/78i1Fhu4400x400.png" alt={e.second_name} className="inline-block rounded-full h-10 w-10 mx-2" /> */}
            <span className='italic text-slate-400	mr-2'>{second_name}</span>
            <span className="text-sm text-gray-500">{message}</span>
        </div>);
}

export default MessageBlock;