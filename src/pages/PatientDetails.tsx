import { Box, Typography } from "@mui/material";
import { useState } from "react";
import "react-vertical-timeline-component/style.min.css";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import AppointmentVerticalTimeline from "../components/AppointmentVerticalTimeline";
import PatientsdetailsComponent from "../components/PatientsdetailsComponent";
import React from "react";
import OperationVerticalTimeline from "../components/OperationVerticalTimeline";
import getGlobalById from "../hooks/getGlobalById";
import patientdetailsApiClient, {
  Patientinfo,
} from "../services/PatientDetailsService";
import { CACHE_KEY_PatientDetails } from "../constants";
const PatientDetails = React.memo(() => {
  const [activeBtn, setActiveBtn] = useState("three");
  //get id in the url
  const { id } = useParams();

  const { data, isLoading } = id
    ? getGlobalById(
        {} as Patientinfo,
        [CACHE_KEY_PatientDetails, id],
        patientdetailsApiClient,
        undefined,
        parseInt(id)
      )
    : { data: null, isLoading: true };
  const handleBtnClick = (ButtonName: string) => {
    setActiveBtn(ButtonName);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!id) {
    return <div>No ID specified.</div>;
  }
  const {
    appointments,
    operations,
    upcomingAppointmentsCount,
    pastAppointmentsCount,
  } = data;

  return (
    <>
      <Box className="parent w-full flex flex-col gap-4">
        <PatientsdetailsComponent info={data} isLoading={isLoading} />
        <Box className="w-full bg-white gap-4 flex flex-col rounded-lg p-4">
          <Box className="w-full rounded-md overflow-hidden flex">
            <Box
              component={"button"}
              className="px-4 py-2 flex-1 text-center cursor-pointer"
              sx={{
                color: activeBtn === "one" ? "#fff" : "#9ea8b2",
                backgroundColor: activeBtn === "one" ? "#76c5bf" : "#f5f5f5",
              }}
              onClick={() => handleBtnClick("one")}
            >
              Rendez-vous
            </Box>
            <Box
              component={"button"}
              className="px-4 py-2 flex-1 text-center cursor-pointer"
              sx={{
                color: activeBtn === "three" ? "#fff" : "#9ea8b2",
                backgroundColor: activeBtn === "three" ? "#76c5bf" : "#f5f5f5",
              }}
              onClick={() => handleBtnClick("three")}
            >
              Opérations
            </Box>
          </Box>
          {activeBtn === "one" && Object.values(appointments).length === 0 ? (
            <p className="flex justify-center font-bold">
              Aucun rendez-vous enregistré pour ce patient.
            </p>
          ) : null}

          {activeBtn === "one" && Object.values(appointments).length > 0 && (
            <AppointmentVerticalTimeline
              Appointments={appointments}
              isLoading={isLoading}
            />
          )}

          {activeBtn === "three" && Object.values(operations).length === 0 ? (
            <p className="flex justify-center font-bold">
              Aucune opération enregistrée pour ce patient.
            </p>
          ) : null}

          {activeBtn === "three" && Object.values(operations).length > 0 && (
            <OperationVerticalTimeline
              Operations={operations}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>
    </>
  );
});

export default PatientDetails;
