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
  console.log(info);

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
