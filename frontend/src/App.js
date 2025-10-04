import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
// Assuming your index.js imports this component as 'App'

/**
 * Adflyn Pre-Launch Countdown Component
 * A single, standalone React component for the pre-launch landing page.
 * Uses functional components, hooks, and Tailwind CSS classes for styling.
 */

// Placeholder for the uploaded logo URL

const CountdownSegment = ({ value, label, isHiddenOnSmall = false }) => (
  <div
    className={`p-4 md:p-6 bg-white border border-purple-200 rounded-xl w-24 md:w-32 transition duration-200  ${
      isHiddenOnSmall ? "hidden sm:block" : ""
    }`}
    style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
  >
    <span className="block countdown-style">{value}</span>
    <span className="block text-xs md:text-sm text-gray-500 mt-1">{label}</span>
  </div>
);
const App = () => {
  const LAUNCH_DATE = new Date("December 31, 2025 00:00:00").getTime();

  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [isLive, setIsLive] = useState(false);

  // State for waitlist form and messaging
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (num) => String(num).padStart(2, "0");

  const updateCountdown = useCallback(() => {
    const now = new Date().getTime();
    const distance = LAUNCH_DATE - now;

    if (distance < 0) {
      setIsLive(true);
      // Cleanup interval will happen in useEffect
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    setDays(formatTime(d));
    setHours(formatTime(h));
    setMinutes(formatTime(m));
    setSeconds(formatTime(s));
  }, [LAUNCH_DATE]);

  // Effect for the Countdown Timer
  useEffect(() => {
    updateCountdown(); // Initial call
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, [updateCountdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    setMessage("");
    setMessageVisible(false);

    // --- Simulated API Call for Waitlist Registration ---
    setTimeout(() => {
      setIsLoading(false);
      const successMsg = `Thank you, ${email}! You are now on the Early Access list.`;
      setMessage(successMsg);
      setMessageVisible(true);
      setEmail("");

      setTimeout(() => {
        setMessageVisible(false);
      }, 5000);
    }, 1500); // Simulate network delay
  };

  const slogan = isLive
    ? "Adflyn is officially launched! Start simplifying your marketing today."
    : "We're building something powerful, stay tuned.";

  let buttonText;
  if (isLive) {
    buttonText = "Go to Adflyn";
  } else if (isLoading) {
    buttonText = "Adding You...";
  } else {
    buttonText = "Notify Me!";
  }
  const buttonClass = isLive
    ? "bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700"
    : "bg-purple-600 hover:bg-purple-500 active:bg-purple-700";

  const LOGO = process.env.PUBLIC_URL + "/adflynLogo.png";

  return (
    <div
      id="root"
      className="min-h-screen flex items-center justify-center p-4 text-gray-800 main-container"
    >
      {/* The Tailwind CDN link is correctly placed in your index.html file. 
                We remove the script tag here to prevent conflicts. */}
      <div
        className="max-w-5xl w-full mx-auto p-8 md:p-12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/20 container"
        style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Logo/Title Section */}
        <header className="text-center mb-10 hero-header">
          <img src={LOGO} alt="Adflyn Logo" className="mx-auto adflyn-logo" />
          <p className="text-gray-600 mb-6 max-w-xl mx-auto content1">
            Where Ads Fly, Growth Follows.
          </p>
          <p className="text-xl md:text-2xl slogan">
            {slogan.split(" ").map((word, index) => (
              <span key={index} className="highlight">
                {word}{" "}
              </span>
            ))}
          </p>
        </header>

        {/* Countdown Timer Section */}
        {!isLive && (
          <section className="mb-12">
            <div className="flex justify-center space-x-3 md:space-x-8 text-center">
              <CountdownSegment value={days} label="DAYS" />
              <CountdownSegment value={hours} label="HOURS" />
              <CountdownSegment value={minutes} label="MINUTES" />
              <CountdownSegment
                value={seconds}
                label="SECONDS"
                isHiddenOnSmall={true}
              />
            </div>
          </section>
        )}

        {/* Waitlist Form (CTA) */}
        <section className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-purple-600 title">
            Join waitlist for Early Access!
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-xl w-full md:w-80 bg-white border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 transition duration-300"
              required
              disabled={isLive || isLoading}
            />
            <button
              type="submit"
              className={`p-4 w-full md:w-48 text-white font-bold rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed btn-focus ${buttonClass}`}
              disabled={isLoading}
              onClick={() => isLive && window.open("/", "_self")} // Redirect if live
            >
              {buttonText}
            </button>
            <button
              type="submit"
              className={`p-4 w-full md:w-48 text-white font-bold rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed btn-focus ${buttonClass}`}
              disabled={isLoading}
              onClick={() => window.open("/home", "_blank")} // Redirect if live
            >
              Join now!
            </button>
          </form>

          <div
            className={`mt-4 text-sm text-purple-600 transition-opacity duration-500 ${
              messageVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            {message}
          </div>
        </section>

        {/* Sneak Peek Section */}
        <section className="text-center border-t border-gray-200 pt-8 mt-8">
          <h4 className="text-xl font-medium mb-4 text-gray-800">
            A Sneak Peek at What's Coming:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left max-w-5xl mx-auto ">
            <div className="p-4 bg-purple-50/70 rounded-lg border-l-4 border-cyan-500 cards">
              <span className="block font-semibold text-gray-900 mb-1">
                AI Chatbot Strategy
              </span>
              <span className="text-gray-600">
                Our AI chatbot analyzes your business and competitors to craft
                the right marketing plan — and even launches campaigns for you.{" "}
              </span>
            </div>
            <div className="p-4 bg-purple-50/70 rounded-lg border-l-4 border-purple-500 cards">
              <span className="block font-semibold text-gray-900 mb-1">
                Poster Generation
              </span>
              <span className="text-gray-600">
                Upload an image or type a prompt, and get ready-to-use,
                professional posters in seconds.{" "}
              </span>
            </div>
            <div className="p-4 bg-purple-50/70 rounded-lg border-l-4 border-cyan-500 cards">
              <span className="block font-semibold text-gray-900 mb-1 ">
                Social Media Automation
              </span>
              <span className="text-gray-600">
                Post with confidence across multiple platforms — LinkedIn,
                Instagram, Facebook, Twitter, and more. Adflyn automates your
                social presence, building trust and credibility for your
                business.
              </span>
            </div>
          </div>
        </section>

        {/* New Footer/Community Links Section */}
        <footer className="text-center border-t border-gray-200 pt-8 mt-12">
          <h5 className="text-lg font-medium mb-4 text-gray-800">
            Join the Adflyn Community!
          </h5>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() =>
                window.open("https://discord.gg/Zz2myRE2F", "_blank")
              }
              className="text-gray-500 hover:text-purple-600 transition duration-200 flex items-center group bg-transparent border-none p-0 cursor-pointer btn-focus"
              aria-label="Join our Discord Community"
            >
              <img
                src={require("./assets/discord.png")}
                alt="Discord"
                className="w-4 h-4 mr-1"
              />
              <span className="hidden sm:inline">Discord Community</span>
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/E1shYFx6vfOBdzInqwbJt6",
                  "_blank"
                )
              }
              className="text-gray-500 hover:text-purple-600 transition duration-200 flex items-center group bg-transparent border-none p-0 cursor-pointer btn-focus"
              aria-label="Join our WhatsApp Community"
            >
              <img
                src={require("./assets/whatsapp.png")}
                alt="LinkedIn"
                className="w-4 h-4 mr-1"
              />
              <span className="hidden sm:inline">WhatsApp Community</span>
            </button>

            {/* LinkedIn Link (Now a placeholder BUTTON for accessibility) */}
            <button
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/adflyn/",
                  "_blank"
                )
              }
              className="text-gray-500 hover:text-purple-600 transition duration-200 flex items-center group bg-transparent border-none p-0 cursor-pointer btn-focus"
              aria-label="Go to our LinkedIn Page"
            >
              <img
                src={require("./assets/linkedinLogo.png")}
                alt="LinkedIn"
                className="w-4 h-4 mr-1"
              />
              <span className="hidden sm:inline">LinkedIn Page</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
