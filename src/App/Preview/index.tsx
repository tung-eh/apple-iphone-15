import { useState, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { twMerge } from 'tailwind-merge'

import Iphone from './Iphone'
import { models, sizes, type Size } from './constants'

const Preview = () => {
  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, [])

  const [modelIndex, setModelIndex] = useState(0)
  const model = models[modelIndex]

  const [size, setSize] = useState<Size['value']>('small')

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
                <OrbitControls
                  makeDefault
                  enableZoom={false}
                  enablePan={false}
                  rotateSpeed={0.4}
                  target={new THREE.Vector3(0, 0, 0)}
                />
                <Iphone scale={[17, 17, 17]} style={model} />
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
