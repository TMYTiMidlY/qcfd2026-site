import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ChairIntro } from '@/components/ChairIntro'
import { GuestSection } from '@/components/GuestSection'
import { TopicGrid } from '@/components/TopicGrid'
import { SpeakerGrid } from '@/components/SpeakerCard'
import { Schedule } from '@/components/Schedule'
import { Handbook } from '@/components/Handbook'
import { VenueMap } from '@/components/VenueMap'
import { Traffic } from '@/components/Traffic'
import { NewsList } from '@/components/NewsList'
import { Footer } from '@/components/Footer'
import { Notifications } from '@/components/Notifications'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Notifications />
      <main>
        <Hero />
        <ChairIntro />
        <GuestSection />
        <TopicGrid />
        <SpeakerGrid />
        <Schedule />
        <Handbook />
        <VenueMap />
        <Traffic />
        <NewsList />
      </main>
      <Footer />
    </div>
  )
}
