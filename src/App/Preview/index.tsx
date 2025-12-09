import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { twMerge } from 'tailwind-merge'

import { useUpdateEffect } from 'src/hooks'

import ModelView from './ModelView'
import { models, sizes, type Size } from './constants'

const Preview = () => {
  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, [])

  const [modelIndex, setModelIndex] = useState(0)
  const model = models[modelIndex]

  const [size, setSize] = useState<Size['value']>('small')

  useUpdateEffect(() => {
    if (size === 'large') {
      gsap.to('.model-view', {
        transform: 'translateX(-100%)',
        duration: 2,
        ease: 'power2.inOut',
      })
    } else {
      gsap.to('.model-view', {
        transform: 'translateX(0)',
        duration: 2,
        ease: 'power2.inOut',
      })
    }
  }, [size])

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView size="small" model={model} />
            <ModelView size="large" model={model} className="right-[-100%]" />
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')!}
            >
              <View.Port />
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
