import { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import { twMerge } from 'tailwind-merge'

import * as THREE from 'three'
import Lights from './Lights'
import Iphone from './Iphone'
import Placeholder from './Placeholder'
import type { Model, Size } from './constants.ts'

const ModelView = ({
  size,
  model,
  className,
}: {
  size: Size['value']
  model: Model
  className?: string
}) => {
  return (
    <View className={twMerge('w-full h-full absolute', className)}>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
      />

      <group name={size} position={[0, 0, 0]}>
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
