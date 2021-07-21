import React from 'react';
import Link from "next/link";
import {MdInbox, MdStar, MdSend, MdDelete} from 'react-icons/md'
import {BiLabel} from 'react-icons/bi'

function LeftSideBarItem({id, text, color, isActive}) {
    const getIcon = {
        inbox: <MdInbox size={20}/>,
        star: <MdStar size={20}/>,
        important: <BiLabel size={20}/>,
        sent: <MdSend size={20}/>,
        trash: <MdDelete size={20}/>

    }
    return (
        <li className={`pl-7 hover:bg-gray-100 rounded-r-full ${isActive && `font-semibold`}`}
            style={{
                backgroundColor: `${isActive ? color : ''}`,
                color: `${isActive && id === 'inbox' ? `rgb(220, 38, 38)` : `rgba(75, 85, 99, 1)`}`,
                padding: '7px 0px 7px 25px',
                width: '245px'
            }}
        >
            <Link href={`/mail/${id}`}>
                <a className="flex items-center">
                    <div className="mr-5">
                        {getIcon[id]}
                    </div>
                    <p>{text}</p>
                </a>
            </Link>
        </li>
    );
}

export default LeftSideBarItem;