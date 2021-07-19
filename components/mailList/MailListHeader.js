import React from 'react';
import {MdRefresh, MdArrowDropDown, MdMoreVert, MdChevronLeft, MdChevronRight} from 'react-icons/md'

function MailListHeader() {
    return (
        <div className="flex items-center py-2 px-6 border-b justify-between">
            <div className="flex items-center">
                <div className="px-3 py-3 hover:bg-gray-100 rounded-md">
                    <input type="checkbox" className="border-2 transform scale-150 hover:bg-gray-100 rounded-full"/>
                </div>
                <div className="py-3 hover:bg-gray-100 rounded-md">
                    <MdArrowDropDown size={27} color={`rgba(107, 114, 128, 1)`}/>
                </div>
                <div className="px-3 py-3 hover:bg-gray-100 rounded-full">
                    <MdRefresh size={27} color={`rgba(107, 114, 128, 1)`}/>
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

export default MailListHeader;