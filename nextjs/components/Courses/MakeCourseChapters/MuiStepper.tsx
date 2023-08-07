import { useState } from "react";
import { Step, Stepper, StepContent, StepButton } from "@mui/material";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  stepArray: any;
}

const MuiStepper = (props: IProps): JSX.Element => {
  const { stepArray } = props;

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <Stepper nonLinear activeStep={activeStep} orientation="vertical">
      {stepArray !== null
        ? stepArray.sections.map(
            (x: any, i: number): JSX.Element => (
              <Step key={uuidv4()}>
                <StepButton
                  onClick={(): void => {
                    setActiveStep(i);
                  }}
                >
                  {x.section}
                </StepButton>

                <StepContent>
                  {x.subsections.map(
                    (y: any): JSX.Element => (
                      <div key={uuidv4()}>
                        <Link href="/courses/make-subsection">
                          {y.subsection}
                        </Link>
                      </div>
                    )
                  )}
                </StepContent>
              </Step>
            )
          )
        : ""}
    </Stepper>
  );
};

export default MuiStepper;
