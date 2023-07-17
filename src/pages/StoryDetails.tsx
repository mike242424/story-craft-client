import {
  Box,
  Button,
  Drawer,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const StoryDetails = () => {
  const location = useLocation();
  const story = location.state?.story;
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [text, setText] = useState("");
  const MAX_WORD_LIMIT = 250;

  const handleDelete = (id: number): void => {
    axios
      .delete(`https://story-craft-server.onrender.com/stories/${id}`)
      .then(() => {
        console.log("removed");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
    window.location.reload();
  };

  const handleAdd = (id: number) => {
    axios
      .patch(`https://story-craft-server.onrender.com/stories/${id}`, {
        text: text,
      })
      .then(() => {
        console.log("added");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
    window.location.reload();
    setOpenDrawer(false);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);

    if (words.length <= MAX_WORD_LIMIT) {
      setText(inputText);
    }
  };

  if (!story || !story.title) {
    return (
      <Paper
        square
        elevation={8}
        sx={{ textAlign: "center", margin: "50px", padding: "20px" }}
      >
        <Typography variant="h4" component="h3">
          Story Not Found
        </Typography>
        <Typography variant="body1" component="p">
          The requested story does not exist or has missing properties.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      square
      elevation={8}
      sx={{ textAlign: "center", margin: "50px", padding: "20px" }}
    >
      <Typography variant="h4" component="h3">
        {story.title}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ margin: "20px", textAlign: "left", whiteSpace: "pre-line" }}
      >
        {story.text}
      </Typography>
      <Box sx={{ display: "flex", gap: "60px", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenDrawer(true)}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(story.id)}
        >
          Delete
        </Button>
      </Box>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
            color="secondary"
          >
            Add to Story
          </Typography>
          <TextField
            label="Add a new paragraph..."
            value={text}
            onChange={handleTextChange}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 500 }}
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: (theme) => theme.palette.secondary.main,
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: (theme) => theme.palette.secondary.main,
                },
            }}
          />
          <Typography
            variant="body2"
            component="p"
            sx={{ textAlign: "right", color: "text.secondary" }}
          >
            {`${text.trim().split(/\s+/).length}/${MAX_WORD_LIMIT} words`}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleAdd(story.id)}
            sx={{ marginTop: "8px" }}
          >
            Add
          </Button>
        </Box>
      </Drawer>
    </Paper>
  );
};

export default StoryDetails;
