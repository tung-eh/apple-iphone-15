import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import Navbar from './Navbar'
import Hero from './Hero'
import Highlights from './Highlights'
import Preview from './Preview'
import Features from './Features'
import HowItWorks from './HowItWorks'

gsap.registerPlugin(ScrollTrigger)

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Preview />
      <Features />
      <HowItWorks />
    </main>
  )
}

export default App
