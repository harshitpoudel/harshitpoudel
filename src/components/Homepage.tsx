import { motion } from "framer-motion";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Navigation } from "./Navigation";
import { ParticleField } from "./ParticleField";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Bot,
  Send,
} from "lucide-react";
import emailjs from "@emailjs/browser";

interface HomepageProps {
  onDarkModeToggle: (darkMode: boolean) => void;
  isDarkMode: boolean;
}

export function Homepage({
  onDarkModeToggle,
  isDarkMode,
}: HomepageProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [showRobot, setShowRobot] = useState(false);
  const [robotPosition, setRobotPosition] = useState(20); // Position as percentage (20% = light mode)
  const [isDragging, setIsDragging] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

const openProjectModal = (project: typeof projects[0]) => {
  setSelectedProject(project);
  setIsModalOpen(true);
};

const closeProjectModal = () => {
  setSelectedProject(null);
  setIsModalOpen(false);
};

useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeProjectModal();
  };
  document.addEventListener("keydown", handleEsc);
  return () => document.removeEventListener("keydown", handleEsc);
}, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const refs = {
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    };

    refs[section as keyof typeof refs]?.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
      },
    );
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!formRef.current) return;

  emailjs.sendForm(
    "service_ow5yttv",      // Replace with your EmailJS service ID
    "template_npw2q55",     // Replace with your EmailJS template ID
    formRef.current,
    "1u5khDk4wDgKsyHq2"       // Replace with your EmailJS public key
  ).then(
    () => alert("✅ Message sent successfully!"),
    (err) => alert("❌ Failed to send message: " + err.text)
  );

  setFormData({ name: "", email: "", message: "" });
};
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !lineRef.current) return;

    const lineRect = lineRef.current.getBoundingClientRect();
    const relativeX = e.clientX - lineRect.left;
    const percentage = Math.max(
      0,
      Math.min(100, (relativeX / lineRect.width) * 100),
    );

    setRobotPosition(percentage);

    // Toggle dark mode when robot crosses 50% threshold
    const shouldBeDark = percentage > 50;
    if (shouldBeDark !== isDarkMode) {
      onDarkModeToggle(shouldBeDark);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener(
          "mousemove",
          handleMouseMove,
        );
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "about", ref: aboutRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ];

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = section.ref.current;
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
{
  title: "Line Following Robot",
  description:
    "An autonomous robot that uses infrared sensors to follow a black line on the ground. Built with Arduino and programmed with PID control for smooth navigation.",
  technologies: [
    "Arduino",
    "C++",
    "IR Sensors",
    "PID Control",
  ],
  link: "#",
  image: "public/images/IMG_1776.jpeg",
},
{
  title: "Noise Detection & Controlling Machine",
  description:
    "A project designed to detect environmental noise levels and automatically control connected machines. This system helps reduce unwanted noise and maintain an optimal environment.",
  technologies: [
    "Sensors",
    "Automation",
    "Arduino",
    "Noise Control",
  ],
  link: "#",
  image: "public/images/IMG_1737.jpeg", 
},
{
  title: "Robotic Arm Controller",
  description:
    "A 6-DOF robotic arm controlled via computer vision. Uses OpenCV for object detection and inverse kinematics for precise movement.",
  technologies: [
    "Python",
    "OpenCV",
    "Servo Motors",
    "Kinematics",
  ],
  link: "#",
},
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-background transition-colors duration-500 relative overflow-hidden"
    >
      <ParticleField isDarkMode={isDarkMode} />
      <Navigation
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="pt-24 pb-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16 relative"
          >
            <div className="relative inline-block">
              <h2
                className="mb-6 cursor-pointer relative"
                onMouseEnter={() => setShowRobot(true)}
                onMouseLeave={() => setShowRobot(false)}
                onTouchStart={() => setShowRobot(true)}
                onTouchEnd={() => setShowRobot(false)}
              >
                Automaton
              </h2>

              {/* Hidden Robot */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{
                  opacity: showRobot ? 1 : 0,
                  scale: showRobot ? 1 : 0,
                  rotate: showRobot ? 0 : -180,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.4,
                }}
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 pointer-events-none z-50"
              >
                <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                  <Bot className="h-8 w-8" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
              </motion.div>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-muted-foreground">
                Computer Systems and Robotics Student making
                experimental projects to learn from them
              </p>
              <p className="text-muted-foreground">
                With experience in making projects using
                microcontrollers, sensors and much more hardware
                components, I have and still enjoy working on
                projects that challenge me to learn and grow as
                a student.
              </p>
            </div>
          </motion.div>

          {/* Interactive Line Following Robot */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-16"
          >
            {/* Line and Robot Container */}
            <div className="relative h-32 flex items-center">
              {/* Horizontal Line */}
              <div
                ref={lineRef}
                className="relative w-full h-1 bg-gradient-to-r from-white via-gray-400 to-black rounded-full"
              >
                {/* Draggable Robot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ left: `${robotPosition}%` }}
                  animate={{
                    scale: isDragging ? 1.1 : 1,
                    rotate: isDragging ? 5 : 0,
                    y: isDragging ? 2 : 0,
                  }}
                >
                  {/* Draggable Robot */}
                  <motion.div
                    className="relative cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Robot Body */}
                    <div className="w-12 h-8 bg-primary rounded-lg border-2 border-primary-foreground shadow-lg flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>

                    {/* Robot Wheels */}
                    <motion.div
                      className="absolute -bottom-1 left-1 w-2 h-2 bg-muted-foreground rounded-full"
                      animate={{
                        rotate: isDragging ? 360 : 0,
                      }}
                      transition={{
                        rotate: {
                          duration: 0.5,
                          repeat: isDragging ? Infinity : 0,
                          ease: "linear",
                        },
                      }}
                    ></motion.div>
                    <motion.div
                      className="absolute -bottom-1 right-1 w-2 h-2 bg-muted-foreground rounded-full"
                      animate={{
                        rotate: isDragging ? 360 : 0,
                      }}
                      transition={{
                        rotate: {
                          duration: 0.5,
                          repeat: isDragging ? Infinity : 0,
                          ease: "linear",
                        },
                      }}
                    ></motion.div>

                    {/* Sensor (IR) */}
                    <motion.div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-red-500 rounded-sm"
                      animate={{
                        boxShadow: isDragging
                          ? "0 0 8px #ef4444"
                          : "0 0 0px #ef4444",
                      }}
                    ></motion.div>
                  </motion.div>
                </motion.div>

                {/* Progress indicator */}
                <div
                  className="absolute top-0 left-0 h-full bg-primary/30 rounded-full transition-all duration-300"
                  style={{ width: `${robotPosition}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className="py-16 px-6 bg-muted/30 transition-colors duration-500"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of the projects I've worked on. Each
              one represents a unique challenge and learning
              opportunity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <Card className="p-4 h-full flex flex-col transition-all duration-500 bg-card border-border">
                  <h3 className="mb-3">{project.title}</h3>
                  <p className="mb-4 flex-grow text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button
  variant="outline"
  className="w-full group transition-all duration-300 hover:bg-primary/10 hover:border-primary"
  onClick={() => openProjectModal(project)}
>
  View Project
  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>

                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className="py-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-6">Get In Touch</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always interested in new opportunities and
              collaborations. Feel free to reach out if you'd
              like to work together!
            </p>

            <div className="flex justify-center gap-6 mb-12">
              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() =>
                  window.open(
                    "mailto:harshit.poudel@example.com?subject=Portfolio Contact&body=Hi Harshit,",
                    "_blank",
                  )
                }
              >
                <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Email Me
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() =>
                  window.open(
                    "https://github.com/harshitpoudel",
                    "_blank",
                  )
                }
              >
                <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                GitHub
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/harshit-poudel-466794299/",
                    "_blank",
                  )
                }
              >
                <Linkedin className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                LinkedIn
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8">
              <h3 className="mb-6 text-center">
                Send me a message
              </h3>
              <form
                ref={formRef}
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or just say hello!"
                    rows={6}
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full group">
                  <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

      </section>

{isModalOpen && selectedProject && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
    onClick={closeProjectModal}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
      className="bg-background rounded-3xl shadow-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8 relative overflow-auto"
      onClick={(e) => e.stopPropagation()}
      style={{ maxHeight: "90vh" }}
    >
      {/* Close Button */}
      <button
        onClick={closeProjectModal}
        className="absolute top-4 right-4 text-muted-foreground text-3xl font-bold hover:text-red-500 transition-colors"
        aria-label="Close modal"
      >
        &times;
      </button>

      {/* Left Side: Description */}
      <div className="flex-1 flex flex-col justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {selectedProject.title}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            {selectedProject.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {selectedProject.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs border-primary/50 text-primary/90"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Visit Button */}
        <Button
          variant="default"
          className="mt-6 w-full md:w-auto flex justify-center gap-2 self-start hover:scale-105 transition-transform duration-300"
          onClick={() => window.open(selectedProject.link, "_blank")}
        >
          Visit Project
          <ExternalLink className="h-5 w-5" />
        </Button>
      </div>

{/* Right Side: guaranteed small square preview, full image visible */}
{selectedProject.image && (
  <div className="flex-shrink-0 self-center md:self-start">
    <div
      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 
                 rounded-lg bg-muted/10 shadow-md flex items-center justify-center"
      style={{ overflow: "hidden" }}
    >
      <img
        src={selectedProject.image}
        alt={selectedProject.title}
        // ensure the whole image fits inside the square (no crop)
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
        onError={(e) => {
          // show a fallback if the path is wrong or image missing
          (e.currentTarget as HTMLImageElement).src = "/images/placeholder.png";
        }}
      />
    </div>
  </div>
)}

    </motion.div>
  </div>
)}

    </motion.div>
  );
}