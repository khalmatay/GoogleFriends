
import './signup-succes.css';
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SchedulingService from "../../http/schedulingService";


export default function ExampleFilterMemberCheckbox({goToSignin}) {
  const [members, setMembers] = React.useState([false, true, false]);
  const toggleMember = (index) => (event) => {
    const newMembers = [...members];
    newMembers[index] = event.target.checked;
    setMembers(newMembers);
  };

  const [users, setUsers] = React.useState([])
  React.useEffect(()=>{getUsers()},[])
  
  const socket = new WebSocket('ws://localhost:5000/')
  const nameSocket = new SchedulingService()

  React.useEffect(() => { 
    socket.onopen=()=>{
      socket.send(JSON.stringify({
          method:"connection",
          username:JSON.parse(localStorage.getItem("name")).name
          
  
      }))
  }
  
  socket.onmessage = (event ) =>{
      console.log('С сервера пришло сообщение',event.data)
  }

  }, [])
  
  async function getUsers() {
    try {
      const response = await SchedulingService.getUsers()
      setUsers(response)
      console.log(response)
    } catch (error) {
      
    }
    
  }

  // const onSubmit = async (data) => {
    
  //   const token = await SchedulingService.logout(data)
  //   localStorage.setItem('token', token.refreshToken)
  //   console.log(token)
  //   afterSignIn()
  // };

  

  // const newUsers = user.map(user=>user.email==a;dk/)
  
  const logOut =()=>{
    SchedulingService.logout() 
    goToSignin()
  }

  // React.useEffect[]

  return (
    <>

    <Sheet
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 'sm',
        maxHeight:'100%',
        maxWidth: '100%',
      }}
    >
      <Typography
        id="member"
        sx={{
          textTransform: 'uppercase',
          fontSize: 'xs2',
          letterSpacing: 'lg',
          fontWeight: 'lg',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        List of friends
      </Typography>
      <Box role="group" aria-labelledby="member">
        <List
          sx={{
            [`& .${checkboxClasses.root}`]: {
              mr: 'auto',
              flexGrow: 1,
              alignItems: 'center',
              flexDirection: 'row-reverse',
              gap: 1.5,
            },
          }}
        >
         
          <ListItem >
            
            <Checkbox 
              label="Fernando Pidrillio"
             
              checked={members[2]}
              onChange={toggleMember(2)}
            />
            
          </ListItem>
          {/* <button onClick={getUsers}>get users</button> */}
          {users.map(user =>
            <>
            {/* <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" /> */}
            <Checkbox key={user.id}
                disabled
                label={user.email}
                overlay
                color="neutral"
            />
             <Typography level="body2" noWrap >
              {user.status}
            </Typography>
            </>
          )}
          <button onClick={logOut}>logout</button>
         
        </List>
      </Box>
  
    </Sheet>
  </>
  );
}
 


 {/* <ListItem>
            <Avatar aria-hidden="true" src="/static/images/avatar/1.jpg" />
            <Checkbox
              disabled
              label="Friedrich Oberbrunner"
              overlay
              checked={members[0]}
              onChange={toggleMember(0)}
            />
          </ListItem> */}
          {/* <ListItem
            {...(members[1] && {
              variant: 'soft',
              color: 'primary',
            })}
          >
            
            <Checkbox
              overlay
              label={
                <React.Fragment>
                  Adeline O&apos;Reilly{' '}
                  {members[1] && (
                    <Typography
                      aria-hidden="true"
                      sx={{ display: 'block', fontSize: 'sm', color: 'neutral.500' }}
                    >
                      This user is your friend.
                    </Typography>
                  )}
                </React.Fragment>
              }
              checked={members[1]}
              onChange={toggleMember(1)}
            />
          </ListItem> */}

          