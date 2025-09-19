import { useState, useEffect } from "react";
import { NetflixIntro } from "./components/NetflixIntro";
import { Homepage } from "./components/Homepage";

export default function App() {
  const [showHomepage, setShowHomepage] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleIntroComplete = () => {
    setShowHomepage(true);
  };

  const toggleDarkMode = (darkMode: boolean) => {
    setIsDarkMode(darkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="size-full">
      {!showHomepage && <NetflixIntro onComplete={handleIntroComplete} />}
      {showHomepage && <Homepage onDarkModeToggle={toggleDarkMode} isDarkMode={isDarkMode} />}
    </div>
  );
}