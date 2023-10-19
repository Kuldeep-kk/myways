"use client";
import React, {useContext, useState} from 'react';
import styles from "@/app/signup/signup.module.css";
import Image from "next/image";
import user from "../../../public/Images/maleAvatar.png";
import {login} from "@/services/userService";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import UserContext from "@/context/userContext";

const SignIn = () => {

    const router=useRouter();
    const context=useContext(UserContext);

    const [userDetail,setUserDetail]=useState({
        email:"",
        password:""
    })
    const handleSignIn=async (event)=>{
        event.preventDefault();

        try{
            const result= await login(userDetail);
            console.log(result);
            toast.success("User Logged In",{
                position:"top-center"
            });

            setUserDetail({
                email:"",
                password:""
            });
            context.setUser(result.user);
            router.push("/AddTask");

        }
        catch (e) {
            console.log(e);
            toast.error(e.response.data.message,{
                position:"top-center"
            });


        }
    }
    return (
        <div>
            <form className={`  ${styles.form}`} onSubmit={handleSignIn} >
                <h2 className={`text-center text-3xl font-bold text-blue-600`}>SignIn</h2>
                <div className={`${styles.imageSection}`}>
                    <Image src={user} alt={"signUpImage"} className={`${styles.imageSignUp}`}/>
                </div>



                <input type="email" placeholder="Enter Your Email"
                       name="email"

                       onChange={(event)=>{
                           setUserDetail({
                               ...userDetail,
                               email:event.target.value,
                           })
                       }}
                       value={userDetail.email}

                       required
                       />

                <input type="password" placeholder="Enter Your password"
                       name="password"
                       onChange={(event)=>{
                           setUserDetail({
                               ...userDetail,
                               password:event.target.value,
                           })
                       }}
                       value={userDetail.password}

                       required/>
                <input type="submit" value="SignIn"/>
                



            </form>
            
        </div>
    );
};

export default SignIn;