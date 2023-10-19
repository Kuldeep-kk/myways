"use client";
import React, { useContext, useEffect, useState } from 'react';
import { deleteTask, showTask } from "@/services/taskServices";
import UserContext from "@/context/userContext";
import Task from "@/components/Task";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Page = () => {
  const context = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

  async function loadTasks(userId) {
    try {
      const task = await showTask(userId);
      setTasks(task);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  const deleteTaskParent = async (taskId) => {
    try {
      const result = await deleteTask(taskId);
      const updatedTask = tasks.filter((item) => item._id !== taskId);
      setTasks(updatedTask);
      toast.success("Task is deleted");
    } catch (e) {
      console.log(e);
      toast.error("Error on deleting task");
    }
  }

  const confirmDelete = () => {
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
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        );
      }
    });
  }

  return (
      <div className="grid grid-cols-12">
        <div className="col-span-6 col-start-4">
          <h2 className="text-2xl font-bold">Total Task: {tasks.length}</h2>
          <div className="h-96 overflow-y-auto">
            <ul>
              {tasks.map((task) => (
                  <Task key={task._id} data={task} deleteTaskParent={deleteTaskParent} />
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Page;
