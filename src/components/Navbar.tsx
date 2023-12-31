import { ChangeEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link, useNavigate } from "react-router-dom";
import { Button, Drawer, TextField } from "@mui/material";
import axios from "axios";
import { Story } from "../interfaces/Story";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [_, setStories] = useState<Story[]>([]);
  const MAX_WORD_LIMIT = 250;

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleNewStory = () => {
    axios
      .post("https://story-craft-server.onrender.com/stories/", {
        title: title,
        text: text,
      })
      .then((res) => {
        const newStory = res.data;
        setStories((prevStories) => [newStory, ...prevStories]);
        setTitle("");
        setText("");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);

    if (words.length <= MAX_WORD_LIMIT) {
      setText(inputText);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Link to="/">
            <IconButton size="large" edge="start" sx={{ color: "#FFF" }}>
              <AutoStoriesIcon sx={{ color: "#FFF" }} />
            </IconButton>
          </Link>
          <Typography
            variant="h4"
            component="h1"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <strong>Story Craft</strong>
          </Typography>
          <Button color="inherit" onClick={toggleDrawer}>
            New Story
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
            color="secondary"
          >
            Create New Story
          </Typography>
          <TextField
            label="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              mb: "0px",
              "& .MuiInputLabel-root.Mui-focused": {
                color: (theme) => theme.palette.secondary.main,
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: (theme) => theme.palette.secondary.main,
                },
            }}
          />
          <TextField
            label="Add a starting paragraph..."
            value={text}
            onChange={handleTextChange}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              mb: 2,
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
            {`${
              text.trim() === "" ? 0 : text.trim().split(/\s+/).length
            }/${MAX_WORD_LIMIT} words`}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNewStory}
          >
            Create
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
