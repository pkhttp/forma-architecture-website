import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';

function Tower({ position, scale = 1, width = 1.15, depth = 1.05, height = 5.7, tint = '#17344e' }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .18) * .12 + state.pointer.x * .10;
    ref.current.rotation.x = state.pointer.y * .025;
  });
  const levels = Array.from({ length: 14 }, (_, i) => i);
  return <group ref={ref} position={position} scale={scale}>
    <mesh position={[0, height / 2, 0]} castShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={tint} metalness={.75} roughness={.22} />
    </mesh>
    {levels.map(i => <group key={i} position={[0, .38 + i * (height / 14), 0]}>
      <mesh position={[0, 0, depth / 2 + .009]}>
        <boxGeometry args={[width * .84, .022, .014]} />
        <meshStandardMaterial color="#72d4ff" emissive="#168acb" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, .06, depth / 2 + .006]}>
        <boxGeometry args={[width * .67, .24, .012]} />
        <meshStandardMaterial color="#071827" metalness={.45} roughness={.12} />
      </mesh>
    </group>)}
    <mesh position={[0, height + .12, 0]}>
      <boxGeometry args={[width * .5, .22, depth * .55]} />
      <meshStandardMaterial color="#9ce4ff" emissive="#258bc2" emissiveIntensity={.5} />
    </mesh>
  </group>;
}

function City() {
  return <>
    <ambientLight intensity={.72} />
    <directionalLight position={[5, 9, 7]} intensity={2.3} color="#c8edff" castShadow />
    <pointLight position={[-4, 3, 4]} intensity={24} color="#168ad0" />
    <pointLight position={[4, 2, -3]} intensity={20} color="#596dff" />
    <Float speed={1} rotationIntensity={.05} floatIntensity={.14}>
      <Tower position={[0, -.2, 0]} scale={1.06} />
    </Float>
    <Tower position={[-2.05, -.25, -.6]} scale={.64} width={1.1} height={4.1} tint="#10263b" />
    <Tower position={[2.0, -.25, -.75]} scale={.72} width={1.05} height={4.4} tint="#122b43" />
    <Tower position={[-2.85, -.25, -1.2]} scale={.46} width={1.2} height={3.5} tint="#0d2033" />
    <Tower position={[2.8, -.25, -1.35]} scale={.48} width={1.15} height={3.6} tint="#0d2033" />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.32, 0]}>
      <planeGeometry args={[12, 8]} />
      <meshStandardMaterial color="#07111c" metalness={.45} roughness={.5} />
    </mesh>
    <ContactShadows position={[0, -.3, 0]} opacity={.45} scale={8} blur={2.5} far={5} />
    <Environment preset="city" />
  </>;
}

export default function BuildingScene() {
  return <div className="canvas-frame">
    <Canvas camera={{ position: [6.5, 4.6, 8.8], fov: 35 }} dpr={[1, 1.6]} shadows>
      <City />
    </Canvas>
    <div className="canvas-label"><i /> LIVE 3D ARCHITECTURE</div>
    <div className="canvas-coord">18°31' N&nbsp; / &nbsp;73°51' E</div>
  </div>;
}
