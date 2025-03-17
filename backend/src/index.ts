import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const { User, Tag, Link, Content } = require('./db');
const app = express();
const jwtSecret = "suraj";

app.use(express.json());




app.post('/api/v1/signup', async (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
		const existingUser = await User.findOne({ username });
        console.log(existingUser)
		if (existingUser) {
			res.json('user already exists');
			return;
		} else {
			try {
            
                const hashedPassword = await bcrypt.hash(password, 10)
				await User.create({
					username: username,
					password: hashedPassword
				});
				const token = jwt.sign({ username }, jwtSecret);
				res.status(200).json({
					msg: 'user is created successfully',
					token: token,
				});
			} catch (error) {
				res.status(404).json(error);
			}
		}
	} else {
		res.json('enter the required fields.');
	}
});

app.post('/api/v1/signin', async(req, res) => {
    const {username, password} = req.body
    if(username && password) {
        const user = await User.findOne({username})
        console.log(user.password)
        const hashedPassword = await bcrypt.compare(password,user.password)
        
        if(hashedPassword) {
            res.status(200).json("user loggedin successfully")
        } else {
            res.status(403).json("username and password isn't matching")
        }
    } else {
        res.json("enter the required fields")
    }

});

app.post('/api/v1/content', (req, res) => {});

app.get('/api/v1/content', (req, res) => {});

app.delete('/api/v1/content', (req, res) => {});

app.post('/api/v1/brain/share', (req, res) => {});

app.get('/api/v1/brain/:sharedLink', (req, res) => {});

app.listen(4000, () => {
	console.log('server is listening on port 4000');
});
