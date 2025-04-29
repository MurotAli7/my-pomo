'use client'

import { useEffect, useState } from 'react'

const Report = ({ yopish }) => {
  const [vazifalar, setVazifalar] = useState([])
  const [vaqtMaumotlari, setVaqtMaumotlari] = useState([])
  const [tanlanganSana, setTanlanganSana] = useState(new Date())
  const [faolTab, setFaolTab] = useState('kunlik')

  useEffect(() => {
    const saqlanganVazifalar = localStorage.getItem('tasks')
    const saqlanganVaqtMaumotlari = localStorage.getItem('timeData') || '[]'
    
    if (saqlanganVazifalar) setVazifalar(JSON.parse(saqlanganVazifalar))
    setVaqtMaumotlari(JSON.parse(saqlanganVaqtMaumotlari))
  }, [])

  const filtrlanganMaumotlar = vaqtMaumotlari.filter(yozuv => {
    const yozuvSanasi = new Date(yozuv.date)
    
    if (faolTab === 'kunlik') {
      return yozuvSanasi.toDateString() === tanlanganSana.toDateString()
    } else if (faolTab === 'haftalik') {
      const haftaBoshlanishi = new Date(tanlanganSana)
      haftaBoshlanishi.setDate(haftaBoshlanishi.getDate() - haftaBoshlanishi.getDay())
      const haftaTugashi = new Date(haftaBoshlanishi)
      haftaTugashi.setDate(haftaTugashi.getDate() + 6)
      return yozuvSanasi >= haftaBoshlanishi && yozuvSanasi <= haftaTugashi
    } else {
      return yozuvSanasi.getMonth() === tanlanganSana.getMonth() && 
             yozuvSanasi.getFullYear() === tanlanganSana.getFullYear()
    }
  })
  const jamiPomodoro = filtrlanganMaumotlar.reduce((sum, yozuv) => sum + yozuv.pomodoros, 0)
  const jamiVaqt = filtrlanganMaumotlar.reduce((sum, yozuv) => sum + yozuv.duration, 0)
  const soatlar = Math.floor(jamiVaqt / 60)
  const daqiqalar = jamiVaqt % 60
  const vazifaStatistikasi = vazifalar.map(vazifa => {
    const vazifaYozuvlari = filtrlanganMaumotlar.filter(yozuv => yozuv.taskId === vazifa.id)
    const vazifaPomodorolari = vazifaYozuvlari.reduce((sum, yozuv) => sum + yozuv.pomodoros, 0)
    return {
      nomi: vazifa.name,
      pomodorolar: vazifaPomodorolari,
      rang: vazifa.color || '#f87171'
    }
  }).filter(vazifa => vazifa.pomodorolar > 0)
  const sanaStatistikasi = {}
  filtrlanganMaumotlar.forEach(yozuv => {
    const sanaStr = new Date(yozuv.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
    if (!sanaStatistikasi[sanaStr]) sanaStatistikasi[sanaStr] = 0
    sanaStatistikasi[sanaStr] += yozuv.pomodoros
  })
  const sanaYorliqlari = Object.keys(sanaStatistikasi)
  const sanaPomodorolari = sanaYorliqlari.map(sana => sanaStatistikasi[sana])
  const sananiOzgartirish = (yonalish) => {
    const yangiSana = new Date(tanlanganSana)
    const miqdor = faolTab === 'haftalik' ? 7 : faolTab === 'oylik' ? 30 : 1
    yangiSana.setDate(yangiSana.getDate() + (yonalish === 'oldingi' ? -miqdor : miqdor))
    setTanlanganSana(yangiSana)
  }
  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-150 max-w-150 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">Pomodoro Hisoboti</h2>
          <button onClick={yopish} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button onClick={() => setFaolTab('kunlik')} className={`px-4 py-2 rounded ${faolTab === 'kunlik' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-red-600'}`}>
                  Kunlik
                </button>
                <button onClick={() => setFaolTab('haftalik')} className={`px-4 py-2 rounded ${faolTab === 'haftalik' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-red-600'}`}>
                  Haftalik
                </button>
                <button onClick={() => setFaolTab('oylik')} className={`px-4 py-2 rounded ${faolTab === 'oylik' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-red-600'}`}>
                  Oylik
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => sananiOzgartirish('oldingi')} className="p-2 rounded-full hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="font-medium">
                  {faolTab === 'kunlik' && tanlanganSana.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  {faolTab === 'haftalik' && `${tanlanganSana.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} haftasi`}
                  {faolTab === 'oylik' && tanlanganSana.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={() => sananiOzgartirish('keyingi')} className="p-2 rounded-full hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-red-600 mb-2">Pomodorolar</h3>
                <p className="text-3xl font-bold">{jamiPomodoro}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-600 mb-2">Jami Vaqt</h3>
                <p className="text-3xl font-bold">{soatlar > 0 ? `${soatlar}soat ` : ''}{daqiqalar}daq</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-green-600 mb-2">Bajarilgan Vazifalar</h3>
                <p className="text-3xl font-bold">{vazifalar.filter(v => v.completed).length}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Vazifalar bo'yicha Pomodorolar</h3>
              <div className="h-64">
                {vazifaStatistikasi.length > 0 ? (
                  <div className="flex flex-col h-full">
                    {vazifaStatistikasi.map((vazifa, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="truncate max-w-[150px]">{vazifa.nomi}</span>
                          <span>{vazifa.pomodorolar}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="h-4 rounded-full" 
                            style={{
                              width: `${(vazifa.pomodorolar / Math.max(1, ...vazifaStatistikasi.map(v => v.pomodorolar))) * 100}%`,
                              backgroundColor: vazifa.rang
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Ma'lumot mavjud emas
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Vaqt bo'yicha Pomodorolar</h3>
              <div className="h-64">
                {sanaYorliqlari.length > 0 ? (
                  <div className="flex h-full">
                    <div className="flex flex-col justify-between mr-2">
                      {[...Array(Math.max(1, ...sanaPomodorolari) + 1)].map((_, i) => (
                        <div key={i} className="text-xs text-gray-500">
                          {Math.max(1, ...sanaPomodorolari) - i}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 flex items-end space-x-2">
                      {sanaYorliqlari.map((sana, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-red-200 rounded-t-sm"
                            style={{
                              height: `${(sanaPomodorolari[i] / Math.max(1, ...sanaPomodorolari)) * 100}%`
                            }}
                          />
                          <div className="text-xs mt-1 text-gray-500">{sana}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Ma'lumot mavjud emas
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Bajarilgan Vazifalar</h2>
            {vazifalar.filter(v => v.completed).length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {vazifalar.filter(v => v.completed).map((vazifa, index) => (
                  <li key={index} className="py-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: vazifa.color || '#f87171' }}
                      />
                      <span className="font-medium truncate max-w-[200px]">{vazifa.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(vazifa.completedAt).toLocaleDateString()} da bajarildi
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Bajarilgan vazifalar yo'q</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report;