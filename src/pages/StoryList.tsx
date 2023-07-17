import axios from "axios";
import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Story } from "../interfaces/Story";
import Loading from "../components/Loading";
import NoStories from "../components/NoStories";

const StoryList = () => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    axios
      .get<Story[]>(import.meta.env.VITE_BASE_URL  + "stories")
      .then((res: { data: Story[] }) => {
        setStories(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {stories.length > 0 ? (
        stories.map((story) => (
          <Link
            to={`/${story.id}`}
            style={{
              flex: "0 0 100%",
              marginBottom: "16px",
              textDecoration: "none",
            }}
            key={story.id}
            state={{ story: story }}
          >
            <Paper
              square
              elevation={8}
              sx={{ marginLeft: "70px", marginRight: "70px", padding: "20px" }}
            >
              <Typography
                sx={{ textAlign: "center" }}
                variant="h6"
                component="h3"
              >
                {story.title}
              </Typography>
            </Paper>
          </Link>
        ))
      ) : (
        <NoStories/>
      )}
    </div>
  );
};

export default StoryList;
