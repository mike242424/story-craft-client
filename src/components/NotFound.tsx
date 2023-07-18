import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h3" component="h3" color="secondary">
        <strong>404 Page Not Found</strong>
      </Typography>
    </Box>
  );
};

export default NotFound;
