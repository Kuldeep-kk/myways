import {NextResponse} from "next/server";
import {User} from "@/models/user";
import {connectDb} from "@/helper/db";
connectDb();

export const GET=async (request,{params})=>{
    const {usersId}=params;
    try{
        const user=await User.findById(usersId).select("-password");
        return NextResponse.json(user);
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({
            message:"error occurs during getting user details",
            success:"false",
        });

    }

}
export async function DELETE(request,{params}){

    const { usersId }=params;
    try {
        await User.deleteOne({
            _id:usersId
        });
        return NextResponse.json({
            message:"User Deleted",
            success:"true",
        })
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({
            message:"error occurs during deleting user",
            success:"false",
        });

    }


}
export const PUT=async (request,{params})=>{
    const { usersId }=params;
    const {name,password,hint,profileIsMale}= await request.json();
    try{
        const user=await User.findById(usersId);
        user.name=name;
        user.password=password;
        user.hint=hint;
        user.profileIsMale=profileIsMale;

        const updatedUser=await user.save();
        return NextResponse.json(updatedUser);
    }
    catch (e) {
        return NextResponse.json({
            message:"error occurs during updating user",
            success:"false",
        });


    }

}