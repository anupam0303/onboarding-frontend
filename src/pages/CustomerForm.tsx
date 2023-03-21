import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const admins : string[]=[];

const  getInitialState= (stateName: string) => {
  const localCustomer = window.localStorage.getItem('onboarding:customer')
  if (localCustomer!=null) {
    return JSON.parse(localCustomer)[stateName]
  }
  else {
    return ""
  }
}

const  getInitialAdmins= (): string[] => {
  const localCustomer = window.localStorage.getItem('onboarding:customer')
  if (localCustomer!=null) {
    return JSON.parse(localCustomer).adminUsers
  }
  else {
    return []
  }
}



export function CustomerForm() {
  const [customerName, setName] = React.useState(getInitialState('customerName'));
  const [adminUsers, setAdmin] = React.useState(getInitialAdmins());
  const [productName, setProduct] = React.useState(getInitialState('productName'));
  const [tier, setTier] = React.useState(getInitialState('tier'));
  const [customerRegion, setRegion] = React.useState(getInitialState('customerRegion'));

  const handleChange = (event: SelectChangeEvent) => {
    setProduct(event.target.value);
  };
  const handleTier = (event: SelectChangeEvent) => {
    setTier(event.target.value);
  };

  const handleRegion = (event: SelectChangeEvent) => {
    setRegion(event.target.value)
  }

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin((admin) => [
      event.target.value
    ]);
  };

  React.useEffect(() => {
    const customerInfo = {
      customerName,
      adminUsers,
      productName,
      tier,
      customerRegion
    }
    window.localStorage.setItem("onboarding:customer", JSON.stringify(customerInfo));
  }, [adminUsers, customerName, customerRegion, productName, tier]);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="customerName"
            name="customerName"
            label="Customer Name"
            fullWidth
            autoComplete="TestCompany Oyj"
            variant="standard"
            defaultValue={customerName}
            onChange={handleName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="adminEmail"
            name="adminEmail"
            label="Customer Admin Email Address"
            fullWidth
            autoComplete="admin@testoyj.com"
            variant="standard"
            defaultValue={adminUsers? adminUsers.toString():""}
            onChange={handleAdmin}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="product-input-label">Product</InputLabel>
            <Select
              labelId="product-label"
              id="products"
              value={productName}
              onChange={handleChange}
              label="Product"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"WxHorizon"}>WxHorizon</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="tier-input-label">Product Tier</InputLabel>
            <Select
              labelId="tier-label"
              id="tier"
              value={tier}
              onChange={handleTier}
              label="Product Tier"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Pro"}>Pro</MenuItem>
              <MenuItem value={"Premium"}>Premium</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="region-input-label">Region</InputLabel>
            <Select
              labelId="region-label"
              id="region"
              value={customerRegion}
              onChange={handleRegion}
              label="Customer Region"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Northern Virginia"}>Northern Virginia</MenuItem>
              <MenuItem value={"Frankfurt"}>Frankfurt</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
