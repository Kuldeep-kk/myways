"use client";
import React, {useEffect, useState} from 'react';
import styles from './signup.module.css'
import Image from "next/image";
import male from "../../../public/Images/maleAvatar.png";
import female from "../../../public/Images/femaleAvatar.jpg";
import {CgRedo} from "react-icons/cg";
import {signUp} from "@/services/userService";
import {toast} from "react-toastify";
import Cropper from "@/components/Avatar/Avatar";





const SignUp = () => {

    const [pImageindex,setPImageindex]=useState(0);
    const images=[male,female];

    const [isMale,setIsMale]=useState(true);

   const [userDetail,setUserDetail]=useState({
       name:"",
       email:"",
       password:"",
       hint:"",
       profileIsMale:isMale,

   })

    const handleImage=()=>{
        setPImageindex((previndex)=>
            previndex === 0 ? 1 : 0);
        setIsMale(!isMale);
    }
    const handleSubmit=async (event)=>{

       event.preventDefault();

       try{
           console.log(userDetail);
           const storageKey = 'tempImageData';
           const imgDataURL = localStorage.getItem(storageKey);

           if(imgDataURL) {
               const result = await signUp(userDetail, imgDataURL);

               console.log("user signup fn called");
               console.log(result);
               toast.success("User registered", {
                   position: "top-center"
               });
               localStorage.removeItem(storageKey);
               setUserDetail({
                   name: "",
                   email: "",
                   password: "",
                   hint: "",
                   profileIsMale: isMale,

               })
           }
           else{
               toast.error("Please Select profile pic!!!",{
                   position:"top-center"
               });
           }

       }

       catch (e) {

           console.log(e);
           toast.error("failed to user registered",{
               position:"top-center"
           })

       }

    }
    useEffect(() => {
        setUserDetail({
            ...userDetail,
            profileIsMale: isMale,
        });
    }, [isMale]);
    return (
        <div className={``}>

            <form className={`  ${styles.form}`} onSubmit={handleSubmit}>
                <h2 className={`text-center text-3xl font-bold text-blue-600`}>SignUp</h2>
                <div className={`flex flex-col md:flex-row`}>
                    <div className={`w-full md:w-1/2 p-4`}>
                        <Cropper/>
                    </div>
                    <div className={`w-full md:w-1/2 mt-16`}>
                        <input type="text" placeholder="Enter Your Full Name"
                               name="name"
                               onChange={(event)=>{
                                   setUserDetail({
                                       ...userDetail,
                                       name:event.target.value,
                                   })
                               }}
                               required
                               value={userDetail.name}/>
                        <input type="email" placeholder="Enter Your Email"
                               name="email"
                               onChange={(event)=>{
                                   setUserDetail({
                                       ...userDetail,
                                       email:event.target.value,
                                   })
                               }}
                               required
                               value={userDetail.email}/>
                        <input type="text" placeholder="Enter Your hint"
                               name="hint"
                               onChange={(event)=>{
                                   setUserDetail({
                                       ...userDetail,
                                       hint:event.target.value,
                                   })
                               }}
                               value={userDetail.hint}
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
                        <input type="submit" value="SignUp"/>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default SignUp;