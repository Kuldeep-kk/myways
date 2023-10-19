"use client";
import React, { useContext, useEffect, useState } from 'react';
import Image from "next/image";
import logo from "../../public/Images/logo.png"
import Link from "next/link";
import UserContext from "@/context/userContext";
import {currentUser, logout} from "@/services/userService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Navbar() {
    const context = useContext(UserContext);
    const router = useRouter();
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user); // Update local user state when context user changes
    }, [context.user]);

    const recall=async ()=>{
        console.log("kkx nxasml")
        const logUser = await currentUser();
        setUser({ ...logUser });

        console.log(user)
        console.log(logUser)

    }

    const doLogout = async () => {
        try {
            const result = await logout();
            console.log(result);
            context.setUser(undefined);
            router.push("/signin");
        } catch (e) {
            toast.error("Logout error");
            console.log(e);
        }
    }

    return (
        <div className={`w-full bg-gray-300 h-16 p-4 text-white font-semibold`}>
            <nav className={`items-center flex justify-between h-8`}>
                <div className={`left -my-6`}>
                    <Image src={logo} alt={"logo"} style={{
                        width: "120px",
                    }}

                    onClick={()=>recall()}/>
                </div>
                <div className={`center`}>
                    <ul className={`flex`}>
                        {user ? (
                            <>
                                <li className={`mx-5`}>
                                    <Link href={'/Chat'} passHref>Chat</Link>
                                </li>
                                <li className={`mx-5`}>
                                    <Link href={'/AddTask'} passHref>Add Task</Link>
                                </li>
                                <li className={`mx-5`}>
                                    <Link href={'/ShowTask'} passHref>View Task</Link>
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>
                <div className={`right`}>
                    {user ? (
                        <div className={`flex gap-14`}>
                            <h2 className={`text-gray-400 mt-2 flex `}>
                                <img className={`rounded-full`} src={user.secure_url} alt="userImage" width="45px" />
                                <span className={`text-blue-500 italic ml-3 mt-2`}>{user.name}</span>
                            </h2>
                            <button className={`bg-orange-600 p-2 h-10 rounded-full hover:bg-orange-500 active:bg-orange-700 mt-2`} onClick={doLogout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link href={"/signin"} className={`mx-5`}>Login</Link>
                            <Link href={"/signup"} className={`mx-5`}>SignUp</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
