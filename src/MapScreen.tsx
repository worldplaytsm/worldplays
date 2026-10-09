import { ChevronLeft, MapPin, Settings, CarFront, Map as MapIcon, MessageCircle } from 'lucide-react'
import { images, mapPins } from '../data'
import type { Notify } from '../data'

interface Props { onBack: () => void; onChat: () => void; notify: Notify }

export default function MapScreen({ onBack, onChat, notify }: Props) {
  return (
    <main className="screen map-screen" style={{ backgroundImage: `url(${images.main})` }}>
      <div className="map-top">
        <button className="round" onClick={onBack} aria-label="Back"><ChevronLeft size={20} /></button>
        <div className="city-chip"><MapPin size={16} color="#f6c94a" /> Lagos City</div>
        <button className="round" onClick={() => notify('Map settings arrive in Stage 2.')} aria-label="Settings"><Settings size={18} /></button>
      </div>

      {mapPins.map(p => (
        <button key={p.label} className="pin" style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => notify(`${p.label} opens in Stage 2.`)}>
          {p.label}
        </button>
      ))}
      <span className="pin you" style={{ left: '42%', top: '66%' }}>You</span>

      <div className="map-bar">
        <button onClick={() => notify('Vehicles arrive in Stage 2.')}><CarFront size={22} />Vehicles</button>
        <button className="on"><MapIcon size={22} />Map</button>
        <button onClick={onChat}><MessageCircle size={22} />Chat</button>
      </div>
    </main>
  )
}
