import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementActionCreator, incrementActionCreator } from '../reducers/counterReducer';
import { Button } from 'react-bootstrap';

function Counter() {
    const [jump,setJump]=useState(1)
    const state = useSelector(state=>state.count)
    const {count} = state;
    const dispatch = useDispatch()
  return (
    <>
    <h1>React-Redux Counter Demo..</h1>
     <h2>Count - {count}</h2>
     <div style={{border:"2px solid red",width:"40%"}} className='m-1 p-2'>
     <input placeholder='Enter No for jump count ' className='m-4' type="text" min={1} max={10} onChange={e=>setJump(+e.target.value)} />
     <Button className='m-3' variant="danger" onClick={()=>dispatch(decrementActionCreator(jump))}>-</Button> 
     <Button className='m-3' variant='success' onClick={()=>dispatch(incrementActionCreator(jump))}>+</Button> 
    </div>
    </>
  )
}

export default Counter
