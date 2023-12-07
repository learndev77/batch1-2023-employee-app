import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import Joi from "joi";
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

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log("handleSubmit");

    event.preventDefault();

    console.log(form);

    onSubmit(form);
    console.log(form);
    // navigate("/");
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

    const result = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (result.error) {
      // set Errors
      setErrors({ ...errors, [input.name]: result.error.details[0].message });
    } else {
      // remove
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().min(6).max(15).allow("").optional(),
    address: Joi.string().min(3).max(500).allow("").optional(),
    website: Joi.string().uri().allow("").optional(),
  });

  const isFormInvalid = () => {
    const result = schema.validate(form);

    console.log(result);

    return !!result.error;
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader title={`${initialValue ? "Edit" : "Add"} Employee`} />
        <CardContent>
          <Grid container spaceing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                error={!!errors.name}
                helperText={errors.name}
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
                error={!!errors.username}
                helperText={errors.username}
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
                error={!!errors.email}
                helperText={errors.email}
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
                error={!!errors.phone}
                helperText={errors.phone}
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
                error={!!errors.address}
                helperText={errors.address}
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
                error={!!errors.website}
                helperText={errors.website}
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
          <Button fullWidth type="submit" disabled={isFormInvalid()}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EmployeeForm;
