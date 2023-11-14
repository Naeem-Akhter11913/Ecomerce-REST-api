import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/login.png'
import './Auth.css'
import Card from '../../components/Card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RESET_AUTH, login } from '../../redux/feature/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isLoggedIn, isSuccess } = useSelector(state => state.auth)

    const loginUser = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("All Fields are require")
        }
        if (password.length < 6) {
            return toast.error("password must be 6 charaters")
        }
        

        toast(email, password)

        const userData = {
            email, password
        }

        await dispatch(login(userData))

    }

    useEffect(() => {
        if (isSuccess && isLoggedIn) {
            navigate('/')
        }

        dispatch(RESET_AUTH())
    }, [isSuccess, isLoggedIn, dispatch, navigate])

    return (
        <>
            {isLoading && <Loader />}
            <section className='container auth'>
                <div className="img">
                    <img src={loginImg} alt="loginImg" width='600' />
                </div>
                <Card >
                    <div className="form">
                        <h2>Login</h2>
                        <form method="post" onSubmit={loginUser}>
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="submit" className=" --btn --btn-primary --btn-block">Login</button>
                        </form>


                        <span className="register">
                            <p>Dont Have an account ?</p>
                            <Link to='/register'>Register</Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>)
}

export default Login