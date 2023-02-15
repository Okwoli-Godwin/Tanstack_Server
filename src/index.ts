import express, {Request, Response} from "express"
import mongoose from "mongoose"
import cors from "cors"
import myModels from "../model/model";

const port: number = 2001;
const app = express()
app.use(express.json())
app.use(cors())


const DB_URI: string = "mongodb://localhost/apiconsumption"
const conn =  mongoose.connect(DB_URI).then(() => {
    console.log("connected succesfully")
})

//create a post

app.post("/api/createpost", async (req: Request, res: Response) => {
    const {title, desc} = req.body
    const reading = await myModels.create({
        title,
        desc
    })
    res.status(200).json({reading})
})

app.get ("/api/getpost", async (req: Request, res: Response) => {
    const gettingpost = await myModels.find()
    res.status(200).json({gettingpost})
})
//singlepost
app.get ("/api/getpost/:id", async (req: Request, res: Response) => {
    const readingsinglepost = await myModels.findById(req.params.id)
    res.status(200).json({readingsinglepost})
})

//patch
app.patch("/api/replace/:id", async (req: Request, res: Response) => {
    const {title} = req.body
    const replacePost = await myModels.findByIdAndUpdate(req.params.id, {
        title
    })
    res.status(200).json({
        replacePost
    })
})

//delete
app.delete("/api/removepost/:id", async (req: Request, res: Response) => {
    const deletingpost = await myModels.findByIdAndRemove(req.params.id)
    res.status(200).json({deletingpost})
})

app.listen(port, () => {
    console.log("Server is up and running")
})