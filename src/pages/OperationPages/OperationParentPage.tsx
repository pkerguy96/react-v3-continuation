import { useState } from "react";
import StepperComponant from "../../components/StepperComponant";

import AppointmentStepPage from "./AppointmentStepPage";

import AddOrdonance from "../AddOrdonance";
import XrayDemand from "./XrayDemand";
import DocumentPage from "./DocumentPage";
import BloodTest from "./BloodTest";

import VisiteValidation from "./VisiteValidation";
import NursePatientXrays from "../NursePatientXrays";

const OperationParentPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (newStep: any) => {
    setActiveStep(newStep);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <StepperComponant activeStep={activeStep} />
      {activeStep === 0 && (
        <XrayDemand
          onNext={() => {
            handleStepChange(1);
          }}
        />
      )}
      {/*  {activeStep === 0 && <NursePatientXrays />} */}
      {activeStep === 1 && (
        <AddOrdonance
          onNext={() => {
            handleStepChange(2);
          }}
        />
      )}
      {activeStep === 2 && <BloodTest onNext={() => handleStepChange(3)} />}

      {activeStep === 3 && (
        <DocumentPage
          onNext={() => {
            handleStepChange(4);
          }}
        />
      )}
      {activeStep === 4 && (
        <AppointmentStepPage onNext={() => handleStepChange(5)} />
      )}
      {activeStep === 5 && (
        <VisiteValidation
          onNext={() => {
            handleStepChange(6);
          }}
        />
      )}
    </div>
  );
};

export default OperationParentPage;
