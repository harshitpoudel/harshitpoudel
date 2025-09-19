import { motion } from 'motion/react';
import { X, ExternalLink, Github, Calendar, User, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  image: string;
  link: string;
  github: string;
  date: string;
  duration: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project || !isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-card rounded-lg border border-border shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Project title overlay */}
          <div className="absolute bottom-4 left-6">
            <h2 className="text-white mb-2">{project.title}</h2>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{project.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="text-sm">{project.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Description */}
          <div className="mb-6">
            <h3 className="mb-3">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="border-primary/20">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="mb-8">
            <h4 className="mb-3">Technical Challenges</h4>
            <ul className="space-y-2">
              {project.challenges.map((challenge, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  {challenge}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button
              className="flex-1 group"
              onClick={() => window.open(project.link, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              View Live Demo
            </Button>
            <Button
              variant="outline"
              className="flex-1 group"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              View Source Code
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}