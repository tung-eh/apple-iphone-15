import { Suspense, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import type { OrbitControls as OrbitControlsRef } from 'three-stdlib'
import { twMerge } from 'tailwind-merge'
import * as THREE from 'three'
import gsap from 'gsap'

import { useUpdateEffect } from 'src/hooks'

import Lights from './Lights'
import Iphone from './Iphone'
import Placeholder from './Placeholder'
import type { Model, Size } from './constants.ts'

const ModelView = ({
  hidden = false,
  size,
  model,
  className,
}: {
  hidden?: boolean
  size: Size['value']
  model: Model
  className?: string
}) => {
  const controlsRef = useRef<OrbitControlsRef>(null)
  const groupRef = useRef<THREE.Group>(null)

  useUpdateEffect(() => {
    if (hidden) {
      const controls = controlsRef.current
      if (!controls) return

      const resetOrbitControls = () => {
        // get current angles
        let alpha = controls.getAzimuthalAngle(),
          beta = controls.getPolarAngle() - Math.PI / 2

        // if they are close to the reset values, just set these values
        if (Math.abs(alpha) < 0.001) alpha = 0
        if (Math.abs(beta) < 0.001) beta = 0

        // smooth change using manual lerp
        controls.minAzimuthAngle = 0.95 * alpha
        controls.maxAzimuthAngle = controls.minAzimuthAngle

        controls.minPolarAngle = Math.PI / 2 + 0.95 * beta
        controls.maxPolarAngle = controls.minPolarAngle

        // if the reset values are reached, stop constraning angles
        if (alpha == 0 && beta == 0) {
          controls.minAzimuthAngle = -Infinity
          controls.maxAzimuthAngle = Infinity
          controls.minPolarAngle = 0
          controls.maxPolarAngle = Math.PI
        }
      }

      gsap.ticker.add(resetOrbitControls)

      return () => gsap.ticker.remove(resetOrbitControls)
    }
  }, [hidden])

  return (
    <View className={twMerge('model-view w-full h-full absolute', className)}>
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
      />

      <group ref={groupRef} name={size} position={[0, 0, 0]}>
        <Suspense fallback={<Placeholder scale={[1, 2.7, 0.25]} />}>
          <Iphone
            scale={size === 'small' ? [15, 15, 15] : [17, 17, 17]}
            style={model}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
