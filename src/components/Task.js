import React, {useContext} from 'react';
import { format } from 'date-fns';
import UserContext from "@/context/userContext";
import {RxCross2} from "react-icons/rx";
import Swal from "sweetalert2";


const Task = ({data,deleteTaskParent}) => {

    const context=useContext(UserContext);

    const deleteTask=(taskId)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskParent(taskId);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })




    }

    return (
        <div className={`my-3 border  p-4 ${data.status==='pending'?'border-red-500':'border-green-500'}`}>
            <div className={`flex justify-between `}>
                <h2 className={`text-xl font-bold text-gray-600`}>{data.title}</h2>
                <RxCross2 size={25} className={`text-orange-500 ease-in-out duration-300 hover:rotate-90 `} onClick={()=>{deleteTask(data._id)}}/>


            </div>
            <div>
                <p>{data.content} </p>
                <div className={`flex justify-between`}>
                <h2 className={`capitalize text-white w-24 text-center rounded ${data.status==='pending'?'bg-orange-600':'bg-green-400'}`}>{data.status}</h2>
                    <h2 className={'font-bold'}>Author:<span className={`text-blue-600`}>{context.user?.name}</span></h2>

                </div>
            </div>
            
        </div>
    );
};

export default Task;