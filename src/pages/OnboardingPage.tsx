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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomerForm } from "./CustomerForm";
import { DeviceForm } from "./DeviceForm";
import { Review } from "./Review";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

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
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [createOnboardingResponse, setCreateOnboardingResponse] =
    React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      console.log("Confirm is triggered");
      createCustomerOnboarding();
    }
  };

  const displayError = (errorMessage: string) => {
    setIsError(true);
    setIsSuccess(false);
    setIsLoading(false);
    setCreateOnboardingResponse(errorMessage);
  };

  const displaySuccess = (successMessage: string) => {
    setIsError(false);
    setIsSuccess(true);
    setIsLoading(false);
    setCreateOnboardingResponse(successMessage);
  };

  let customerOnboardingMsg = {};

  const createCustomerOnboarding = async () => {
    if (process.env.REACT_APP_BACKEND_API_URL != null) {
      const customerInfo = JSON.parse(
        window.localStorage.getItem("onboarding:customer") || ""
      );
      const devicesInfo = JSON.parse(
        window.localStorage.getItem("onboarding:devices") || ""
      );
      customerOnboardingMsg = {
        ...customerInfo,
        ...devicesInfo,
      };
      console.log("Onboarding message: ", customerOnboardingMsg);
      try {
        const response = axios.post(
          process.env.REACT_APP_BACKEND_API_URL,
          customerOnboardingMsg
        );
        setIsLoading(true);
        await response.then((res) => {
          console.log("Res is: ", res);
          if (res.status === 200) {
            displaySuccess(JSON.stringify(res.data));
          } else {
            displayError("Error: " + res.data);
          }
        });
      } catch (error) {
        console.log("Error is: ", (error as AxiosError).response?.data);
        displayError(
          "Error: " + JSON.stringify((error as AxiosError).response?.data)
        );
      }
    } else {
      displayError("No Backend is Configured");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleHome = () => {
    navigate("/dashboard");
  };

  console.log("URL is: ", process.env.REACT_APP_BACKEND_API_URL);
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
          {isLoading ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="inherit" />
            </Stack>
          ) : null}
          <Stack sx={{ width: "100%" }} spacing={2}>
            {isError ? (
              <Alert severity="error">{createOnboardingResponse}</Alert>
            ) : null}
            {isSuccess ? (
              <Alert severity="success">{createOnboardingResponse}</Alert>
            ) : null}
          </Stack>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              {isSuccess ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Thank you!
                  </Typography>
                  <Typography variant="subtitle1">
                    Your request has been taken, you may view the progress in
                    status.
                  </Typography>
                </>
              ) : null}
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
