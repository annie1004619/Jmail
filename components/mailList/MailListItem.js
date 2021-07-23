import React, { useEffect, useState } from "react";
import { MdStarBorder, MdStar, MdLabelOutline, MdLabel } from "react-icons/md";
import { getStringDate } from "../../lib/getStringDate";
import { useDispatch, useSelector } from "react-redux";
import {
  addLoginImportant,
  addLoginStar,
  removeLoginImportant,
  removeLoginStar,
  setLoginIsRead,
} from "../../lib/slices/loginUserSlice";
import { useRouter } from "next/router";
import {
  addImportant,
  addStar,
  removeImportant,
  removeStar,
  setIsRead,
} from "../../lib/slices/usersSlice";

export function MailListItem({ id }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category } = router.query;

  const userIndex = useSelector((state) => state.loginUser.index);
  const myMails = useSelector((state) => state.loginUser.myMails);
  const starList = useSelector((state) => state.loginUser.star);
  const importantList = useSelector((state) => state.loginUser.important);
  const threadList = useSelector((state) => state.thread.thread);
  const mailList = useSelector((state) => state.mail.mailList);

  const [star, setStar] = useState(myMails[id]?.isStar);
  const [read, setRead] = useState(myMails[id]?.isRead);
  const [important, setImportant] = useState(myMails[id]?.isImportant);

  const [title, setTitle] = useState("");
  const [sender, setSender] = useState("");
  const [lastContent, setLastContent] = useState("");
  const [lastContentId, setLastContentId] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!threadList) return;
    if (!mailList) return;

    setTitle(threadList[id].title);
    setSender(threadList[id].sender.join(", "));

    threadList[id].mails.map((key, index) => {
      if (index === threadList[id].mails.length - 1) {
        setLastContent(mailList[key].body.content);
        setLastContentId(mailList[key].id);
        setDate(getStringDate(mailList[key].date * 1000));
      }
    });
  }, [threadList, mailList]);

  const toggleStar = () => {
    setStar(!star);
    if (!myMails) return;
    if (!starList) return;

    if (!star) {
      dispatch(addLoginStar({ id, item: { id: id, items: [lastContentId] } }));
      dispatch(
        addStar({ userIndex, id, item: { id: id, items: [lastContentId] } })
      );
    }
    if (star) {
      const starIndex = starList.findIndex((item) => item.id === id);
      if (starIndex !== -1) {
        dispatch(removeLoginStar({ id, starIndex }));
        dispatch(removeStar({ userIndex, id, starIndex }));
      }
    }
  };

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

  const onClick = () => {
    router.push(`/mail/${category}/${id}`);
    dispatch(setLoginIsRead(id));
    dispatch(setIsRead({ userIndex, id }));
  };

  return (
    <div
      style={{ backgroundColor: `${read ? "rgba(242,245,245,0.8)" : ""}` }}
      className={`flex items-center pl-5 py-3 border-b cursor-pointer hover:shadow-item hover:z-20}`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="border-2 transform scale-110 mr-3 cursor-pointer"
        />
        {star ? (
          <MdStar
            size={20}
            className="mr-3 cursor-pointer text-yellow-300"
            onClick={toggleStar}
          />
        ) : (
          <MdStarBorder
            size={20}
            className="mr-3 text-gray-400 cursor-pointer"
            onClick={toggleStar}
          />
        )}
        {important ? (
          <MdLabel
            size={20}
            className="mr-3 text-yellow-300 cursor-pointer"
            onClick={toggleImportant}
          />
        ) : (
          <MdLabelOutline
            size={20}
            className="mr-3 text-gray-400 cursor-pointer"
            onClick={toggleImportant}
          />
        )}
      </div>
      <ul
        className="flex items-center justify-between w-full font-bold text-sm"
        onClick={onClick}
      >
        <li className="w-32 truncate mr-2">{sender}</li>
        <li className="w-96 flex-1 items-center truncate">
          {title}-
          <strong className="text-gray-500 truncate font-medium">
            {lastContent}
          </strong>
        </li>
        <li className="truncate ml-2 mr-6 ">{date}</li>
      </ul>
    </div>
  );
}
