import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

type Customer = {
  customerName: string;
  productName: string;
  tier: string;
  customerRegion: string;
  adminUsers: string[];
};

type Devices = {
  deviceType: string,
  deviceSerial: string
}

const localCustomerInit: Customer = {
  customerName: "",
  productName: "",
  tier: "",
  customerRegion: "",
  adminUsers: [],
};
const localDevicesInit: Devices[] =[{
  deviceType: "",
  deviceSerial: ""
}];

const getDevices = ():Devices[] => {
  const devicesFromLocalStore = window.localStorage.getItem("onboarding:devices");
  if(devicesFromLocalStore) {
    return(JSON.parse(devicesFromLocalStore).devices);
    //console.log("localDevices:", localDevices)
  }
  else{
    return localDevicesInit;
  }
}

const getInitialState = ():Customer => {
  const customerFromLocalStore = window.localStorage.getItem("onboarding:customer");
  if(customerFromLocalStore) {
    return(JSON.parse(customerFromLocalStore));
    //console.log("localCustomer:", localCustomer)
  }
  else {
    return localCustomerInit;
  }
  //getDevices();
};


export function Review() {
  const [localCustomer, setlocalCustomer] = React.useState(getInitialState());
  const [localDevices, setlocalDevices] = React.useState(getDevices());
  
  const customerInfoArr: string[]= Object.keys(localCustomer).filter((key)=> key!=="admin");

  React.useEffect(() => {
    console.log("Getting initial state for review")
    getInitialState();
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer summary
      </Typography>
      <List disablePadding>
        {customerInfoArr.map((info) => (
          <ListItem key={info} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={info} />
            <Typography variant="body2">{(localCustomer[info as keyof typeof localCustomer])}</Typography>
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Devices
          </Typography>
          <Grid container>
          <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom><b>Device Type</b></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom><b>Serial Number</b></Typography>
                </Grid>
              </React.Fragment>
            {localDevices.map((device) => (
              <React.Fragment key={device.deviceSerial}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{device.deviceType}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{device.deviceSerial}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
