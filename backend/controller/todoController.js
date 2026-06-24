const Todo = require('../model/todoModel')

const createTodo =async (req,res) => {
    const {task,status,priority} = req.body

    if (!task || !priority) {
        return res.send({
            success : false,
            message : 'Please fill all the field'
        })
    }

    const todo = new Todo({
        task : task,
        priority : priority
    })

    todo.save()
    res.send({
        success:true,
        message:"Todo created"
    })
}

const allTodos = async (req,res) => {
    let data = await Todo.find({})
    res.send({
        success : true,
        message : "collected",
        data : data
    })
}

const deleteData = async (req,res) => {
    const {id} = req.params
    await Todo.findByIdAndDelete(id)
    res.send({
        success : true,
        message : "Todo deleted",
    })
}

const updateData = async (req,res) => {
    const {id} = req.params
    let id = await Todo.findByIdAndUpdate({_id:id})
    res.send({
        success : true,
        message : "Todo Updated"
    })
}

module.exports = {createTodo , allTodos , deleteData , updateData}
