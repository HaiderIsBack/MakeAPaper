

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Pencil = (props) => {
    const gltf = useLoader(GLTFLoader, '/pencil2.glb');
  
    return <primitive object={gltf.scene} {...props} />;
}

export default Pencil