import { useAuth } from "../hooks/useAuth";
import PrivateRoute from "../components/PrivateRoute";
import { Box, Button, Grid } from "@mui/material";
import { ActionAreaCard } from "../components/Card/Card";

export function LandingPage() {
  const auth = useAuth();

  const cards = [
    <ActionAreaCard
      cardName="Onboard a New Customer"
      cardImage="/onboard.jpg"
      cardAlt="Onboarding"
      navLink="/onboarding"
    />,
    <ActionAreaCard
      cardName="My Tasks"
      cardImage="/tasks.png"
      cardAlt="Tasks"
      navLink="/tasks"
    />,
    <ActionAreaCard
      cardName="Check Status"
      cardImage="/status.jpg"
      cardAlt="Status"
      navLink="/status"
    />,
    <ActionAreaCard
      cardName="Teams"
      cardImage="/teams.jpg"
      cardAlt="Teams"
      navLink="/teams "
    />,
  ];
  if (auth.isLoading) {
    return <Box />;
  }
  return (
    <PrivateRoute>
      <Box sx={{ flexGrow: 1 }}>
        <p></p>
        <Grid
          container
          direction={"row"}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(cards).map((_, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              {cards[index]}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button onClick={() => auth.signOut()}>Log out</Button>
    </PrivateRoute>
  );
}
