import { useState } from 'react'
import { Camera, ThumbsUp, MessageCircle, Share2, MoreHorizontal, MapPin, BadgeCheck, Pencil, Settings } from 'lucide-react'
import { Avatar } from '../components'
import { images, player, posts, profilePhotos } from '../data'
import type { Notify } from '../data'

export function FeedScreen({ notify }: { notify: Notify }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  return (
    <main className="screen">
      <div className="bar"><h1>Feed</h1><button className="round ghost" onClick={() => notify('Camera arrives in Stage 2.')} aria-label="Camera"><Camera size={20} /></button></div>
      <button className="composer-card" onClick={() => notify('Post creation arrives in Stage 2.')}>
        <Avatar name="A" hue={25} size={38} /><span>What's on your mind?</span><Camera size={18} color="#2f8cff" />
      </button>
      {posts.map(p => (
        <article key={p.id} className="post">
          <div className="post-head">
            <Avatar name={p.author} hue={p.hue} size={38} />
            <div><b>{p.author}</b><small>{p.when} · {p.city}</small></div>
            <MoreHorizontal size={18} color="#7a869a" />
          </div>
          <p>{p.text}</p>
          <img src={p.image} alt={`Post by ${p.author}`} loading="lazy" />
          <div className="post-actions">
            <button className={liked[p.id] ? 'liked' : ''} onClick={() => setLiked(l => ({ ...l, [p.id]: !l[p.id] }))}>
              <ThumbsUp size={17} fill={liked[p.id] ? 'currentColor' : 'none'} /> {p.likes + (liked[p.id] ? 1 : 0)}
            </button>
            <button onClick={() => notify('Comments arrive in Stage 2.')}><MessageCircle size={17} /> {p.comments}</button>
            <button onClick={() => notify('Sharing arrives in Stage 2.')}><Share2 size={17} /> {p.shares}</button>
          </div>
        </article>
      ))}
    </main>
  )
}

export function ProfileScreen({ notify }: { notify: Notify }) {
  const pct = Math.round((player.xp / player.xpMax) * 100)
  return (
    <main className="screen profile">
      <div className="profile-cover" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,12,24,.05),rgba(8,12,24,.95)),url(${images.c})` }}>
        <button className="round" onClick={() => notify('Settings arrive in Stage 2.')} aria-label="Settings"><Settings size={18} /></button>
        <h1>{player.name} <BadgeCheck size={22} color="#2f8cff" /></h1>
        <p><MapPin size={13} /> {player.city}</p>
        <p>▷ {player.bio}</p>
      </div>
      <div className="level-card">
        <div><b>Level {player.level}</b><small>{player.xp.toLocaleString()} / {player.xpMax.toLocaleString()} XP</small></div>
        <div className="xp"><i style={{ width: `${pct}%` }} /></div>
      </div>
      <div className="counts">
        <div><b>{player.friends}</b><small>Friends</small></div>
        <div><b>{player.followers}</b><small>Followers</small></div>
        <div><b>{player.following}</b><small>Following</small></div>
      </div>
      <p className="tagline">{player.tagline}<br />Lagos to the world 🌍</p>
      <div className="edit-row">
        <button className="btn-blue wide" onClick={() => notify('Edit profile arrives in Stage 2.')}><Pencil size={15} /> Edit Profile</button>
        <button className="round ghost" onClick={() => notify('Settings arrive in Stage 2.')} aria-label="Settings"><Settings size={18} /></button>
      </div>
      <div className="tabs-mini"><b>Posts</b><span>Photos</span><span>Vehicles</span><span>Badges</span></div>
      <div className="photo-grid">{profilePhotos.map((src, i) => <img key={i} src={src} alt="" loading="lazy" />)}</div>
    </main>
  )
}
