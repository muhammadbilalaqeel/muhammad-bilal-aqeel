const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least of 3 characters"],
    maxlength: [20, "Name must be less than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    minlength:[6,"Password must be at least of 6 characters"],
    maxlength:[40,"Name must be less than 40 characters"],
    select:false
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
}, { timestamps: true });


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword;
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


const USER = mongoose.model("USER", userSchema);

module.exports = USER;
