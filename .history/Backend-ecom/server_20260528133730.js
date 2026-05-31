const app=require('./src/app')
const conne

connectDB();

app.listen(3000,()=>{
    console.log("server running on port 3000")
})