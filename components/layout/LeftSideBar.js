import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {MdInbox, MdStar, MdSend, MdDelete} from 'react-icons/md'
import {BiLabel} from 'react-icons/bi'

function LeftSideBar({openModal}) {
    return (
        <div className="w-1/5">
            <button onClick={openModal}
                    className="flex items-center shadow-xl ml-3 my-6 px-7 py-3 text-lg rounded-full">
                <Image
                    priority
                    src="/images/plus.png"
                    height={40}
                    width={40}
                    alt="compose-button"
                />
                <p className="ml-4">편지쓰기</p>
            </button>
            <ul className="text-lg border-b-2 pb-1">
                <li className="pl-7 py-2 mr-5 hover:bg-gray-100 rounded-r-full">
                    <Link href="/mail/inbox">
                        <a className="flex items-center">
                            <MdInbox size={25} className="mr-5 text-gray-600"/>
                            <p>받은편지함</p>
                        </a>
                    </Link>
                </li>
                <li className="pl-7 py-2 mr-5 hover:bg-gray-100 rounded-r-full">
                    <Link href="/mail/star">
                        <a className="flex items-center">
                            <MdStar size={25} className="mr-5 text-gray-600"/>
                            <p>별표편지함</p>
                        </a>
                    </Link>
                </li>
                <li className="pl-7 py-2 mr-5 hover:bg-gray-100 rounded-r-full">
                    <Link href="/mail/important">
                        <a className="flex items-center">
                            <BiLabel size={25} className="mr-5 text-gray-600"/>
                            <p>중요편지함</p>
                        </a>
                    </Link>
                </li>
                <li className="pl-7 py-2 mr-5 hover:bg-gray-100 rounded-r-full">
                    <Link href="/mail/sent">
                        <a className="flex items-center">
                            <MdSend size={25} className="mr-5 text-gray-600"/>
                            <p>보낸편지함</p>
                        </a>
                    </Link>
                </li>
                <li className="pl-7 py-2 mr-5 hover:bg-gray-100 rounded-r-full">
                    <Link href="/mail/trash">
                        <a className="flex items-center">
                            <MdDelete size={25} className="mr-5 text-gray-600"/>
                            <p>휴지통</p>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default LeftSideBar;