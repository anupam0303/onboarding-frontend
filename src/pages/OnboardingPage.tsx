import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomerForm } from "./CustomerForm";
import { DeviceForm } from "./DeviceForm";
import { Review } from "./Review";
import { useNavigate } from "react-router-dom";

const steps = ["Customer Information", "Device Details", "Review"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <CustomerForm />;
    case 1:
      return <DeviceForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export function OnboardCustomer() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      console.log("Confirm is triggered");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleHome = () => {
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Onboard a New Customer
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you!
              </Typography>
              <Typography variant="subtitle1">
                Your request has been taken, you may view the progress in
                status.
              </Typography>
              <Button
                  variant="contained"
                  onClick={handleHome}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Home
                </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
