import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProfileUser = () => {
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRePassword, setNewRePassword] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      const requestOptions = {
        headers: {
          method: "GET",
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Token: `${process.env.REACT_APP_TOKEN}`,
        },
      };
      const getData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/users`,
          requestOptions
        );
        const data = await response.json();
        setUserData(data.data);
      };
      getData();
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const addUserApi = (event) => {
    event.preventDefault();
    const re_password = rePassword;
    console.log(email, username, password, rePassword);
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Token: `${process.env.REACT_APP_TOKEN}`,
      },
    };
    const body = {
      username: username,
      email: email,
      password: password,
      re_password: re_password,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/users`, body, requestOptions)
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getApiById = (id) => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Token: `${process.env.REACT_APP_TOKEN}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_URL}/users/${id}`, requestOptions)
      .then((response) => response)
      .then((data) => {
        console.log(data.data);
        setNewUsername(data.data.username);
        setOpenUpdate(true);
      })
      .catch((err) => console.log(err));
  };

  const updateApiById = (id) => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Token: `${process.env.REACT_APP_TOKEN}`,
      },
    };
    const body = {
      id: parseInt(id),
      username: newUsername,
      email: newEmail,
      password: newPassword,
      re_password: newRePassword,
    };
    axios
      .put(`${process.env.REACT_APP_URL}/users/${id}`, body, requestOptions)
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const deleteApiById = (id) => {
    if (window.confirm("Do you want to remove?")) {
      const requestOptions = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Token: `${process.env.REACT_APP_TOKEN}`,
        },
      };
      axios
        .delete(`${process.env.REACT_APP_URL}/users/${id}`, requestOptions)
        .then((response) => response)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h1>Users Table</h1>
        <Button
          variant="outlined"
          style={{ marginLeft: "70%" }}
          onClick={handleClickOpen}
        >
          Add User
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill this form to add new user
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="pass"
              name="Re-enter"
              label="Re-enter Password"
              type="password"
              fullWidth
              variant="outlined"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="button"
              onClick={(event) => {
                addUserApi(event);
                handleClose();
              }}
            >
              Add User
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill this form to update user</DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="pass"
              name="Re-enter"
              label="Re-enter Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newRePassword}
              onChange={(e) => setNewRePassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="button"
              onClick={(event) => {
                updateApiById(id);
                setOpenUpdate(false);
              }}
            >
              Update User
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            style={{ width: "90%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Username</StyledTableCell>
                <StyledTableCell align="right">Active</StyledTableCell>
                <StyledTableCell align="right">Company</StyledTableCell>
                <StyledTableCell align="right">Roles</StyledTableCell>
                <StyledTableCell align="right">Options</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.is_active ? "Yes" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.company.code}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.roles[0].Name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      // <Button
                      //   id="demo-customized-button"
                      //   aria-controls={open ? "demo-customized-menu" : undefined}
                      //   aria-haspopup="true"
                      //   aria-expanded={open ? "true" : undefined}
                      //   variant="contained"
                      //   disableElevation
                      //   onClick={handleClick}
                      //   endIcon={<KeyboardArrowDownIcon />}
                      // >
                      //   Options
                      // </Button>
                      // <StyledMenu
                      //   id="demo-customized-menu"
                      //   MenuListProps={{
                      //     "aria-labelledby": "demo-customized-button",
                      //   }}
                      //   anchorEl={anchorEl}
                      //   open={openMenu}
                      //   onClose={handleCloseMenu}
                      // >
                      //   <MenuItem onClick={(event) => getApiById(row.id)} disableRipple>
                      //     <EditIcon />
                      //     Update
                      //   </MenuItem>
                      //   <Divider sx={{ my: 0.5 }} />
                      //   <MenuItem onClick={(event) => /* deleteApiById(event, row.id) */ {console.log(event); console.log(row);}} disableRipple>
                      //     <DeleteIcon />
                      //     Delete
                      //   </MenuItem>
                      // </StyledMenu>
                    }
                    <Button
                      onClick={(e) => {
                        getApiById(row.id);
                        setId(row.id);
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={(e) => {
                        deleteApiById(row.id);
                      }}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {
        //   {userData.map((post) => (
        //     <div
        //       key={post.id}
        //       style={{
        //         border: "1px solid black",
        //         margin: "16px",
        //         padding: "16px",
        //         backgroundColor: "#2d2d2d",
        //         color: "white",
        //         fontWeight: "bold",
        //       }}
        //     >
        //       {JSON.stringify(post)}
        //     </div>
        //   ))}
      }
    </div>
  );
};

export default ProfileUser;
