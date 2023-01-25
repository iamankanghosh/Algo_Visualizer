const mongoose = require ('mongoose');
const dotenv = require('dotenv')
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASELINK)
.then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log("error is = "+err);
})