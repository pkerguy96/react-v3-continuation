import { useState } from "react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Paper } from "@mui/material";
import AppointmentModal from "./AppointmentModal";
import { EventClickArg } from "@fullcalendar/core/index.js";
import moment from "moment";
import AppointmentConfirmation from "./AppointmentConfirmation";
import getGlobal from "../hooks/getGlobal";
import appointmentAPIClient, {
  Appointments,
} from "../services/AppointmentService";
import { CACHE_KEY_APPOINTMENTS } from "../constants";
import LoadingSpinner from "./LoadingSpinner";
import frLocale from "@fullcalendar/core/locales/fr";

const AppointmentsCalendar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState(""); // Store the selected date
  const [confirmationData, setConfirmationData] = useState({
    id: 0,
    patient_name: "",
    patient_id: 0,
    note: "",
    date: "",
  });

  const { data, isLoading } = getGlobal(
    {} as Appointments,
    [CACHE_KEY_APPOINTMENTS[0]],
    appointmentAPIClient,
    undefined
  );

  if (isLoading) return <LoadingSpinner />;

  // Format event data to be displayed in the calendar
  const formattedEvents = data?.map((appointment: Appointments) => {
    const startDate = moment(appointment.date).format("YYYY-MM-DDTHH:mm:ss");

    return {
      id: appointment.id,
      start: startDate, // Ensure event start date and time is set
      title: appointment.patient_name || "No Name", // Display patient name as the event title
      extendedProps: {
        note: appointment.note,
        patient_id: appointment.patient_id,
      },
      // Adjust the default event duration to 30 minutes
      end: moment(appointment.date)
        .add(30, "minutes") // Change to 30 minutes duration
        .format("YYYY-MM-DDTHH:mm:ss"),
    };
  });

  const openAppointmentConfirmationModal = (data: any) => {
    setConfirmationData(data);
    setOpenModalConfirmation(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalConfirmation(false);
  };

  const handleEventClick = (info: EventClickArg) => {
    const appointmentinfo = info.event.extendedProps;
    const patient_name = info.event.title; // Get patient name from the event title
    const date = info.event.startStr;
    const id = info.event.id;

    const data = {
      id: id,
      patient_id: appointmentinfo.patient_id,
      note: appointmentinfo.note,
      patient_name: patient_name, // Use patient name from the event
      date: date,
    };

    openAppointmentConfirmationModal(data);
  };
  /* 
  const handleDateClick = (info: DateClickArg) => {
    const dateTimeRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    setOpenModal(true);
    const selecteddate = new Date(info.dateStr);
    const formattedDateStr = dateTimeRegex.test(info.dateStr)
      ? moment(selecteddate).format("YYYY-MM-DD HH:mm:ss")
      : moment(selecteddate).format("YYYY-MM-DDTHH:mm:ss");
    setSelectedDateStr(formattedDateStr);
  }; */
  const handleDateClick = (info: DateClickArg) => {
    const dateTimeRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    setOpenModal(true);

    const selectedDate = moment(info.dateStr); // Use moment for parsing and manipulation
    const currentHour = selectedDate.hour(); // Get the current hour

    // Adjust the hour if it's outside the range 8 AM to 6 PM
    if (currentHour < 8) {
      selectedDate.hour(8).minute(0).second(0); // Set to 8 AM
    } else if (currentHour > 18) {
      selectedDate.hour(18).minute(0).second(0); // Set to 6 PM
    }

    const formattedDateStr = dateTimeRegex.test(info.dateStr)
      ? selectedDate.format("YYYY-MM-DD HH:mm:ss")
      : selectedDate.format("YYYY-MM-DDTHH:mm:ss");

    setSelectedDateStr(formattedDateStr);
  };

  return (
    <Paper className="p-4" elevation={3}>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "title",
          right: "prev,next,dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        timeZone="Africa/Casablanca"
        //@ts-ignore
        events={formattedEvents} // Use formatted events with start and end time
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        slotDuration="00:01:00"
        slotMinTime="08:00:00" // Start time is 8:00 AM
        slotMaxTime="19:00:00"
        allDaySlot={false}
        locales={[frLocale]}
        validRange={{
          start: moment().format("YYYY-MM-DD"),
        }}
      />
      <AppointmentConfirmation
        data={confirmationData}
        open={openModalConfirmation}
        onClose={handleCloseModal}
      />
      {openModal ? (
        <AppointmentModal
          dateTime={selectedDateStr}
          open={openModal}
          onClose={handleCloseModal}
        />
      ) : (
        ""
      )}
    </Paper>
  );
};

export default AppointmentsCalendar;
