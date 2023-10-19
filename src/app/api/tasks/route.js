import {Task} from "@/models/task";
import {NextResponse} from "next/server";
import {getResponseMessage} from "@/helper/getResponseMessage";
import {connectDb} from "@/helper/db";
connectDb();
export const GET=async ()=>{

    try {
        const tasks=await Task.find();
        return NextResponse.json(tasks);
    }
    catch (e) {
        return getResponseMessage("Error in getting data",404,false);

    }


}
export const POST=async (request)=>{

    const {title,content,userId,status}=await request.json();
    try {
        const task=new Task({
            title,
            content,
            userId,
            status
        });
        const createdTask=await task.save();
        return NextResponse.json(createdTask,{
            status:201,

        });
    }
    catch (e) {
        console.log(e);
        return getResponseMessage("Error in creating data",404,false);

    }

}
