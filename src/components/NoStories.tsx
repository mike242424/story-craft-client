import { Box, Typography } from "@mui/material"

const NoStories = () => {
  return (
    <Box
          sx={{
            margin: "0px 50px 0px 50px",
            display: "flex",
            flexDirection: "column",
            textAlign: "justify",
          }}
        >
          <Typography variant="body1" component="p">
            Welcome to Story Craft! Our app is designed to spark your
            imagination and creativity by helping you to create captivating
            stories with your friends. With Story Craft, you can collaborate
            with others to craft engaging narratives that unfold in exciting and
            unexpected ways. Create a new story and invite your friends to join
            in the adventure. Each person can contribute their unique ideas and
            perspectives, adding depth and richness to the unfolding tale.
            Whether you're a master storyteller or a budding wordsmith, Story
            Craft provides a platform for collaborative storytelling like never
            before.
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="secondary"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            Click the add a new story button to begin...
          </Typography>
        </Box>
  )
}

export default NoStories