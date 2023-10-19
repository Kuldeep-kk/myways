import { getResponseMessage } from "@/helper/getResponseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const GET=async(request,{params})=>{
    const{usersId}=params;
    

    try{
        const tasks=await Task.find({
            userId:usersId
        });
        return NextResponse.json(tasks);
    }
    catch(e){
        console.log(e);
        return getResponseMessage("Failed to get Task",404,false);
    }

}