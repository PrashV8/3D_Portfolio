import {useRef, useEffect} from 'react'
import birdScene from '../assets/3d/bird.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";

const Bird = () => {
    
  const birdRef = useRef();

  // Load the 3D model and animations from the provided GLTF file
  const { scene, animations } = useGLTF(birdScene);

  // Get access to the animations for the bird
  const { actions } = useAnimations(animations, birdRef);

  // Play the "Take 001" animation when the component mounts
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  
  
  useEffect(() => {
    actions["Take 001"].play();
  }, []);
  
  



  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bird-like motion using a sine wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.02;
      birdRef.current.position.z -= 0.02;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.02;
      birdRef.current.position.z += 0.02;
    }
  });


  return (
        <mesh 
        position={[-6,2,1]} 
        scale={[0.004,0.004,0.004]}
        ref={birdRef} >

            <primitive object={scene}/>
        
        </mesh>
  );
}

export default Bird
