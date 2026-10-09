export type Tab = 'Home' | 'Friend' | 'Feed' | 'Me'
export type Overlay = { kind: 'map' } | { kind: 'chat'; friendId: string } | null
export type Notify = (message: string) => void

export const images = {
  main: '/city-main.jpg',
  a: '/city-a.jpg',
  b: '/city-b.jpg',
  c: '/city-c.jpg',
}

export const player = {
  name: 'AlexPlayz',
  city: 'Lagos, Nigeria',
  bio: 'Dream • Play • Build',
  tagline: 'Game | Explore | Connect',
  level: 12,
  xp: 1250,
  xpMax: 2000,
  coins: 24000,
  friends: 124,
  followers: '3.8K',
  following: '2.1K',
  temp: 28,
}

export interface Place { name: string; city: string; image: string }
export const topPlaces: Place[] = [
  { name: 'Lekki Beach', city: 'Lagos', image: images.a },
  { name: 'National Mosque', city: 'Abuja', image: images.b },
  { name: 'Tinubu Square', city: 'Lagos', image: images.c },
]

export interface MapPin { label: string; x: number; y: number }
export const mapPins: MapPin[] = [
  { label: 'Mall', x: 8, y: 14 },
  { label: 'Hospital', x: 40, y: 24 },
  { label: 'Market', x: 56, y: 38 },
  { label: 'Bus Terminal', x: 6, y: 50 },
  { label: 'Bank', x: 50, y: 56 },
  { label: 'Park', x: 14, y: 70 },
]

export type Presence = 'online' | 'in-game' | 'offline'
export interface Friend { id: string; name: string; city: string; presence: Presence; hue: number }
export const friends: Friend[] = [
  { id: 'maya', name: 'Maya', city: 'Lagos', presence: 'online', hue: 12 },
  { id: 'jay', name: 'Jay', city: 'Abuja', presence: 'online', hue: 200 },
  { id: 'zara', name: 'Zara', city: 'Lagos', presence: 'in-game', hue: 45 },
  { id: 'tunde', name: 'TundePlayz', city: 'Lagos', presence: 'offline', hue: 280 },
  { id: 'faith', name: 'FaithGamer', city: 'Abuja', presence: 'online', hue: 150 },
  { id: 'sunny', name: 'SunnyBoi', city: 'Port Harcourt', presence: 'offline', hue: 330 },
]

export interface Message { from: 'me' | 'them'; text: string; time: string }
export const seedChat: Message[] = [
  { from: 'me', text: 'Hey Maya 👋', time: '11:20 AM' },
  { from: 'them', text: "Hey Alex! 😀 How's it going?", time: '11:21 AM' },
  { from: 'me', text: 'All good! Just finished a job in Lagos. You?', time: '11:22 AM' },
  { from: 'them', text: "Nice! I'm at the Mall now. Wanna meet up?", time: '11:24 AM' },
  { from: 'me', text: "Sure! I'll be there in 10 mins.", time: '11:25 AM' },
  { from: 'them', text: 'Cool! See you there! 🚀', time: '11:26 AM' },
]

export interface Post { id: string; author: string; hue: number; when: string; city: string; text: string; image: string; likes: number; comments: number; shares: number }
export const posts: Post[] = [
  { id: 'p1', author: 'TundePlayz', hue: 280, when: '2h ago', city: 'Lagos', text: 'Just wrapped up a delivery job in Lagos! 🚚 This game is lit fr 💯', image: images.a, likes: 84, comments: 12, shares: 6 },
  { id: 'p2', author: 'FaithGamer', hue: 150, when: '5h ago', city: 'Abuja', text: 'New house in Abuja 😍 Big dreams, big moves!', image: images.b, likes: 120, comments: 18, shares: 8 },
]

export const profilePhotos = [images.a, images.b, images.c, images.main, images.b, images.a]
