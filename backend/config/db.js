const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
// mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB Connected")
}).catch((err) =>{
    console.error(err.message);
}) 