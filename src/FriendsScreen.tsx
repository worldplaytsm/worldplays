import { useState } from 'react'
import { Search, UserPlus, ChevronLeft, Phone, Video, Send, Smile } from 'lucide-react'
import { Avatar } from '../components'
import { friends, seedChat } from '../data'
import type { Friend, Message, Notify } from '../data'

type Filter = 'All' | 'Online' | 'Requests'
const presenceText = (f: Friend) => (f.presence === 'online' ? 'Online' : f.presence === 'in-game' ? 'In game' : 'Offline')

export function FriendsScreen({ onChat, notify }: { onChat: (id: string) => void; notify: Notify }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const onlineNow = friends.filter(f => f.presence !== 'offline')
  const list = friends.filter(f => (filter === 'Online' ? f.presence === 'online' : true) && f.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className="screen">
      <div className="bar">
        <h1>Friends</h1>
        <button className="round ghost" onClick={() => setSearching(s => !s)} aria-label="Search"><Search size={19} /></button>
        <button className="round ghost" onClick={() => notify('Add-friend search arrives in Stage 2.')} aria-label="Add friend"><UserPlus size={19} /></button>
      </div>
      {searching && <input className="field" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search friends" />}

      <div className="segments">
        {(['All', 'Online', 'Requests'] as Filter[]).map(f => (
          <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
            {f}{f === 'Requests' && <em>3</em>}
          </button>
        ))}
      </div>

      {filter === 'Requests' ? (
        <p className="empty">3 pending requests. Accepting requests arrives in Stage 2.</p>
      ) : (
        <>
          <h2 className="sub">Online Now</h2>
          <div className="online-row">
            {onlineNow.map(f => (
              <button key={f.id} onClick={() => onChat(f.id)}><Avatar name={f.name} hue={f.hue} size={54} dot /><span>{f.name.replace('Playz', '')}</span></button>
            ))}
          </div>

          <h2 className="sub">All Friends ({friends.length + 118})</h2>
          <ul className="friend-list">
            {list.map(f => (
              <li key={f.id}>
                <Avatar name={f.name} hue={f.hue} />
                <div><b>{f.name}</b><small className={f.presence !== 'offline' ? 'up' : ''}>{presenceText(f)} · {f.city}</small></div>
                <button className={f.presence === 'offline' ? 'btn-ghost' : 'btn-blue'} onClick={() => onChat(f.id)}>{f.presence === 'offline' ? 'Message' : 'Chat'}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}

export function ChatScreen({ friendId, onBack, notify }: { friendId: string; onBack: () => void; notify: Notify }) {
  const friend = friends.find(f => f.id === friendId) ?? friends[0]
  const [messages, setMessages] = useState<Message[]>(friend.id === 'maya' ? seedChat : [])
  const [draft, setDraft] = useState('')
  const send = () => {
    const text = draft.trim()
    if (!text) return
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    setMessages(m => [...m, { from: 'me', text, time }])
    setDraft('')
  }
  return (
    <main className="screen chat">
      <div className="bar">
        <button className="round ghost" onClick={onBack} aria-label="Back"><ChevronLeft size={22} /></button>
        <Avatar name={friend.name} hue={friend.hue} size={38} />
        <div className="chat-title"><b>{friend.name}</b><small className={friend.presence !== 'offline' ? 'up' : ''}>● {presenceText(friend)}</small></div>
        <button className="round ghost" onClick={() => notify('Calls are not connected yet.')} aria-label="Call"><Phone size={18} /></button>
        <button className="round ghost" onClick={() => notify('Video is not connected yet.')} aria-label="Video"><Video size={18} /></button>
      </div>
      <div className="messages">
        {messages.length === 0 && <p className="empty">Say hi to {friend.name} 👋</p>}
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}><span>{m.text}</span><small>{m.time}</small></div>
        ))}
      </div>
      <div className="composer">
        <Smile size={20} color="#8fa0bd" />
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." />
        <button className="send" onClick={send} aria-label="Send"><Send size={18} /></button>
      </div>
    </main>
  )
}
