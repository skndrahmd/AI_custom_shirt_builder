import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { MeshStandardMaterial, RepeatWrapping, LinearFilter } from "three";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF("/shirt_baked.glb");

  // Load textures
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const scriftLogoTexture = useTexture("/scrift_logo.png"); // Load the scrift_logo.png

  // Initialize material
  const material = new MeshStandardMaterial({
    color: snap.color,
    roughness: 1,
  });

  // Update material color on every frame
  useFrame(() => {
    material.color.set(snap.color);
  });

  // Apply full texture if enabled
  if (snap.isFullTexture && fullTexture) {
    fullTexture.wrapS = RepeatWrapping;
    fullTexture.wrapT = RepeatWrapping;
    fullTexture.minFilter = LinearFilter;
    fullTexture.magFilter = LinearFilter;
    material.map = fullTexture;
    material.needsUpdate = true;
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
        {/* Apply the scrift_logo on the chest area */}
        <Decal
  position={[-0.02, -0.02, 0.15]} // Adjusted values
  rotation={[0, 0, 0]}
  scale={0.15} // Slightly reduced scale for better proportion
  map={scriftLogoTexture}
/>
      </mesh>
    </group>
  );
};

export default Shirt;
