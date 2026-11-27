import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../config/db.js"
import { middleware } from "../middleware/auth.js"


const router = express.Router()


const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const generateToken = (id) => {
  return jwt.sign({ id }, 
    process.env.JWT_SECRET,
     { expiresIn: "30d" });
};


// register user
router.post("/register", async (req, res)=> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
     return res.status(400).json({
        message: "provide all the fields",
      });
    }

    const isUserExist = await pool.query('SELECT * FROM users WHERE email= $1', [email]);

    if(isUserExist.rows.length > 0){
        return res.status(400).json({
            message: "user already exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = await pool.query(
        'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING user_id, name, email',
        [name, email, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].user_id)
    res.cookie('token', token, cookieOptions)

    res.status(201).json({user: newUser.rows[0]})
});


//login
router.post("/login", async(req, res)=> {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "please provide email and password"})
    }

    const user = await pool.query('SELECT * FROM users WHERE email=$1', [email])

    if(user.rows.length === 0){
        return res.status(400).json({message: "Invalid Credentials"})
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password)

    if(!isMatch){
        return res.status(400).json({message: "Invalid Credentials"})
    }

    const token = generateToken(userData.user_id)

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
        user: {id: userData.user_id, username: userData.name, email: userData.email}
    })
})
    
// getuser
router.get("/getme", middleware, async(req, res)=>{
    res.json(req.user)
})


//logout
router.get("/logout", (req, res)=>{
    res.cookie('token', '', {...cookieOptions, maxAge: 1})
    res.json({message: "Logout Successfully"})
})

export default router;
