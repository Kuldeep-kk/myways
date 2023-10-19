"use client";
import React, {useContext, useState} from 'react'
import styles from './addtask.module.css';
import formImg from '../../../public/Images/formGif.gif';
import Image from 'next/image';
import {addTask} from "@/services/taskServices";
import {toast} from "react-toastify";
import UserContext from "@/context/userContext";




const page = () => {
    const context=useContext(UserContext);


    const [task,setTask]=useState({
        title:"",
        content:"",
        status:"none",
        userId:context.user?context.user._id:"",
    });

    const handleAddTask=async (event)=>{
        event.preventDefault();


        try {
            const result=await addTask(task);
            console.log(result);
            toast.success("Task added!!!",{
                position:"top-center"
            });
            setTask({
                title:"",
                content:"",
                status:"none",
            });


        }
        catch (e) {
            console.log(e);
            toast.success("fail to add task !!!",{
                position:"top-center"
            });
        }
    }
  return (
    <div className=' grid grid-cols-12 mb-32'>
    <div className='col-span-5 col-start-2 '>
    <Image src={formImg} className='w-[70%] m-auto ' alt={"task image"} priority/>
        
    </div>
    <div className='col-span-5  '>
    <form className={`${styles.form}`} onSubmit={handleAddTask}>
        <h1 className='text-center font-bold text-lg'>
          Add Your Task Here
        </h1>
        <input type='text' placeholder='Enter Title Here'
               name="task_title"
               onChange={(event)=>{
                   setTask({
                       ...task,
                       title:event.target.value,
                   });
               }}
               value={task.title}
               required
        />
        <textarea  placeholder='Enter Description Here !!!'
                   name="task_content"
                   onChange={(event)=>{
                       setTask({
                           ...task,
                           content:event.target.value,
                       });
                   }}
                   value={task.content}
                   required
        />
        <select
                name="task_status"
                onChange={(event)=>{
                    setTask({
                        ...task,
                        status:event.target.value,
                    });
                }}
                value={task.status}>
          <option disabled  value="none">Choose Task Status... </option>
          <option value="pending" >Pending</option>
          <option value="completed">Completed</option>
        </select>
        <div className=' text-center mt-10 gap-5' >
        <input type='submit' value={"Submit"}/>
        <button className={`${styles.clearButton} ml-4`} onClick={()=>{
            setTask({
                title:"",
                content:"",
                status:"none",

            })
        }}>Clear</button>
        </div>

        </form>
        
      
    </div>

    


    </div>
  )
}

export default page