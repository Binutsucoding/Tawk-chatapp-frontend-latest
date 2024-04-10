// import { useFileHandler, useInputValidation } from "6pp";
// import {
//   CameraAlt as CameraAltIcon,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import {
//   Avatar,
//   Button,
//   Container,
//   IconButton,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { server } from "../constants/config";
// import { userExists } from "../redux/reducers/auth";
// import { usernameValidator } from "../utils/validators";

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rotateCard, setRotateCard] = useState(false); // State to handle rotation

//   const toggleLogin = () => setIsLogin((prev) => !prev);
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const name = useInputValidation("");
//   const bio = useInputValidation("");
//   const username = useInputValidation("", usernameValidator);
//   const password = useInputValidation("");

//   const avatar = useFileHandler("single");
//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Logging In...");
//     setIsLoading(true);

//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/login`,
//         {
//           username: username.value,
//           password: password.value,
//         },
//         config
//       );
//       dispatch(userExists(data.user));
//       toast.success(data.message, { id: toastId });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", {
//         id: toastId,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Signing Up...");
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("avatar", avatar.file);
//     formData.append("name", name.value);
//     formData.append("bio", bio.value);
//     formData.append("username", username.value);
//     formData.append("password", password.value);

//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/new`,
//         formData,
//         config
//       );

//       dispatch(userExists(data.user));
//       toast.success(data.message, { id: toastId });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", {
//         id: toastId,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `linear-gradient(135deg, #54478c 0%, #2c3e50 100%)`, // Mix of dark colors
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "0 10px",
//         position: "relative", // Ensure positioning context for transparent glass effect
//       }}
//     >
//       <Container maxWidth="xs">
//         <Paper
//           elevation={20}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             borderRadius: "10px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transform: rotateCard ? "rotate(360deg)" : "rotate(0deg)", // Apply rotation
//             transition: "transform 0.5s ease", // Smooth transition
//             backgroundColor: "rgba(255, 255, 255, 1.1)", // Transparent white for glass effect
//             zIndex: 1, // Ensure the form fields are clickable
//           }}
//         >
//           <Typography variant="h4" sx={{ marginBottom: 2, color: "black" }}>
//             {isLogin ? "Login" : "Sign Up"}
//           </Typography>
//           <form
//             onSubmit={isLogin ? handleLogin : handleSignUp}
//             style={{ width: "100%" }}
//           >
//             {!isLogin && (
//               <Stack
//                 spacing={2}
//                 alignItems="center"
//                 marginBottom={2}
//                 width="100%"
//               >
//                 <Avatar sx={{ width: 100, height: 100 }} src={avatar.preview} />
//                 <label htmlFor="avatar-upload">
//                   <input
//                     accept="image/*"
//                     id="avatar-upload"
//                     type="file"
//                     style={{ display: "none" }}
//                     onChange={avatar.changeHandler}
//                   />
//                   <Button
//                     variant="contained"
//                     component="span"
//                     startIcon={<CameraAltIcon />}
//                   >
//                     Upload Avatar
//                   </Button>
//                 </label>
//                 {avatar.error && (
//                   <Typography variant="caption" color="error">
//                     {avatar.error}
//                   </Typography>
//                 )}
//               </Stack>
//             )}
//             <Stack spacing={2} marginBottom={2}>
//               {!isLogin && (
//                 <TextField
//                   fullWidth
//                   label="Name"
//                   variant="outlined"
//                   value={name.value}
//                   onChange={name.changeHandler}
//                   sx={{
//                     "& input:focus": {
//                       boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.5)",
//                       color: "#000", // Change input text color
//                     },
//                   }}
//                   autoComplete="off" // Disable autofill
//                 />
//               )}
//               {!isLogin && (
//                 <TextField
//                   fullWidth
//                   label="Bio"
//                   variant="outlined"
//                   value={bio.value}
//                   onChange={bio.changeHandler}
//                   sx={{
//                     "& input:focus": {
//                       boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.5)",
//                       color: "#000", // Change input text color
//                     },
//                   }}
//                   autoComplete="off" // Disable autofill
//                 />
//               )}
//               <TextField
//                 fullWidth
//                 label="Username"
//                 variant="outlined"
//                 value={username.value}
//                 onChange={username.changeHandler}
//                 error={!!username.error}
//                 helperText={username.error}
//                 sx={{
//                   "& input:focus": {
//                     boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.5)",
//                     color: "#000", // Change input text color
//                   },
//                 }}
//                 autoComplete="off" // Disable autofill
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 variant="outlined"
//                 type={showPassword ? "text" : "password"}
//                 value={password.value}
//                 onChange={password.changeHandler}
//                 error={!!password.error}
//                 helperText={password.error}
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton
//                       onClick={togglePasswordVisibility}
//                       edge="end"
//                       aria-label="toggle password visibility"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   ),
//                 }}
//                 sx={{
//                   "& input:focus": {
//                     boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.9)",
//                     color: "#000", // Change input text color
//                   },
//                 }}
//                 autoComplete="off" // Disable autofill
//               />
//             </Stack>
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLogin ? "Login" : "Sign Up"}
//             </Button>
//           </form>
//           <Typography variant="body2" sx={{ marginTop: 2 }}>
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <Button
//               variant="text"
//               onClick={() => {
//                 toggleLogin();
//                 setRotateCard(!rotateCard); // Toggle rotation
//               }}
//               disabled={isLoading}
//               sx={{ marginLeft: 1 }}
//             >
//               {isLogin ? "Sign Up" : "Login"}
//             </Button>
//           </Typography>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default Login;

