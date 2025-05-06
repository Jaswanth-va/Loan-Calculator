import { Padding } from "@mui/icons-material";
import { CssBaseline, Paper, Typography, Container, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function ErrorPage({ message }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            marginTop: "50px",
          }}
        >
          <Paper elevation={3} sx={{ padding: "20px 50px" }}>
            {message ? (
              <Typography variant="subtitle2">{message}</Typography>
            ) : (
              <>
                <Typography
                  variant="h2"
                  style={{ marginBottom: "10px", textAlign: "center" }}
                >
                  404
                </Typography>
                <Typography variant="subtitle2">Page Not Found</Typography>
              </>
            )}
          </Paper>
          <NavLink to="/">Home</NavLink>
        </Box>
      </Container>
    </>
  );
}
