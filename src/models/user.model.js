import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)


// mongoose hook to encrypt password when password is saved
userSchema.pre("save", async function (next) {

    // if password is modified only then hash the pass else return next
    if(!this.isModified("password")) return next();

    // encrypt password field , bcrypt.hash(field, no of rounds to hash pass )
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// adding mongoose custom property(method) to check password is correct or not  
userSchema.methods.isPasswordCorrect = async function(password){
    // bcrypt library compare method, compare passed string password and this.password(saved password)
    return await bcrypt.compare(password, this.password)
}


// generate Access Token(JWT)
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        // secret (key) for generating JWT access token
        process.env.ACCESS_TOKEN_SECRET,
        {
            // expiry of Access Token
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// generate Referesh Access Token(JWT)
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)