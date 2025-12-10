import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import Navbar from './Navbar'
import Hero from './Hero'
import Highlights from './Highlights'
import Preview from './Preview'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Footer from './Footer'

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
      <Footer />
    </main>
  )
}

export default App
