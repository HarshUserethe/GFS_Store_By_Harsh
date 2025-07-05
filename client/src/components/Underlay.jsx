import React from 'react';
import UnderLayImage from '../../src/assets/underlay.png';

const Underlay = () => {
  return (
    <>
   <div style={{width:"100%", height:"48%", position:"absolute", top:"0%"}}>
    <img src={UnderLayImage} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />
   </div>
    </>
  );
};

export default Underlay;
