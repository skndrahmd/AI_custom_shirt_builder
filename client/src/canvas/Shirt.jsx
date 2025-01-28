import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { MeshStandardMaterial, RepeatWrapping, LinearFilter } from "three";
import React from "react";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF("/shirt_baked.glb");

  // Load textures
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Initialize material
  const material = new MeshStandardMaterial({
    roughness: 1,
  });

  // Handle material updates when texture or color changes
  React.useEffect(() => {
    if (snap.isFullTexture && fullTexture) {
      fullTexture.wrapS = RepeatWrapping;
      fullTexture.wrapT = RepeatWrapping;
      fullTexture.minFilter = LinearFilter;
      fullTexture.magFilter = LinearFilter;
      material.map = fullTexture;
      material.color.set('#ffffff'); // Reset to white when using full texture
      material.needsUpdate = true;
    } else {
      material.map = null;
      material.color.set(snap.color);
      material.needsUpdate = true;
    }
  }, [snap.isFullTexture, snap.color, fullTexture]);

  const stateString = JSON.stringify(state);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={material}
        dispose={null}
      >
        {snap.isLogoTexture && (
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