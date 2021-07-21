import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {logout} from "../../lib/slices/loginUserSlice";
import Link from "next/link";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";

function UserModal({loginUser, setModal}) {
    const dispatch = useDispatch()
    const router = useRouter();
    const ref = useRef();
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

    useOnClickOutside(ref, () => setModal(false))

    return (
        <div ref={ref}
             className="absolute top-20 right-0 bg-white z-20 shadow-xl w-72 rounded-lg flex flex-col items-center py-10 border border-gray-300">
            <div className="flex flex-col items-center w-full pb-5 border-b">
                <div
                    style={{backgroundColor: `${loginUser.color}`}}
                    className={`rounded-full w-20 h-20 flex items-center justify-center text-2xl font-semiBold text-white z-30`}>
                    {loginUser.nickName}
                </div>
                <div className="py-2 text-md font-semibold">{loginUser.name}</div>
                <div className="text-sm text-gray-500">{loginUser.email}</div>
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
                        <li className="flex items-center cursor-pointer border-b py-3 pl-5 hover:bg-gray-100 z-30"
                            onClick={() => dispatch(logout())}>
                            <div
                                style={{backgroundColor: `${color}`}}
                                className={`rounded-full w-7 h-7 flex items-center justify-center text-xs font-semiBold text-white mr-5`}>{nickName}</div>
                            <div>
                                <div className="text-sm">{name}</div>
                                <div className="text-xs">{email}</div>
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
            <button
                className="flex items-center border border-gray-300 rounded-lg  w-24 h-8 text-gray-700 text-sm mt-10 justify-center hover:bg-gray-100"
                onClick={handleLogout}>로그아웃
            </button>
        </div>
    );
}

export default UserModal;