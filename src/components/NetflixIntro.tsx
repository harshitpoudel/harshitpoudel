import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface NetflixIntroProps {
  onComplete: () => void;
}

export function NetflixIntro({ onComplete }: NetflixIntroProps) {
  const [startAnimation, setStartAnimation] = useState(false);
  const name = "HARSHIT POUDEL";
  const letters = name.split('');

  useEffect(() => {
    // Start animation after a brief delay
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    // Complete animation after all letters have animated in
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500); // Adjusted timing

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Define different starting positions for letters to come from all sides
  const getInitialPosition = (index: number) => {
    const positions = [
      { x: -300, y: -300 }, // top-left
      { x: 0, y: -300 },    // top
      { x: 300, y: -300 },  // top-right
      { x: 300, y: 0 },     // right
      { x: 300, y: 300 },   // bottom-right
      { x: 0, y: 300 },     // bottom
      { x: -300, y: 300 },  // bottom-left
      { x: -300, y: 0 },    // left
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50">
      {/* Background gradient for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/20 via-black to-black" />
      
      {/* Letters container */}
      <div className="relative flex flex-wrap justify-center items-center gap-1 max-w-7xl px-4">
        {letters.map((letter, index) => {
          const initialPos = getInitialPosition(index);
          const isSpace = letter === ' ';
          
          return (
            <motion.span
              key={index}
              initial={{
                x: startAnimation ? 0 : initialPos.x,
                y: startAnimation ? 0 : initialPos.y,
                opacity: startAnimation ? 1 : 0,
                scale: startAnimation ? 1 : 0.3,
                rotate: startAnimation ? 0 : (Math.random() - 0.5) * 180,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1.2,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className={`
                inline-block text-white select-none
                ${isSpace ? 'w-2 sm:w-4' : ''}
              `}
              style={{
                fontSize: 'clamp(1.5rem, 6vw, 4rem)',
                fontWeight: 700,
                fontFamily: 'Orbitron, system-ui, -apple-system, sans-serif',
              }}
            >
              {isSpace ? '\u00A0' : letter}
            </motion.span>
          );
        })}
      </div>

      {/* Cinematic bars */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="absolute top-0 left-0 right-0 h-16 bg-black origin-left"
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="absolute bottom-0 left-0 right-0 h-16 bg-black origin-right"
      />
    </div>
  );
}