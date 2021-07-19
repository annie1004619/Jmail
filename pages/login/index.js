import Head from "next/head";
import Image from "next/image";
import {useRouter} from 'next/router'
import React, {useState} from "react";
import {MdKeyboardArrowDown} from 'react-icons/md'
import {useDispatch, useSelector} from "react-redux";
import {setInbox, setLoginUser, setStar} from '../../lib/slices/loginUserSlice'

function Login() {
    const dispatch = useDispatch();
    const router = useRouter()

    const userList = useSelector(state => state.users.users)

    const {userId, name, email, nickName, color} = router.query
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const getLoginUserInfo = (_id) => {
        const index = userList.findIndex(({id}) => id === _id)
        return userList[index]
    }

    const onLogin = () => {
        setError('')
        if (!password) {
            setError('비밀번호를 입력해주세요.')
            return
        }
        if (password !== '1234') {
            setError('비밀번호가 틀립니다.')
            return
        }
        if (password === '1234') {
            const data = getLoginUserInfo(userId)
            console.log(data)
            const userProfile = {
                id: data.id,
                name: data.name,
                email: data.email,
                nickName: data.nickName,
                color: data.color
            }
            dispatch(setLoginUser(userProfile))
            dispatch(setInbox(data.Inbox))
            dispatch(setStar(data.star))
            router.push('/mail/inbox')
        }

    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Head>
                <title>JMail</title>
                <meta name="description" content="Generated by create next app"/>
            </Head>
            <div className="w-600px border-2 flex flex-col items-center py-5 px-20">
                <div>
                    <Image
                        priority
                        src="/images/google.png"
                        height={100}
                        width={100}
                        alt={`google-logo`}
                    />
                </div>
                <div className="text-4xl mb-4">{name}</div>
                <div className="flex items-center border-2 px-3 py-1 rounded-full cursor-pointer"
                     onClick={() => router.push('/')}>
                    <div
                        className={`${color} rounded-full w-7 h-7 flex items-center justify-center text-xs font-semiBold text-white mr-5`}>
                        {nickName}
                    </div>
                    <div className="flex items-end">
                        <div className="text-lg">{email}</div>
                        <MdKeyboardArrowDown size={20} className="ml-2"/>
                    </div>
                </div>
                <div className="flex flex-col my-6 w-full">
                    <label className="mb-2 text-gray-500">비밀번호 입력</label>
                    <input type="password" className="border-2 rounded-sm w-full h-10" value={password}
                           onChange={e => onChangePassword(e)}/>
                </div>
                {error && <div className="self-start text-red-600">{error}</div>}
                <button onClick={onLogin} className="bg-blue-700 text-white w-20 h-10 rounded-sm self-end mt-10 mb-10">
                    다음
                </button>
            </div>
        </div>
    );
}

export default Login;