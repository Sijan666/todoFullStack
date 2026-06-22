import { useState } from "react";
import axios from 'axios'


const Todo = () => {

    let [task,setTask] = useState('')
    let [priority,setPriority] = useState('')

    let handleClick = async ()=>{
        let data = await axios.post('http://localhost:5000/create/todo',{
            'task': task,
            'priority': priority
        })

        console.log(data.data.message)
    }

    let handleTaskChange = (e)=>{
        setTask(e.target.value);
    }

    let handleSelect = (e)=>{
        setPriority(e.target.value);
    }

    return (
        <>
        <div className="max-w-2xl mx-auto mt-12 bg-white p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
                Todo List
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Input Field */}
                <input type="text" onChange={handleTaskChange} placeholder="Add your task here" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl placeholder-gray-400 outline-none"/>
                {/* Select */}
                <div className="relative w-full sm:w-auto">
                    <select onChange={handleSelect} className="appearance-none px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl outline-none cursor-pointer font-medium capitalize">
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                </div>
                {/* Submit Button */}
                <button type="submit" onClick={handleClick} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm duration-200 cursor-pointer">
                    Add Task
                </button>
                
            </div>
        </div>
        </>
    )
}

export default Todo