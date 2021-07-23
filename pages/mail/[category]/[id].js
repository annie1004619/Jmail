import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import MailDetailHeader from "../../../components/mailDetail/MailDetailHeader";
import { useSelector, useDispatch } from "react-redux";
import MailDetailItem from "../../../components/mailDetail/MailDetailItem";
import { MdLabel, MdLabelOutline } from "react-icons/md";
import {
  addLoginImportant,
  removeLoginImportant,
} from "../../../lib/slices/loginUserSlice";
import { addImportant, removeImportant } from "../../../lib/slices/usersSlice";

export default function MailItem() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const userIndex = useSelector((state) => state.loginUser.index);
  const myMails = useSelector((state) => state.loginUser.myMails);
  const thread = useSelector((state) => state.thread.thread);
  const importantList = useSelector((state) => state.loginUser.important);

  const [title, setTitle] = useState("");
  const [threadMail, setThreadMail] = useState([]);
  const [important, setImportant] = useState(myMails[id]?.isImportant);

  useEffect(() => {
    if (!thread) return;
    if (!id) return;

    const data = thread[id];
    setTitle(data.title);
    setThreadMail(data.mails);
    console.log(data.mails);
  }, [thread]);

  const toggleImportant = () => {
    setImportant(!important);
    if (!myMails) return;
    if (!importantList) return;

    if (!important) {
      dispatch(addLoginImportant(id));
      dispatch(addImportant({ userIndex, id }));
    }
    if (important) {
      const importantIndex = importantList.findIndex((key) => key === id);

      if (importantIndex !== -1) {
        dispatch(removeLoginImportant({ id, importantIndex }));
        dispatch(removeImportant({ userIndex, id, importantIndex }));
      }
    }
  };

  return (
    <Layout>
      <MailDetailHeader />
      <div className="px-14 text-xl pt-6 flex items-center">
        <div> {title && title}</div>
        <div className="h-8 w-8 hover:bg-gray-100 rounded-full text-gray-500 flex items-center justify-center">
          {important ? (
            <MdLabel
              size={20}
              className="text-yellow-300 cursor-pointer"
              onClick={toggleImportant}
            />
          ) : (
            <MdLabelOutline
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={toggleImportant}
            />
          )}
        </div>
      </div>
      {threadMail.length !== 0 &&
        threadMail.map((_id, index) => (
          <MailDetailItem
            key={_id}
            id={_id}
            threadId={id}
            isLast={threadMail.length - 1 === index}
          />
        ))}
    </Layout>
  );
}
