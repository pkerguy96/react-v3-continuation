import {
  VerticalTimeline,
  VerticalTimelineElement,
  //@ts-ignore
} from "react-vertical-timeline-component";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import LoadingSpinner from "./LoadingSpinner";
import { useMemo } from "react";
import { Box } from "@mui/material";
const AppointmentVerticalTimeline = ({
  Appointments,
  isLoading,
}: {
  Appointments: any;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const timeline = useMemo(
    () => (
      <Box className="max-h-[500px] overflow-auto rounded-md bg-[#f5f5f5] p-4">
        <VerticalTimeline className="!w-full !m-0">
          {Object.values(Appointments).map((appointment: any, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={appointment.date}
              contentStyle={{
                borderTop: "3px solid #76c5bf",
              }}
              dateClassName="custom-date-color"
              contentArrowStyle={{
                borderRight: "8px solid  #76c5bf",
              }}
              iconStyle={{ background: "#76c5bf", color: "#fff" }}
              icon={<InsertInvitationOutlinedIcon />}
            >
              <h3 className="vertical-timeline-element-title uppercase">
                {appointment.note ? (
                  <p>{appointment.note}</p>
                ) : (
                  "Aucune remarque"
                )}
              </h3>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Box>
    ),
    [Appointments]
  );

  return timeline;
};

export default AppointmentVerticalTimeline;
