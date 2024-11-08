import { Box, Divider } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

const PatientsdetailsComponent = ({
  info,
  isLoading,
}: {
  info: any;
  isLoading: boolean;
}) => {
  if (isLoading) return <LoadingSpinner />;

  return (
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
              <p className="text-xl font-mono font-bold text-center">15</p>
              <p className="text-md font-light tracking-wider text-center  text-[#b9bec5]">
                Past
              </p>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box className="w-full flex flex-col">
              <p className="text-xl font-mono font-bold text-center">2</p>
              <p className="text-md font-light tracking-wider text-center  text-[#b9bec5]">
                Upcoming
              </p>
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
          <p className="text-md font-mono font-bold text-[#1976d2] cursor-pointer">
            Voir tout
          </p>
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
  );
};

export default PatientsdetailsComponent;
