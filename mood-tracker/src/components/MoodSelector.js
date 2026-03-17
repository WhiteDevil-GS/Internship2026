import React from "react";
import { Button, Grid } from "@mui/material";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const moodOptions = [
  { name: "happy", icon: <SentimentVerySatisfiedIcon fontSize="large" /> },
  { name: "excited", icon: <SentimentSatisfiedIcon fontSize="large" /> },
  { name: "neutral", icon: <SentimentNeutralIcon fontSize="large" /> },
  { name: "sad", icon: <SentimentDissatisfiedIcon fontSize="large" /> },
  { name: "angry", icon: <SentimentVeryDissatisfiedIcon fontSize="large" /> },
];

function MoodSelector({ currentMood, onMoodChange }) {
  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px" }}>
      {moodOptions.map((m) => (
        <Grid item key={m.name}>
          <Button
            variant={currentMood === m.name ? "contained" : "outlined"}
            color="primary"
            startIcon={
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s",
                  transform: currentMood === m.name ? "scale(1.3) rotate(-10deg)" : "scale(1) rotate(0deg)"
                }}
              >
                {m.icon}
              </span>
            }
            onClick={() => onMoodChange(m.name)}
            sx={{
              minWidth: 120,
              fontSize: "16px",
              transition: "all 0.3s ease",
              transform: currentMood === m.name ? "scale(1.1)" : "scale(1)",
              boxShadow: currentMood === m.name ? "0 4px 15px rgba(0,0,0,0.3)" : "none",
              "&:hover": {
                transform: "scale(1.15)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              },
            }}
          >
            {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default MoodSelector;