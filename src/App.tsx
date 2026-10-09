import {
  House, Users, Newspaper, UserRound, Coins, ShoppingBag,
  CarFront, Sofa, Shirt, LockKeyhole
} from 'lucide-react'
  House, Users, Newspaper, UserRound, Coins, ShoppingBag,
  CarFront, Sofa, Shirt, Check, LockKeyhole, RotateCcw
} from 'lucide-react'

type Item = {
  id: number
  name: string
  category: 'Homes' | 'Vehicles' | 'Furniture' | 'Fashion'
  price: number
  cashPrice: string
  description: string
  color: string
  premium: boolean
}

const items: Item[] = [
  { id: 1, name: 'Luxe Penthouse', category: 'Homes', price: 250000, cashPrice: '$4.99', description: 'A modern skyline apartment with panoramic windows.', color: '#8e5de7', premium: true },
  { id: 2, name: 'Sunset Villa', category: 'Homes', price: 420000, cashPrice: '$7.99', description: 'A spacious villa with a private driveway.', color: '#d9a441', premium: true },
  { id: 3, name: 'Vortex GT', category: 'Vehicles', price: 250000, cashPrice: '$3.99', description: 'A high-performance luxury sports car.', color: '#e5a12d', premium: true },
  { id: 4, name: 'Regalia RS', category: 'Vehicles', price: 400000, cashPrice: '$5.99', description: 'A premium grand touring car.', color: '#5f91ce', premium: true },
  { id: 5, name: 'Royal Living Set', category: 'Furniture', price: 65000, cashPrice: '$1.99', description: 'A velvet sofa set with a marble coffee table.', color: '#d47fbd', premium: true },
  { id: 6, name: 'Neon Lounge Kit', category: 'Furniture', price: 85000, cashPrice: '$2.49', description: 'Ambient lighting and luxury room decor.', color: '#bb63ee', premium: true },
  { id: 7, name: 'Signature Outfit', category: 'Fashion', price: 30000, cashPrice: '$0.99', description: 'A distinctive outfit for your character.', color: '#4fb7a6', premium: true },
  { id: 8, name: 'Streetwear Pack', category: 'Fashion', price: 18000, cashPrice: '$0.79', description: 'Casual city clothing and accessories.', color: '#de6b64', premium: true },
]

function CityScene() {
  const buildings = useMemo(() => Array.from({ length: 38 }, (_, i) => ({
    x: (i % 13) * 1.8 - 10.8,
    z: Math.floor(i / 13) * -2.7 - 2,
    h: 1.4 + ((i * 7) % 8) * 0.43,
    w: 0.7 + ((i * 3) % 4) * 0.12,
    color: ['#26364b', '#34485b', '#4b4b5c', '#5a5360', '#2c454e'][i % 5],
  })), [])

  return (
    <>
      <color attach="background" args={['#111722']} />
      <fog attach="fog" args={['#111722', 13, 36]} />
      <ambientLight intensity={1.35} />
      <directionalLight position={[7, 12, 5]} intensity={2.1} castShadow />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, -5]} receiveShadow>
        <planeGeometry args={[50, 45]} />
        <meshStandardMaterial color="#202b32" roughness={0.9} />
      </mesh>
      <gridHelper args={[40, 40, '#46515b', '#2c3841']} position={[0, -0.04, -5]} />
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2, b.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[b.w, b.h, 0.9]} />
            <meshStandardMaterial color={b.color} roughness={0.72} metalness={0.12} />
          </mesh>
          {Array.from({ length: Math.max(2, Math.floor(b.h * 2)) }, (_, n) => (
            <mesh key={n} position={[0, -b.h / 2 + 0.25 + n * 0.34, 0.461]}>
              <boxGeometry args={[b.w * 0.48, 0.1, 0.018]} />
              <meshStandardMaterial color={n % 3 === 0 ? '#f5c879' : '#7fc8db'} emissive={n % 3 === 0 ? '#9b6525' : '#204e5c'} emissiveIntensity={0.45} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 0.04, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 22]} />
        <meshStandardMaterial color="#34383d" />
      </mesh>
      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, 0.055, 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.055, 22]} />
          <meshBasicMaterial color="#e3bb62" />
        </mesh>
      ))}
      <group position={[0, 0.28, 1.1]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.42, 1.7]} />
          <meshStandardMaterial color="#c99435" metalness={0.45} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.24, -0.08]}>
          <boxGeometry args={[0.78, 0.28, 0.78]} />
          <meshStandardMaterial color="#a7cbd4" metalness={0.3} roughness={0.18} />
        </mesh>
        {[-0.38, 0.38].flatMap((x) => [-0.52, 0.52].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.18, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.12, 20]} />
            <meshStandardMaterial color="#101216" roughness={0.85} />
          </mesh>
        )))}
      </group>
      <Stars radius={60} depth={20} count={450} factor={2} fade speed={0.25} />
      <OrbitControls enablePan={false} minDistance={8} maxDistance={24} maxPolarAngle={Math.PI / 2.05} />
    </>
  )
}

