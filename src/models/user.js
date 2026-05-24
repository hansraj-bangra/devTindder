const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address: " + value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong password: " + value);
            }
        }
    },
    age:{
        type:Number,
        min:18
        
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid!!")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=1024x1024&w=is&k=20&c=er-yFBCv5wYO_curZ-MILgW0ECSjt0DDg5OlwpsAgZM=",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL: " + value);
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user!"
    }
},{timestamp:true});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"Dev@Tinder$777",{expiresIn:"7d"});
    return token
}

userSchema.methods.validatePassword = async function(userPassword){
    const user = this;
    const passwordHashed = user.password;

    const isValidPassword = await bcrypt.compare(userPassword,passwordHashed);

    return isValidPassword;


}
module.exports = mongoose.model("User",userSchema);