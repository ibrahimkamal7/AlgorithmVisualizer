import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "../styles/home.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function MainPage() {
  return (
    <div>
      <div className="header-main" id="welcome">
        <h1>Welcome to the Algorithm Visualizer</h1>
      </div>

      <div className="index">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Components</StyledTableCell>
                <StyledTableCell align="right">
                  Algorithms Implemented
                </StyledTableCell>
                <StyledTableCell align="right">How to Use</StyledTableCell>
                <StyledTableCell align="right">Links</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={1}>
                <StyledTableCell component="th" scope="row">
                  Sorting Visualizer
                </StyledTableCell>
                <StyledTableCell align="right">
                  Bubble Sort, Heap Sort, Merge Sort, Quick Sort
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href="https://github.com/ibrahimkamal7/AlgorithmVisualizer/blob/master/README.md">
                    Link to the README file
                  </a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <Link to="/sorting-algorithm-visualizer">
                    Visualize Sorting Algorithms
                  </Link>
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow key={1}>
                <StyledTableCell component="th" scope="row">
                  Searching Visualizer
                </StyledTableCell>
                <StyledTableCell align="right">
                  Linear Search and Binary Search
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href="https://github.com/ibrahimkamal7/AlgorithmVisualizer/blob/master/README.md">
                    Link to the README file
                  </a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to="/seaching-algorithm-visualizer">
                    Visualize Searching Algorithms
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div id="source">
          <Button
            variant="contained"
            color="primary"
            href="https://github.com/ibrahimkamal7/AlgorithmVisualizer"
          >
            View the source code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
