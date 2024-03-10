const mongoose= require("mongoose")
const dataSchema=mongoose.Schema({
    Firstname:{type:String},
    Lastname:{type:String},
    Emailaddress:{type:String},
    Cityname:{type:String},
    Username:{type:String,unique: true},
    Password:{type:String}

},{ timestamps: true,versionKey: false })

const profileModel=mongoose.model('profile',dataSchema)

module.exports = profileModel
