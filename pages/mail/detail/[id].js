import React, {useEffect, useState} from "react";
import Layout from "../../../components/layout/Layout";
import {useRouter} from "next/router";
import MailDetailHeader from "../../../components/mailDetail/MailDetailHeader";
import {useSelector} from "react-redux";
import MailDetailItem from "../../../components/mailDetail/MailDetailItem";

export default function MailItem() {
    const router = useRouter()
    const {id} = router.query

    const thread = useSelector(state => state.thread.thread)
    const mailList = useSelector(state => state.mail.mailList)
    const [title, setTitle] = useState('');
    const [threadMail, setThreadMail] = useState([]);

    useEffect(() => {
        if (!thread) return
        if (!id) return

        const data = thread[id]
        setTitle(data.title)

        data.mails.map((key) => {
            if (threadMail.includes(mailList[key])) return
            setThreadMail(prev => prev.concat(mailList[key]))
        })
    }, [thread])


    return (
        <Layout>
            <MailDetailHeader/>
            <div className="px-14 text-xl pt-6">{title && title}</div>
            {threadMail && threadMail.map(({id, date, sender, body, receiver}) =>
                <MailDetailItem key={id} id={id} sender={sender} date={date} body={body} receiver={receiver}/>
            )}
        </Layout>
    );
}
