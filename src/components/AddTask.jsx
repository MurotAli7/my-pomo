'use client'

import { useState, useEffect } from 'react'

export default function AddTaskForm({ addTask, onCancel, initialTask }) {
  const [taskText, setTaskText] = useState('')
  const [pomodoros, setPomodoros] = useState(1)
  const [note, setNote] = useState('')
  const [project, setProject] = useState('')

  useEffect(() => {
    if (initialTask) {
      setTaskText(initialTask.text)
      setPomodoros(initialTask.pomodoros)
      setNote(initialTask.note || '')
      setProject(initialTask.project || '')
    }
  }, [initialTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskText.trim()) return
    addTask({ text: taskText, pomodoros, note, project })
    setTaskText('')
    setPomodoros(1)
    setNote('')
    setProject('')
    onCancel()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black rounded-lg shadow-md w-full sm:w-[500px] p-6 mt-4 mx-auto"
    >
      <textarea
        className="w-full text-lg italic border-b outline-none resize-none p-1"
        placeholder="What are you working on?"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        autoFocus
      />
      <div className="mb-4">
        <strong>Est Pomodoros</strong>
        <div className="flex items-center gap-2 mt-2">
          <div className="px-4 py-2 bg-gray-200 rounded text-lg">{pomodoros}</div>
          <button
            type="button"
            className="px-3 py-1 bg-white border rounded shadow hover:bg-gray-100"
            onClick={() => setPomodoros(p => p + 1)}
          >
            ▲
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-white border rounded shadow hover:bg-gray-100"
            onClick={() => setPomodoros(p => (p > 1 ? p - 1 : 1))}
          >
            ▼
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-6 bg-gray-100 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
        <button
          type="button"
          onClick={onCancel}
          className="mr-4 cursor-pointer text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black cursor-pointer text-white px-6 py-2 rounded"
        >
          {initialTask ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  )
}
