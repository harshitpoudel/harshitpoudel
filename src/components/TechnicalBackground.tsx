import { motion } from 'motion/react';

interface TechnicalBackgroundProps {
  isDarkMode: boolean;
}

export function TechnicalBackground({ isDarkMode }: TechnicalBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Circuit Board Patterns */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        style={{ opacity: isDarkMode ? 0.08 : 0.04 }}
      >
        {/* PCB Traces */}
        <defs>
          <pattern id="circuit" patternUnits="userSpaceOnUse" width="200" height="200">
            {/* Horizontal traces */}
            <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="1"/>
            <line x1="0" y1="60" x2="150" y2="60" stroke="currentColor" strokeWidth="1"/>
            <line x1="50" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="1"/>
            <line x1="0" y1="140" x2="120" y2="140" stroke="currentColor" strokeWidth="1"/>
            <line x1="80" y1="180" x2="200" y2="180" stroke="currentColor" strokeWidth="1"/>
            
            {/* Vertical traces */}
            <line x1="40" y1="0" x2="40" y2="200" stroke="currentColor" strokeWidth="1"/>
            <line x1="80" y1="0" x2="80" y2="150" stroke="currentColor" strokeWidth="1"/>
            <line x1="120" y1="50" x2="120" y2="200" stroke="currentColor" strokeWidth="1"/>
            <line x1="160" y1="0" x2="160" y2="180" stroke="currentColor" strokeWidth="1"/>
            
            {/* Components */}
            <rect x="35" y="15" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <rect x="75" y="55" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <rect x="115" y="95" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <rect x="155" y="135" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            
            {/* IC Chips */}
            <rect x="30" y="90" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <rect x="140" y="40" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            
            {/* Connection dots */}
            <circle cx="40" cy="20" r="1.5" fill="currentColor"/>
            <circle cx="80" cy="60" r="1.5" fill="currentColor"/>
            <circle cx="120" cy="100" r="1.5" fill="currentColor"/>
            <circle cx="160" cy="140" r="1.5" fill="currentColor"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" className="text-foreground"/>
      </svg>

      {/* Technical Blueprint Grid */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        style={{ opacity: isDarkMode ? 0.06 : 0.03 }}
      >
        <defs>
          <pattern id="blueprint" patternUnits="userSpaceOnUse" width="100" height="100">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="0.3"/>
            <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="0" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3"/>
            
            <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3"/>
            <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.1"/>
            <line x1="100" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3"/>
            
            {/* Dimension arrows */}
            <path d="M10,90 L30,90 M10,88 L10,92 M30,88 L30,92" stroke="currentColor" strokeWidth="0.3" fill="none"/>
            <path d="M70,10 L70,30 M68,10 L72,10 M68,30 L72,30" stroke="currentColor" strokeWidth="0.3" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint)" className="text-foreground"/>
      </svg>

      {/* Mechanical Elements */}
      <motion.div 
        className="absolute top-10 left-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ opacity: isDarkMode ? 0.1 : 0.05 }}
      >
        <svg width="150" height="150" className="text-foreground">
          {/* Large Gear */}
          <circle cx="75" cy="75" r="50" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="75" cy="75" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          {/* Gear teeth */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5) * Math.PI / 180;
            const x1 = 75 + 50 * Math.cos(angle);
            const y1 = 75 + 50 * Math.sin(angle);
            const x2 = 75 + 55 * Math.cos(angle);
            const y2 = 75 + 55 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1"/>;
          })}
          <circle cx="75" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </motion.div>

      <motion.div 
        className="absolute top-32 right-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        style={{ opacity: isDarkMode ? 0.1 : 0.05 }}
      >
        <svg width="100" height="100" className="text-foreground">
          {/* Medium Gear */}
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = 50 + 35 * Math.cos(angle);
            const y1 = 50 + 35 * Math.sin(angle);
            const x2 = 50 + 40 * Math.cos(angle);
            const y2 = 50 + 40 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1"/>;
          })}
          <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </motion.div>

      {/* Binary Code Streams */}
      <motion.div 
        className="absolute top-0 left-1/4 text-foreground"
        animate={{ y: [0, 100] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ opacity: isDarkMode ? 0.08 : 0.04 }}
      >
        <div className="text-xs font-mono space-y-1 whitespace-pre">
          {`01001000 01100001 01110010
01110011 01101000 01101001
01110100 00100000 01010000
01101111 01110101 01100100
01100101 01101100 00001010`}
        </div>
      </motion.div>

      <motion.div 
        className="absolute top-0 right-1/4 text-foreground"
        animate={{ y: [0, 120] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
        style={{ opacity: isDarkMode ? 0.08 : 0.04 }}
      >
        <div className="text-xs font-mono space-y-1 whitespace-pre">
          {`#include <Arduino.h>
void setup() {
  Serial.begin(9600);
}
void loop() {
  digitalWrite(LED, HIGH);
  delay(1000);
}`}
        </div>
      </motion.div>

      {/* Robot Wireframes */}
      <div 
        className="absolute bottom-20 left-20"
        style={{ opacity: isDarkMode ? 0.1 : 0.05 }}
      >
        <svg width="200" height="150" className="text-foreground">
          {/* Robot Head */}
          <rect x="75" y="20" width="50" height="40" fill="none" stroke="currentColor" strokeWidth="1"/>
          {/* Eyes */}
          <circle cx="85" cy="35" r="3" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="115" cy="35" r="3" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          {/* Antenna */}
          <line x1="100" y1="20" x2="100" y2="10" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="100" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          
          {/* Body */}
          <rect x="60" y="60" width="80" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
          {/* Control panel */}
          <rect x="70" y="75" width="60" height="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="80" cy="85" r="2" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="90" cy="85" r="2" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="100" cy="85" r="2" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          
          {/* Arms */}
          <line x1="60" y1="75" x2="40" y2="85" stroke="currentColor" strokeWidth="1"/>
          <line x1="140" y1="75" x2="160" y2="85" stroke="currentColor" strokeWidth="1"/>
          {/* Hands */}
          <circle cx="40" cy="85" r="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="160" cy="85" r="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          
          {/* Legs */}
          <line x1="80" y1="120" x2="80" y2="140" stroke="currentColor" strokeWidth="1"/>
          <line x1="120" y1="120" x2="120" y2="140" stroke="currentColor" strokeWidth="1"/>
          {/* Feet */}
          <rect x="75" y="140" width="10" height="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <rect x="115" y="140" width="10" height="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Sensor Array Pattern */}
      <div 
        className="absolute top-1/2 right-10"
        style={{ opacity: isDarkMode ? 0.1 : 0.05 }}
      >
        <svg width="120" height="200" className="text-foreground">
          {/* Radar sweep */}
          <circle cx="60" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="60" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="0.3"/>
          <circle cx="60" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.3"/>
          {/* Sweep lines */}
          <line x1="60" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="0.3"/>
          <line x1="60" y1="100" x2="95" y2="65" stroke="currentColor" strokeWidth="0.3"/>
          <line x1="60" y1="100" x2="95" y2="135" stroke="currentColor" strokeWidth="0.3"/>
          <line x1="60" y1="100" x2="60" y2="50" stroke="currentColor" strokeWidth="0.3"/>
          {/* Detection points */}
          <circle cx="85" cy="80" r="1" fill="currentColor"/>
          <circle cx="90" cy="120" r="1" fill="currentColor"/>
          <circle cx="75" cy="70" r="1" fill="currentColor"/>
        </svg>
      </div>

      {/* Schematic Symbols */}
      <div 
        className="absolute bottom-32 right-32"
        style={{ opacity: isDarkMode ? 0.08 : 0.04 }}
      >
        <svg width="150" height="100" className="text-foreground">
          {/* Resistor */}
          <path d="M10,20 L20,10 L30,30 L40,10 L50,30 L60,10 L70,20" fill="none" stroke="currentColor" strokeWidth="1"/>
          <text x="75" y="25" className="text-xs">R1</text>
          
          {/* Capacitor */}
          <line x1="10" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="1"/>
          <line x1="25" y1="40" x2="25" y2="60" stroke="currentColor" strokeWidth="2"/>
          <line x1="35" y1="40" x2="35" y2="60" stroke="currentColor" strokeWidth="2"/>
          <line x1="35" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1"/>
          <text x="55" y="55" className="text-xs">C1</text>
          
          {/* Inductor */}
          <path d="M10,80 Q15,70 20,80 Q25,70 30,80 Q35,70 40,80 Q45,70 50,80" fill="none" stroke="currentColor" strokeWidth="1"/>
          <text x="55" y="85" className="text-xs">L1</text>
          
          {/* Microcontroller */}
          <rect x="90" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1"/>
          <text x="95" y="45" className="text-xs">MCU</text>
          <text x="95" y="60" className="text-xs">ATmega</text>
          {/* Pins */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="85" y1={35 + i * 4} x2="90" y2={35 + i * 4} stroke="currentColor" strokeWidth="0.5"/>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="130" y1={35 + i * 4} x2="135" y2={35 + i * 4} stroke="currentColor" strokeWidth="0.5"/>
          ))}
        </svg>
      </div>

      {/* Data Flow Lines */}
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isDarkMode ? 0.06 : 0.03 }}
      >
        <motion.path
          d="M100,300 Q400,200 700,400 Q1000,500 1300,300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="text-foreground"
          animate={{
            strokeDashoffset: [0, -20]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.path
          d="M200,600 Q500,500 800,700 Q1100,800 1400,600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3,7"
          className="text-foreground"
          animate={{
            strokeDashoffset: [0, -15]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />
      </motion.svg>

      {/* Floating Code Snippets */}
      <motion.div 
        className="absolute bottom-1/4 left-1/3 text-foreground font-mono text-xs"
        animate={{ 
          y: [-10, 10, -10],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
        style={{ opacity: isDarkMode ? 0.08 : 0.04 }}
      >
        <div className="space-y-1">
          <div>robot.move(FORWARD);</div>
          <div>sensor.read();</div>
          <div>if(lineDetected) {`{`}</div>
          <div>{"  "}adjust_path();</div>
          <div>{`}`}</div>
        </div>
      </motion.div>
    </div>
  );
}