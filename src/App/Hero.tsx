import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

import heroVideoSrc from '/assets/videos/hero.mp4'
import smallVideoSrc from '/assets/videos/smallHero.mp4'

const Hero = () => {
  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 1.5 })
  })

  const isMobile = useMediaQuery({ maxWidth: 767 })
  const videoSrc = isMobile ? smallVideoSrc : heroVideoSrc

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

export default Hero
