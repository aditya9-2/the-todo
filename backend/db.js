import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}, { timestamps: true });

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    isComplete: Boolean,

}, { timestamps: true });

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

export { UserModel, TodoModel };