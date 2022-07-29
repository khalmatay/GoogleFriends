/* global chrome*/
import "./signup-succes.css";
import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import SchedulingService from "../../http/schedulingService";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "red",
    color: "red",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function ExampleFilterMemberCheckbox({ goToSignin }) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(funcname) {
    return {
      sx: {
        bgcolor: stringToColor(funcname),
      },
      children: `${funcname.split(" ")[0][0]}`,
    };
  }

  // const [status, setSatus] = React.useState(0);
  // setSatus(chrome.storage.local.get(['statusOnline'], (val)))

  const [status, setStatus] = React.useState("Не в сети");

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  }, []);
  React.useEffect(() => {
    getStatus();
  }, []);

  const socket = new WebSocket("ws://localhost:5000/");
  const nameSocket = new SchedulingService();

  React.useEffect(() => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "connection",
          username: JSON.parse(localStorage.getItem("name")).name,
        })
      );
    };

    socket.onmessage = (event) => {
      console.log("С сервера пришло сообщение", event.data);
    };
  }, []);

  async function getStatus() {
    try {
      chrome.storage.local.get("statusOnline").then(({ statusOnline }) => {
        if (statusOnline === 1) {
          setStatus("В сети");
        } else {
          setStatus("Не в сети");
        }
      });
    } catch (error) {}
  }

  console.log(status, "dsfrssrfee");

  async function getUsers() {
    try {
      const response = await SchedulingService.getUsers();
      setUsers(response);
      console.log(response);
    } catch (error) {}
  }

  const logOut = () => {
    SchedulingService.logout();
    goToSignin();
  };

  return (
    <>
      <h1 className="header">
        {JSON.parse(localStorage.getItem("name")).name}
        <ListItemDecorator sx={{ alignSelf: "flex-end" }}>
          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar sx={{ width: 86, height: 76 }} />
            </StyledBadge>
          </Stack>
        </ListItemDecorator>
      </h1>
      <Box sx={{ width: 320 }}>
        <Typography
          id="ellipsis-list-demo"
          level="body4"
          textTransform="uppercase"
          fontWeight="l"
          mb={1}
          sx={{ letterSpacing: "0.15rem" }}
        >
          Friends
        </Typography>
        <List
          aria-labelledby="ellipsis-list-demo"
          sx={{ "--List-decorator-width": "56px" }}
        >
          {users.map((user) => (
            <ListItem>
              <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar {...stringAvatar(`${user.name}`)} />
                  </StyledBadge>
                </Stack>
              </ListItemDecorator>
              <ListItemContent>
                <Typography>{user.name}</Typography>
                <Typography level="body2" noWrap>
                  {status}
                </Typography>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button variant="contained" onClick={logOut}>
        logout
      </Button>
    </>
  );
}
