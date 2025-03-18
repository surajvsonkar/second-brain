import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {z} from 'zod'
import { User, Tag, Link, Content } from './db';
const app = express();
import {JWT_KEY} from './config'
import { userMiddleware } from './middleware';
import { ContextExclusionPlugin } from 'webpack';

app.use(express.json());


const userSchema = z.string().min(3).max(10)
const passwordSchema = z.string().min(8, {message: "password must be atleast 8 characters"}).max(20, {message: "password must not be more than 20 characters"}).regex(/[A-Z]/, {message: "password must have atleast 1 uppercase letter"}).regex(/[a-z]/, {message: "password must have atleast 1 upper case letter"}).regex(/[0-9]/, {message: "password must containt atleast 1 number"}).regex(/[^a-zA-Z0-9]/, {message: "password must contain atleast 1 special character"})

app.post('/api/v1/signup', async (req, res) => {
	const { username, password } = req.body;
	const validUsername = userSchema.safeParse(username)
	const validPassword = passwordSchema.safeParse(password)
	if (validUsername.success == true && validPassword.success == true) {
		const existingUser = await User.findOne({ username });
        console.log(existingUser)
		if (existingUser) {
			res.status(403).json('user already exists');
			return;
		} else {
			try {
            
                const hashedPassword = await bcrypt.hash(password, 10)
				const newUser = await User.create({
					username: username,
					password: hashedPassword
				});
				res.status(200).json("user created successfully")
				return;
			} catch (error) {
				res.status(500).json(error);
			}
		}
	} else {
		res.status(411).json({
			err: validUsername.error, 
			err2: validPassword.error});
	}
});

app.post('/api/v1/signin', async(req, res) => {
    const {username, password} = req.body
    if(username && password) {
        const user = await User.findOne({username})
        // console.log(user.password)
		// @ts-ignore
        const hashedPassword = await bcrypt.compare(password,user.password)
        
        if(hashedPassword) {
			const token = jwt.sign({
				// @ts-ignore
				id: user._id
			}, JWT_KEY);
			res.status(200).json({
				msg: 'user logged in successfully',
				token: token,
			});
        } else {
            res.status(403).json("username and password isn't matching")
        }
    } else {
        res.json("enter the required fields")
    }

});

app.post('/api/v1/content',userMiddleware, async(req, res) => {
	const link = req.body.link
	const title = req.body.title
	const type = req.body.type

	try {
		await Content.create({
			title,
			link,
			type,
			// @ts-ignore
			userId: req.userId,
			tags: []
		})
	
		res.status(200).json({
			msg: "content added successfully"
		})
	} catch (error) {
		res.status(404).json(error)
		
	}
});

app.get('/api/v1/content',userMiddleware, async(req, res) => {
	// @ts-ignore
	const userId = req.userId
	const userContent = await Content.find({
		userId
	}).populate("userId", "username")
	res.json({userContent})
});

app.delete('/api/v1/content',userMiddleware, async(req, res) => {
	const contentId = req.body.contentId

	try {
		await Content.deleteMany({
			_id: contentId,
			// @ts-ignore
			userId: req.userId
		})
		
		res.status(200).json("content deleted!")
	} catch (error) {
		res.status(404).json(error)
	}

});

app.post('/api/v1/brain/share', (req, res) => {

});

app.get('/api/v1/brain/:sharedLink', (req, res) => {});

app.listen(4000, () => {
	console.log('server is listening on port 4000');
});
