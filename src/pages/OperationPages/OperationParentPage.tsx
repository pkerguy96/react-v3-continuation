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

const OperationParentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { id, ordonanceId, operationId } = useGlobalStore();

  const handleStepChange = (newStep: any) => {
    setActiveStep(newStep);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <StepperComponant activeStep={activeStep} />
      {/* {activeStep === 0 && (
        <XrayDemand
          onNext={() => {
            handleStepChange(1);
          }}
        />
      )} */}
      {activeStep === 0 && <OperationPayementStatus />}
      {/*  {activeStep === 0 && (
        <AddOrdonance
          onNext={() => {
            handleStepChange(2);
          }}
        />
      )} */}
      {/* document */}
      {/* {activeStep === 0 && (
        <DocumentPage
          onNext={() => {
            handleStepChange(1);
          }}
        />
      )} */}
      {/* BIllan */}
      {/*    {activeStep === 0 && (
        <PatientOperation onNext={() => handleStepChange(4)} />
      )} */}
      {/* {activeStep === 0 && <BloodTest onNext={() => handleStepChange(4)} />} */}

      {/* LKHRA  */}
      {/*  {activeStep === 0 && (
        <AppointmentStepPage onNext={() => handleStepChange(5)} />
      )} */}
    </div>
  );
};

export default OperationParentPage;
