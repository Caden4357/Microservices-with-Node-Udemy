import mongoose from "mongoose";
const startDb = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to DB');
    }
    catch (err) {
        console.error(err);
    }
}
export default startDb;