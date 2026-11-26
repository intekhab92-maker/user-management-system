import jwt from "jsonwebtoken"
import pool from "../config/db.js"


export const middleware = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(400).json({
                message: "Unauthorized, token not provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await pool.query('SELECT user_id, name, email FROM users WHERE user_id=$1',
            [decoded.id]
        )

        if(user.rows.length === 0){
            return res.status(400).json({message: "not authorized, not found"})
        }

        req.user = user.rows[0]
        next()

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "inavlid user"
        })
    }
}