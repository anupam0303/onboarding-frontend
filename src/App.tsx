import "./App.css";

import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./pages/SignIn";
import { OnboardCustomer } from "./pages/OnboardingPage";
import { ResponsiveAppBar } from "./components/ResponsiveAppBar"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { LandingPage } from "./pages/LandingPage";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Box />;
  }
  return (
    <BrowserRouter>
    {auth.isAuthenticated? <ResponsiveAppBar /> : null}
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="dashboard" element={<LandingPage />}></Route>
        <Route path="onboarding" element={<OnboardCustomer />}></Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
