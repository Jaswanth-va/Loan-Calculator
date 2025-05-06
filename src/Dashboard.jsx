import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Input,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import ErrorPage from "./ErrorPage";

export default function Dashboard() {
  const [principal, setPrincipal] = useState("");
  const [term, setTerm] = useState("");
  const [interest, setInterest] = useState("");
  const [EMI, setEMI] = useState(null);
  const [amortizationData, setAmortizationData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [currency, setCurrency] = useState("USD");
  const [exchangeData, setExchangeData] = useState(null);
  const [error, setError] = useState(null);
  let multiplier = 1;
  if (exchangeData) {
    multiplier = exchangeData[String(currency)];
  }
  const currencyArray = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://v6.exchangerate-api.com/v6/0ca3e8da8227bdcd7d247ac1/latest/USD"
        );
        if (data.result === "success") {
          setExchangeData(data.conversion_rates);
          setError(null);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  function interestRatePerMonth(interestRate) {
    return interestRate / (100 * 12);
  }

  function termInMonths(termInYears) {
    return termInYears * 12;
  }

  function formValidate() {
    const errors = {};
    if (!principal) {
      errors.principal = "Required";
    }
    if (isNaN(principal)) {
      errors.principal = "Invalid Entry";
    }
    if (!term) {
      errors.term = "Required";
    }
    if (isNaN(term)) {
      errors.term = "Invalid Entry";
    }
    if (!interest) {
      errors.interest = "Required";
    }
    if (isNaN(interest)) {
      errors.interest = "Invalid Entry";
    }
    if (Object.keys(errors).length === 0) {
      calculateEMI(Number(principal), Number(interest), Number(term));
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  }

  function calculateEMI(principal, interest, term) {
    try {
      const P = principal;
      const R = interestRatePerMonth(interest);
      const N = termInMonths(term);
      let emi = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
      emi = Number(emi.toFixed(2));
      const amortizationSchTable = [];
      let Balance = P;
      for (let i = 0; i < N; i++) {
        let Interest = Number((Balance * R).toFixed(2));
        let Principal = Number((emi - Interest).toFixed(2));
        Balance = Number((Balance - Principal).toFixed(2));
        if (Balance < 0) {
          Balance = 0;
        }
        const obj = { Month: i + 1, Principal, Interest, Balance };
        amortizationSchTable.push(obj);
      }
      setEMI(emi);
      setAmortizationData(amortizationSchTable);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      {error ? (
        <ErrorPage message="Something went wrong" />
      ) : (
        <>
          <CssBaseline />
          <Container maxWidth="xl">
            <Box style={{ padding: "10px 15px" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  marginBlock: "10px",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.75rem",
                    md: "2rem",
                    lg: "2.5rem",
                  },
                  variant: {
                    xs: "h6",
                    sm: "h5",
                    md: "h4",
                    lg: "h3",
                  },
                }}
              >
                Loan Calculator Dashboard
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                  display: "flex",
                  flexWrap: "wrap",
                  marginBlock: "20px",
                  gap: "12px",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  style={{ margin: "0px" }}
                  label="Loan Amount"
                  variant="outlined"
                  value={principal}
                  onChange={(e) => {
                    setPrincipal(e.target.value);
                  }}
                  error={formErrors.principal}
                  helperText={formErrors.principal && formErrors.principal}
                />

                <TextField
                  style={{ margin: "0px" }}
                  id="outlined-basic"
                  label="Interest Rate (%)"
                  variant="outlined"
                  value={interest}
                  onChange={(e) => {
                    setInterest(e.target.value);
                  }}
                  error={formErrors.interest}
                  helperText={formErrors.interest && formErrors.interest}
                />
                <TextField
                  style={{ margin: "0px" }}
                  id="outlined-basic"
                  label="Term (years)"
                  variant="outlined"
                  value={term}
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  error={formErrors.term}
                  helperText={formErrors.term && formErrors.term}
                />
              </Box>
              <Button variant="contained" onClick={formValidate}>
                CALCULATE
              </Button>
              {EMI && (
                <>
                  <Box style={{ marginBlock: "20px" }}>
                    {EMI && (
                      <Typography variant="h6" component="h6">
                        Monthly EMI:
                        {" " + currency + " " + (EMI * multiplier).toFixed(2)}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <FormControl>
                      <InputLabel id="currency-input-label">
                        Currency
                      </InputLabel>
                      <Select
                        labelId="currency-input-label"
                        label="currency"
                        value={currency}
                        onChange={(e) => {
                          setCurrency(e.target.value);
                        }}
                      >
                        {currencyArray.map((currency) => {
                          return (
                            <MenuItem key={currency} value={currency}>
                              {currency}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setEMI(null);
                        setAmortizationData(null);
                      }}
                    >
                      RESET TABLE
                    </Button>
                  </Box>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ marginBlock: "20px" }}
                  >
                    Amortization Schedule ({currency})
                  </Typography>
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Month </TableCell>
                            <TableCell align="right">Principal</TableCell>
                            <TableCell align="right">Interest</TableCell>
                            <TableCell align="right">Balance</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {amortizationData.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.Month}
                              </TableCell>
                              <TableCell align="right">
                                {(row.Principal * multiplier).toFixed(2) +
                                  " " +
                                  currency}
                              </TableCell>
                              <TableCell align="right">
                                {(row.Interest * multiplier).toFixed(2) +
                                  " " +
                                  currency}
                              </TableCell>
                              <TableCell align="right">
                                {(row.Balance * multiplier).toFixed(2) +
                                  " " +
                                  currency}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
}
