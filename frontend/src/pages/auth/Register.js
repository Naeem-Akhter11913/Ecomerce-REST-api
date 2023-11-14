import React, { useEffect, useState } from 'react'
import './Auth.css'
import regImg from '../../assets/register.png'
import Card from '../../components/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, register } from '../../redux/feature/auth/authSlice';
import Loader from '../../components/loader/Loader';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [c_Password, setC_Password] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, isLoggedIn, isSuccess} = useSelector(state => state.auth)


  const registerUser = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, c_Password)
    if (!email || !password) {
      return toast.error("All Fields are require")
    }

    if (password.length < 6) {
      return toast.error("password must be 6 charaters")
    }

    if (password !== c_Password) {
      return toast.error("Password mismatch")
    }

    const userData = {
      name, email, password
    }

    await dispatch(register(userData))
  }


  useEffect(() =>{
    if(isSuccess && isLoggedIn){
      navigate('/')
    }

    dispatch(RESET_AUTH())
  },[isSuccess,isLoggedIn,dispatch, navigate])

  
  return (

    <>
    {isLoading && <Loader />}
    <section className='container auth'>
      <Card >
        <div className="form">
          <h2>Register</h2>
          <form method="post" onSubmit={registerUser}>
            <input
              type="text"
              placeholder='Name'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder='confirm password'
              name='cpassword'
              value={c_Password}
              onChange={e => setC_Password(e.target.value)}
            />

            <button type="submit" className=" --btn --btn-primary --btn-block">Register</button>
          </form>


          <span className="register">
            <p>Already have an Account ?   </p>
            <Link to='/login'> Register</Link>
          </span>
        </div>
      </Card>
      <div className="img">
        <img src={regImg} alt="loginImg" width='600' />
      </div>
    </section>
    </>)
}

export default Register