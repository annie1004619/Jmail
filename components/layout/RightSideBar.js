import React from 'react';
import Image from 'next/image'
import {MdAdd} from 'react-icons/md'

function RightSideBar() {
    return (
        <div className="w-20 h-screen border-l flex flex-col items-center">
            <ul className=" pt-5 flex flex-col items-center">
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/calendar.png"
                        height={28}
                        width={28}
                        alt="calendar-icon"
                    />
                </li>
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/keep.png"
                        height={28}
                        width={28}
                        alt="keep-icon"
                    />
                </li>
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/tasks.png"
                        height={28}
                        width={28}
                        alt="tasks-icon"
                    />
                </li>
                <li className="mb-8">
                    <Image
                        priority
                        src="/images/contacts.png"
                        height={28}
                        width={28}
                        alt="contacts-icon"
                    />
                </li>
            </ul>
            <div className="border-b w-10 mb-8"/>
            <MdAdd size={25} color={`rgba(107, 114, 128, 1)`}/>
        </div>
    );
}

export default RightSideBar;