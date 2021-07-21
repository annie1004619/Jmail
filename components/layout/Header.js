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
        <div className="flex items-center py-4 border-b justify-between relative ">
            <div className="flex items-center" style={{paddingRight: '30px'}}>
                <div className="text-gray-500 ml-10" style={{width: '40px'}}>
                    <MdMenu size={25}/>
                </div>
                <Link href="/mail/inbox">
                    <a className="flex items-center">
                        <div style={{width: '43px'}}>
                            <Image
                                priority
                                src="/images/Gmail_logo.png"
                                width={35}
                                height={25}
                                alt={`Jmail-logo`}
                            />
                        </div>
                        <p className="ml-3 text-2xl font-medium text-gray-500">Jmail</p>
                    </a>
                </Link>
            </div>
            <div className="flex items-center bg-gray-100 px-6 py-3 rounded-md flex-1 mx-10">
                <div className="" style={{width: '30px'}}>
                    <HiOutlineSearch size={20} color={`rgba(107, 114, 128, 1)`} className="mr-5"/>
                </div>
                <input type="text" className="text-md text-gray-500 bg-gray-100 w-11/12 focus:outline-none"
                       placeholder="메일 검색"/>
                <div style={{width: '32px'}}>
                    <MdTune size={20} color={`rgba(107, 114, 128, 1)`}/>
                </div>
            </div>
            <div className="flex items-center mr-3" style={{width: '175px'}}>
                <MdHelpOutline size={20} color={`rgba(107, 114, 128, 1)`} className="mx-3"/>
                <MdSettings size={20} color={`rgba(107, 114, 128, 1)`} className="mx-3"/>
                <MdApps size={20} color={`rgba(107, 114, 128, 1)`} className="mx-3"/>
                {loginUser && <div
                    style={{backgroundColor: `${loginUser.color}`}}
                    className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-semiBold text-white ml-3 cursor-pointer`}
                    onClick={() => setModal(!modal)}>
                    {loginUser.nickName}
                </div>
                }
            </div>
            {modal && loginUser && <UserModal loginUser={loginUser} setModal={setModal}/>}
        </div>
    );
}

export default Header;