// Import necessary modules

import React, { useState } from "react";
import { useFileHandler, useInputValidation } from "6pp";
import {
  CameraAlt as CameraAltIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

// Import your logo image
import logo from "../images/favicon.png";

const Login = () => {
  // State variables and functions
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rotateCard, setRotateCard] = useState(false);

  // Toggle login/signup mode
  const toggleLogin = () => setIsLogin((prev) => !prev);
  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Input validation hooks
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  // File handler hook for avatar
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Signup handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(135deg, #54478c 0%, #2c3e50 100%)`, // Mix of dark colors
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10px",
        position: "relative", // Ensure positioning context for transparent glass effect
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={20}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transform: rotateCard ? "rotate(360deg)" : "rotate(0deg)", // Apply rotation
            transition: "transform 0.5s ease", // Smooth transition
            backgroundColor: "rgba(255, 255, 255, 1.1)", // Transparent white for glass effect
            zIndex: 1, // Ensure the form fields are clickable
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", marginBottom: "0px" }}
          />
          {/* Your logo */}
          <Typography variant="h4" sx={{ marginBottom: 2, color: "black" }}>
            {isLogin ? "Login" : "Sign Up"}
          </Typography>
          {/* Form */}
          <form
            onSubmit={isLogin ? handleLogin : handleSignUp}
            style={{ width: "100%" }}
          >
            {/* Avatar */}
            {!isLogin && (
              <Stack
                spacing={2}
                alignItems="center"
                marginBottom={2}
                width="100%"
              >
                <Avatar sx={{ width: 100, height: 100 }} src={avatar.preview} />
                <label htmlFor="avatar-upload">
                  <input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={avatar.changeHandler}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CameraAltIcon />}
                  >
                    Upload Avatar
                  </Button>
                </label>
                {avatar.error && (
                  <Typography variant="caption" color="error">
                    {avatar.error}
                  </Typography>
                )}
              </Stack>
            )}
            {/* Other input fields */}
            <Stack spacing={2} marginBottom={2}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                  sx={{
                    "& input:focus": {
                      boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.5)",
                      color: "#000", // Change input text color
                    },
                  }}
                  autoComplete="off" // Disable autofill
                />
              )}
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Bio"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{
                    "& input:focus": {
                      boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.5)",
                      color: "#000", // Change input text color
                    },
                  }}
                  autoComplete="off" // Disable autofill
                />
              )}
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                error={!!username.error}
                helperText={username.error}
                sx={{
                  "& input:focus": {
                    boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.5)",
                    color: "#000", // Change input text color
                  },
                }}
                autoComplete="off" // Disable autofill
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password.value}
                onChange={password.changeHandler}
                error={!!password.error}
                helperText={password.error}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{
                  "& input:focus": {
                    boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.9)",
                    color: "#000", // Change input text color
                  },
                }}
                autoComplete="off" // Disable autofill
              />
            </Stack>
            {/* Submit button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          {/* Toggle between login/signup */}
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              variant="text"
              onClick={() => {
                toggleLogin();
                setRotateCard(!rotateCard); // Toggle rotation
              }}
              disabled={isLoading}
              sx={{ marginLeft: 1 }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
