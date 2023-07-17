import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress size={60} color="secondary" />
    </Box>
  );
};

export default Loading;
