


const express = require('express');
const app=express();
const cors= require('cors');
// const bcrypt= require('bcrypt');
const Note =require('./models/note.model')
const config =require('./config.json');
const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
mongoose.connect(config.connectionString);

require('dotenv').config();
const jwt=require("jsonwebtoken");
const {authenticateToken} =require('./utilities')


const User =require('./models/user.model')
const PORT =process.env.PORT || 3000; 

app.use(express.json())


app.use(
    cors({
        origin:"*",
    })
)


// app.get('/' , (req,res ) =>{
//     res.json({data :"hello"});
// })

app.post('/create-account' ,async(req,res) =>{
    const {fullName ,email ,password} =req.body;
    if(!fullName){
        return res.status(400)
        .json({
            error:true,
            message:"fullName is required"
        })
    }
    if(!email){
        return res.status(400)
        .json({
            error:true,
            message:"email is required"
        })
    }
    if(!password){
        return res.status(400)
        .json({
            error:true,
            message:"password is required"
        })
    }

    const isUser = await User.findOne({email :email})
 if(isUser){
    return res.json({
        error:true,
        message:'User already exists'
    })
 }

//  const hashedpassword =bcrypt.hash(password,10);

 const user= new User (
    {
        fullName,
        email,
        password
    }
 );
 await user.save();

 const accessToken =jwt.sign({user} ,
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:'36000m',
    }
 )
 return res.json({
    error:false,
    user,
    accessToken,
    message:"Registration successfull",

 })
})

 

app.post('/login' ,async(req,res) =>{
     
    const {email,password} =req.body;

    if(!email){
        return res.status(400).json({
            success:false,
            message:' email is required'
        })
    }

    if(!password){
        return res.status(400).json({
            success:false,
            message:'  password is required'
        })
    }
    const userInfo =await User.findOne({email :email})

    if(!userInfo){
        return res.status(400).json({
            success:false,
            message:"User not exists"
        })
    }

    if(userInfo.email ==email && userInfo.password ==password){
        const user ={user :userInfo};
         const accessToken =jwt.sign(user ,process.env.ACCESS_TOKEN_SECRET ,{
            expiresIn:'36000m'
         })
         return res.json({
            error:false,
            message:'Login succesfull',
            email,
            accessToken,
         })

    }
    else{
        return res.status(400).json({
            error:true,
            message:"Invalid credentials"
        })
    }
})


// app.post('/create-account', async (req, res) => {
//     const { fullName, email, password } = req.body;

//     if (!fullName) {
//         return res.status(400).json({
//             error: true,
//             message: "Full name is required"
//         });
//     }
//     if (!email) {
//         return res.status(400).json({
//             error: true,
//             message: "Email is required"
//         });
//     }
//     if (!password) {
//         return res.status(400).json({
//             error: true,
//             message: "Password is required"
//         });
//     }

//     const isUser = await User.findOne({ email: email });
//     if (isUser) {
//         return res.status(409).json({
//             error: true,
//             message: 'User already exists'
//         });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//         fullName,
//         email,
//         password: hashedPassword
//     });
//     await user.save();

//     const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '3d',
//     });

//     return res.status(201).json({
//         error: false,
//         user: { id: user._id, fullName: user.fullName, email: user.email },
//         accessToken,
//         message: "Registration successful",
//     });
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email) {
//         return res.status(400).json({
//             error: true,
//             message: 'Email is required'
//         });
//     }

//     if (!password) {
//         return res.status(400).json({
//             error: true,
//             message: 'Password is required'
//         });
//     }

//     const userInfo = await User.findOne({ email: email });

//     if (!userInfo) {
//         return res.status(404).json({
//             error: true,
//             message: "User does not exist"
//         });
//     }

//     const isPasswordValid = await bcrypt.compare(password, userInfo.password);
//     if (!isPasswordValid) {
//         return res.status(401).json({
//             error: true,
//             message: "Invalid credentials"
//         });
//     }

//     const accessToken = jwt.sign({ userId: userInfo._id }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '3d'
//     });

//     return res.status(200).json({
//         error: false,
//         message: 'Login successful',
//         user: { id: userInfo._id, fullName: userInfo.fullName, email: userInfo.email },
//         accessToken,
//     });
// });
//getUser
app.get('/get-user',authenticateToken,async(req,res) =>{
    const {user} =req.user;
    const isuser= await User.findOne({_id :user._id})
    if(!user){
        return res.status(401).json({
            success:false,
            message:"user not found"
        })
    }
    return res.status(200).json({
        user:{ fullName: isuser.fullName
             ,email :isuser.email ,
             _id :isuser._id , 
             createdAt:isuser.createdAt},
        message:'user details'
    })
})

app.post('/add-note' ,authenticateToken ,async(req,res) =>{
 
    const {title ,content ,tags} =req.body;
    const {user} =req.user;

    if(!title){
        return res.status(400).json({
            error:true,
            message:'Title is required'
        })
    }
    if(!content){
        return res.status(400).json({
            error:true,
            message:'Content is required'
        })
    }

      try{
        const note =new Note({
            title,
            content,
            tags:tags ||[],
            userId:user._id,
        })

        await note.save();

        return res.status(200).json({
            error:false,
            note,
            message:"note added successfully"
        })

      }
      catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        })
      }

})

