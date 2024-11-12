//@ts-nocheck
import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import Typography from "@mui/material/Typography";

interface StepperComponentProps {
  activeStep: number; // Define the activeStep prop
}

const steps = [
  "Radiographie",
  "Ordonance",
  "Bilan",
  "Document",
  "Rendez-vous",
  "Paiement",
];

const StepperComponant: React.FC<StepperComponentProps> = ({ activeStep }) => {
  // Use React.FC and provide StepperComponentProps
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return null;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    // Handle back logic here if needed
  };

  const handleSkip = () => {
    // Handle skip logic here if needed
  };

  const handleReset = () => {
    // Handle reset logic here if needed
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* Render additional content based on activeStep if needed */}
    </Box>
  );
};

export default StepperComponant;
