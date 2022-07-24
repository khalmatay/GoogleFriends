import React, { useState } from "react"
import { useForm } from 'react-hook-form';
import SchedulingService from "../../http/schedulingService";
import SignIn from "./SignIn";
import SignUp from "./Signup";

export default function ({goToMain}) {
  let [authMode, setAuthMode] = useState("signin")
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  


  const[itemToDo,setItemToDo]=useState("")
  const handleChangeItem = (event) => { // принимает событие (автоматически) 
    setItemToDo(event.target.value); // меняет значение инпута на то что пишем
  }; 
  console.log(itemToDo) 
  

 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = async (data) => {
    const token = await SchedulingService.login(data)
    localStorage.setItem('token', token.accessToken)
    localStorage.setItem('refreshToken', token.refreshToken)
    goToMain()
  };
  

  const onRegisterSubmit = async (data) => {
    const token = await SchedulingService.register(data)
    changeAuthMode()
    
    
  };


  if (authMode === "signin") {
    return (
      <div className="Auth-form-container first" >
      <SignIn onSubmit={onSubmit} handleChangeItem={handleChangeItem} changeAuthMode={changeAuthMode} register={register} handleSubmit={handleSubmit}/>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <SignUp onSubmit={onRegisterSubmit} handleChangeItem={handleChangeItem} changeAuthMode={changeAuthMode} register={register} handleSubmit={handleSubmit}/>
    </div>
  )
}
