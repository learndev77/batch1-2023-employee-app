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
import * as authService from "../services/auth";

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log("handleSubmit");

    event.preventDefault();

    onLogin(form.username, form.password);

    //   authService
    //     .register(form.username, form.password)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((errors) => {
    //       console.log(errors);
    //     });
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
    username: Joi.string().required(),
    password: Joi.string().required(),
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
        <CardHeader title={`Login Page`} />
        <CardContent>
          <Grid container spaceing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                error={!!errors.username}
                helperText={errors.username}
                value={form.username}
                onChange={handleChange}
                label="User Name"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                error={!!errors.password}
                helperText={errors.password}
                value={form.password}
                onChange={handleChange}
                label="Password"
                variant="standard"
                type="password"
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

export default LoginPage;
