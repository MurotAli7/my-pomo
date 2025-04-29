'use client'

import { useState } from 'react'
import AddTaskForm from './AddTask'

export default function TaskList({ tasks, addTask, removeTask, updateTask, setActiveTask }) {
  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showMenuIndex, setShowMenuIndex] = useState(null)

  const handleAddClick = () => setShowForm(true)
  const handleCancel = () => {
    setShowForm(false)
    setEditingIndex(null)
  }

  const handleAddTask = (task) => {
    if (editingIndex !== null) {
      updateTask(editingIndex, task)
      setEditingIndex(null)
    } else {
      addTask(task)
    }
    setShowForm(false)
  }

  const handleEditClick = (index) => {
    setEditingIndex(index)
    setShowForm(true)
    setShowMenuIndex(null)
  }

  const handleTaskClick = (index) => {
    setActiveTask(index)
  }

  const calculateFinishTime = () => {
    if (tasks.length === 0) return '--:--';
    
    const totalMinutes = tasks.reduce((sum, task) => sum + task.pomodoros, 0) * 25;
    const now = new Date();
    const finishTime = new Date(now.getTime() + totalMinutes * 60000);
    
    return finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="max-w-full sm:max-w-[500px] flex flex-col items-center mx-auto">
      {tasks.length > 0 && (
        <div className="mb-6 flex flex-col items-center">
          <div className="text-white text-sm opacity-70">#{tasks.findIndex(task => task.active) + 1 || 1}</div>
          <div className="text-white text-lg">
            {tasks.find(task => task.active)?.text || tasks[0]?.text || 'No active task'}
          </div>
        </div>
      )}
      <div className='flex items-center justify-between w-full sm:w-[500px]'>
        <h2 className="text-2xl font-semibold text-white mb-2">Tasks</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </div>
      <hr className="mb-4 w-full sm:w-[500px] border-white opacity-30" />

      <div className="max-w-full sm:max-w-[500px] flex flex-col">
        <ul className="space-y-2 mb-6">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`bg-white text-black rounded p-3 flex justify-between items-center ${task.active ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="flex w-full sm:w-[500px] items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskClick(index)}
                  className="w-4 h-4"
                />
                <span className={task.completed ? 'line-through opacity-70' : ''}>
                  {task.text}{' '}
                  <span className="text-xs text-gray-600">(x{task.pomodoros})</span>
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowMenuIndex(showMenuIndex === index ? null : index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
                {showMenuIndex === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        removeTask(index)
                        setShowMenuIndex(null)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!showForm ? (
        <button
          onClick={handleAddClick}
          className="w-full sm:w-[500px] border-2 cursor-pointer border-dashed border-white rounded-lg py-4 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition"
        >
          <span className="text-xl">+</span>
          <span>Add Task</span>
        </button>
      ) : (
        <div className="mb-6">
          <AddTaskForm 
            addTask={handleAddTask} 
            onCancel={handleCancel}
            initialTask={editingIndex !== null ? tasks[editingIndex] : null}
          />
        </div>
      )}
    </div>
  )
}
