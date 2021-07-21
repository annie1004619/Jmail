import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MdArrowDropDown, MdReply, MdDelete} from "react-icons/md";
import useInput from "../../hooks/useInput";
import {v4 as uuidv4} from 'uuid';
import {addMail} from "../../lib/slices/mailSlice";
import {addThreadMails} from "../../lib/slices/threadSlice";
import {addInbox, addSent} from "../../lib/slices/usersSlice";
import {addLoginSent} from "../../lib/slices/loginUserSlice";

function Reply({sender, setReply, body, threadId}) {
    const date = new Date();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.loginUser.user)
    const userList = useSelector(state => state.users.users)

    const [content, onChangeContent, setContent] = useInput('')

    const onSend = () => {
        if (!loginUser) return;
        if (!userList) return;

        const id = uuidv4()

        const receiverArr = [sender.email]

        const mailObj = {
            [id]: {
                id: id,
                sender: loginUser,
                date: date.getTime() / 1000.0,
                body: {
                    title: `RE: ${body.title}`,
                    content
                },
                receiver: receiverArr
            }
        }
        dispatch(addMail(mailObj))
        dispatch(addThreadMails({key: threadId, id: id}))

        userList.map(({email}, index) => {
            receiverArr.map((item) => {
                if (email === item) {
                    dispatch(addInbox({
                        index: index, id: {
                            [threadId]: false
                        }
                    }))
                    dispatch(addSent({
                        index: index, id: {
                            [threadId]: [id]
                        }
                    }))
                    dispatch(addLoginSent({[threadId]: [id]}))
                    return
                }
            })
        })

        setContent('')
        setReply(false)
    }
    return (
        <div className="flex items-start truncate">
            <div style={{width: '50px'}}>
                <div
                    style={{backgroundColor: `${loginUser.color}`}}
                    className={`rounded-full w-10 h-10 flex items-center justify-center text-sm font-semiBold text-white ml-2 mt-5 cursor-pointer`}>
                    {loginUser.nickName}
                </div>
            </div>
            <div className="flex flex-col mx-3 w-11/12 shadow-xl rounded-lg px-6 py-5">
                <div className="flex items-center text-gray-600">
                    <MdReply size={20} className="mr-1 cursor-pointer"/>
                    <MdArrowDropDown size={20} className="cursor-pointer mr-3"/>
                    <div className="mr-2 text-sm">받는 사람</div>
                    <div
                        className="flex items-center border rounded-full px-2 py-1 text-sm">{sender.name} {sender.email}</div>
                </div>
                <textarea className="resize-none h-24 outline-none mt-5" value={content} onChange={onChangeContent}/>
                <div className="flex items-center justify-between">
                    <button
                        className="rounded-md w-24 h-8 bg-blue-700 text-white text-sm justify-center hover:bg-blue-600"
                        onClick={onSend}
                    >
                        보내기
                    </button>
                    <div className="text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full px-2 py-2"
                         onClick={() => setReply(false)}>
                        <MdDelete size={20}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reply;