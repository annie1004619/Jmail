import React from 'react';
import Image from 'next/image'
import {MdAdd} from 'react-icons/md'

function RightSideBar() {
    return (
        <div className="h-screen border-l flex flex-col items-center" style={{width: '50px'}}>
            <ul className=" pt-5 flex flex-col items-center">
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/calendar.png"
                        height={20}
                        width={20}
                        alt="calendar-icon"
                    />
                </li>
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/keep.png"
                        height={20}
                        width={20}
                        alt="keep-icon"
                    />
                </li>
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/tasks.png"
                        height={20}
                        width={20}
                        alt="tasks-icon"
                    />
                </li>
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/contacts.png"
                        height={20}
                        width={20}
                        alt="contacts-icon"
                    />
                </li>
            </ul>
            <div className="border-b w-6 mb-8"/>
            <MdAdd size={20} color={`rgba(107, 114, 128, 1)`}/>
        </div>
    );
}

export default RightSideBar;