import { useState } from "react";
import StepperComponant from "../../components/StepperComponant";
import PatientOperation from "./PatientOperation";
import AppointmentStepPage from "./AppointmentStepPage";
import useGlobalStore from "../../zustand/useGlobalStore";
import AddOrdonance from "../AddOrdonance";
import XrayDemand from "./XrayDemand";
import DocumentPage from "./DocumentPage";
import BloodTest from "./BloodTest";
import OperationPayementStatus from "../../components/OperationPayementStatus";
import VisiteValidation from "./VisiteValidation";

const OperationParentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { id, ordonanceId, operationId } = useGlobalStore();

  const handleStepChange = (newStep: any) => {
    setActiveStep(newStep);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <StepperComponant activeStep={activeStep} />
      {activeStep === 10 && (
        <XrayDemand
          onNext={() => {
            handleStepChange(11);
          }}
        />
      )}
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
      {activeStep === 0 && (
        <VisiteValidation
          onNext={() => {
            handleStepChange(6);
          }}
        />
      )}

      {/* BIllan */}
      {/*  {activeStep === 0 && (
        <PatientOperation onNext={() => handleStepChange(4)} />
      )} */}

      {/* LKHRA  */}
    </div>
  );
};

export default OperationParentPage;
