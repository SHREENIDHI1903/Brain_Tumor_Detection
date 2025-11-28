import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

function UploadPredict() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // ✅ Fallback: allow only images
    if (!selectedFile.type.startsWith("image/")) {
      setSnackbar({
        open: true,
        message: "Only image files are allowed!",
        severity: "error",
      });
      return;
    }

    // ✅ Optional: size limit (e.g. 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "File size must be under 5MB!",
        severity: "warning",
      });
      return;
    }

  setFile(selectedFile);
  setPreview(URL.createObjectURL(selectedFile));
  setResult(null);
};


  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://brain-tumor-detection-backend-2dxf.onrender.com", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      setHistory((prev) => [
        ...prev,
        {
          ...res.data,
          filename: file.name,
          time: new Date().toLocaleString(),
        },
      ]);
      setSnackbar({ open: true, message: "Prediction successful!", severity: "success" });
    } catch (err) {
      console.error(err);
      setResult({ error: "Prediction failed" });
      setSnackbar({ open: true, message: "Prediction failed!", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center" sx={{ padding: 3, borderRadius: 2 }}>
      {/* Upload Zone */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{
          border: "2px dashed #1976d2",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "inherit",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          <Typography variant="h6" color="primary">
            Drag & Drop or Click to Upload MRI Image
          </Typography>
        </label>
      </motion.div>

      {/* Preview */}
      {preview && (
        <Box mt={3}>
          <motion.img
            src={preview}
            alt="preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </Box>
      )}

      {/* Button + Brain Character */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mt={3}
        flexWrap="wrap"
      >
        {/* Animated Brain Character */}
        <motion.img
          src="/brain-pointer.png" // ✅ Make sure this is in public/
          alt="brain pointing"
          style={{
            width: "100px",
            pointerEvents: "none",
          }}
          animate={{
            rotate: [0, -5, 0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Upload Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
        >
          Upload & Predict
        </Button>
      </Box>

      {loading && <LinearProgress style={{ marginTop: 10 }} />}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <Typography variant="h5">
                {result.label || result.error}
              </Typography>
              {result.probability && (
                <>
                  <Typography>
                    Probability: {(result.probability * 100).toFixed(2)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={result.probability * 100}
                    style={{ marginTop: 10 }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Prediction History */}
      {history.length > 0 && (
        <Box mt={4} textAlign="left">
          <Typography variant="h6" gutterBottom>
            Prediction History
          </Typography>
          {history.map((item, idx) => (
            <Card key={idx} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {item.filename} — {item.time}
                </Typography>
                <Typography variant="body2">
                  {item.label || item.error}
                </Typography>
                {item.probability && (
                  <Typography variant="body2">
                    Probability: {(item.probability * 100).toFixed(2)}%
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Snackbar for toast notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UploadPredict;