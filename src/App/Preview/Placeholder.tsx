import type { JSX } from 'react'

const Placeholder = (props: JSX.IntrinsicElements['mesh']) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  )
}

export default Placeholder
