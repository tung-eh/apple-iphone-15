import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

import highlightFirstVideo from '/assets/videos/highlight-first.mp4'
import highlightSecondVideo from '/assets/videos/hightlight-third.mp4'
import highlightThirdVideo from '/assets/videos/hightlight-sec.mp4'
import highlightFourthVideo from '/assets/videos/hightlight-fourth.mp4'

import pauseImg from '/assets/images/pause.svg'
import playImg from '/assets/images/play.svg'
import replayImg from '/assets/images/replay.svg'

import { useUpdateEffect } from 'src/hooks'

const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      'Enter A17 Pro.',
      'Game‑changing chip.',
      'Groundbreaking performance.',
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ['Titanium.', 'So strong. So light. So Pro.'],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      'iPhone 15 Pro Max has the',
      'longest optical zoom in',
      'iPhone ever. Far out.',
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ['All-new Action button.', 'What will yours do?.'],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
]

const slideCount = hightlightsSlides.length

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ maxWidth: 1279 })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const isEnded = currentIndex === slideCount

  useGSAP(() => {
    if (currentIndex < slideCount) {
      gsap.to('#slider', {
        transform: `translateX(${-100 * currentIndex}%)`,
        duration: 2,
        ease: 'power2.inOut',
      })

      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: videoRef.current,
          toggleActions: 'restart none none none',
        },
        onComplete: () => {
          videoRef.current?.play()
        },
      })
    }

    if (currentIndex > 0) {
      gsap.to(document.getElementById(`progress_${currentIndex - 1}`), {
        width: '12px',
      })
      gsap.to(document.getElementById(`progress_${currentIndex - 1}_inner`), {
        width: '100%',
        backgroundColor: '#afafaf',
      })
    }

    gsap.to(document.getElementById(`progress_${currentIndex}`), {
      width: isMobile ? '10vw' : isTablet ? '10vw' : '4vw',
    })
    gsap.to(document.getElementById(`progress_${currentIndex}_inner`), {
      width: 0,
      backgroundColor: 'white',
    })
  }, [currentIndex])

  useEffect(() => {
    const animateProgressBar = () => {
      const video = videoRef.current
      const bar = document.getElementById(`progress_${currentIndex}_inner`)

      if (!video) return

      const progress = (video.currentTime / video.duration) * 100
      gsap.set(bar, { width: progress + '%' })
    }

    gsap.ticker.add(animateProgressBar)

    return () => gsap.ticker.remove(animateProgressBar)
  }, [currentIndex])

  useUpdateEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isPlaying])

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                {index === currentIndex ? (
                  <video
                    ref={videoRef}
                    playsInline={true}
                    preload="auto"
                    muted
                    onEnded={() => {
                      setCurrentIndex(currentIndex + 1)
                    }}
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                ) : (
                  <video playsInline={true} preload="auto" muted>
                    <source src={list.video} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, index) => (
            <span
              key={index}
              id={`progress_${index}`}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                id={`progress_${index}_inner`}
                className="absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>
        {isEnded ? (
          <button className="control-btn" onClick={() => setCurrentIndex(0)}>
            <img src={replayImg} alt={'replay'} />
          </button>
        ) : isPlaying ? (
          <button className="control-btn" onClick={() => setIsPlaying(false)}>
            <img src={pauseImg} alt={'pause'} />
          </button>
        ) : (
          <button className="control-btn" onClick={() => setIsPlaying(true)}>
            <img src={playImg} alt={'play'} />
          </button>
        )}
      </div>
    </>
  )
}

export default VideoCarousel
