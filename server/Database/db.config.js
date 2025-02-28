import db from 'mongoose'
const DB_Config =async ()=>{
    try{
        const dbConnect = await db.connect(process.env.DB_URL)
        console.log("Database connected successfully");
        
    }catch(err){
        console.log(err);
        process.exit(0)
        
    }
}
export default DB_Config;