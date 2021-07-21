import React, {useState, useEffect} from "react";
import Layout from "../../components/layout/Layout";
import MailListHeader from "../../components/mailList/MailListHeader";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md'
import MailItem from "../../components/mailList/MailItem";
import {useSelector} from "react-redux";

export default function MailList({category}) {
    const [unReadToggle, setUnReadToggle] = useState(false);
    const [elseToggle, setElseToggle] = useState(false);

    const loginUser = useSelector(state => state.loginUser.user)
    const Inbox = useSelector(state => state.loginUser.Inbox)
    const star = useSelector(state => state.loginUser.star)
    const sent = useSelector(state => state.loginUser.sent);
    const threadList = useSelector(state => state.thread.thread)
    const mailList = useSelector(state => state.mail.mailList)

    const [unReadList, setUnReadList] = useState([]);
    const [readList, setReadList] = useState([]);
    const [starList, setStarList] = useState([]);
    const [sentList, setSentList] = useState([]);

    useEffect(() => {
        if (!loginUser) return;
        if (!Inbox) return;

        for (let key in Inbox) {
            if (!Inbox[key]) {
                if (!unReadList.includes(mailList[key])) {
                    setUnReadList((prev) => prev.concat(mailList[key]))
                }
            }
            if (Inbox[key]) {
                if (!readList.includes(mailList[key])) {
                    setReadList((prev) => prev.concat(mailList[key]))
                }
            }
        }

    }, [loginUser, Inbox])

    useEffect(() => {
        if (!star) return
        if (!loginUser) return

        for (let key in star) {
            if (!starList.includes(mailList[key])) {
                setStarList((prev) => prev.concat(mailList[key]))
            }
        }

    }, [star, loginUser, category])

    useEffect(() => {
        if (!sent) return
        if (!loginUser) return

        for (let key in sent) {
            if (!sentList.includes(mailList[key])) {
                setSentList((prev) => prev.concat(mailList[key]))
            }
        }
    }, [sent, loginUser, category])


    if (category === 'inbox') {
        return (
            <Layout>
                <MailListHeader/>
                <div onClick={() => setUnReadToggle(!unReadToggle)}
                     className="flex items-end text-sm cursor-pointer py-5 px-6 border-b">
                    {unReadToggle ? <MdKeyboardArrowUp size={20}/> : <MdKeyboardArrowDown size={20}/>}
                    <div className="ml-3">Unread</div>
                </div>
                {unReadToggle && unReadList.length === 0 && <div className="text-center pt-10">메일이 없습니다.</div>}
                {unReadToggle && unReadList && unReadList.map(({id, sender, date, body}) =>
                    <MailItem key={id} id={id} body={body} date={date} sender={sender}/>)}

                <div onClick={() => setElseToggle(!elseToggle)}
                     className="flex items-end text-sm cursor-pointer py-5 px-6 border-b">
                    {elseToggle ? <MdKeyboardArrowUp size={20}/> : <MdKeyboardArrowDown size={20}/>}
                    <div className="ml-3">Everthing else</div>
                </div>
                {elseToggle && readList.length === 0 && <div className="text-center pt-10">메일이 없습니다.</div>}
                {elseToggle && readList && readList.map(({id, sender, date, body}) =>
                    <MailItem key={id} id={id} body={body} date={date} sender={sender}/>)}

            </Layout>
        )
    }

    if (category === "star") {
        return (
            <Layout>
                <MailListHeader/>
                {starList.length === 0 && <div className="text-center pt-10">별표 표시된 메일이 없습니다.</div>}
                {starList && starList.map(({id, sender, date, body}) =>
                    <MailItem key={id} id={id} body={body} date={date} sender={sender}/>)}
            </Layout>
        )
    }

    if (category === "sent") {
        return (
            <Layout>
                <MailListHeader/>
                {sentList.length === 0 && <div className="text-center pt-10">보낸 메일이 없습니다.</div>}
                {sentList && sentList.map(({id, sender, date, body}) =>
                    <MailItem key={id} id={id} body={body} date={date} sender={sender}/>)}
            </Layout>
        )
    }


    return (
        <Layout>
            <MailListHeader/>
            <div></div>
        </Layout>
    )
        ;
}

export async function getStaticProps(context) {
    const {params} = context
    const category = params.category
    return {
        props: {
            category: category
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: {category: 'inbox'}},
            {params: {category: 'star'}},
            {params: {category: 'important'}},
            {params: {category: 'sent'}},
            {params: {category: 'trash'}},
        ],
        fallback: false
    }
}