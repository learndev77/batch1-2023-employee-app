import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ onSubmit, initialValue }) => {
  const [form, setForm] = useState(
    initialValue || {
      name: "",
      username: "",
      email: "",
      phone: "",
      address: "",
      website: "",
    }
  );

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log("handleSubmit");

    event.preventDefault();

    console.log(form);

    onSubmit(form);
    console.log(form);
    navigate("/");
  };

  const handleChange = ({ currentTarget: input }) => {
    // console.log(event.currentTarget.value);
    // console.log(event.currentTarget.name);

    // setForm({
    //   ...form,
    //   [event.currentTarget.name]: event.currentTarget.value,
    // });
    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader title={`Add Employee`} />
        <CardContent>
          <Grid container spaceing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                value={form.name}
                onChange={handleChange}
                label="Name"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                value={form.username}
                onChange={handleChange}
                label="Username"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                value={form.email}
                onChange={handleChange}
                label="Email"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                value={form.phone}
                onChange={handleChange}
                label="Phone"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                value={form.address}
                onChange={handleChange}
                label="Address"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="website"
                value={form.website}
                onChange={handleChange}
                label="Website"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button fullWidth type="submit">
            Submit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EmployeeForm;
