import { useState ,useEffect } from "react";
import axios from 'axios';

const Todo = () => {

    let [task, setTask] = useState('');
    let [priority, setPriority] = useState('');
    let [info, setinfo] = useState({});
    let [data, setData] = useState([])
    let [isUpdate,setisUpdate] = useState(false)
    let [id, setId] = useState('')

    let handleClick = async () => {
        let respone = await axios.post('http://localhost:5000/create/todo', {
            'task': task,
            'priority': priority
        });

        setinfo(respone.data);
        let todosData = await axios.get('http://localhost:5000/allTodos')
        setData(todosData.data.data);
        setTask("")
        setPriority("")
    }

    let handleTaskChange = (e) => {
        setTask(e.target.value);
    }

    let handleSelect = (e) => {
        setPriority(e.target.value);
    }

    useEffect(()=>{
        async function todos(){
            let todosData = await axios.get('http://localhost:5000/allTodos')
            setData(todosData.data.data);
        }
        todos()
    },[])

    let handleDelete = async (id) => {
        let data = await axios.delete(`http://localhost:5000/delete/${id}`)
        console.log(data);
        let todosData = await axios.get('http://localhost:5000/allTodos')
        setData(todosData.data.data);
    }

    let handleEdit = async (item) => {
        setTask(item.task)
        setPriority(item.priority)
        setisUpdate(true)
        setId(item._id)
    }

    let handleUpdate = async () => {
        let data = await axios.post(`http://localhost:5000/update/${id}`, {
            'task': task,
            'priority': priority
        })
        console.log(data);
        let todosData = await axios.get('http://localhost:5000/allTodos')
        setData(todosData.data.data);
        setTask("")
        setPriority("")
        setisUpdate(false);
        setId('');
    }

    return (
        <>
        <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
                Todo List
            </h1>
            {info.message && (
                info.success ? 
                <p></p> 
                :
                <p className="text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl mb-6 text-center font-medium shadow-sm">
                    {info.message}
                </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Input Field */}
                <input type="text" onChange={handleTaskChange} value={task}
                    placeholder="Add your task here..." 
                    className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200"/>
                {/* Select */}
                <div className="relative w-full sm:w-auto">
                    <select onChange={handleSelect} value={priority}
                        className="w-full appearance-none px-5 py-4 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl outline-none cursor-pointer font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 pr-12">
                        <option value="" disabled selected>Select Priority</option>
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
                {/* Submit Button */}
                {isUpdate ? 
                    <button type="submit" onClick={handleUpdate} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 cursor-pointer whitespace-nowrap">
                        Update Task
                    </button>                    
                    :
                    <button type="submit" onClick={handleClick} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 cursor-pointer whitespace-nowrap">
                        Add Task
                    </button>
                }
                {/* task list */}
            </div>
            {/* <ul className="mt-5">
                sir er dekhano way
                {data.map(item=>(
                    <li>{item.task} ===== {item.priority} ===== {item.status}</li>
                ))}
            </ul> */}
            <ul className="flex flex-col gap-5 mt-5">
            {data.map((item) => (
                <li key={item._id} className="grid grid-cols-4 items-center gap-10 p-3 bg-white border rounded-lg shadow-sm">
                    <span className="font-medium text-gray-800">{item.task}</span>
                    <span className="text-gray-600">{item.priority}</span>
                    <span className="text-gray-600">{item.status}</span>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-gray-500 text-white rounded-md cursor-pointer">
                            Delete
                        </button>
                        <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-gray-500 text-white rounded-md cursor-pointer">
                            Edit
                        </button>
                    </div>
                </li>
            ))}
            </ul>
        </div>
        </>
    )
}

export default Todo;