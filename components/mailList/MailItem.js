import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import {MdStarBorder, MdStar} from 'react-icons/md'
import {BiLabel} from "react-icons/bi";
import {getStringDate} from "../../lib/getStringDate";
import {useDispatch, useSelector} from "react-redux";
import {addStar, removeStar} from "../../lib/slices/loginUserSlice";

function MailItem({body, date, sender, id}) {
    const dispatch = useDispatch();
    const [isStar, setIsStar] = useState(false)
    const stringDate = getStringDate(date * 1000)
    const star = useSelector(state => state.loginUser.star)
    console.log(star)

    useEffect(() => {
        if (!star) return
        if (id in star) {
            setIsStar(true)
        }
    }, [star])

    const toggleStar = () => {
        setIsStar(!isStar)
        if (!isStar) {
            if (id in star) {
                return
            }
            const obj = {[id]: [id]}
            console.log(obj)
            dispatch(addStar(obj))
        }
        if (isStar) {
            dispatch(removeStar(id))
        }
    }

    return (
        <div className="flex items-center pl-6 py-3 border-b cursor-pointer hover:shadow-md">
            <div className="flex items-center">
                <input type="checkbox" className="border-2 transform scale-150 mr-4 cursor-pointer"/>
                {isStar ? <MdStar size={25} className="mr-4 text-gray-400 cursor-pointer text-yellow-400"
                                  onClick={toggleStar}/> :
                    <MdStarBorder size={25} className="mr-4 text-gray-400 cursor-pointer" onClick={toggleStar}/>}
                <BiLabel size={25} className="mr-4 text-gray-400 cursor-pointer"/>
            </div>
            <Link href={`/mail/detail/${id}`}>
                <ul className="flex items-center font-bold w-full">
                    <li className="w-1/6">{sender.name}</li>
                    <li className="w-4/6 mr-10 flex items-center truncate">{body.title}-<strong
                        className="font-medium text-gray-500 truncate">{body.content}</strong></li>
                    <li>{stringDate}</li>
                </ul>
            </Link>
        </div>
    );
}

export default MailItem;