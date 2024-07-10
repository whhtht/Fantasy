import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import axios from "axios";

import guiter_image from "../image/guiter.jpg";

const Sign_in: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = React.useState(false);
  const handleMouseDownEmail = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();
  const handleClickShowEmail = () => setShowEmail((showEmail) => !showEmail);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedRememberMe) {
      const savedEmail = localStorage.getItem("email");
      const savedPassword = localStorage.getItem("password");
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    }
  }, []);
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
    if (!event.target.checked) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.setItem("rememberMe", "false");
    }
  };

  const [error, setError] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email){
      setError('Please enter your email address.');
      setEmail('');
      setPassword('');
      return;
    }
    if(!password){
      setError('Please enter your password.');
      setEmail('');
      setPassword('');
      return;
    }else {
      setError('');
      console.log('Form submitted:', { email, password });
    }

    axios.post("http://localhost:3000/api", { email, password })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
  };
    
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          {/* Guiter Image */}
          <Box
            component="img"
            src={guiter_image}
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
          sx={{
            position: "relative",
          }}
        >
          {/* Welcome Text */}
          <Box
            sx={{
              position: "relative",
              width: "32px",
              height: "32px",
              border: "6px solid #000000",
              borderRadius: "50%",
              top: "15%",
              left: "20%",
            }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              top: "18%",
              left: "20%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "28px",
                fontWeight: "700",
                lineHeight: "36px",
                textAlign: "left",
                color: "#1D2129",
                my: "1%",
              }}
            >
              Welcome to Fantasy
            </Typography>
            <Typography
              sx={{
                fontFamily: "PingFang SC",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "22px",
                textAlign: "left",
                color: "#4E5969",
                mb: "5%",
              }}
            >
              Welcome Back! Please enter your details.
            </Typography>
            {/* Input Email */}
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "22px",
                textAlign: "left",
                color: "#4E5969",
                mt: "1%",
              }}
            >
              Email
            </Typography>
            <FormControl
              sx={{
                width: "80%",
                my: "1%",
              }}
              variant="outlined"
            >
              <OutlinedInput
                placeholder="Enter your email address..."
                type={showEmail ? "text" : "password"}
                value={email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle email visibility"
                      onClick={handleClickShowEmail}
                      onMouseDown={handleMouseDownEmail}
                      edge="end"
                    >
                      {showEmail ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* Input Password */}
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "22px",
                textAlign: "left",
                color: "#4E5969",
                mt: "1%",
              }}
            >
              Password
            </Typography>
            <FormControl
              sx={{
                width: "80%",
                mt: "1%",
              }}
              variant="outlined"
            >
              <OutlinedInput
                placeholder="Enter your password..."
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {error && (
                <Typography color="error" variant="body2" sx={{ visibility: 'visible', height: '0.5%' }}>
                    {error}
                </Typography>
            )}
            {!error && (
                <Typography color="error" variant="body2" sx={{ visibility: 'hidden', height: '0.5%' }}>
                    Placeholder
                </Typography>
            )}
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Remember Me */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                }
                label="Remember me"
              />
              {/* Froget Password */}
              <Link
                to='/signUp'
                style={{
                  fontFamily: "Helvetica",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#4E5969",
                  textDecoration:'none'
                }}
              >
                Forget password?
              </Link>
            </Box>
            {/* Sign in Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "22px",
                textAlign: "center",
                textTransform: "none",
                width: "80%",
                backgroundColor: "#0057FE",
                color: "#FFFFFF",
                p: "1.5%",
                my: "4%",
              }}
            >
              Sign in
            </Button>
            {/* As a Guest */}
            <Button
              href=" "
              sx={{
                fontFamily: "PingFang SC",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "22px",
                textAlign: "center",
                textTransform: "none",
                width: "80%",
                backgroundColor: "#FFFFFF",
                color: "#4E5969",
                border: "1px solid #E5E6E8",
                p: "1.5%",
              }}
            >
              Continue as a guest
            </Button>
            <Typography
              sx={{
                display:'flex',
                flexDirection:'row',
                width:'100%',
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                textAlign: "left",
                color: "#86909C",
                mt: "3%",
              }}
            >
              Don't have an account?
              {/* Sign Up */}
              <Link
                to='/signUp'
                style={{
                  textDecoration: "none",
                  fontFamily: "Helvetica",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#0057FE",
                  marginLeft:'1%',
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Sign_in;