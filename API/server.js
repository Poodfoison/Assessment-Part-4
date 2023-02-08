import express, {application} from "express"
import bodyParser from "body-parser"
import { uid } from 'uid';
import  bcrypt  from  "bcryptjs"
import { connectDatabase } from "./pool.js"
import { generateJWT } from "./jwt/jwtGenerator.js"
import { auth } from "./middleware/auth.js"
import cors from "cors"

const PORT = 8000
const app = express()
const pool = connectDatabase()


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/users', async(req,res) =>{
    try {
        const data = await pool.query(`
        SELECT * FROM users
        `)
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
})


app.post('/register', async (req, res) => {
    try {

        const {username,password,firstname,lastname} = req.body

        const user = await pool.query(`SELECT * FROM users WHERE
        username = $1`, [username])

        if (user.rows.length > 0) {
            res.status(401).send({msg:"Username already in use"})
        }
        else  { 

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);
        
        let newUID = uid()
   
        const newUser = await pool.query(`
        INSERT INTO users (userid, username, password, firstname, lastname)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [newUID, username, bcryptPassword, firstname, lastname])

            

        const token = generateJWT(newUser.rows[0])

        res.json({ token })
    }
} catch (error) {

        console.log(error.message)
        res.status(500).send(error.message)
    }

})


app.post('/login', async (req, res) => {
    try {


        const { username, password } = req.body

        const user = await pool.query(`SELECT * FROM users WHERE
        username = $1`, [username])

        if (user.rows.length <= 0) {
            res.status(401).send({msg:"Invalid User"})
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            return res.status(401).json({msg:"Password incorrect"})
            
        }

        const token = generateJWT(user.rows[0])
        res.json({ token })

    } catch (error) {
        console.log(error.message)
        }

    });


    app.get('/account', auth, async(req,res) =>{
        try {
            
            const account = await pool.query(`
            SELECT firstname, lastname FROM users
            WHERE userid = $1
            `,[req.users.userid])
            res.json(account.rows)
    
        } catch (error) {
            console.log(error.message)
    
    
            }
    
    })     


    app.get('/contacts', auth, async(req,res) =>{
        try {
            
            const account = await pool.query(`
            SELECT userid,firstname, lastname FROM users`,)
            res.json(account.rows)
    
        } catch (error) {
            console.log(error.message)
    
    
            }
    
    })     




  
    
    app.post('/messages', auth, async (req, res) => {
        try {
            const { message } = req.body

            const d = new Date();
            let date = d.toString();
            let newUID = uid()
    
            const newMessage = await pool.query(`
            INSERT INTO messages (messageid, message, time, senderid ) VALUES
            ($1,$2,$3,$4) RETURNING *
            `, [newUID, message, date, req.users.userid])
    
            res.json("Message sent");
        } catch (error) {
    
        }
    })
    


    app.get('/recieved', auth, async (req, res) => {
        try {
            const messages = await pool.query(`
            SELECT message, time, firstname, lastname  FROM messages
            INNER JOIN users
            ON users.userid = messages.senderid
            `)
    
    
            res.json(messages.rows)
    
        } catch (error) {
            console.error(error.message);
        }
    })
    

pool.connect((err)=>{
    if (err){
        console.log(err.message)
    }
    else{
        app.listen(PORT, () => {
            console.log("server started http://localhost:8000");
        })
    }
})