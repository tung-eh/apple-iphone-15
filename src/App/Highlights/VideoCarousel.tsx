import highlightFirstVideo from '/assets/videos/highlight-first.mp4'
import highlightSecondVideo from '/assets/videos/hightlight-third.mp4'
import highlightThirdVideo from '/assets/videos/hightlight-sec.mp4'
import highlightFourthVideo from '/assets/videos/hightlight-fourth.mp4'

import pauseImg from '/assets/images/pause.svg'

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

const VideoCarousel = () => {
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video id="video" playsInline={true} preload="auto" muted>
                  <source src={list.video} type="video/mp4" />
                </video>
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
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span className="absolute h-full w-full rounded-full" />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img src={pauseImg} alt={'pause'} />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
