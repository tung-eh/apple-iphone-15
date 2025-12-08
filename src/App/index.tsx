import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import Navbar from './Navbar'
import Hero from './Hero'
import Highlights from './Highlights'
import Model from './Model'

gsap.registerPlugin(ScrollTrigger)

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
    </main>
  )
}

export default App
