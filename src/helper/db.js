import mongoose from "mongoose";

const config={
    isConnected:0,
}
export const connectDb=async ()=>{
    if(config.isConnected){
        return
    }
    try{
        const {connection}= await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:'todos',
        });
        console.log('db comnnected');
        console.log(connection.readyState);
        config.isConnected=connection.readyState;
        //console.log(connection);

        //testing create new user
        /*
        const cuser=new User({
            name:"Kuldeep kushwaha",
            email:"kk@gmail.com",
            password:"kk1234",
            hint:"kk1234",

        })
        await cuser.save();*/






    }
    catch (error) {
        console.log('failed to connect to db');
        console.log(error);

    }

}