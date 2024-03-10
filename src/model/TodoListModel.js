const mongoose= require("mongoose")
const dataSchema=mongoose.Schema({
    Username:{type:String},
    TodoSubject:{type:String},
    TodoDescription:{type:String},
    TodoStatus:{type:String,default:"new"},
    TodoCreateDate:{type:Date,default:Date.now},
    TodoUpdateDate:{type:Date,default:Date.now},

},{ timestamps: true,versionKey: false })

const TodoListModel=mongoose.model('TodoList',dataSchema)

module.exports = TodoListModel