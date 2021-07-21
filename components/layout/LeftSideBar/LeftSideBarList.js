import React from 'react'
import Image from 'next/image'
import LeftSideBarItem from "./LeftSideBarItem";
import {useRouter} from "next/router";

function LeftSideBar({openModal}) {
    const router = useRouter()
    const {category} = router.query

    const navList = [
        {
            id: 'inbox',
            text: '받은편지함',
            color: `rgb(255, 232, 232)`
        },
        {
            id: 'star',
            text: '별표편지함',
            color: `rgba(229, 231, 235, 1)`
        },
        {
            id: 'important',
            text: '중요편지함',
            color: `rgba(229, 231, 235, 1)`
        },
        {
            id: 'sent',
            text: '보낸편지함',
            color: `rgba(229, 231, 235, 1)`
        },
        {
            id: 'trash',
            text: '휴지통',
            color: `rgba(229, 231, 235, 1)`
        },

    ]
    return (
        <div className="h-screen" style={{minWidth: '260px', display:'block'}}>
            <button onClick={openModal}
                    style={{width: ' 140px', height: '48px'}}
                    className="flex items-center justify-center shadow-btn ml-3 my-6 text-sm rounded-full hover:bg-gray-100">
                <Image
                    priority
                    src="/images/plus.png"
                    height={30}
                    width={30}
                    alt="compose-button"
                />
                <p className="ml-3">편지쓰기</p>
            </button>
            <ul className="text-sm border-b pb-1">
                {navList.map(({id, text, color}) => <LeftSideBarItem key={id} id={id} text={text} color={color}
                                                                     isActive={id === category}/>)}
            </ul>
        </div>
    );
}

export default LeftSideBar;