import React from "react";
import { AccumulativeShadows, Environment, RandomizedLight, useGLTF } from "@react-three/drei";

export function Model({
  modelRef,
  
}, props) {
  const { nodes, materials } = useGLTF("");

  return (
    <group ref={modelRef} {...props} dispose={null}>
      
      <pointLight intensity={1} position={[100, 50, 100]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* <ambientLight intensity={10} /> */}
      <Environment preset="park" />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555573"].geometry}
        material={materials["plan view modified"]}
        position={[-169.437, 474.99, 203.358]}
        rotation={[0, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555564_1"].geometry}
        material={materials["front texture"]}

      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555564_2"].geometry}
        material={materials["back texture"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555564_3"].geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555564_4"].geometry}
        material={materials.face}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555564_5"].geometry}
        material={materials["hair rear"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555564_6"].geometry}
        material={materials.toes}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-__555564_7"].geometry}
        material={materials["head right texture"]}
      />
    </group>
  );
}

export function BackDrop() {
  return (
    <AccumulativeShadows
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0,0, -0.14]}
    >
      <RandomizedLight />
    </AccumulativeShadows>
  )
}

useGLTF.preload("./cristo.gltf");
