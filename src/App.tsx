
import { useState } from 'react'
import {
  Search, Bell, Coins, MapPin, ChevronRight, Menu, X,
  House, Users, Newspaper, UserRound, CarFront, Bike,
  ShoppingBag, Shirt, Heart, Zap, Map, Compass,
  Bus, CircleUserRound
} from 'lucide-react'
import './styles.css'

type City = {
  name: string
  country: string
  image: string
  population: string
}

type Vehicle = {
  name: string
  type: string
  image: string
  price: string
}

const cities: City[] = [
  {
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=2400&q=90',
    population: '8.3M',
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=90',
    population: '14M',
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=90',
    population: '3.6M',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=90',
    population: '8.9M',
  },
  {
    name: 'Lagos',
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1577503343327-6b9a2e3c9b7c?auto=format&fit=crop&w=2400&q=90',
    population: '15M+',
  },
  {
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=90',
    population: '2.1M',
  },
]

const vehicles: Vehicle[] = [
  {
    name: 'Urban Sport',
    type: 'Sports car',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    price: '45,000 coins',
  },
  {
    name: 'Street Motorcycle',
    type: 'Motorcycle',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85',
    price: '12,000 coins',
  },
  {
    name: 'City Van',
    type: 'Van',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85',
    price: '28,000 coins',
  },
  {
    name: 'City Ride',
    type: 'Bicycle',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=85',
    price: '2,500 coins',
  },
]

const avatars = [
  { name: 'Alex', style: 'Explorer', color: '#b9a0ff', initials: 'A' },
  { name: 'Maya', style: 'City Star', color: '#ffbb9a', initials: 'M' },
  { name: 'Jay', style: 'Street Style', color: '#8edbd0', initials: 'J' },
  { name: 'Zara', style: 'Trendsetter', color: '#f4d27c', initials: 'Z' },
]

const categories = ['All', 'Homes', 'Cars', 'Motorcycles', 'Vans', 'Napep', 'Bicycles']

