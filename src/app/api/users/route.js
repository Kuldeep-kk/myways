import {NextResponse} from "next/server";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {connectDb} from "@/helper/db";
import {User} from "@/models/user";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import {uploadPhoto} from "@/app/api/cloudImage/route";


connectDb();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET

});



export async function GET(request){
   /* const users=[
        {
        name:"kuldeep",
        phone:'123',
        course:'java',
        },
        {
            name:"deepak",
            phone:'123',
            course:'cpp',
        },
        {
            name:"arvind",
            phone:'123',
            course:'react',
        }
    ];
    return NextResponse.json(users);*/

    let users=[];
    try {
        users=await User.find().select("-password");
        console.log(users);
    }
    catch (e) {
        return NextResponse.json({
            message:"Failed to get users",
            success:"false"
        })
    }
    return NextResponse.json(users);

}

export async function POST(request){
    //const body=request.body;
    //console.log(body);
    //console.log(request.nextUrl.pathname);
    //console.log(request.nextUrl.searchParams);
   // const jsonData=await request.json();
   // console.log(jsonData);

    //return NextResponse.json({
    //    message:"posting user Data",
    //})

    const {name,email,password,hint,profileIsMale,imgDataURL}= await request.json();

    const ImageData=await  uploadPhoto(imgDataURL);

    console.log(ImageData);

    const user= await new User({
        name,
        email,
        password,
        hint,
        profileIsMale,
        public_id:ImageData.public_id,
        secure_url:ImageData.secure_url
    });
    try {

        user.password= bcrypt.hashSync
        (user.password, parseInt(process.env.BCRYPT_SALT));
        console.log(user);



        const createdUser=await user.save();
        const response= NextResponse.json(user,{
            status:201,
        });
        return response;

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({

            message:"failed to create user!!",
            status:false,
        })

    }



}
