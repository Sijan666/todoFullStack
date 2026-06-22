import { useState } from "react";
import axios from 'axios';

const Todo = () => {

    let [task, setTask] = useState('');
    let [priority, setPriority] = useState('');
    let [info, setinfo] = useState({});

    let handleClick = async () => {
        let data = await axios.post('http://localhost:5000/create/todo', {
            'task': task,
            'priority': priority
        });

        setinfo(data.data);
    }

    let handleTaskChange = (e) => {
        setTask(e.target.value);
    }

    let handleSelect = (e) => {
        setPriority(e.target.value);
    }

    return (
        <>
        <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
                Todo List
            </h1>
            {info.message && (
                info.success ? 
                <p className="text-emerald-700 bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl mb-6 text-center font-medium shadow-sm">
                    {info.message}
                </p> 
                :
                <p className="text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl mb-6 text-center font-medium shadow-sm">
                    {info.message}
                </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Input Field */}
                <input 
                    type="text" 
                    onChange={handleTaskChange} 
                    placeholder="Add your task here..." 
                    className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200"/>
                {/* Select */}
                <div className="relative w-full sm:w-auto">
                    <select 
                        onChange={handleSelect} 
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
                <button 
                    type="submit" 
                    onClick={handleClick} 
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 cursor-pointer whitespace-nowrap">
                    Add Task
                </button>
            </div>
        </div>
        </>
    )
}

export default Todo;