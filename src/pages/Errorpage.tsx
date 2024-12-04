import { Box, Typography, Button } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const Errorpage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #ff6f61, #ff9671)",
        color: "#fff",
        padding: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "#fff" }} />
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Oups ! Quelque chose s'est mal passé.
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ fontSize: 18, maxWidth: 600 }}
      >
        {isRouteErrorResponse(error)
          ? "La page que vous recherchez n'existe pas ou n'est pas disponible.."
          : "Une erreur inattendue s'est produite. Nous travaillons à le réparer."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          mt: 3,
          backgroundColor: "#fff",
          color: "#ff6f61",
          "&:hover": { backgroundColor: "#f1f1f1" },
        }}
        onClick={() => navigate("/")}
      >
        Retourner à l'index
      </Button>
    </Box>
  );
};

export default Errorpage;
