import {Task} from "@/models/task";
import {NextResponse} from "next/server";
import {getResponseMessage} from "@/helper/getResponseMessage";
export const GET=async (request,{params})=>{
    const {taskId}=params;
    try {
        const task=await Task.findById(taskId);
        return NextResponse.json(task);
    }
    catch (e) {
        return getResponseMessage("failed to get detail of task",404,false);
    }
}
export const PUT=async (request,{params})=>{
    const {taskId}=params;
    try{
        const {title,content,status}=await request.json();
        let task=await Task.findById(taskId);
        (task.title=title),(task.content=content),(task.status=status);
        const updateTask=await task.save();
        return NextResponse.json(updateTask);

    }
    catch(e){
        console.log(e);
        return getResponseMessage("failed to update task",501,false);

    }
}
export const DELETE=async (request,{params})=>{
    const {taskId}=params;
    try{
        await Task.deleteOne({
            _id:taskId,
        });
        return getResponseMessage("Deleted",200,true);
    }
    catch(e){
        console.log(e);
        return getResponseMessage("failed to delete task",404,false);
    }
}

