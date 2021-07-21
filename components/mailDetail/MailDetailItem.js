import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {MdArrowDropDown, MdStar, MdStarBorder, MdReply, MdMoreVert, MdForward} from 'react-icons/md'
import {getFullDate} from "../../lib/getStringDate";
import Reply from "./Reply";

function MailDetailItem({id, sender, body, date, receiver}) {
    const me = useSelector(state => state.loginUser.user)
    const strDate = getFullDate(date * 1000)

    const [receiverData, setReceiverData] = useState([]);
    const [isStar, setIsStar] = useState(false)
    const [reply, setReply] = useState(false)
    const [forward, setForward] = useState(false)


    useEffect(() => {
        if (!me) return

        receiver.map((email) => {
            if (email === me.email) {
                if (receiverData.includes('나')) return
                setReceiverData(prev => prev.concat('나'))
            } else {
                const id = email.split('@');
                if (receiverData.includes(id[0])) return
                setReceiverData(prev => prev.concat(id[0]))
            }
        })

    }, [me])

    const toggleStar = () => {
        setIsStar(!isStar)
    }

    return (
        <div className="flex flex-col py-7 ">
            <div className="flex items-center">
                <div style={{width: '50px'}}>
                    <div
                        style={{backgroundColor: `${sender.color}`}}
                        className={`rounded-full w-10 h-10 flex items-center justify-center text-sm font-semiBold text-white ml-2 cursor-pointer`}>
                        {sender.nickName}
                    </div>
                </div>
                <div className="flex flex-col mx-3 w-11/12">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center w-6/12 truncate">
                            <div className="mr-1 font-bold">{sender.name}</div>
                            <div className="text-gray-600">{`<${sender.email}>`}</div>
                        </div>
                        <div className="flex items-center text-gray-500 truncate">
                            <div className="mr-5">{strDate}</div>
                            {isStar ? <MdStar size={20} className="mr-4 cursor-pointer text-yellow-400"
                                              onClick={toggleStar}/> :
                                <MdStarBorder size={20} className="mr-4 cursor-pointer" onClick={toggleStar}/>}
                            <MdReply size={20} className="mr-4 cursor-pointer" onClick={() => setReply(true)}/>
                            <MdMoreVert size={20} className="cursor-pointer"/>
                        </div>
                    </div>
                    <div
                        className="flex items-center text-gray-600 text-xs">{receiverData.join(', ')} 에게 <MdArrowDropDown
                        size={18} className="cursor-pointer"/></div>

                </div>
            </div>
            <div className="px-16 py-10 text-sm">{body.content}</div>
            {!reply && !forward &&
            <div className="flex items-center px-16">
                <button
                    className="flex items-center border rounded-md w-28 h-10 text-gray-500 text-sm justify-center hover:bg-gray-100 mr-5"
                    onClick={() => setReply(true)}><MdReply size={20} className="mr-3 cursor-pointer"/>답장
                </button>
                <button
                    className="flex items-center border rounded-md w-28 h-10 text-gray-500 text-sm justify-center hover:bg-gray-100"
                    onClick={() => setForward(false)}><MdForward size={20} className="mr-3 cursor-pointer"/>전달
                </button>
            </div>}
            {reply && <Reply sender={sender} setReply={setReply} body={body} threadId={id}/>}
        </div>
    );
}

export default MailDetailItem;