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

    console.log(receiverData)
    return (
        <div className="flex flex-col py-7 ">
            <div className="flex items-center">
                <div
                    className={`rounded-full ${sender.color} w-14 h-14 flex items-center justify-center text-xl ml-3 font-semiBold text-white ml-2 cursor-pointer z-30`}>
                    {sender.nickName}
                </div>
                <div className="flex flex-col mx-8 w-11/12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="mr-1 font-bold text-lg">{sender.name}</div>
                            <div className="text-gray-600">{`<${sender.email}>`}</div>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <div className="mr-5">{strDate}</div>
                            {isStar ? <MdStar size={25} className="mr-4 cursor-pointer text-yellow-400"
                                              onClick={toggleStar}/> :
                                <MdStarBorder size={25} className="mr-4 cursor-pointer" onClick={toggleStar}/>}
                            <MdReply size={25} className="mr-4 cursor-pointer" onClick={() => setReply(true)}/>
                            <MdMoreVert size={25} className="cursor-pointer"/>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600">{receiverData.join(', ')} 에게 <MdArrowDropDown
                        size={25} className="cursor-pointer"/></div>

                </div>
            </div>
            <div className="px-24 py-10">{body.content}</div>
            {!reply && !forward &&
            <div className="flex items-center px-24">
                <button
                    className="flex items-center border-2 rounded-lg w-32 h-12 text-gray-500 text-lg justify-center hover:bg-gray-100 mr-5"
                    onClick={() => setReply(true)}><MdReply size={25} className="mr-3 cursor-pointer"/>답장
                </button>
                <button
                    className="flex items-center border-2 rounded-lg w-32 h-12 text-gray-500 text-lg justify-center hover:bg-gray-100"
                    onClick={() => setForward(false)}><MdForward size={25} className="mr-3 cursor-pointer"/>전달
                </button>
            </div>}
            {reply && <Reply sender={sender} setReply={setReply} body={body} threadId={id}/>}
        </div>
    );
}

export default MailDetailItem;