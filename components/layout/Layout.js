import React, {useState} from 'react';
import Header from "./Header";
import RightSideBar from "./RightSideBar";
import ComposeModal from "../modal/ComposeModal";
import LeftSideBar from "./LeftSideBar/LeftSideBarList";

function Layout({children}) {
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    return (
        <div className="h-screen w-full" style={{minWidth: '680px'}}>
            <Header />
            <div className="flex justify-between">
                <LeftSideBar openModal={openModal}/>
                <div className="flex-1 overflow-y-auto h-screen">{children}</div>
                <RightSideBar/>
            </div>
            {modal && <ComposeModal closeModal={closeModal}/>}
        </div>
    );
}

export default Layout;