"use client";
import React from 'react';
import logo from "../../public/Images/logo.png";
import Image from "next/image";
import {BsPhone} from "react-icons/bs";
import {BiMailSend} from "react-icons/bi";
import Swal from "sweetalert2";

function Footer() {

    const handleClick=()=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
    }
    return (
        <div className={`w-full  bg-gray-300 h-60 p-4 text-white  `}>
            <div className={`grid grid-cols-12`}>
                <div className={`col-span-4 text-center`}>
                    <button onClick={handleClick}>Kuldeep Kushwahja</button>
                    <Image src={logo} alt={"logo"} style={{
                        width:"120px",
                        marginLeft:"40px"
                    }}/>
                    <p className={`text-left w-[85%] ml-10 mt-10`}>Kuldeep Kushwaha, a B.Tech student specializing in full stack development, passionate about creating innovative and user-friendly web applications.</p>

                </div>
                <div className={`col-span-4 text-center`}>
                    <h2 className={`font-semibold text-xl mt-4`}>Supports</h2>
                    <h3 className={`mt-8`}>
                        FAQ
                    </h3>
                    <h3 className={`mt-3`}>
                        Help
                    </h3>
                    <h3 className={`mt-3`}>
                        Contact
                    </h3>
                </div>
                <div className={`col-span-4 ml-16`}>
                    <h2 className={`font-semibold text-xl mt-4`}>Contact Us</h2>
                    <h3 className={`mt-8 flex`}>
                        <BsPhone size={20}/> +91 7007 83 4160
                    </h3>
                    <h3 className={`mt-3 flex`}>
                        <BiMailSend size={23}/> kkvipp2@gmail.com
                    </h3>


                </div>


            </div>



        </div>

    );
}

export default Footer;