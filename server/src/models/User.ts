import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "../entities/User.js";

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["influencer", "business", "admin"],
            default: "influencer",
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUserDocument>("User", UserSchema);
