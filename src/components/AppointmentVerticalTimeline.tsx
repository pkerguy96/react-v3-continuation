import {
  VerticalTimeline,
  VerticalTimelineElement,
  //@ts-ignore
} from "react-vertical-timeline-component";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
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
                borderTop: "3px solid rgb(33, 150, 243)",
              }}
              dateClassName="custom-date-color"
              contentArrowStyle={{
                borderRight: "8px solid  rgb(33, 150, 243)",
              }}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<HealthAndSafetyOutlinedIcon />}
            >
              <h3 className="vertical-timeline-element-title uppercase">
                {appointment.title}
              </h3>
              {appointment.note ? <p>{appointment.note}</p> : null}
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
