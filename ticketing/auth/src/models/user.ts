import mongoose, { Schema, model } from "mongoose";
import { Password } from "../services/password";

// because were using typescript this interface is to describe the properties needed to create a new user 
interface UserAttrs {
    email: string,
    password: string
}

// interface that describes what a user model should have
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}
//  interface that decsribes what a user document should have
interface UserDoc extends mongoose.Document {
    email: string,
    password: string
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps:true})


userSchema.pre('save', async function(next){
    // this is essentially running on sign up so it doesnt run on account update if we ever implement that feature 
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    next();
}) 

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}


const User = model<UserDoc, UserModel>('User', userSchema);

export { User };