export default function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [vehicleType, setVehicleType] = useState('All')
  const [liked, setLiked] = useState<number[]>([])
  const [wallet, setWallet] = useState(568)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const visibleCities = cities.filter(city =>
    `${city.name} ${city.country}`.toLowerCase().includes(search.toLowerCase())
  )

  const visibleVehicles = vehicles.filter(vehicle => {
    if (vehicleType === 'All') return true
    if (vehicleType === 'Napep') return false
    return vehicle.type.toLowerCase().includes(vehicleType.toLowerCase().replace(/s$/, ''))
  })

  function toggleLike(id: number) {
    setLiked(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    )
  }

  function joinCity(city: City) {
    setSelectedCity(city)
    setNotice(`Welcome to ${city.name}! City entry is a preview for now.`)
  }

  return (
    <main className="wp-app">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <button className="brand-mark" onClick={() => setActiveTab('Home')}>
          <span className="brand-symbol">W</span>
          <span>World<strong>Play</strong></span>
          <button
            className="mobile-close"
            aria-label="Close menu"
            onClick={event => {
              event.stopPropagation()
              setMenuOpen(false)
            }}
          >
            <X size={20} />
          </button>
        </button>

        <div className="sidebar-label">YOUR WORLD</div>
        {[
          { label: 'Home', icon: House },
          { label: 'Explore Cities', icon: Compass },
          { label: 'Friends', icon: Users },
          { label: 'News Feed', icon: Newspaper },
          { label: 'Marketplace', icon: ShoppingBag },
          { label: 'My Character', icon: CircleUserRound },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={`side-link ${activeTab === label ? 'side-active' : ''}`}
            onClick={() => {
              setActiveTab(label)
              setMenuOpen(false)
              document.getElementById(
                label === 'Explore Cities' ? 'cities' :
                label === 'Marketplace' ? 'vehicles' :
                label === 'My Character' ? 'avatars' : 'home'
              )?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}

        <div className="sidebar-city">
          <div className="sidebar-label">FEATURED CITY</div>
          <div className="mini-city-image" />
          <strong>New York City</strong>
          <span><MapPin size={13} /> United States</span>
          <button onClick={() => joinCity(cities[0])}>Explore city <ChevronRight size={15} /></button>
        </div>

        <div className="sidebar-footer">
          <span className="online-dot" /> WorldPlay preview
        </div>
      </aside>

      {menuOpen && (
        <button
          className="menu-backdrop"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="main-panel" id="home">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={23} />
          </button>

          <div className="mobile-brand">World<strong>Play</strong></div>

          <div className="search-box">
            <Search size={19} />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search cities, places..."
              aria-label="Search cities"
            />
            <kbd>⌕</kbd>
          </div>

          <button
            className="icon-button notification-button"
            aria-label="Notifications"
            onClick={() => setNotice('You are all caught up!')}
          >
            <Bell size={20} />
            <i />
          </button>

          <div className="wallet-pill">
            <span className="coin-icon"><Coins size={17} /></span>
            <div>
              <small>MY COINS</small>
              <strong>{wallet.toLocaleString()}</strong>
            </div>
            <button
              aria-label="Add demo coins"
              onClick={() => {
                setWallet(current => current + 100)
                setNotice('100 demo coins added to your wallet.')
              }}
            >+</button>
          </div>

          <button
            className="profile-button"
            onClick={() => setActiveTab('My Character')}
            aria-label="My profile"
          >
            <span>Y</span>
          </button>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="online-dot" /> YOUR NEXT ADVENTURE STARTS HERE</div>
              <h1>Welcome to your <span>world.</span></h1>
              <p>Discover cities, meet people, and live your story.</p>
            </div>
            <div className="welcome-location"><MapPin size={17} /> Global world</div>
          </section>

          <section className="hero-banner">
            <img
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2600&q=90"
              alt="Large modern city skyline at night"
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <span className="hero-tag"><Zap size={13} /> YOUR WORLD IS WAITING</span>
              <h2>Life is better<br />when it's <em>your world.</em></h2>
              <p>Explore beautiful destinations, create your identity, and discover new adventures.</p>
              <button className="primary-button" onClick={() => document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore cities <ChevronRight size={17} />
              </button>
            </div>
            <div className="hero-stats">
              <div><strong>06</strong><span>Featured cities</span></div>
              <div><strong>24/7</strong><span>Your world</span></div>
              <div><strong>∞</strong><span>Possibilities</span></div>
            </div>
          </section>

          <section className="section-block" id="cities">
            <div className="section-title-row">
              <div>
                <span className="eyebrow">FIND YOUR NEXT DESTINATION</span>
                <h2>Explore big cities</h2>
              </div>
              <button className="text-button" onClick={() => setNotice('More cities will be added as the world grows.')}>
                View all <ChevronRight size={16} />
              </button>
            </div>

            <div className="city-grid">
              {visibleCities.map((city, index) => (
                <article className={`city-card ${index === 0 ? 'city-featured' : ''}`} key={city.name}>
                  <img src={city.image} alt={`${city.name} city skyline`} loading={index > 1 ? 'lazy' : 'eager'} />
                  <div className="city-card-shade" />
                  <button
                    className={`like-button ${liked.includes(index + 1) ? 'is-liked' : ''}`}
                    onClick={() => toggleLike(index + 1)}
                    aria-label={`Like ${city.name}`}
                  >
                    <Heart size={17} fill={liked.includes(index + 1) ? 'currentColor' : 'none'} />
                  </button>
                  <div className="city-card-info">
                    <span className="city-country"><MapPin size={12} /> {city.country}</span>
                    <h3>{city.name}</h3>
                    <div className="city-bottom">
                      <span>{city.population} residents</span>
                      <button onClick={() => joinCity(city)} aria-label={`Explore ${city.name}`}>
                        <ChevronRight size={19} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {visibleCities.length === 0 && (
              <p className="empty-state">No cities found. Try another search.</p>
            )}
          </section>

          <section className="section-block" id="avatars">
            <div className="section-title-row">
              <div>
                <span className="eyebrow">YOUR IDENTITY, YOUR STYLE</span>
                <h2>Meet your characters</h2>
              </div>
              <button className="text-button" onClick={() => setNotice('Avatar customisation will be added in a future update.')}>
                Customise <ChevronRight size={16} />
              </button>
            </div>

            <div className="avatar-grid">
              {avatars.map((avatar, index) => (
                <button
                  className="avatar-card"
                  key={avatar.name}
                  onClick={() => setNotice(`${avatar.name} selected. Avatar customisation is a preview.`)}
                >
                  <div className="avatar-art" style={{ '--avatar-color': avatar.color } as React.CSSProperties}>
                    <div className="avatar-halo" />
                    <div className={`avatar-person person-${index}`}>
                      <div className="avatar-hair" />
                      <div className="avatar-face">
                        <span className="avatar-eyes">••</span>
                        <span className="avatar-smile">⌣</span>
                      </div>
                      <div className="avatar-body" />
                    </div>
                    <span className="avatar-level">LVL {index + 1}</span>
                  </div>
                  <div className="avatar-meta">
                    <strong>{avatar.name}</strong>
                    <span>{avatar.style}</span>
                  </div>
                  <span className="avatar-arrow"><ChevronRight size={16} /></span>
                </button>
              ))}
            </div>
          </section>

          <section className="section-block" id="vehicles">
            <div className="section-title-row">
              <div>
                <span className="eyebrow">CHOOSE YOUR RIDE</span>
                <h2>Vehicles & transport</h2>
              </div>
              <button className="text-button" onClick={() => setNotice('More vehicles will be added soon.')}>
                All vehicles <ChevronRight size={16} />
              </button>
            </div>

            <div className="transport-types">
              {[
                { name: 'All', icon: Compass },
                { name: 'Cars', icon: CarFront },
                { name: 'Motorcycles', icon: Bike },
                { name: 'Vans', icon: Bus },
                { name: 'Napep', icon: CarFront },
                { name: 'Bicycles', icon: Bike },
              ].map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  className={vehicleType === name ? 'transport-active' : ''}
                  onClick={() => {
                    setVehicleType(name)
                    if (name === 'Napep') setNotice('Napep / tricycle vehicles are planned for the next catalogue update.')
                  }}
                >
                  <Icon size={17} /> {name}
                </button>
              ))}
            </div>

            <div className="vehicle-grid">
              {visibleVehicles.map(vehicle => (
                <article className="vehicle-card" key={vehicle.name}>
                  <div className="vehicle-image">
                    <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                    <span className="vehicle-type">{vehicle.type}</span>
                  </div>
                  <div className="vehicle-info">
                    <div><h3>{vehicle.name}</h3><p>{vehicle.price}</p></div>
                    <button
                      onClick={() => setNotice(`${vehicle.name} is a demo listing. Purchasing is not connected.`)}
                      aria-label={`View ${vehicle.name}`}
                    ><ChevronRight size={18} /></button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="community-banner">
            <div className="community-icon"><Users size={25} /></div>
            <div>
              <span className="eyebrow">YOUR PEOPLE. YOUR STORIES.</span>
              <h2>Your next story starts with a friend.</h2>
              <p>Meet new people, build your community, and make every city feel like home.</p>
            </div>
            <button className="primary-button" onClick={() => setNotice('Friends and messaging are not connected yet.')}>
              Find friends <ChevronRight size={17} />
            </button>
          </section>

          <footer className="page-footer">
            <div className="brand-footer">World<strong>Play</strong></div>
            <span>Your world. Your story.</span>
            <span>WorldPlay preview · 2026</span>
          </footer>
        </div>

        <nav className="mobile-nav">
          {[
            { label: 'Home', icon: House, target: 'home' },
            { label: 'Cities', icon: Map, target: 'cities' },
            { label: 'Rides', icon: CarFront, target: 'vehicles' },
            { label: 'People', icon: Users, target: 'avatars' },
            { label: 'Profile', icon: UserRound, target: 'avatars' },
          ].map(({ label, icon: Icon, target }) => (
            <button
              key={label}
              className={activeTab === label || (label === 'Home' && activeTab === 'Home') ? 'mobile-nav-active' : ''}
              onClick={() => {
                setActiveTab(label)
                document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Icon size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {selectedCity && (
        <div className="modal-backdrop" onClick={() => setSelectedCity(null)}>
          <div className="city-modal" onClick={event => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCity(null)} aria-label="Close">
              <X size={20} />
            </button>
            <img src={selectedCity.image} alt={selectedCity.name} />
            <div className="city-modal-body">
              <span className="eyebrow"><MapPin size={13} /> {selectedCity.country}</span>
              <h2>{selectedCity.name}</h2>
              <p>Discover the city, explore its streets, and make it part of your WorldPlay journey.</p>
              <button className="primary-button" onClick={() => {
                setNotice(`${selectedCity.name} entry is a preview; live city simulation is not connected yet.`)
                setSelectedCity(null)
              }}>
                Enter city <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={16} /></button>
        </div>
      )}
    </main>
  )
         }