function ProductArt({ item }: { item: Item }) {
  return (
    <div className="product-art" style={{ '--art-color': item.color } as React.CSSProperties}>
      {item.category === 'Vehicles' ? <CarFront size={66} strokeWidth={1.15} /> :
        item.category === 'Furniture' ? <Sofa size={66} strokeWidth={1.15} /> :
          item.category === 'Fashion' ? <Shirt size={66} strokeWidth={1.15} /> :
            <House size={66} strokeWidth={1.15} />}
      <span className="art-glow" />
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
  const filtered = items.filter((item) => category === 'All' || item.category === category)

  function buy(item: Item) {
    if (payment === 'coins') {
      if (wallet < item.price) {
        setNotice(`Not enough coins for ${item.name}. This is a demo store; no payment was made.`)
        return
      }
      setWallet((current) => current - item.price)
      setNotice(`${item.name} purchased in demo mode. No real payment was taken.`)
    } else {
      setNotice(`Real-money checkout is not connected yet. ${item.cashPrice} is a sample price only.`)
    }
    setSelected(null)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand">World<span>Play</span></div>
          <div className="location"><span className="live-dot" /> Abuja District · 3D City</div>
        </div>
        <div className="wallet"><Coins size={17} /><div><small>WALLET</small><strong>{wallet.toLocaleString()}</strong></div></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR WORLD. YOUR STORY.</span>
          <h1>Explore beyond<br /><em>ordinary.</em></h1>
          <p>A growing 3D virtual city. Discover places, customise your home, and collect what makes your world yours.</p>
          <button className="gold-button" onClick={() => setTab('Home')}>Explore city <span>↗</span></button>
        </div>
        <div className="city-canvas">
          <Canvas shadows camera={{ position: [8, 7, 11], fov: 43 }} dpr={[1, 1.5]}>
            <CityScene />
          </Canvas>
          <div className="scene-label"><span className="live-dot" /> LIVE CITY PREVIEW</div>
          <div className="scene-note">Drag to look around</div>
        </div>
      </section>

      <section className="store-section">
        <div className="section-heading">
          <div><span className="eyebrow">WORLDPLAY MARKETPLACE</span><h2>Premium Store</h2></div>
          <ShoppingBag className="heading-icon" size={26} />
        </div>
        <p className="section-description">Some things are free. The finest things are yours to unlock.</p>
        <div className="payment-switch">
          <button className={payment === 'coins' ? 'selected' : ''} onClick={() => setPayment('coins')}><Coins size={17} /> Game Coins</button>
          <button className={payment === 'money' ? 'selected' : ''} onClick={() => setPayment('money')}>Real Money</button>
        </div>
        {payment === 'money' && <div className="info-note"><LockKeyhole size={16} /> Real-money checkout is a preview only. Payments are not enabled.</div>}
        <div className="category-list">
          {['All', 'Homes', 'Vehicles', 'Furniture', 'Fashion'].map((name) => (
            <button key={name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name}</button>
          ))}
        </div>
        <div className="product-grid">
          {filtered.map((item) => (
            <article className="product-card" key={item.id}>
              <ProductArt item={item} />
              <div className="product-content">
                <div className="product-category">{item.category} · PREMIUM</div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price-row">
                  <strong>{payment === 'coins' ? `${item.price.toLocaleString()} coins` : item.cashPrice}</strong>
                  <button className="buy-button" onClick={() => setSelected(item)}>View</button>
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
          <button key={label} className={tab === label ? 'nav-item active' : 'nav-item'} onClick={() => setTab(label)}>
            <Icon size={24} strokeWidth={tab === label ? 2.4 : 1.8} />
            <span>{label}</span>
          </button>
        ))}
      </footer>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
        <div className="purchase-modal" onClick={(event) => event.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
          <ProductArt item={selected} />
          <div className="product-category">PREMIUM ITEM</div>
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          <div className="modal-price">{payment === 'coins' ? `${selected.price.toLocaleString()} coins` : selected.cashPrice}</div>
          <div className="modal-payment-label">Payment method: <strong>{payment === 'coins' ? 'Game Coins' : 'Real Money'}</strong></div>
          <button className="gold-button full-width" onClick={() => buy(selected)}>{payment === 'coins' ? 'Buy with coins' : 'Continue to checkout'}</button>
          <div className="safe-note"><LockKeyhole size={14} /> Demo only. No real payment is processed.</div>
        </div>
      </div>}

      {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss">×</button></div>}
    </main>
  )
}
