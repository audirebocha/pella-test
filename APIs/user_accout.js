import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import frontend_URL from '../config.js'

//Models
import users from '../Models/users.js'



const router=express.Router()
router.use(express.json())
router.use(bodyParser.json())
router.use(cors({
    origin:[frontend_URL],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

router.get('/',async (req,res)=>{
    res.json({message:"Hello from backend"})
})


router.post("/user_login",async (req,res)=>{
    var data=req.body;
    //Check if the user is in the database
    var user_check= await users.find({email:data['email']})
    //If its in the databse return welcom back message
    if(user_check.length){
        res.json({message:"Welcome back"})
    }
    //If its not in the database put it into the database
    else{
        var new_user=new users({email:data['email'],display_name:data['displayName'],photoURL:data['photoURL'],organisations:{name:data['displayName']+"'s Org",farms:{name:"Farm A"}}})
        var saved_data=await new_user.save()
        //Create the organisations database
        console.log(saved_data)
        res.json({message:"Welcome!"})
    }
})


router.post("/org_data",async (req,res)=>{
    var data=req.body;
    //find the organisations under this body
    var query_data=await users.find({email:data['email']})
    if(query_data.length){
        console.log(query_data)
        res.json({data:query_data[0]['organisations']})
    }else{
        res.json({message:"Nothing here"})
    }

})


router.post('/account_organisations',async (req,res)=>{
    res.json({message:"Hello from backend"})
})


export default router