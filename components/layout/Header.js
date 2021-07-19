import React, {useState} from "react";
import Image from 'next/image'
import Link from 'next/link'
import {MdMenu, MdTune, MdHelpOutline, MdSettings, MdApps} from 'react-icons/md'
import {HiOutlineSearch} from 'react-icons/hi'
import {useSelector} from "react-redux";
import UserModal from "../modal/UserModal";

function Header() {
    const loginUser = useSelector(state => state.loginUser.user)
    const [modal, setModal] = useState(false)

    return (
        <div className="flex items-center py-4 border-b justify-between relative">
            <div className="flex items-center w-1/6">
                <MdMenu className="mr-3 ml-6" size={30} color={`rgba(107, 114, 128, 1)`}/>
                <Link href="/mail/inbox">
                    <a className="flex items-center ml-3">
                        <Image
                            priority
                            src="/images/Gmail_logo.png"
                            height={33}
                            width={43}
                            alt={`Jmail-logo`}
                        />
                        <p className="ml-5 text-3xl font-medium text-gray-500">Jmail</p>
                    </a>
                </Link>
            </div>
            <div className="flex items-center bg-gray-100 px-6 py-4 rounded-md w-7/12 mr-10">
                <HiOutlineSearch size={25} color={`rgba(107, 114, 128, 1)`} className="mr-5"/>
                <input type="text" className="text-xl text-gray-500 bg-gray-100 w-11/12 focus:outline-none"
                       placeholder="메일 검색"/>
                <MdTune size={30} color={`rgba(107, 114, 128, 1)`}/>
            </div>
            <div className="flex items-center pr-6 w-1/10">
                <MdHelpOutline size={30} color={`rgba(107, 114, 128, 1)`} className="mx-2"/>
                <MdSettings size={30} color={`rgba(107, 114, 128, 1)`} className="mx-2"/>
                <MdApps size={30} color={`rgba(107, 114, 128, 1)`} className="mx-2"/>
                {loginUser && <div
                    className={`rounded-full ${loginUser.color} w-10 h-10 flex items-center justify-center text-l font-semiBold text-white ml-2 cursor-pointer`}
                    onClick={() => setModal(!modal)}>
                    {loginUser.nickName}
                </div>
                }
            </div>
            {modal && loginUser && <UserModal loginUser={loginUser}/>}
        </div>
    );
}

export default Header;