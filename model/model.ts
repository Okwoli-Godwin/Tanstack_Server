import mongoose from "mongoose";

interface Value{
    title: string,
    desc: string,
}

interface MySchema extends Value,  mongoose.Document{}

const ISchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    }
},{
    timestamps: true
})

const myModels = mongoose.model<MySchema>("api", ISchema)
export default myModels