import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { MeshStandardMaterial, RepeatWrapping, LinearFilter } from "three";
import React, { useRef } from "react";
import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF("/shirt_baked.glb");

  // Load textures
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Material reference to ensure updates
  const materialRef = useRef(new MeshStandardMaterial({ roughness: 1 }));

  // Update textures in each frame
  useFrame(() => {
    if (snap.isFullTexture && fullTexture) {
      fullTexture.wrapS = RepeatWrapping;
      fullTexture.wrapT = RepeatWrapping;
      fullTexture.minFilter = LinearFilter;
      fullTexture.magFilter = LinearFilter;

      materialRef.current.map = fullTexture;
      materialRef.current.color.set("#ffffff"); // Reset color to white for full texture
    } else {
      materialRef.current.map = null;
      materialRef.current.color.set(snap.color);
    }

    materialRef.current.needsUpdate = true;
  });

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materialRef.current}
        dispose={null}
      >
        {/* Toggle the logo based on state */}
        {snap.isLogoTexture && snap.logoDecal && (
          <Decal
            position={[-0.02, -0.02, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
