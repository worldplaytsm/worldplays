import { Home, Users, Newspaper, UserRound, X } from 'lucide-react'
import type { Tab } from './data'

export function Avatar({ name, hue, size = 44, dot }: { name: string; hue: number; size?: number; dot?: boolean }) {
  return (
    <span className="avatar" style={{ width: size, height: size, background: `hsl(${hue} 55% 42%)`, fontSize: size * 0.4 }}>
      {name[0]}
      {dot && <i className="presence-dot" />}
    </span>
  )
}

const navItems = [
  { label: 'Home' as Tab, Icon: Home },
  { label: 'Friend' as Tab, Icon: Users },
  { label: 'Feed' as Tab, Icon: Newspaper },
  { label: 'Me' as Tab, Icon: UserRound },
]

export function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map(({ label, Icon }) => (
        <button key={label} className={tab === label ? 'nav-item active' : 'nav-item'} onClick={() => onChange(label)}>
          <Icon size={22} strokeWidth={tab === label ? 2.5 : 1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null
  return (
    <div className="toast" role="status">
      {message}
      <button onClick={onClose} aria-label="Close"><X size={14} /></button>
    </div>
  )
}
