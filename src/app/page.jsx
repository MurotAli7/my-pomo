'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import TaskList from '../components/TaskList'
import SettingsModal from '../components/SettingsModal'
import PomodoroInfo from '../components/PomoInfo'
import Report from '../components/Report'

const alarmSound = typeof Audio !== 'undefined' ? new Audio('/finish-alarm.mp3') : null
const startSound = typeof Audio !== 'undefined' ? new Audio('/alarm.wav') : null

export default function Home() {
  const [modes, setModes] = useState(() => {
    const savedModes = localStorage.getItem('timerModes')
    return savedModes ? JSON.parse(savedModes) : {
      pomodoro: 25,
      short: 5,
      long: 15
    }
  })

  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'pomodoro')
  const [time, setTime] = useState(() => {
    const storedTime = localStorage.getItem('time')
    return storedTime ? parseInt(storedTime) : (modes[mode] || 25) * 60
  })

  const [isRunning, setIsRunning] = useState(false)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [activeTaskIndex, setActiveTaskIndex] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [timeData, setTimeData] = useState(() => {
    const savedData = localStorage.getItem('timeData')
    return savedData ? JSON.parse(savedData) : []
  })

  const progress = ((modes[mode] * 60 - time) / (modes[mode] * 60)) * 100

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('timeData', JSON.stringify(timeData))
  }, [timeData])

  useEffect(() => {
    if (time === 0 && mode === 'pomodoro' && isRunning) {
      const now = new Date()
      const activeTask = tasks[activeTaskIndex]

      setTimeData(prev => {
        const newData = [...prev, {
          date: now.toISOString(),
          duration: modes.pomodoro,
          pomodoros: 1,
          taskId: activeTask?.id || null
        }]
        return newData
      })

      if (activeTask) {
        const completedPomodoros = timeData.filter(entry => entry.taskId === activeTask.id)
          .reduce((sum, entry) => sum + entry.pomodoros, 0) + 1

        if (completedPomodoros >= activeTask.estimate) {
          updateTask(activeTaskIndex, {
            completed: true,
            completedAt: now.toISOString()
          })
        }
      }
    }
  }, [time, isRunning, mode])

  const handleSettingsChange = (newPomodoro, newShortBreak, newLongBreak) => {
    const newModes = {
      pomodoro: newPomodoro,
      short: newShortBreak,
      long: newLongBreak
    }
    setModes(newModes)
    localStorage.setItem('timerModes', JSON.stringify(newModes))
    setTime(newModes[mode] * 60)
  }

  const addTask = (task) => {
    setTasks(prev => [...prev, {
      ...task,
      id: Date.now(),
      completed: false,
      active: prev.length === 0
    }])
  }

  const removeTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index))
    if (activeTaskIndex === index) {
      setActiveTaskIndex(0)
    } else if (activeTaskIndex > index) {
      setActiveTaskIndex(prev => prev - 1)
    }
  }

  const updateTask = (index, updatedTask) => {
    setTasks(prev => prev.map((task, i) =>
      i === index ? { ...task, ...updatedTask } : task
    ))
  }

  const setActiveTask = (index) => {
    setTasks(prev => prev.map((task, i) => ({
      ...task,
      active: i === index
    })))
    setActiveTaskIndex(index)
  }

  const handleModeSwitch = () => {
    if (mode === 'pomodoro') {
      setMode('short')
    } else if (mode === 'short') {
      setMode('long')
    } else {
      setMode('pomodoro')
    }
  }

  useEffect(() => {
    localStorage.setItem('mode', mode)
    setTime(modes[mode] * 60)
    setIsRunning(false)
  }, [mode, modes])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 0) {
          clearInterval(interval)
          setIsRunning(false)
          return 0
        }
        const newTime = prev - 1
        localStorage.setItem('time', newTime)
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (time === 0 && isRunning) {
      setIsRunning(false)
      if (alarmSound) {
        alarmSound.currentTime = 0
        alarmSound.play().catch(e => console.error('Audio error:', e))
      }
      handleModeSwitch()
    }
  }, [time, isRunning])

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    return `${mins}:${secs}`
  }

  const getModeButtonClass = (buttonMode) => {
    const baseClasses = "px-4 py-1 cursor-pointer rounded w-full sm:w-40 text-center transition-all duration-500 text-sm sm:text-base"

    if (mode === buttonMode) {
      switch(buttonMode) {
        case 'pomodoro':
          return `${baseClasses} bg-red-600/40 text-white`
        case 'short':
          return `${baseClasses} bg-teal-600/50 text-white`
        case 'long':
          return `${baseClasses} bg-cyan-800/50 text-white`
        default:
          return `${baseClasses} bg-white/10 text-white`
      }
    } else {
      return `${baseClasses} bg-transparent text-white hover:bg-white/10`
    }
  }

  return (
    <div className={`min-h-screen text-white flex flex-col items-center justify-start transition-colors duration-700 ${
      mode === 'pomodoro' ? 'bg-red-800/75' :
      mode === 'short' ? 'bg-teal-700/80' :
      'bg-cyan-900/85'
    }`}>
      <Header 
        onSettingsClick={() => setShowSettings(true)} 
        onReportClick={() => setShowReport(true)}
        progress={progress}
        mode={mode}
      />

      <div className={`w-full max-w-130 px-4 sm:px-10 py-8 flex flex-col items-center rounded-lg transition-colors duration-700 ${
        mode === 'pomodoro' ? 'bg-white/10' :
        mode === 'short' ? 'bg-teal-200/20' :
        'bg-cyan-200/10'
      }`}>

        <div className="flex sm:flex-row gap-3 w-full mb-6 justify-center">
          <button onClick={() => setMode('pomodoro')} className={getModeButtonClass('pomodoro')}>
            <span className="sm:inline hidden">Pomodoro</span>
            <span className="inline sm:hidden">Pomo</span>
          </button>
          <button onClick={() => setMode('short')} className={getModeButtonClass('short')}>
            <span className="sm:inline hidden">Short Break</span>
            <span className="inline sm:hidden">Short</span>
          </button>
          <button onClick={() => setMode('long')} className={getModeButtonClass('long')}>
            <span className="sm:inline hidden">Long Break</span>
            <span className="inline sm:hidden">Long</span>
          </button>
        </div>

        <div className="text-6xl sm:text-8xl font-mono mb-6">
          {formatTime(time)}
        </div>

        <div className="flex justify-center w-full relative">
          <div className="w-full max-w-[160px] sm:w-32 h-12 relative">
            <button
              onClick={() => {
                if (startSound) {
                  startSound.currentTime = 0
                  startSound.play().catch(console.error)
                }
                setIsRunning(!isRunning)
              }}
              className="absolute inset-0 px-8 py-3 bg-white text-black rounded-lg shadow-md text-lg font-medium transition-all w-full"
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>

            {isRunning && (
              <button
                onClick={handleModeSwitch}
                className="absolute left-full ml-2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                aria-label="Skip to next mode"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5 18L13 12L5 6V18Z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <TaskList 
        tasks={tasks} 
        onTaskClick={setActiveTask} 
        onRemoveTask={removeTask} 
        activeTaskIndex={activeTaskIndex} 
        addTask={addTask} 
      />

      <PomodoroInfo 
        modes={modes} 
        mode={mode}
        time={time} 
        formatTime={formatTime} 
        progress={progress}
      />

      {showSettings && (
        <SettingsModal 
          modes={modes}
          onSave={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showReport && (
        <Report 
          timeData={timeData} 
          tasks={tasks} 
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  )
}
