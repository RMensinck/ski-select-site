import { useState, useEffect } from 'react';
import Image from 'next/image';

// Import all logos
const logos = [
  '/brands/logos/armada_logo.png',
  '/brands/logos/atomic_logo.png',
  '/brands/logos/black_crows_logo.png',
  '/brands/logos/black_diamond_logo.png',
  '/brands/logos/blizzard_logo.png',
  '/brands/logos/dynastar_logo.png',
  '/brands/logos/elan_logo.png',
  '/brands/logos/extrem_logo.png',
  '/brands/logos/faction_logo.png',
  '/brands/logos/k2_logo.png',
  '/brands/logos/line_logo.png',
  '/brands/logos/movement_logo.png',
  '/brands/logos/nordica_logo.png',
  '/brands/logos/on3p_logo.png',
  '/brands/logos/rossignol_logo.png',
  '/brands/logos/salomon_logo.png',
  '/brands/logos/volkl_logo.png',
];

export default function LogoCloud() {
  const [currentLogos, setCurrentLogos] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const shuffled = logos.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5); // get 5 random items
      setCurrentLogos(selected);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
            {currentLogos.map((logo, index) => (
              <img
                key={index}
                className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
                src={logo}
                alt="Logo ski brand"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}