import React, { useState } from "react";
import UploadPredict from "./components/UploadPredict";
import BrainBackground from "./components/BrainBackground";
import {
  Typography,
  CssBaseline,
  Switch,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        {/* Animated background */}
        <BrainBackground />

        {/* Main content overlay */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            padding: { xs: 2, sm: 4 },
            maxWidth: "800px",
            margin: "0 auto",
            marginTop: "40px",
            backgroundColor: "transparent",
            backdropFilter: "none",
            boxShadow: "none",
          }}
        >
          {/* Dark Mode Toggle */}
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Dark Mode
            </Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>

          {/* Heading */}
                  <Typography
            variant="h3"
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // responsive sizes
              whiteSpace: "normal",   // ✅ allow wrapping
              wordBreak: "break-word", // ✅ break long words if needed
              color: "primary.main",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            🧠 BRAIN TUMOR DETECTION
          </Typography>


          {/* UploadPredict component */}
          <UploadPredict />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
