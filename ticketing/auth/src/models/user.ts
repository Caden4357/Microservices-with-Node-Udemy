import mongoose, { Schema, model } from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
    email: string;
    password: string;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    createdAt: Date;      // make timestamps explicit
    updatedAt: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false, // optional: removes __v entirely
        toJSON: {
            virtuals: true, // also exposes the default virtual id getter
            transform(_doc, ret) {
                // Loosen the type for mutation/cleanup:
                const r = ret as any;
                r.id = r._id?.toString?.() ?? r._id;
                delete r._id;
                delete r.password;
                delete r.createdAt;
                delete r.updatedAt;
                return r;
            },
        },
    }
);

// use function() for correct `this` binding
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    next();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc, UserAttrs, UserModel };
