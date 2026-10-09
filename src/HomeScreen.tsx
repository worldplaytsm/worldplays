import { ArrowRight, Compass, CarFront, Store, Users, Sun, MapPin, Coins, Plus } from 'lucide-react'
import { images, player, topPlaces } from '../data'
import type { Notify, Tab } from '../data'

interface Props { onEnterCity: () => void; onTab: (t: Tab) => void; notify: Notify }

export default function HomeScreen({ onEnterCity, onTab, notify }: Props) {
  const quick = [
    { label: 'Explore', sub: 'Places & Landmarks', Icon: Compass, color: '#2f6df6', run: onEnterCity },
    { label: 'Vehicles', sub: 'Cars, Bikes & More', Icon: CarFront, color: '#1fae6a', run: () => notify('Vehicles arrive in Stage 2.') },
    { label: 'Shops', sub: 'Buy & Sell', Icon: Store, color: '#e2602f', run: () => notify('Market arrives in Stage 2.') },
    { label: 'Friends', sub: 'Meet & Connect', Icon: Users, color: '#8a4fe0', run: () => onTab('Friend') },
  ]
  return (
    <main className="screen home">
      <header className="home-hero" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,12,24,.1) 20%,rgba(8,12,24,.95) 92%),url(${images.main})` }}>
        <div className="home-top">
          <div className="logo"><span className="logo-globe">🌍</span><div><b>World<span>Play</span></b><small>Play · Connect · Build</small></div></div>
          <button className="coins" onClick={() => notify('Wallet top-up is not connected yet.')}><Coins size={16} />{player.coins.toLocaleString()}<Plus size={14} /></button>
        </div>
        <div className="home-welcome">
          <p>Welcome to</p>
          <h1>WorldPlay</h1>
          <small>Explore your city, meet people, and live the Nigerian dream.</small>
        </div>
        <div className="home-cta">
          <button className="primary-button" onClick={onEnterCity}>Enter City <ArrowRight size={17} /></button>
          <div className="weather"><Sun size={22} color="#f6c94a" /><span><b>{player.temp}°C</b><small>Lagos, NG</small></span></div>
        </div>
      </header>

      <section className="quick-grid">
        {quick.map(({ label, sub, Icon, color, run }) => (
          <button key={label} style={{ background: color }} onClick={run}>
            <Icon size={28} /><b>{label}</b><small>{sub}</small>
          </button>
        ))}
      </section>

      <section className="block">
        <div className="block-head"><h2>Top Places</h2><button className="text-button" onClick={() => notify('More places are coming soon.')}>See all <ArrowRight size={14} /></button></div>
        <div className="place-row">
          {topPlaces.map(p => (
            <button key={p.name} className="place-card" onClick={onEnterCity} style={{ backgroundImage: `linear-gradient(0deg,rgba(8,12,24,.9),transparent 60%),url(${p.image})` }}>
              <b>{p.name}</b><small><MapPin size={11} /> {p.city}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
