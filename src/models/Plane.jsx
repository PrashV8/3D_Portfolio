import { useEffect, useRef } from "react";
import planeScene from '../assets/3d/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';

const Plane = ({isRotating, ...props}) => {
  const ref = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(planeScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);
  
  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
   
    if (isRotating) {
      actions["Take 001"].play();
    } else {
      actions["Take 001"].stop();
    }
  }, [actions, isRotating]);
 // use the primitive element when you want to directly embed a complex 3D model or scene
    return (
       <mesh {...props} ref={ref}>
     
      <primitive object={scene} />
    </mesh>
  )
}

export default Plane

