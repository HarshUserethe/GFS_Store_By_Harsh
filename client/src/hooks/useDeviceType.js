import { useState, useEffect } from 'react';

const getDeviceType = (width) => {
  if (width < 800) return 'mobile';
  if (width >= 801 && width < 1024) return 'tablet';
  return 'desktop';
};

const useDeviceType = () => {
      const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));

        useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;

}

export default useDeviceType
