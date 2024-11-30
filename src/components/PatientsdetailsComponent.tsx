import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router";

const PatientsdetailsComponent = ({
  info,
  isLoading,
}: {
  info: any;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  if (isLoading) return <LoadingSpinner />;

  const handleRowClick = (id: number) => {
    navigate(`/OrdonanceDetails/${id}`);
  };
  return (
    <Box className="flex flex-col gap-4">
      <Box className="w-full flex gap-4 flex-col lg:flex-row lg:items-start">
        <Box className="flex gap-4 w-full lg:flex-[2] flex-col lg:flex-row">
          <Box className="w-full flex lg:flex-[1] flex-col bg-[#ffff] p-4 rounded-lg gap-4">
            <Box className="w-full flex flex-col">
              <p className="text-2xl font-mono font-bold  text-center uppercase">
                {info.nom} {info.prenom}
              </p>
              <p className="text-md font-light tracking-wider text-center text-[#b9bec5]">
                {info.phoneNumber ? info.phoneNumber : "N/A"}
              </p>
            </Box>
            <Box className="w-full flex gap-4">
              <Box className="w-full flex flex-col">
                <p className="text-xl font-mono font-bold text-center">
                  {info.pastAppointmentsCount}
                </p>
                <p className="text-md font-light tracking-wider text-center  text-[#b9bec5]">
                  Passer
                </p>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box className="w-full flex flex-col">
                <p className="text-xl font-mono font-bold text-center">
                  {info.upcomingAppointmentsCount}
                </p>
                <p className="text-md font-light tracking-wider text-center  text-[#b9bec5]">
                  Prochain
                </p>
              </Box>
            </Box>
            <Box className="">
              <Box className="w-full flex items-center justify-center">
                <p className="text-md font-mono font-bold text-center">
                  Référence
                </p>
              </Box>
              <Box className="w-full flex flex-wrap gap-2">
                {info.referral && info.referral.length > 0 ? (
                  info.referral.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-gray-700 bg-[#eff1f7] text-sm"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Aucune référence disponible.</p>
                )}
              </Box>
            </Box>
          </Box>
          <Box className="w-full flex lg:flex-[1.5] flex-col bg-[#ffff] p-4 rounded-lg gap-4">
            <Box className="flex gap-4">
              <Box className="flex-1 flex flex-col gap-1">
                <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                  Genre
                </p>
                <p className="text-md text-center">{info.sex}</p>
              </Box>
              <Box className="flex-1 flex flex-col gap-1">
                <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                  Naissance
                </p>
                <p className="text-md text-center">{info.date}</p>
              </Box>
              <Box className="flex-1 flex flex-col gap-1">
                <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                  Téléphone
                </p>
                <p className="text-md text-center">{info.phoneNumber}</p>
              </Box>
            </Box>
            <Divider orientation="horizontal" flexItem />

            <Box className="flex gap-4 flex-wrap">
              <Box className="w-full flex flex-col gap-1">
                <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                  Addresse
                </p>
                <p
                  className="text-md text-center"
                  style={{ wordWrap: "break-word" }}
                >
                  {info.address}
                </p>
              </Box>
            </Box>

            <Divider orientation="horizontal" flexItem />

            <Box className="flex gap-4">
              <Box className="flex-1 flex flex-col gap-1">
                <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                  Cin
                </p>
                <p className="text-md text-center"> {info.cin}</p>
              </Box>

              <Box className="flex-1 flex flex-col gap-1">
                <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                  Mutuelle
                </p>
                <p className="text-md text-center">{info.mutuelle}</p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="w-full lg:flex-1 p-4 rounded-lg bg-[#fff] flex flex-col gap-4">
          <Box className="w-full flex justify-between">
            <p className="text-md font-mono font-bold">Notes</p>
          </Box>
          <Box className="w-full bg-[#eff1f7] p-4">
            <p
              className="text-gray-500"
              style={{ maxWidth: "100%", overflowWrap: "break-word" }}
            >
              {!info.note ? "Aucune note disponible." : info.note}
            </p>
          </Box>
        </Box>
      </Box>

      <div className=" gap-4 items-start">
        <div className="   bg-[#f5f5f5] text-white text-center  rounded-lg ">
          <h2 className="text-xl text-black font-mono font-bold">Ordonances</h2>
          <Paper className="mt-4" elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">#</TableCell>

                    <TableCell align="center">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {info.ordonances.length > 0 ? (
                    info.ordonances.map((ordonance, index) => (
                      <TableRow
                        key={index}
                        hover
                        onClick={() => handleRowClick(ordonance.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{ordonance.date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        align="center"
                        className="text-gray-600 p-4"
                      >
                        <p className="text-lg ">
                          Désolé, aucune ordonnance pour le moment.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>

      <Box className="flex flex-col lg:flex-row gap-4">
        {/* Allergies Section */}
        <Box className="w-full lg:flex-1 p-4 rounded-lg bg-[#fff] flex flex-col gap-4">
          <Box className="w-full flex  justify-center">
            <p className="text-md font-mono font-bold">Allergies</p>
          </Box>
          <Box className="w-full flex flex-wrap gap-2">
            {info.allergy && info.allergy.length > 0 ? (
              info.allergy.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-gray-700 bg-[#eff1f7] text-sm"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="text-gray-500">Aucune allergie disponible.</p>
            )}
          </Box>
        </Box>

        {/* Diseases Section */}
        <Box className="w-full lg:flex-1 p-4 rounded-lg bg-[#fff] flex flex-col gap-4">
          <Box className="w-full flex  justify-center">
            <p className="text-md font-mono font-bold ">Maladies</p>
          </Box>
          <Box className="w-full flex flex-wrap gap-2">
            {info.disease && info.disease.length > 0 ? (
              info.disease.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-gray-700 bg-[#eff1f7] text-sm"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="text-gray-500">Aucune maladie disponible.</p>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientsdetailsComponent;
