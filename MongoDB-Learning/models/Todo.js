
const mongoose= require("mongoose");
const TodoSchema = new mongoose.Schema({
    title:String,
    desc:String,
    isdone: Boolean,
    age:Number, 
    math_func:Number
});

const TodoSchema2= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    isdone:{
        type:Boolean,
        default:false
    },
    age:{
        type:Number,
        required:true
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = { Todo };

//similarly
const todo2=mongoose.model('Todo2', TodoSchema2);
module.exports={todo2};










