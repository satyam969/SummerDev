
// connecting backend with database

const mongoose =require("mongoose");
// mongoose.connect("mongodb+srv://satyamtiwari87090:6WBVlOYyoKJSs1Zg@cluster0.ij0wc1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const URI=process.env.MONGODB_URI;

const connectDb=async()=>{
    try{
        // the password can not be shared so we use dotenv
        // similar to jaise json k data nhi mil rha tha yha env k nhi mil rha toh uske liye server ko compatable bnaan hoga
        await mongoose.connect(URI)
console.log("connection succesful")

    }
    catch(error){
        console.error("database not connected");
        // end the process without failure 
        process.exit(0);
    }
}

// collection is a set of related document



module.exports = connectDb;