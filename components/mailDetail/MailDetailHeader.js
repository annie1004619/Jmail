import React from 'react';
import {
    MdDelete,
    MdKeyboardBackspace,
    MdEmail,
    MdChevronLeft,
    MdChevronRight,
    MdMoreVert,
} from "react-icons/md";
import {useRouter} from "next/router";

function MailDetailHeader() {
    const router = useRouter();

    return (
        <div className="flex items-center py-2 px-6 border-b justify-between">
            <div className="flex items-center">
                <div className="px-3 py-3 hover:bg-gray-100 rounded-full">
                    <MdKeyboardBackspace size={27} color={`rgba(107, 114, 128, 1)`}
                    onClick={()=>router.back()}/>
                </div>
                <div className="px-3 py-3 hover:bg-gray-100 rounded-full">
                    <MdDelete size={27} color={`rgba(107, 114, 128, 1)`}/>
                </div>
                <div className="px-3 py-3 hover:bg-gray-100 rounded-full">
                    <MdEmail size={27} color={`rgba(107, 114, 128, 1)`}/>
                </div>
                <div className="px-3 py-3 hover:bg-gray-100 rounded-full">
                    <MdMoreVert size={27} color={`rgba(107, 114, 128, 1)`}/>
                </div>
            </div>
            <div className="flex items-center">
                <div className="px-3 py-3 hover:bg-gray-100 rounded-full">
                    <MdChevronLeft size={27} color={`rgba(107, 114, 128, 1)`}/>
                </div>
                <div className="px-3 py-3 hover:bg-gray-100 rounded-full">
                    <MdChevronRight size={27} color={`rgba(107, 114, 128, 1)`}/>
                </div>
            </div>
        </div>
    );
}

export default MailDetailHeader;