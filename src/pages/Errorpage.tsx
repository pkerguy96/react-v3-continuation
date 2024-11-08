import Typography from "@mui/material/Typography";

import { isRouteErrorResponse, useRouteError } from "react-router";

const Errorpage = () => {
  const error = useRouteError();
  return (
    <>
      <Typography variant="h1"> Oops. something went wrong</Typography>
      <Typography variant="body1">
        {isRouteErrorResponse(error)
          ? "Invalid route"
          : "Sorry , an unexpected error has occured"}
      </Typography>
    </>
  );
};

export default Errorpage;
