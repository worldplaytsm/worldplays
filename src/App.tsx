import { useMemo, useState } from 'react'
import {
  ArrowUpRight, Bike, Bell, BusFront, CarFront, Check, ChevronRight,
  CircleDollarSign, Compass, Globe2, Heart, MapPin, Menu, MessageCircle,
  Plus, Search, Settings, ShoppingBag, Sparkles, Star, Users, Wallet, X,
} from 'lucide-react'
import './styles.css'

type City = { name: string; country: string; image: string; residents: string; description: string }
type Vehicle = { name: string; type: string; image: string; price: string }
type Avatar = { name: string; style: string; color: string; image: string }

const cities: City[] = [
  { name: 'Lagos', country: 'Nigeria', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85', residents: '2.4M residents', description: 'A lively coastal city full of culture, business and new experiences.' },
  { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deaccf18?auto=format&fit=crop&w=900&q=85', residents: '3.1M residents', description: 'Explore bright streets, modern architecture and hidden neighbourhoods.' },
  { name: 'Dubai', country: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85', residents: '1.8M residents', description: 'A skyline of landmarks, shopping destinations and desert adventures.' },
  { name: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85', residents: '2.7M residents', description: 'Historic streets meet modern city life, music and creativity.' },
  { name: 'New York', country: 'United States', image: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=900&q=85', residents: '3.6M residents', description: 'Discover neighbourhoods, rooftop views and endless city energy.' },
  { name: 'Abuja', country: 'Nigeria', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=85', residents: '940K residents', description: 'Wide boulevards, green spaces and a growing creative community.' },
]

const avatars: Avatar[] = [
  { name: 'Alex', style: 'Explorer', color: '#b9a0ff', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85' },
  { name: 'Maya', style: 'City Star', color: '#ffbb9a', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85' },
  { name: 'Jay', style: 'Street Style', color: '#8edbd0', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=85' },
  { name: 'Zara', style: 'Trendsetter', color: '#f4d27c', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=85' },
]

const vehicles: Vehicle[] = [
  { name: 'Urban Sport', type: 'Cars', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=85', price: 'From ₦8,500' },
  { name: 'Street Rider', type: 'Motorcycles', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=85', price: 'From ₦3,200' },
  { name: 'City Shuttle', type: 'Vans', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=700&q=85', price: 'From ₦6,000' },
  { name: 'Classic Bicycle', type: 'Bicycles', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=700&q=85', price: 'From ₦900' },
  { name: 'City Napep', type: 'Napep', image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=700&q=85', price: 'From ₦1,200' },
  { name: 'Family Cruiser', type: 'Cars', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=85', price: 'From ₦10,000' },
  { name: 'Delivery Van', type: 'Vans', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=700&q=85', price: 'From ₦5,500' },
  { name: 'Road Bike', type: 'Bicycles', image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=700&q=85', price: 'From ₦1,000' },
]

const categories = ['All', 'Homes', 'Cars', 'Motorcycles', 'Vans', 'Napep', 'Bicycles']
const navItems = [
  { label: 'Discover', icon: Compass, target: 'discover' },
  { label: 'Cities', icon: Globe2, target: 'cities' },
  { label: 'My Avatar', icon: Users, target: 'avatars' },
  { label: 'Vehicles', icon: CarFront, target: 'vehicles' },
  { label: 'Marketplace', icon: ShoppingBag, target: 'marketplace' },
]
const money = (value: number) => `₦${value.toLocaleString('en-NG')}`

export default function App() {
  const [activeTab, setActiveTab] = useState('Discover')
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [vehicleType, setVehicleType] = useState('All')
  const [likedCities, setLikedCities] = useState<string[]>(['Lagos'])
  const [balance, setBalance] = useState(25000)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [joined, setJoined] = useState(false)

  const filteredCities = useMemo(() => {
    const query = search.trim().toLowerCase()
    return cities.filter((city) => `${city.name} ${city.country}`.toLowerCase().includes(query))
  }, [search])

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase()
    return vehicles.filter((vehicle) => (vehicleType === 'All' || vehicle.type === vehicleType) && `${vehicle.name} ${vehicle.type}`.toLowerCase().includes(query))
  }, [search, vehicleType])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }
  function goTo(target: string, label?: string) {
    setActiveTab(label ?? target)
    setSidebarOpen(false)
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  function toggleLike(name: string) {
    setLikedCities((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }
  function rentVehicle(vehicle: Vehicle) {
    setBalance((current) => current - 500)
    notify(`${vehicle.name} selected. ₦500 demo booking fee deducted.`)
  }

  return (
    <div className="wp-app">
      {sidebarOpen && <button className="menu-backdrop" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <button className="brand-mark" onClick={() => goTo('discover', 'Discover')} aria-label="WorldPlay home"><span className="brand-symbol">W</span><span>World<strong>Play</strong></span></button>
          <button className="mobile-close" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}><X size={17} /></button>
        </div>
        <p className="sidebar-label">YOUR WORLD</p>
        {navItems.map(({ label, icon: Icon, target }) => <button className={`side-link ${activeTab === label ? 'side-active' : ''}`} key={label} onClick={() => goTo(target, label)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{label === 'Marketplace' && <ArrowUpRight size={14} />}</button>)}
        <p className="sidebar-label">YOUR ACCOUNT</p>
        <button className="side-link" onClick={() => notify(`Your wallet balance is ${money(balance)}.`)}><Wallet size={18} strokeWidth={1.8} /><span>My Wallet</span></button>
        <button className="side-link" onClick={() => notify('Settings are coming soon.')}><Settings size={18} strokeWidth={1.8} /><span>Settings</span></button>
        <div className="sidebar-city"><div className="mini-city-image" /><strong>Explore the world</strong><span><MapPin size={13} /> New places are waiting</span><button onClick={() => goTo('cities', 'Cities')}>Browse destinations <ChevronRight size={15} /></button></div>
        <div className="sidebar-footer"><span className="online-dot" /><span>WorldPlay community</span></div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button className="menu-toggle" aria-label="Open menu" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button>
          <div className="mobile-brand">World<strong>Play</strong></div>
          <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search cities, vehicles..." aria-label="Search cities and vehicles" /><kbd>⌘ K</kbd></label>
          <button className="notification-button" aria-label="Notifications" onClick={() => notify('You are all caught up.')}><Bell size={18} /><span /></button>
          <button className="wallet-pill" onClick={() => notify(`Wallet balance: ${money(balance)}. Demo balance only.`)}><span className="coin-icon"><CircleDollarSign size={17} /></span><span><small>MY BALANCE</small><strong>{money(balance)}</strong></span><Plus size={15} /></button>
          <button className="profile-button" aria-label="Open profile" onClick={() => notify('Welcome to WorldPlay!')}><img src={avatars[0].image} alt="Profile avatar" /></button>
        </header>

        <div className="page-content">
          <div className="welcome-row" id="discover"><div><p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p><h1>Welcome to your <span>world.</span></h1><p>Discover new cities, meet people, and build your own story.</p></div><div className="welcome-location"><MapPin size={16} /><span><strong>Your world</strong><small>Ready to explore</small></span></div></div>
          <section className="hero-banner"><img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=90" alt="City skyline at dusk" /><div className="hero-overlay" /><div className="hero-content"><span className="hero-tag"><Sparkles size={13} /> THE WORLD IS YOURS</span><h2>Live the city.<br /><em>Write your story.</em></h2><p>From busy streets to beautiful skylines, your next chapter is just around the corner.</p><button className="primary-button" onClick={() => goTo('cities', 'Cities')}>Explore cities <ArrowUpRight size={16} /></button></div><div className="hero-stats"><div><strong>24+</strong><span>CITIES TO EXPLORE</span></div><div><strong>4.8★</strong><span>COMMUNITY RATING</span></div><div><strong>∞</strong><span>WAYS TO PLAY</span></div></div></section>

          <section className="section-block" id="cities"><div className="section-title-row"><div><p className="eyebrow">FIND YOUR NEXT DESTINATION</p><h2>Explore popular cities</h2></div><button className="text-button" onClick={() => { setSearch(''); notify('Showing all destinations.') }}>View all <ArrowUpRight size={15} /></button></div><div className="city-grid">{filteredCities.map((city) => <article className="city-card" key={city.name}><img src={city.image} alt={`${city.name} city view`} loading="lazy" /><div className="city-card-shade" /><button className={`like-button ${likedCities.includes(city.name) ? 'is-liked' : ''}`} aria-label={`Favourite ${city.name}`} onClick={() => toggleLike(city.name)}><Heart size={16} fill={likedCities.includes(city.name) ? 'currentColor' : 'none'} /></button><div className="city-card-info"><span className="city-country"><MapPin size={12} /> {city.country}</span><h3>{city.name}</h3><div className="city-bottom"><span>{city.residents}</span><button aria-label={`Explore ${city.name}`} onClick={() => setSelectedCity(city)}><ArrowUpRight size={16} /></button></div></div></article>)}</div>{filteredCities.length === 0 && <p className="empty-state">No cities found. Try another search.</p>}</section>

          <section className="section-block" id="avatars"><div className="section-title-row"><div><p className="eyebrow">MAKE IT YOURS</p><h2>Meet your avatars</h2></div><button className="text-button" onClick={() => notify('More avatar styles are coming soon.')}>All avatars <ArrowUpRight size={15} /></button></div><div className="avatar-grid">{avatars.map((avatar, index) => <button className="avatar-card" key={avatar.name} onClick={() => notify(`${avatar.name} selected — ${avatar.style}.`)}><div className="avatar-art" style={{ backgroundColor: avatar.color }}><img src={avatar.image} alt={`${avatar.name} avatar`} loading="lazy" /><span className="avatar-level"><Star size={11} fill="currentColor" /> Lv. {index + 1}</span></div><div className="avatar-meta"><div><strong>{avatar.name}</strong><span>{avatar.style}</span></div><span className="avatar-arrow"><ArrowUpRight size={15} /></span></div></button>)}</div></section>

          <section className="section-block" id="vehicles"><div className="section-title-row"><div><p className="eyebrow">MOVE AROUND YOUR WORLD</p><h2>Choose your ride</h2></div><button className="text-button" onClick={() => { setVehicleType('All'); goTo('vehicles', 'Vehicles') }}>View all rides <ArrowUpRight size={15} /></button></div><div className="transport-types">{categories.map((category) => <button key={category} className={vehicleType === category ? 'transport-active' : ''} onClick={() => setVehicleType(category)}>{category === 'All' && <Compass size={14} />}{category === 'Cars' && <CarFront size={14} />}{category === 'Motorcycles' && <Bike size={14} />}{category === 'Vans' && <BusFront size={14} />}{category === 'Bicycles' && <Bike size={14} />}{category}</button>)}</div><div className="vehicle-grid">{filteredVehicles.map((vehicle) => <article className="vehicle-card" key={vehicle.name}><div className="vehicle-image"><img src={vehicle.image} alt={vehicle.name} loading="lazy" /><span className="vehicle-type">{vehicle.type}</span></div><div className="vehicle-info"><div><h3>{vehicle.name}</h3><p>{vehicle.price}</p></div><button aria-label={`Select ${vehicle.name}`} onClick={() => rentVehicle(vehicle)}><ArrowUpRight size={15} /></button></div></article>)}</div>{filteredVehicles.length === 0 && <p className="empty-state">No rides match this filter.</p>}</section>

          <section className="community-banner" id="marketplace"><div className="community-icon"><MessageCircle size={23} /></div><div><p className="eyebrow">BETTER TOGETHER</p><h2>There's a whole world waiting to meet you.</h2><p>Join the WorldPlay community and start creating your own city story.</p></div><button className="primary-button" onClick={() => { setJoined(true); notify(joined ? 'You are already part of the community.' : 'Welcome to the WorldPlay community!') }}>{joined ? <><Check size={16} /> Joined</> : <>Join the community <ArrowUpRight size={16} /></>}</button></section>
          <footer className="page-footer"><span className="brand-footer">World<strong>Play</strong></span><span>Explore more. Experience more. Be more.</span><span>© 2026 WorldPlay · Demo experience</span></footer>
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation"><button className={activeTab === 'Discover' ? 'mobile-nav-active' : ''} onClick={() => goTo('discover', 'Discover')}><Compass size={19} />Discover</button><button className={activeTab === 'Cities' ? 'mobile-nav-active' : ''} onClick={() => goTo('cities', 'Cities')}><Globe2 size={19} />Cities</button><button className={activeTab === 'My Avatar' ? 'mobile-nav-active' : ''} onClick={() => goTo('avatars', 'My Avatar')}><Users size={19} />Avatar</button><button className={activeTab === 'Vehicles' ? 'mobile-nav-active' : ''} onClick={() => goTo('vehicles', 'Vehicles')}><CarFront size={19} />Rides</button></nav>

      {selectedCity && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedCity(null)}><section className="city-modal" role="dialog" aria-modal="true" aria-labelledby="city-modal-title" onClick={(event) => event.stopPropagation()}><img src={selectedCity.image} alt={`${selectedCity.name} skyline`} /><button className="modal-close" aria-label="Close city details" onClick={() => setSelectedCity(null)}><X size={18} /></button><div className="city-modal-body"><p className="eyebrow"><MapPin size={12} /> {selectedCity.country}</p><h2 id="city-modal-title">{selectedCity.name}</h2><p>{selectedCity.description}</p><button className="primary-button" onClick={() => { notify(`Welcome to ${selectedCity.name}! This is a demo destination.`); setSelectedCity(null) }}>Enter city <ArrowUpRight size={16} /></button></div></section></div>}
      {toast && <div className="toast" role="status">{toast}<button aria-label="Dismiss notification" onClick={() => setToast('')}><X size={15} /></button></div>}
    </div>
  )
}
