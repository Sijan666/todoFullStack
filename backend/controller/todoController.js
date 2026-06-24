const Todo = require('../model/todoModel')

// to create tasks
const createTodo = async (req,res) => {
    const {task,status,priority} = req.body

    // conditions to match
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

    await todo.save()
    res.send({
        success:true,
        message:"Todo created"
    })
}

// showing all tasks
const allTodos = async (req,res) => {
    let data = await Todo.find({})
    res.send({
        success : true,
        message : "collected",
        data : data
    })
}

// to delete tasks
const deleteData = async (req,res) => {
    const {id} = req.params
    let deleteTodo = await Todo.findByIdAndDelete(id)
    res.send({
        success : true,
        message : "Todo deleted",
    })
}

// to update tasks
const updateData = async (req,res) => {
    const {id} = req.params
    let updateTodo = await Todo.findByIdAndUpdate({_id:id},req.body)
    res.send({
        success : true,
        message : "Todo Updated",
    })
}

module.exports = {createTodo , allTodos , deleteData , updateData}
