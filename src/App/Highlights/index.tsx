import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import watchImg from '/assets/images/watch.svg'
import rightImg from '/assets/images/right.svg'

import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  const scrollTrigger = {
    trigger: '#highlights',
    toggleActions: 'restart reverse restart reverse',
    start: 'top 85%',
  }

  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      y: 0,
      scrollTrigger,
    })
    gsap.to('.link', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
      scrollTrigger,
    })
  })

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights
