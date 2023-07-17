import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      sx={{marginTop: "50px"}}
    >
      <CircularProgress size={140} color="secondary" />
    </Box>
  );
};

export default Loading;
