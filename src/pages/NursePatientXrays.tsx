import {
  Paper,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import getGlobalById from "../hooks/getGlobalById";
import {
  NurseXrayvalidationApiClient,
  XrayResponse,
} from "../services/XrayService";
import { CACHE_KEY_NurseXray } from "../constants";
import LoadingSpinner from "../components/LoadingSpinner";

const NursePatientXrays = () => {
  const [searchParams] = useSearchParams(); // Access query parameters
  const targetId = searchParams.get("target_id");
  const { data, isLoading } = getGlobalById(
    {} as XrayResponse,
    [CACHE_KEY_NurseXray[0], targetId],
    NurseXrayvalidationApiClient,
    undefined,
    parseInt(targetId)
  );
  if (isLoading) return <LoadingSpinner />;

  return (
    <Paper className="p-4">
      <Box className="w-full flex flex-col gap-2">
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Validation des radiographies demandées</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />

        <Box className="w-full">
          <Box className="flex flex-col gap-6 p-6">
            <h3 className=" flex justify-between text-2xl font-semibold leading-none tracking-tight text-blue-500 gap-2 items-center">
              Radiographie demandée :
              <span className="text-gray-500 ">{data[0].patient_name}</span>
            </h3>

            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      Type de radiographie
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      Type de vue
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      Côté du corps
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((field, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {field.xray_type}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {field.view_type}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {field.body_side}
                      </TableCell>

                      <TableCell align="right"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default NursePatientXrays;
