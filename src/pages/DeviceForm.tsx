import * as React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Button,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  TextField,
} from "@mui/material";

type Devices = {
  deviceType: string;
  deviceSerial: string;
};
function createData(deviceType: string, deviceSerial: string) {
  return { deviceType, deviceSerial };
}

const  getInitialDevices= (): Devices[] => {
  const localDevices = window.localStorage.getItem('onboarding:devices')
  if (localDevices!=null) {
    return JSON.parse(localDevices).devices
  }
  else {
    return rows
  }
}

const rows: Devices[] = [];

export function DeviceForm() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deviceType, setDeviceType] = React.useState("");
  const [deviceSerial, setDeviceSerial] = React.useState("");
  const [deviceArray, updateDeviceArray] = React.useState(getInitialDevices());

  React.useEffect(() => {
    const deviceArrayFromLocalStore = window.localStorage.getItem('onboarding:devices');
    if(deviceArrayFromLocalStore!=null) {
      updateDeviceArray(JSON.parse(deviceArrayFromLocalStore).devices);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("onboarding:devices", JSON.stringify({devices: deviceArray}));
  }, [deviceArray]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeviceType = (event: SelectChangeEvent) => {
    setDeviceType(event.target.value);
  };
  const handleDeviceSerial = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceSerial(event.target.value);
  };

  const addDevice = () => {
    updateDeviceArray((deviceArray) => [
      createData(deviceType, deviceSerial),
      ...deviceArray,
    ]);
    //window.localStorage.setItem("onboarding:devices", JSON.stringify({devices: deviceArray}));
    setDeviceSerial("");
    setDeviceType("");
  };

  const removeDevice = (deviceSerial: string) => {
    const newArray = deviceArray.filter(function (obj) {
      return obj.deviceSerial !== deviceSerial;
    });
    updateDeviceArray(newArray);
    //window.localStorage.setItem("onboarding:devices", JSON.stringify({devices: deviceArray}));
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Devices for customer
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="device-type-input-label">Device Type</InputLabel>
            <Select
              labelId="device-type-label"
              id="deviceType"
              value={deviceType}
              onChange={handleDeviceType}
              label="Device Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Ground Cast"}>Ground Cast</MenuItem>
              <MenuItem value={"Temp Cast"}>Temp Cast</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="deviceSerial"
            name="deviceSerial"
            label="Device Serial Number"
            autoComplete="TMP-1234"
            variant="standard"
            onChange={handleDeviceSerial}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Button variant="contained" onClick={addDevice} sx={{ mt: 3, ml: 1 }}>
            Add Device
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 250 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Device Type</b>
              </TableCell>
              <TableCell>
                <b>Device Serial Number</b>
              </TableCell>
              <TableCell>
                <b>Options</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceArray
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.deviceSerial}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.deviceType}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.deviceSerial}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Fab
                      color="primary"
                      aria-label="delete"
                      onClick={() => removeDevice(row.deviceSerial)}
                    >
                      <DeleteRoundedIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
