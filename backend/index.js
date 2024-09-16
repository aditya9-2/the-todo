import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';
import { UserModel, TodoModel } from './db.js';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGOOSE_CONNECT_URL);
const JWT_SECRET = process.env.JWT_SECRET;


app.post('/signup', async (req, res) => {

    const signUpZodSchema = z.object({

        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "password should minimum of 6 characters")

    });

    try {
        const { name, email, password } = signUpZodSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 5);

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "email aleardy exists"
            })

        }

        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        return res.status(200).json({
            message: "user created sucessfully"
        })

    } catch (err) {

        if (err instanceof z.ZodError) {

            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors
            });
        }

        return res.status(500).json({
            message: "Server error, please try again later."
        });

    }
})


app.post('/signin', async (req, res) => {

    const signINZodObject = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6)
    });



    try {

        const { email, password } = signINZodObject.parse(req.body);

        const user = await UserModel.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message: "email not exists"
            });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (user && passwordMatched) {

            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_SECRET);

            return res.status(200).json({
                token
            });
        }

    } catch (err) {

        if (err instanceof z.ZodError) {

            return res.status(400).json({
                message: "Incorrect credentials",
                errors: err.errors
            });
        }

        return res.status(500).json({
            message: "server error, try again later"
        })

    }
});

app.get('/todos', (req, res) => {

})

app.post('/todo', (req, res) => {

})

app.put('/todo', (req, res) => {

})

app.delete('/todo', (req, res) => {

})

app.listen(port, () => {

    console.log(`app listens on http://localhost:${port}`);
})