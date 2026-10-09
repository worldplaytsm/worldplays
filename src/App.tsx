
import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import {
  House,
  Users,
  Newspaper,
  UserRound,
  Coins,
  ShoppingBag,
  CarFront,
  Sofa,
  Shirt,
  LockKeyhole,
} from 'lucide-react'
import './styles.css'

type Category = 'Homes' | 'Vehicles' | 'Furniture' | 'Fashion'

type Item = {
  id: number
  name: string
  category: Category
  price: number
  cashPrice: string
  description: string
  color: string
}

const items: Item[] = [
  { id: 1, name: 'Luxe Penthouse', category: 'Homes', price: 250000, cashPrice: '$4.99', description: 'A modern apartment overlooking the city.', color: '#8e5de7' },
  { id: 2, name: 'Sunset Villa', category: 'Homes', price: 420000, cashPrice: '$7.99', description: 'A spacious villa with a private driveway.', color: '#d9a441' },
  { id: 3, name: 'Vortex GT', category: 'Vehicles', price: 250000, cashPrice: '$3.99', description: 'A luxury sports car for your virtual garage.', color: '#e5a12d' },
  { id: 4, name: 'Regalia RS', category: 'Vehicles', price: 400000, cashPrice: '$5.99', description: 'A premium grand touring car.', color: '#5f91ce' },
  { id: 5, name: 'Royal Living Set', category: 'Furniture', price: 65000, cashPrice: '$1.99', description: 'A stylish sofa set for your dream home.', color: '#d47fbd' },
  { id: 6, name: 'Neon Lounge Kit', category: 'Furniture', price: 85000, cashPrice: '$2.49', description: 'Modern lights and room decorations.', color: '#bb63ee' },
  { id: 7, name: 'Signature Outfit', category: 'Fashion', price: 30000, cashPrice: '$0.99', description: 'A distinctive look for your character.', color: '#4fb7a6' },
  { id: 8, name: 'Streetwear Pack', category: 'Fashion', price: 18000, cashPrice: '$0.79', description: 'Casual clothing and accessories.', color: '#de6b64' },
]

function CityScene() {
  const buildings = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        x: (i % 9) * 2.1 - 8.4,
        z: -Math.floor(i / 9) * 2.8 - 2,
        h: 1.5 + ((i * 7) % 8) * 0.42,
        color: ['#26364b', '#34485b', '#4b4b5c', '#2c454e'][i % 4],
      })),
    []
  )

  return (
    <>
      <color attach="background" args={['#101725']} />
      <fog attach="fog" args={['#101725', 15, 38]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[8, 12, 5]} intensity={2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -5]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#202b32" />
      </mesh>

      <gridHelper args={[40, 40, '#46515b', '#2c3841']} position={[0, -0.05, -5]} />

      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2, b.z]}>
          <mesh>
            <boxGeometry args={[1.05, b.h, 1.1]} />
            <meshStandardMaterial color={b.color} roughness={0.7} />
          </mesh>

          {Array.from({ length: Math.floor(b.h * 2) }, (_, n) => (
            <mesh key={n} position={[0, -b.h / 2 + 0.3 + n * 0.35, 0.56]}>
              <boxGeometry args={[0.48, 0.1, 0.025]} />
              <meshStandardMaterial
                color={n % 2 ? '#7fc8db' : '#f5c879'}
                emissive={n % 2 ? '#204e5c' : '#9b6525'}
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 0.03, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 24]} />
        <meshStandardMaterial color="#34383d" />
      </mesh>

      <Stars radius={60} depth={30} count={500} factor={2} fade speed={0.3} />

      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  )
}