app.put('/edit-note/:noteId' ,authenticateToken ,async(req,res) =>{
        const noteId=req.params.noteId;
        const {title,content,tags,isPinned} =req.body;
        const {user} =req.user;

    //     console.log(`Received request to edit note with ID: ${noteId}`);
    // console.log(`User ID from token: ${user._id}`);

        if(!title && !content && !tags){
            return res.status(400).json({
                error:true,
                message:"No chnages provided",
            })
        }

        try{
            const note =await Note.findOne({_id:noteId ,userId:user._id});

            if(!note){
                // console.log(`Note not found or user is not authorized. Note ID: ${noteId}, User ID: ${user._id}`);
                return res.status(404).json({
                    error:true,
                    message:"Not FOund"
                })
            }
            // console.log(`Note found: ${note}`);
           
            if(title){
                note.title=title;
            }
            if(content){
                note.content=content;
            }
            if(tags){
                note.tags=tags;
            }
            if(isPinned){
                note.isPinned=isPinned;
            }

            
            await note.save();

            return res.json({
                error: false,
                note,
                message:"Note updated sucessfully"
            })
        }
        catch(error){
            console.log("error in edit note" ,error);
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }

})


app.get('/get-all-notes' ,authenticateToken ,async(req,res)=>{


    const {user} =req.user;
    try{

        const notes =await Note.find({userId :user._id})
            .sort({isPinned:-1})

            if(notes.length==0){
                return res.json({
                    message:'please add some notes'
                })
            }

            return res.status(200).json({
                success:true,
                notes,
                message:'ALl notes retreived'
            })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
})


app.delete('/delete-note/:noteId' ,authenticateToken ,async(req,res) =>{
  
    const noteId =req.params.noteId;
    const {user} =req.user;
    try{
        const note =await Note.findOne({_id:noteId ,userId:user._id})

        if(!note){
            return res.status(404).json({
                success:false,
                message:"Note not found"
            })
        }
        await Note.deleteOne({_id:noteId ,userId:user._id})
        return res.status(200).json({
            success:true,
            message:"Notes deleted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }

  
})

///update isPinned
// app.put('/update-note-pinned/:noteId' ,authenticateToken ,async(req,res) =>{
//     const noteId=req.params.noteId;
//     const {title,content,tags,isPinned} =req.body;
//     const {user} =req.user;

//     console.log(`Received request to edit note with ID: ${noteId}`);
// console.log(`User ID from token: ${user._id}`);

//     try{
//         const note =await Note.findOne({_id:noteId ,userId:user._id});

//         if(!note){
//             console.log(`Note not found or user is not authorized. Note ID: ${noteId}, User ID: ${user._id}`);
//             return res.status(404).json({
//                 error:true,
//                 message:"Not FOund"
//             })
//         }
//         // console.log(`Note found: ${note}`);
       
        
//         if(isPinned){
//             note.isPinned = isPinned ;
//         }

        
//         await note.save();

//         return res.json({
//             error: false,
//             note,
//             message:"Note updated sucessfully"
//         })
//     }
//     catch(error){
//         console.log("error in edit note" ,error);
//         return res.status(500).json({
//             success:false,
//             message:"Internal server error"
//         })
//     }

// })


// app.get('/search-notes' ,authenticateToken ,async(req,res) =>{
     

//     const {user} =req.user;
//     const {query} = req.query;

//     if(!query){
//         return res.status(400).json({
//             error:true,
//             message:'Search query is required'
//         })
//     }
//     try{ 
       
//         const matchingNotes =await Note.find({
//             userId: user._id,
//             $or : [
//                 {
//                     title :{$regex :new RegExp(query , "i")}
//                 },
//                 {
//                     content :{ $regex : new RegExp(query , "i")}
//                 }
//             ],
//         });

//         return res.json({
//             error:false,
//             notes:matchingNotes,
//             message:"Notes matching the search query retrieved successfully"
//         })
//     }
//     catch(error){
//         console.log("error in edit note" ,error);
//         return res.status(500).json({
//             success:false,
//             message:"Internal server error"
//         })
//     }

// })


//chat
app.get('/search-notes', authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            error: true,
            message: 'Search query is required'
        });
    }

    try {
        // Sanitize the query to escape special characters
        const sanitizedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(sanitizedQuery, "i") } },
                { content: { $regex: new RegExp(sanitizedQuery, "i") } }
            ]
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully"
        });
    } catch (error) {
        console.log("Error in search notes:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
});



app.listen(PORT ,(req,res) =>{
    console.log(`app is listening on http://localhost:${PORT}`)
})
