import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import MailListHeader from "../../components/mailList/MailListHeader";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { MailListItem } from "../../components/mailList/MailListItem";

export default function MailList({ category }) {
  const [unReadToggle, setUnReadToggle] = useState(false);
  const [elseToggle, setElseToggle] = useState(false);

  const myMails = useSelector((state) => state.loginUser.myMails);
  const inbox = useSelector((state) => state.loginUser.inbox);
  const star = useSelector((state) => state.loginUser.star);
  const important = useSelector((state) => state.loginUser.important);
  const sent = useSelector((state) => state.loginUser.sent);
  const trash = useSelector((state) => state.loginUser.trash);
  const mailList = useSelector((state) => state.mail.mailList);

  const [starData, setStarData] = useState([]);
  const [importantData, setImportantData] = useState([]);
  const [sentData, setSentData] = useState([]);
  const [trashData, setTrashData] = useState([]);
  let sortedData = [];

  useEffect(() => {
    if (!mailList) return;
    if (!star) return;
    if (!important) return;

    switch (category) {
      case "star":
        sortedData = sortDate("star", star);
        setStarData(sortedData);
        break;
      case "important":
        sortedData = sortDate("important", important);
        setImportantData(sortedData);
        break;
      case "sent":
        sortedData = sortDate("sent", sent);
        setSentData(sortedData);
        break;
      case "trash":
        sortedData = sortDate("trash", trash);
        setTrashData(sortedData);
        break;
    }
  }, [mailList, category, star, important]);

  const sortDate = (cat, _data) => {
    const arr = [..._data];
    if (cat === "star") {
      arr.sort((a, b) => {
        if (parseFloat(mailList[a.id].date) > parseFloat(mailList[b.id].date))
          return 1;
        if (parseFloat(mailList[a.id].date) === parseFloat(mailList[b.id].date))
          return 0;
        if (parseFloat(mailList[a.id].date) < parseFloat(mailList[b.id].date))
          return -1;
      });
      return arr;
    }
    if (cat !== "star") {
      arr.sort((a, b) => {
        if (parseFloat(mailList[a].date) > parseFloat(mailList[b].date))
          return 1;
        if (parseFloat(mailList[a].date) === parseFloat(mailList[b].date))
          return 0;
        if (parseFloat(mailList[a].date) < parseFloat(mailList[b].date))
          return -1;
      });
      return arr;
    }
  };

  if (category === "inbox") {
    return (
      <Layout>
        <MailListHeader />
        <div
          onClick={() => setUnReadToggle(!unReadToggle)}
          className="flex items-end text-sm cursor-pointer py-5 px-4 border-b"
        >
          {unReadToggle ? (
            <MdKeyboardArrowUp size={20} />
          ) : (
            <MdKeyboardArrowDown size={20} />
          )}
          <div className="ml-3">Unread</div>
        </div>
        {unReadToggle &&
          myMails &&
          inbox &&
          inbox.map((id) => {
            if (myMails[id] && !myMails[id].isRead) {
              return <MailListItem key={id} id={id} />;
            }
          })}
        <div
          onClick={() => setElseToggle(!elseToggle)}
          className="flex items-end text-sm cursor-pointer py-5 px-4 border-b"
        >
          {elseToggle ? (
            <MdKeyboardArrowUp size={20} />
          ) : (
            <MdKeyboardArrowDown size={20} />
          )}
          <div className="ml-3">Everthing else</div>
        </div>
        {elseToggle &&
          myMails &&
          inbox &&
          inbox.map((id) => {
            if (myMails[id] && myMails[id].isRead) {
              return <MailListItem key={id} id={id} />;
            }
          })}
      </Layout>
    );
  }

  if (category === "star") {
    return (
      <Layout>
        <MailListHeader />
        {starData.length === 0 && (
          <div className="text-center pt-10 text-sm">메일이 없습니다.</div>
        )}
        {starData.length !== 0 &&
          starData.map(({ id }) => {
            return <MailListItem key={id} id={id} />;
          })}
      </Layout>
    );
  }

  if (category === "important") {
    return (
      <Layout>
        <MailListHeader />
        {importantData.length === 0 && (
          <div className="text-center pt-10 text-sm">메일이 없습니다.</div>
        )}
        {importantData.length !== 0 &&
          importantData.map((id) => {
            return <MailListItem key={id} id={id} />;
          })}
      </Layout>
    );
  }

  if (category === "sent") {
    return (
      <Layout>
        <MailListHeader />
        {sentData.length === 0 && (
          <div className="text-center pt-10 text-sm">메일이 없습니다.</div>
        )}
        {sentData.length !== 0 &&
          sentData.map((id) => {
            return <MailListItem key={id} id={id} />;
          })}
      </Layout>
    );
  }

  if (category === "trash") {
    return (
      <Layout>
        <MailListHeader />
        {trashData.length === 0 && (
          <div className="text-center pt-10 text-sm">메일이 없습니다.</div>
        )}
        {trashData.length !== 0 &&
          trashData.map((id) => {
            return <MailListItem key={id} id={id} />;
          })}
      </Layout>
    );
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const category = params.category;
  return {
    props: {
      category: category,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: "inbox" } },
      { params: { category: "star" } },
      { params: { category: "important" } },
      { params: { category: "sent" } },
      { params: { category: "trash" } },
    ],
    fallback: false,
  };
}
