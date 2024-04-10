// import { useInputValidation } from "6pp";
// import { Button, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { bgGradient } from "../../constants/color";
// import { adminLogin, getAdmin } from "../../redux/thunks/admin";

// const AdminLogin = () => {
//   const { isAdmin } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   const secretKey = useInputValidation("");

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(adminLogin(secretKey.value));
//   };

//   useEffect(() => {
//     dispatch(getAdmin());
//   }, [dispatch]);

//   if (isAdmin) return <Navigate to="/admin/dashboard" />;

//   return (
//     <div
//       style={{
//         /*  backgroundImage: bgGradient, */
//         backgroundImage: `linear-gradient(135deg, #54478c 0%, #2c3e50 100%)`,
//       }}
//     >
//       <Container
//         component={"main"}
//         maxWidth="xs"
//         sx={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Paper
//           elevation={20}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h5">Admin Login</Typography>
//           <form
//             style={{
//               width: "100%",
//               marginTop: "1rem",
//             }}
//             onSubmit={submitHandler}
//           >
//             <TextField
//               required
//               fullWidth
//               label="Secret Key"
//               type="password"
//               margin="normal"
//               variant="outlined"
//               value={secretKey.value}
//               onChange={secretKey.changeHandler}
//             />

//             <Button
//               sx={{
//                 marginTop: "1rem",
//               }}
//               variant="contained"
//               color="primary"
//               type="submit"
//               fullWidth
//             >
//               Login
//             </Button>
//           </form>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default AdminLogin;

// Import necessary modules
import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

// Import your logo image
import logo from "../../images/favicon.png";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(135deg, #54478c 0%, #2c3e50 100%)`,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={20}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Your logo */}
          <img
            src={logo}
            alt="Logo"
            style={{ width: "120px", marginBottom: "5px" }}
          />
          {/* Admin Login title */}
          <Typography variant="h5">Admin Login</Typography>
          {/* Form */}
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            {/* Input field for secret key */}
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            {/* Submit button */}
            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
