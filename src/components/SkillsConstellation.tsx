import { motion } from 'motion/react';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'hardware' | 'software' | 'tools';
  x: number;
  y: number;
}

const skills: Skill[] = [
  { name: 'Arduino', level: 90, category: 'hardware', x: 20, y: 30 },
  { name: 'Python', level: 85, category: 'software', x: 70, y: 20 },
  { name: 'C++', level: 80, category: 'software', x: 40, y: 60 },
  { name: 'Raspberry Pi', level: 75, category: 'hardware', x: 80, y: 70 },
  { name: 'OpenCV', level: 70, category: 'software', x: 60, y: 40 },
  { name: 'ROS', level: 65, category: 'software', x: 25, y: 80 },
  { name: 'KiCad', level: 75, category: 'tools', x: 85, y: 45 },
  { name: 'SolidWorks', level: 70, category: 'tools', x: 15, y: 55 },
  { name: 'Git', level: 80, category: 'tools', x: 50, y: 85 },
  { name: 'React', level: 75, category: 'software', x: 75, y: 60 },
  { name: 'IoT', level: 85, category: 'hardware', x: 35, y: 25 },
  { name: 'Machine Learning', level: 60, category: 'software', x: 65, y: 75 }
];

const categoryColors = {
  hardware: 'text-blue-400',
  software: 'text-green-400', 
  tools: 'text-purple-400'
};

export function SkillsConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg bg-gradient-to-br from-background to-muted/20">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Constellation connections */}
      <svg className="absolute inset-0 w-full h-full">
        {skills.map((skill, i) => 
          skills.slice(i + 1).map((otherSkill, j) => {
            const dx = (skill.x - otherSkill.x) / 100;
            const dy = (skill.y - otherSkill.y) / 100;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.4) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${skill.x}%`}
                  y1={`${skill.y}%`}
                  x2={`${otherSkill.x}%`}
                  y2={`${otherSkill.y}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/30"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Skills as stars */}
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          className="absolute cursor-pointer"
          style={{
            left: `${skill.x}%`,
            top: `${skill.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.1,
            type: "spring",
            stiffness: 200
          }}
          onMouseEnter={() => setHoveredSkill(skill.name)}
          onMouseLeave={() => setHoveredSkill(null)}
          whileHover={{ scale: 1.2 }}
        >
          {/* Star/Node */}
          <motion.div
            className={`w-3 h-3 rounded-full border-2 ${categoryColors[skill.category]} bg-current`}
            animate={{
              boxShadow: hoveredSkill === skill.name 
                ? '0 0 20px currentColor' 
                : '0 0 5px currentColor'
            }}
            style={{
              opacity: 0.7 + (skill.level / 100) * 0.3
            }}
          />
          
          {/* Skill label */}
          <motion.div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 
                       bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap
                       ${categoryColors[skill.category]}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: hoveredSkill === skill.name ? 1 : 0,
              y: hoveredSkill === skill.name ? 0 : -10
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-medium">{skill.name}</div>
            <div className="text-xs text-muted-foreground">
              {skill.level}% • {skill.category}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>Hardware</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Software</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>Tools</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}