function ProductArt({ item }: { item: Item }) {
  const Icon =
    item.category === 'Vehicles'
      ? CarFront
      : item.category === 'Furniture'
        ? Sofa
        : item.category === 'Fashion'
          ? Shirt
          : House

  return (
    <div
      className="product-art"
      style={{ '--art-color': item.color } as React.CSSProperties}
    >
      <Icon size={62} strokeWidth={1.3} />
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('Home')
  const [category, setCategory] = useState('All')
  const [wallet, setWallet] = useState(568)
  const [payment, setPayment] = useState<'coins' | 'money'>('coins')
  const [selected, setSelected] = useState<Item | null>(null)
  const [notice, setNotice] = useState('')

  const filtered = items.filter(
    item => category === 'All' || item.category === category
  )

  function buy(item: Item) {
    if (payment === 'money') {
      setNotice('Real-money payments are not connected yet.')
      return
    }

    if (wallet < item.price) {
      setNotice(`You do not have enough coins for ${item.name}.`)
      return
    }

    setWallet(current => current - item.price)
    setNotice(`${item.name} purchased in demo mode!`)
    setSelected(null)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand">
            World<span>Play</span>
          </div>
          <div className="location">Abuja District · Virtual City</div>
        </div>

        <div className="wallet">
          <Coins size={20} />
          <div>
            <small>YOUR WALLET</small>
            <strong>{wallet.toLocaleString()}</strong>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR WORLD. YOUR STORY.</span>
          <h1>
            Explore beyond <em>ordinary.</em>
          </h1>
          <p>
            Discover a virtual city, collect premium items,
            and create your own world.
          </p>
          <button className="gold-button" onClick={() => setTab('Home')}>
            Explore city ↗
          </button>
        </div>

        <div className="city-canvas">
          <Canvas camera={{ position: [8, 7, 11], fov: 43 }} dpr={[1, 1.5]}>
            <CityScene />
          </Canvas>
          <div className="scene-label">3D CITY PREVIEW</div>
          <div className="scene-note">Drag to look around</div>
        </div>
      </section>

      <section className="store-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WORLDPLAY MARKETPLACE</span>
            <h2>Premium Store</h2>
          </div>
          <ShoppingBag size={27} />
        </div>

        <p className="section-description">
          Discover homes, vehicles, furniture, and fashion.
        </p>

        <div className="payment-switch">
          <button
            className={payment === 'coins' ? 'selected' : ''}
            onClick={() => setPayment('coins')}
          >
            <Coins size={17} /> Game Coins
          </button>
          <button
            className={payment === 'money' ? 'selected' : ''}
            onClick={() => setPayment('money')}
          >
            Real Money
          </button>
        </div>

        {payment === 'money' && (
          <div className="info-note">
            <LockKeyhole size={16} />
            Checkout is a preview. No real payments are enabled.
          </div>
        )}

        <div className="category-list">
          {['All', 'Homes', 'Vehicles', 'Furniture', 'Fashion'].map(name => (
            <button
              key={name}
              className={category === name ? 'active' : ''}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map(item => (
            <article className="product-card" key={item.id}>
              <ProductArt item={item} />
              <div className="product-content">
                <div className="product-category">
                  {item.category} · PREMIUM
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>

                <div className="price-row">
                  <strong>
                    {payment === 'coins'
                      ? `${item.price.toLocaleString()} coins`
                      : item.cashPrice}
                  </strong>
                  <button
                    className="buy-button"
                    onClick={() => setSelected(item)}
                  >
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="bottom-nav">
        {[
          { label: 'Home', icon: House },
          { label: 'Friends', icon: Users },
          { label: 'Feed', icon: Newspaper },
          { label: 'Me', icon: UserRound },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={tab === label ? 'nav-item active' : 'nav-item'}
            onClick={() => setTab(label)}
          >
            <Icon size={23} />
            <span>{label}</span>
          </button>
        ))}
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="purchase-modal"
            onClick={event => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>

            <ProductArt item={selected} />
            <div className="product-category">PREMIUM ITEM</div>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>

            <div className="modal-price">
              {payment === 'coins'
                ? `${selected.price.toLocaleString()} coins`
                : selected.cashPrice}
            </div>

            <button
              className="gold-button full-width"
              onClick={() => buy(selected)}
            >
              {payment === 'coins' ? 'Buy with coins' : 'Continue to checkout'}
            </button>

            <p className="safe-note">
              Demo only. No real payment is processed.
            </p>
          </div>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
    </main>
  )
      }
