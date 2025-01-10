import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { MeshStandardMaterial, RepeatWrapping, LinearFilter } from "three";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const material = new MeshStandardMaterial({
    color: snap.color,
    roughness: 1,
  });

  useFrame(() => {
    material.color.set(snap.color);
  });

  if (snap.isFullTexture && fullTexture) {
    fullTexture.wrapS = RepeatWrapping;
    fullTexture.wrapT = RepeatWrapping;
    fullTexture.minFilter = LinearFilter;
    fullTexture.magFilter = LinearFilter;
    material.map = fullTexture;
    material.needsUpdate = true; // Force material update
  }

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
            position={[0, 0.04, 0.15]}
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
