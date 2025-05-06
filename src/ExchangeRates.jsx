import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  Container,
  Box,
  Typography,
  TableFooter,
  CssBaseline,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { Margin } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import ErrorPage from "./ErrorPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ExchangeRates() {
  const [exchangeData, setExchangeData] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - Object.entries(exchangeData).length
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  return (
    <>
      {error ? (
        <ErrorPage message={"Something went wrong"} />
      ) : exchangeData ? (
        <>
          <CssBaseline />
          <Container maxWidth="xl">
            <Box style={{ marginTop: "20px" }}>
              <Typography
                variant="h6"
                component="h6"
                style={{ marginBlock: "20px" }}
              >
                Live Exchange rates (Base: USD )
              </Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
                  <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Currency </TableCell>
                        <TableCell align="right">Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? Object.entries(exchangeData).slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : Object.entries(exchangeData)
                      ).map((currency) => (
                        <TableRow
                          key={currency[0]}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {currency[0]}
                          </TableCell>
                          <TableCell align="right">{currency[1]}</TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            8,
                            10,
                            20,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={3}
                          count={Object.entries(exchangeData).length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          slotProps={{
                            select: {
                              inputProps: {
                                "aria-label": "rows per page",
                              },
                              native: true,
                            },
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </Container>
        </>
      ) : (
        <>
          <CssBaseline />
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <CircularProgress />
            </Box>
          </Container>
        </>
      )}
    </>
  );
}
