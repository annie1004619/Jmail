import React from 'react';
import {MdClear} from 'react-icons/md'
import {useDispatch, useSelector} from "react-redux";
import useInput from '../../hooks/useInput'
import {v4 as uuidv4} from 'uuid';
import {addInbox, addSent} from "../../lib/slices/usersSlice";
import {addMail} from "../../lib/slices/mailSlice";
import {addThread} from "../../lib/slices/threadSlice";
import {addLoginSent} from "../../lib/slices/loginUserSlice";

function ComposeModal({closeModal}) {
    const loginUser = useSelector(state => state.loginUser.user)
    const userList = useSelector(state => state.users.users)
    const date = new Date();
    const dispatch = useDispatch();

    const [receiver, onChangeReceiver, setReceiver] = useInput('')
    const [title, onChangeTitle, setTitle] = useInput('')
    const [content, onChangeContent, setContent] = useInput('')

    const onSend = () => {
        if (!loginUser) return;
        if (!userList) return;

        const id = uuidv4()
        const receiverArr = receiver.split(',')

        const mailObj = {
            [id]: {
                id: id,
                sender: loginUser,
                date: date.getTime() / 1000.0,
                body: {
                    title,
                    content
                },
                receiver: receiverArr
            }
        }
        dispatch(addMail(mailObj))

        const threadObj = {
            [id]: {
                title: title,
                mails: [id]
            }

        }
        dispatch(addThread(threadObj))

        userList.map(({email}, index) => {
            receiverArr.map((item) => {
                if (email === item) {
                    dispatch(addInbox({
                        index: index, id: {
                            [id]: false
                        }
                    }))
                    dispatch(addSent({
                        index: index, id: {
                            [id]: [id]
                        }
                    }))
                    dispatch(addLoginSent({[id]: [id]}))
                }
            })
        })

        setTitle('')
        setContent('')
        setReceiver('')
        closeModal();

    }

    return (
        <div className="w-600px absolute bottom-0 right-20 shadow-lg bg-white">
            <div className="h-12 flex items-center bg-brown px-6 py-7 justify-between rounded-t-xl">
                <div className="text-white text-lg">새 메일</div>
                <MdClear size={20} color="#fff" className="cursor-pointer" onClick={closeModal}/>
            </div>
            <div className="flex flex-col">
                <input type="text" placeholder="받는 사람" className="text-lg mx-6 border-b py-2 outline-none"
                       value={receiver} onChange={onChangeReceiver}/>
                <input type="text" placeholder="제목" className="text-lg mx-6 border-b py-2 outline-none" value={title}
                       onChange={onChangeTitle}/>
                <textarea className="mx-6 resize-none h-96 outline-none" value={content} onChange={onChangeContent}/>
                <button
                    className="mx-6 my-6 flex items-center rounded-lg w-32 h-12 bg-blue-700 text-white text-lg justify-center hover:bg-blue-600"
                    onClick={onSend}>보내기
                </button>
            </div>
        </div>
    );
}

export default ComposeModal;