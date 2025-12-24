require('dotenv').config();
const app = require("../backend/src/app");
const connectDB=require("../backend/src/db/db");

connectDB();

app.listen(3000,()=>{
    console.log(" Server is created at port 3000");
    
})