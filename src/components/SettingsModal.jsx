'use client'
import { useState, useEffect } from 'react'

export default function SettingsModal({ onClose, pomodoro, shortBreak, longBreak, onSettingsChange }) {

  const [newPomodoro, setPomodoro] = useState(pomodoro)
  const [newShortBreak, setShortBreak] = useState(shortBreak)
  const [newLongBreak, setLongBreak] = useState(longBreak)
  const [autoStartBreaks, setAutoStartBreaks] = useState(true)
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [alarmSound, setAlarmSound] = useState('classic')
  const [alarmVolume, setAlarmVolume] = useState(50)
  const [tickingSound, setTickingSound] = useState('none')
  const [tickingVolume, setTickingVolume] = useState(50)
  const [colorTheme, setColorTheme] = useState('red')
  const [hourFormat, setHourFormat] = useState('24')
  const [darkMode, setDarkMode] = useState(true)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [reminderTime, setReminderTime] = useState(5)
  const [mobileAlarm, setMobileAlarm] = useState(true)
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSaveSettings = () => {
    onSettingsChange(newPomodoro, newShortBreak, newLongBreak)
    onClose()
  }
  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleClickOutside}>
      <div className="bg-white max-h-[90vh] overflow-y-auto rounded-lg p-6 w-[400px] shadow-xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close settings">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className=" text-xl text-gray-700 font-semibold mb-4">Sozlamalar</h2>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">TIMER</h3>
          <div className="grid grid-cols-3 gap-2 mb-3 text-center text-sm text-gray-600">
            <div>
              <label className="block mb-1">Pomodoro</label>
              <input 
                type="number" 
                value={newPomodoro} 
                onChange={e => setPomodoro(+e.target.value)} 
                className="w-full border rounded px-2 py-1 text-center" />
            </div>
            <div>
              <label className="block mb-1">Short Break</label>
              <input 
                type="number" 
                value={newShortBreak} 
                onChange={e => setShortBreak(+e.target.value)} 
                className="w-full border rounded px-2 py-1 text-center" />
            </div>
            <div>
              <label className="block mb-1">Long Break</label>
              <input 
                type="number" 
                value={newLongBreak} 
                onChange={e => setLongBreak(+e.target.value)} 
                className="w-full border rounded px-2 py-1 text-center" />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Auto Start Breaks</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoStartBreaks}
                onChange={() => setAutoStartBreaks(!autoStartBreaks)}
                className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Auto Start Pomodoros</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoStartPomodoros}
                onChange={() => setAutoStartPomodoros(!autoStartPomodoros)}
                className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700">Long Break Interval</label>
            <input 
              type="number" 
              value={longBreakInterval}
              onChange={e => setLongBreakInterval(+e.target.value)}
              className="w-16 border rounded px-2 py-1 text-center"
              min="1"/>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">SOUND</h3>
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Alarm Sound</label>
            <select 
              value={alarmSound}
              onChange={e => setAlarmSound(e.target.value)}
              className="w-full text-gray-700 border rounded px-2 py-1">
              <option value="classic">Classic</option>
              <option value="digital">Digital</option>
              <option value="bell">Bell</option>
              <option value="none">None</option>
            </select>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500 mr-2">Volume:</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={alarmVolume}
                onChange={e => setAlarmVolume(e.target.value)}
                className="w-full"/>
              <span className="text-xs text-gray-500 ml-2 w-8">{alarmVolume}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Ticking Sound</label>
            <select 
              value={tickingSound}
              onChange={e => setTickingSound(e.target.value)}
              className="w-full text-gray-700 border rounded px-2 py-1">
              <option value="none">None</option>
              <option value="clock">Clock</option>
              <option value="metronome">Metronome</option>
            </select>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500 mr-2">Volume:</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={tickingVolume}
                onChange={e => setTickingVolume(e.target.value)}
                className="w-full"/>
              <span className="text-xs text-gray-500 ml-2 w-8">{tickingVolume}</span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">APPEARANCE</h3>
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Color Theme</label>
            <select 
              value={colorTheme}
              onChange={e => setColorTheme(e.target.value)}
              className="w-full border text-gray-700 rounded px-2 py-1">
              <option className="bg-red-600" value="red">Red</option>
              <option className="bg-blue-600" value="blue">Blue</option>
              <option className="bg-green-600" value="green">Green</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Hour Format</label>
            <select 
              value={hourFormat}
              onChange={e => setHourFormat(e.target.value)}
              className="w-full text-gray-700 border rounded px-2 py-1">
              <option value="24">24-hour</option>
              <option value="12">12-hour</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600">Dark Mode when running</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">NOTIFICATION</h3>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">Reminder</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={reminderEnabled}
                onChange={() => setReminderEnabled(!reminderEnabled)}
                className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          {reminderEnabled && (
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600">Reminder Time</label>
              <input 
                type="number" 
                value={reminderTime}
                onChange={e => setReminderTime(+e.target.value)}
                className="w-16 border rounded px-2 py-1 text-center"
                min="1"/>
              <span className="text-sm text-gray-600">min</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600">Mobile Alarm</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={mobileAlarm}
                onChange={() => setMobileAlarm(!mobileAlarm)}
                className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button 
            onClick={handleSaveSettings} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}