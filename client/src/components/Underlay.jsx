import React from 'react';
import UnderLayImage from '../../src/assets/underlay.png';

const Underlay = ({styles}) => {
  return (
    <>
    
   <div style={{width:"100%", height:"48%", position:"absolute", top: styles?.top}}>
    <img src={UnderLayImage} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />
   </div>
    </>
  );
};

export default Underlay;
