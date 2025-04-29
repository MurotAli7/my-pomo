import React from "react";

const PomodoroInfo = () => {
  return (
    <div className="w-full mt-16 sm:mt-24 flex flex-col bg-white bottom-0 mx-auto p-4">
      <div className="flex flex-col mx-auto text-gray-800 max-w-130">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          An online Pomodoro Timer to boost your productivity
        </h1>
        
        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2">What is Pomofocus?</h2>
        <p className="mb-4 text-sm sm:text-base">
          Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser.
          The aim of this app is to help you focus on any task, such as studying, writing, or coding.
          This app is inspired by Pomodoro Technique, a time management method developed by Francesco Cirillo.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2">What is Pomodoro Technique?</h2>
        <p className="mb-4 text-sm sm:text-base">
          The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work and study.
          The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, 
          separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', 
          after the tomato-shaped kitchen timer that Cirillo used as a university student. - Wikipedia
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2">How to use the Pomodoro Timer?</h2>
        <ul className="list-disc pl-5 mb-4 text-sm sm:text-base">
          <li>Add tasks to work on today</li>
          <li>Set estimated pomodoros (1 = 25min of work) for each task</li>
          <li>Select a task to work on</li>
          <li>Start timer and focus on the task for 25 minutes</li>
          <li>Take a 5-minute break when the alarm rings</li>
          <li>Iterate 3-5 times until you finish the tasks</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2">Basic Features</h2>
        <ul className="list-disc pl-5 mb-4 text-sm sm:text-base">
          <li>Estimate Finish Time: Get an estimate of the time required to complete your daily tasks.</li>
          <li>Add Templates: Save your repetitive tasks as templates and add them with one click.</li>
          <li>Visual Reports: See how much time you’ve focused each day, week, and month.</li>
          <li>Custom Settings: Personalize your focus/break time, alarm sounds, background colors, and more.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2">Premium Features</h2>
        <ul className="list-disc pl-5 mb-4 text-sm sm:text-base">
          <li>Add Projects: Track how much time you spend on each project.</li>
          <li>Yearly Report: View your focus hours every week.</li>
          <li>Download Reports: Download your Pomodoro data in CSV format.</li>
          <li>No Time-Limit: Set focus time for more than 1 hour.</li>
          <li>Track Idle/Logout: Lost focus when you forget.</li>
          <li>Website Integration: Connect to other apps (Google, HTTP, etc).</li>
          <li>No Ads: Enjoy an uninterrupted timebox app experience.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2">Download App</h2>
        <p className="mb-2 text-sm sm:text-base">For Mac:</p>
        <a href="#" className="text-blue-600 underline mb-2 block text-sm sm:text-base">pomofocus-4.0.0.dmg</a>
        <p className="mb-2 text-sm sm:text-base">For Windows:</p>
        <a href="#" className="text-blue-600 underline mb-2 block text-sm sm:text-base">pomofocus-4.0.0-setup.exe</a>

        <p className="mt-4 text-xs sm:text-sm text-gray-500">
          Pomofocus is a simple timer app designed to help you stay focused.
          This is a personal project. I’m not affiliated with Francesco Cirillo.
        </p>

        <div className="mt-10 text-center text-xs sm:text-sm text-gray-500">
          <p>HOME  PRIVACY  TERMS  CONTACT  DISCLAIMER</p>
          <p className="mt-2">© 2023 pomofocus.io | All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroInfo;
