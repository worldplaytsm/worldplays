import { useCallback, useRef, useState } from 'react'
import { BottomNav, Toast } from './components'
import type { Overlay, Tab } from './data'
import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'
import { ChatScreen, FriendsScreen } from './screens/FriendsScreen'
import { FeedScreen, ProfileScreen } from './screens/FeedProfile'

export default function App() {
  const [tab, setTab] = useState<Tab>('Home')
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [notice, setNotice] = useState('')
  const timer = useRef<number | undefined>(undefined)

  const notify = useCallback((message: string) => {
    setNotice(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setNotice(''), 2400)
  }, [])

  const changeTab = (t: Tab) => { setOverlay(null); setTab(t) }

  let body
  if (overlay?.kind === 'map') {
    body = <MapScreen onBack={() => setOverlay(null)} onChat={() => { setTab('Friend'); setOverlay(null) }} notify={notify} />
  } else if (overlay?.kind === 'chat') {
    body = <ChatScreen friendId={overlay.friendId} onBack={() => setOverlay(null)} notify={notify} />
  } else if (tab === 'Home') {
    body = <HomeScreen onEnterCity={() => setOverlay({ kind: 'map' })} onTab={changeTab} notify={notify} />
  } else if (tab === 'Friend') {
    body = <FriendsScreen onChat={id => setOverlay({ kind: 'chat', friendId: id })} notify={notify} />
  } else if (tab === 'Feed') {
    body = <FeedScreen notify={notify} />
  } else {
    body = <ProfileScreen notify={notify} />
  }

  return (
    <div className="phone">
      {body}
      <Toast message={notice} onClose={() => setNotice('')} />
      <BottomNav tab={tab} onChange={changeTab} />
    </div>
  )
}
