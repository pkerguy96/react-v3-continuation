import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ size = "4rem" }) => {
  return (
    <Box className="flex justify-center items-center ">
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingSpinner;
