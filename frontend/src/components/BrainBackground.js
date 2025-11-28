import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function BrainBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
      {/* Fullscreen Brain Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/brain.png')", // place brain.png in public/
          backgroundSize: "cover",       // fills the screen
          backgroundPosition: "center",  // centers the brain
          backgroundRepeat: "no-repeat",
          opacity: 0.3,                  // subtle overlay
          zIndex: -2,
        }}
      />

      {/* Sparks animation across entire screen */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true, // ✅ canvas covers entire screen
            zIndex: -1,
          },
          background: {
            color: { value: "transparent" },
          },
          particles: {
            number: {
              value: 150, // more sparks
              density: {
                enable: true,
                area: 1200, // spread across full viewport
              },
            },
            color: { value: "#00ffff" },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              outModes: { default: "bounce" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}

export default BrainBackground;
