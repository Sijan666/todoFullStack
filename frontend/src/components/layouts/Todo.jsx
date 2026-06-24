import { useState ,useEffect } from "react";
import axios from 'axios';

const Todo = () => {

    let [task, setTask] = useState('');
    let [priority, setPriority] = useState('');
    let [status, setStatus] = useState('');
    let [info, setinfo] = useState({});
    let [data, setData] = useState([])
    let [isUpdate,setisUpdate] = useState(false)
    let [id, setId] = useState('')

    let handleClick = async () => {
        let respone = await axios.post('http://localhost:5000/create/todo', {
            'task': task,
            'priority': priority,
            "status" : status
        });

        setinfo(respone.data);
        let todosData = await axios.get('http://localhost:5000/allTodos')
        setData(todosData.data.data);
        setTask("")
        setPriority("")
        setStatus("")
    }

    let handleTaskChange = (e) => {
        setTask(e.target.value);
    }

    let handleSelect = (e) => {
        setPriority(e.target.value);
    }

    let handleStatus = (e) => {
        setStatus(e.target.value);
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
        setStatus(item.status)
        setisUpdate(true)
        setId(item._id)
    }

    let handleUpdate = async () => {
        let data = await axios.post(`http://localhost:5000/update/${id}`, {
            'task': task,
            'priority': priority,
            'status' : status
        })
        console.log(data);
        let todosData = await axios.get('http://localhost:5000/allTodos')
        setData(todosData.data.data);
        setTask("")
        setPriority("")
        setisUpdate(false);
        setId('');
        setStatus("")
    }

    return (
        <>
        <div className="max-w-4xl mx-auto mt-16 bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8 text-center tracking-tight">
                Todo <span className="text-indigo-600">List</span>
            </h1>
            {/* Error/Success Message */}
            {info.message && (
                info.success ? 
                <p></p> 
                :
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-8">
                    <p className="text-red-700 font-medium text-sm md:text-base">
                        {info.message}
                    </p>
                </div>
            )}
            {/* Form Section */}
            <div className="bg-slate-50 p-4 md:p-6 rounded-2xl mb-10 border border-slate-100">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Input Field */}
                    <div className="grow">
                        <input type="text" onChange={handleTaskChange} value={task}
                            placeholder="What do you need to do?" 
                            className="w-full px-5 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                        />
                    </div>
                    {/* Select Group */}
                    <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
                        {/* Priority */}
                        <div className="relative w-full sm:w-44">
                            <select onChange={handleSelect} value={priority}
                                className="w-full appearance-none px-5 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl outline-none cursor-pointer font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm pr-10">
                                <option value="" disabled>Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                        {/* Status */}
                        <div className="relative w-full sm:w-44">
                            <select onChange={handleStatus} value={status}
                                className="w-full appearance-none px-5 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl outline-none cursor-pointer font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm pr-10">
                                <option value="" disabled>Status</option>
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="block">Block</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        onClick={isUpdate ? handleUpdate : handleClick} 
                        className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98] text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 cursor-pointer whitespace-nowrap lg:w-auto w-full">
                        {isUpdate ? "Update Task" : "Add Task"}
                    </button>
                </div>
            </div>
            {/* Task List Section */}
            {data.length > 0 ? (
                <ul className="flex flex-col gap-3">
                {data.map((item) => (
                    <li key={item._id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300">
                        {/* Task Info */}
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 flex-1 overflow-hidden">
                            <span className="font-semibold text-slate-700 text-[17px] truncate">
                                {item.task}
                            </span>
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 text-[13px] font-bold tracking-wide">
                                <span className={`px-3 py-1 rounded-lg uppercase
                                    ${item.priority === 'high' ? 'bg-rose-50 text-rose-600' : 
                                    item.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 
                                        'bg-blue-50 text-blue-600'}`}>
                                    {item.priority}
                                </span>
                                <span className={`px-3 py-1 rounded-lg uppercase
                                    ${item.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
                                    item.status === 'block' ? 'bg-slate-100 text-slate-600' : 
                                        'bg-violet-50 text-violet-600'}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex justify-end gap-2 shrink-0 border-t sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0 border-slate-100 opacity-100 lg:opacity-60 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl font-medium transition-colors cursor-pointer text-sm">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-medium transition-colors cursor-pointer text-sm">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="text-center py-12 text-slate-400 font-medium">
                    No tasks found. Add a new task above!
                </div>
            )}
        </div>
        </>
    )
}

export default Todo;