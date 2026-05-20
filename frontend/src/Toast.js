import React, { useEffect } from 'react'
// import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
function Toast() {
  // const notify=()=>{
  //   toast.success("I am in the Frontend Side...!!")
  //   toast.error("I am in the Frontend Side...!!")
  // }
  
const {msg,success}= useSelector(state=>state.user)

useEffect(() => {
  if(!msg) return
  if(success){
    toast.success(msg)
  }else if(success===false){
    toast.error(msg)

  }

}, [msg,success])


    return (
    <>
    {/* <Button onClick={notify}>Show Toast MSG</Button> */}
     <ToastContainer pauseOnHover={false}/> 
    </>
  )
}

export default Toast
