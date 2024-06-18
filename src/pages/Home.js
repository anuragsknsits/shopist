import React from 'react'
import { fetchAuthKey } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch();
  let data = useSelector((state)=>state.authKey);
  console.log("Home" , data)

  const product = {
    username: 'Anurag',
    password: 'MyPass@123'
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => dispatch(fetchAuthKey(product))}>Fetch Auth Key</button>
    </div>
  )
}
