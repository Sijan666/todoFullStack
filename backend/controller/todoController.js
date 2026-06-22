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
    
}


module.exports = {createTodo}
