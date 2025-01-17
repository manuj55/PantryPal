const mongoose = required("moongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected auth Service: ${connect.connection.host}`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;