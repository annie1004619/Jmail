import React from 'react';
import {MdRefresh, MdArrowDropDown, MdMoreVert, MdChevronLeft, MdChevronRight} from 'react-icons/md'

function MailListHeader() {
    return (
        <div className="flex items-center px-3  py-1 border-b justify-between">
            <div className="flex items-center">
                <div className="px-2 py-2 hover:bg-gray-100 rounded-md">
                    <input type="checkbox" className="border-2 transform scale-110 hover:bg-gray-100 rounded-full"/>
                </div>
                <div className="py-2 hover:bg-gray-100 rounded-md">
                    <MdArrowDropDown size={20} color={`rgba(107, 114, 128, 1)`}/>
                </div>
                <div className="px-2 py-2 hover:bg-gray-100 rounded-full">
                    <MdRefresh size={20} color={`rgba(107, 114, 128, 1)`}/>
                </div>
                <div className="px-2 py-2 hover:bg-gray-100 rounded-full">
                    <MdMoreVert size={20} color={`rgba(107, 114, 128, 1)`}/>
                </div>
            </div>
            <div className="flex items-center">
                <div className="px-2 py-2 hover:bg-gray-100 rounded-full">
                    <MdChevronLeft size={20} color={`rgba(107, 114, 128, 1)`}/>
                </div>
                <div className="px-2 py-2 hover:bg-gray-100 rounded-full">
                    <MdChevronRight size={20} color={`rgba(107, 114, 128, 1)`}/>
                </div>
            </div>
        </div>
    );
}

export default MailListHeader;