/* global chrome*/
import "./signup-succes.css";
import React, { useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import SchedulingService from "../../http/schedulingService";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { StyledBadge } from "./SignupSuccessStyles";
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';




export default function ExampleFilterMemberCheckbox({ goToSignin }) {

  const [status, setStatus] = React.useState("Не в сети");

  const [friends, setFriends]= React.useState([]);

  const[itemToDo,setItemToDo]=useState("")

  const {
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  const handleChangeItem = (event) => { // принимает событие (автоматически) 
    setItemToDo(event.target.value); // меняет значение инпута на то что пишем
  }; 
  console.log(itemToDo) 



  // const socket = new WebSocket("ws://localhost:5000/");


  React.useEffect(() => {
    getFriends();
    getStatus();

    // socket.onopen = () => {
    //   socket.send(
    //     JSON.stringify({
    //       method: "connection",
    //       username: JSON.parse(localStorage.getItem("name")).name,
    //     })
    //   );
    // };
    
    // socket.onmessage = (event) => {
    //   console.log("С сервера пришло сообщение", event.data);
    // };
  }, []);


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

  async function getFriends() {
    try {
      const response = await SchedulingService.getFriends();
      setFriends(response);
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
      <h6> {JSON.parse(localStorage.getItem("name")).id}: your ID</h6>
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
          {friends.map((user) => (
            <ListItem key={user._id}>
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
                  {user.status}
                </Typography>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      </Box>
      
      <form>
      <TextField id="filled-basic" label="введи Id друга"   size="verysmall"
        variant="filled" onChange={handleChangeItem} />
      
      <Button variant="outlined" endIcon={<SendIcon />}>Outlined</Button>
      </form>
      <Button variant="contained" onClick={logOut}>
        logout
      </Button>
      {/* {friends.map((user) => (<div>{user.name}</div>))} */}
    </>
  );
}
