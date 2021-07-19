import React, {useState} from 'react';
import Header from "./Header";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import ComposeModal from "../modal/ComposeModal";

function Layout({children}) {
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    return (
        <div>
            <Header/>
            <div className="flex">
                <LeftSideBar openModal={openModal}/>
                <div className="w-4/5 h-full">{children}</div>
                <RightSideBar/>
            </div>
            {modal && <ComposeModal closeModal={closeModal}/>}
        </div>
    );
}

export default Layout;