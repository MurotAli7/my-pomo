'use client'

export default function Header({ onSettingsClick, progress, mode, onReportClick }) {
  return (
    <header className="max-w-170 mb-10 top-0 w-full backdrop-blur-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <i className="fas fa-check-circle text-xl text-white"></i>
            <h1 className="text-xl font-bold text-white hidden min-[350px]:block">Pomofocus</h1>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button 
              onClick={onReportClick}
              className="hidden sm:flex items-center gap-2 text-white text-sm font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-chart-bar"></i> 
              <span>Report</span>
            </button>

            <button 
              onClick={onSettingsClick} 
              className="hidden sm:flex items-center gap-2 text-white text-sm font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-cog"></i> 
              <span>Setting</span>
            </button>

            <button className="hidden sm:flex items-center gap-2 text-white text-sm font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
              <i className="fa-regular fa-circle-user"></i> 
              <span>Sign In</span>
            </button>

            <button className="hidden sm:flex items-center justify-center text-white text-sm font-medium w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
              <i className="fas fa-ellipsis-v"></i>
            </button>

            <button 
              onClick={onReportClick}
              className="sm:hidden flex items-center justify-center text-white text-sm font-medium w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-chart-bar"></i>
            </button>

            <button 
              onClick={onSettingsClick} 
              className="sm:hidden flex items-center justify-center text-white text-sm font-medium w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-cog"></i>
            </button>

            <button className="sm:hidden flex items-center justify-center text-white text-sm font-medium w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
              <i className="fa-regular fa-circle-user"></i>
            </button>

            <button className="sm:hidden flex items-center justify-center text-white text-sm font-medium w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black/10">
          <div
            className="h-full bg-white"
            style={{ width: `${progress}%`, transition: 'width 1s linear' }}
          ></div>
        </div>
      </div>
    </header>
  )
}