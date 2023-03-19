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
    return JSON.parse(localCustomer).admin
  }
  else {
    return []
  }
}



export function CustomerForm() {
  const [name, setName] = React.useState(getInitialState('name'));
  const [admin, setAdmin] = React.useState(getInitialAdmins());
  const [product, setProduct] = React.useState(getInitialState('product'));
  const [tier, setTier] = React.useState(getInitialState('tier'));
  const [region, setRegion] = React.useState(getInitialState('region'));

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
      name,
      admin,
      product,
      tier,
      region
    }
    window.localStorage.setItem("onboarding:customer", JSON.stringify(customerInfo));
  }, [admin, name, product, region, tier]);


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
            defaultValue={name}
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
            defaultValue={admin}
            onChange={handleAdmin}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="product-input-label">Product</InputLabel>
            <Select
              labelId="product-label"
              id="products"
              value={product}
              onChange={handleChange}
              label="Product"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"wxh"}>Wx Horizon</MenuItem>
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
              <MenuItem value={"pro"}>Pro</MenuItem>
              <MenuItem value={"premium"}>Premium</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="region-input-label">Region</InputLabel>
            <Select
              labelId="region-label"
              id="region"
              value={region}
              onChange={handleRegion}
              label="Customer Region"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"eu-central-1"}>Frankfurt</MenuItem>
              <MenuItem value={"us-east-1"}>N. Virginia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
