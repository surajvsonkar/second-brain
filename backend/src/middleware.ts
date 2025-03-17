import jwt from 'jsonwebtoken'
const jwtSecret = "suraj"

const authMiddleware = (req,res,next)=> {
    const header = req.headers.authorization
    if(!header || !header.startsWith("Bearer ")){
        return res.json("wrong token")
    }

    const token = header.split(" ")[1]
    try {
        const validUser = jwt.verify(token,jwtSecret)
        if(validUser.userId) {
            req.userId = validUser.userId
            next()
        }
    } catch (error) {
        return res.status(403).json({
            msg: "invalid user"
        })
    }

}

module.exports = authMiddleware
