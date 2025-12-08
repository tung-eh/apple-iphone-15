import { useState, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { twMerge } from 'tailwind-merge'

import yellowImg from '/assets/images/yellow.jpg'
import blueImg from '/assets/images/blue.jpg'
import whiteImg from '/assets/images/white.jpg'
import blackImg from '/assets/images/black.jpg'

import Iphone from './Iphone'

const models = [
  {
    id: 1,
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
    img: yellowImg,
  },
  {
    id: 2,
    title: 'iPhone 15 Pro in Blue Titanium',
    color: ['#53596E', '#6395ff', '#21242e'],
    img: blueImg,
  },
  {
    id: 3,
    title: 'iPhone 15 Pro in White Titanium',
    color: ['#C9C8C2', '#ffffff', '#C9C8C2'],
    img: whiteImg,
  },
  {
    id: 4,
    title: 'iPhone 15 Pro in Black Titanium',
    color: ['#454749', '#3b3b3b', '#181819'],
    img: blackImg,
  },
]

const sizes = [
  { label: '6.1"', value: 'small' },
  { label: '6.7"', value: 'large' },
]

const Preview = () => {
  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, [])

  const [modelIndex, setModelIndex] = useState(0)
  const model = models[modelIndex]

  const [size, setSize] = useState<(typeof sizes)[number]['value']>('small')

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <Canvas className="h-full w-full">
              <Suspense fallback={null}>
                <Iphone scale={[17, 17, 17]} />
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  decay={0}
                  intensity={Math.PI}
                />
                <pointLight
                  position={[-10, -10, -10]}
                  decay={0}
                  intensity={Math.PI}
                />
              </Suspense>
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li
                    key={index}
                    className={twMerge(
                      'w-6 h-6 rounded-full mx-2 cursor-pointer',
                      index === modelIndex && 'ring-white ring-1 ring-offset-1'
                    )}
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModelIndex(index)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Preview
