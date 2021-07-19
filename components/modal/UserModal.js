import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {logout} from "../../lib/slices/loginUserSlice";
import Link from "next/link";

function UserModal({loginUser}) {
    const dispatch = useDispatch()
    const router = useRouter();
    const userList = useSelector(state => state.users.users)
    const [other, setOther] = useState([])

    useEffect(() => {
        if (!userList) return
        setOther(userList.filter(({email}) => loginUser.email !== email))
    }, [userList])

    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }

    return (
        <div
            className="absolute top-20 right-0 bg-white z-20 shadow-xl w-96 rounded-lg flex flex-col items-center py-10">
            <div className="flex flex-col items-center w-full pb-5 border-b">
                <div
                    className={`rounded-full ${loginUser.color} w-24 h-24 flex items-center justify-center text-2xl font-semiBold text-white`}>
                    {loginUser.nickName}
                </div>
                <div className="py-2 text-xl font-semibold">{loginUser.name}</div>
                <div className="text-lg text-gray-500">{loginUser.email}</div>
            </div>
            <ul className="w-full">
                {other && other.map(({id, name, email, nickName, color}) =>
                    <Link key={id}
                          href={{
                              pathname: '/login',
                              query: {
                                  userId: id,
                                  name,
                                  email,
                                  nickName,
                                  color
                              }
                          }}>
                        <li className="flex items-center cursor-pointer border-b py-3 pl-10 hover:bg-gray-100"
                            onClick={() => dispatch(logout())}>
                            <div
                                className={`${color} rounded-full w-10 h-10 flex items-center justify-center text-l font-semiBold text-white mr-5`}>{nickName}</div>
                            <div>
                                <div>{name}</div>
                                <div>{email}</div>
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
            <button
                className="flex items-center border-2 rounded-lg w-32 h-12 text-gray-500 text-lg mt-10 justify-center hover:bg-gray-100"
                onClick={handleLogout}>로그아웃
            </button>
        </div>
    );
}

export default UserModal;