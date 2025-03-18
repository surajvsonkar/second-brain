import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import z from 'zod'
import { User, Tag, Link, Content } from './db';
const app = express();
import {JWT_KEY} from './config'
import { userMiddleware } from './middleware';

app.use(express.json());




app.post('/api/v1/signup', async (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
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
			} catch (error) {
				res.status(500).json(error);
			}
		}
	} else {
		res.status(411).json('enter the required fields.');
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

app.get('/api/v1/content', (req, res) => {});

app.delete('/api/v1/content', (req, res) => {});

app.post('/api/v1/brain/share', (req, res) => {});

app.get('/api/v1/brain/:sharedLink', (req, res) => {});

app.listen(4000, () => {
	console.log('server is listening on port 4000');
});
