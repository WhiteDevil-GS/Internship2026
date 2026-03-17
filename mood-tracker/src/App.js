import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Paper, List, ListItem, ListItemText } from "@mui/material";
import MoodSelector from "./components/MoodSelector";
import "./App.css";

const moodColors = {
  happy: "#fff9c4",
  excited: "#ffe082",
  neutral: "#e0e0e0",
  sad: "#90caf9",
  angry: "#ef9a9a",
};

function App() {
  const [mood, setMood] = useState("neutral");
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const handleMoodChange = (newMood) => {
    setMood(newMood);
    const newEntry = { mood: newMood, time: new Date().toLocaleString() };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "50px",
        textAlign: "center",
        padding: "30px",
        borderRadius: "15px",
        transition: "background-color 0.6s ease",
        backgroundColor: moodColors[mood] || "#e0e0e0",
      }}
    >
      <Typography variant="h3" gutterBottom>Mood Tracker</Typography>

      <MoodSelector currentMood={mood} onMoodChange={handleMoodChange} />

      <Card style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f5f5f5", transition: "all 0.3s ease" }}>
        <Typography variant="h5">Your current mood: <strong>{mood.toUpperCase()}</strong></Typography>
      </Card>

      {history.length > 0 && (
        <Paper style={{ marginTop: "30px", padding: "20px" }}>
          <Typography variant="h6">Mood History</Typography>
          <List>
            {history.map((entry, index) => (
              <ListItem
                key={index}
                divider
                sx={{
                  opacity: 0,
                  animation: `fadeIn 0.5s forwards`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <ListItemText
                  primary={`${entry.mood.toUpperCase()}`}
                  secondary={entry.time}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}

export default App;