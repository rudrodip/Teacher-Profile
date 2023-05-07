import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../context/AuthContext';

const Login = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// necessary functions
	const { login, triggerResetEmail } = useAuth()

	const handleChange = (e) => {
		if (e.target.name == 'email') {
			setEmail(e.target.value)
		}
		else if (e.target.name == 'password') {
			setPassword(e.target.value)
		}
	}

	const handlePasswordReset = () => {
		if (email) {
			triggerResetEmail(email)
			toast('Password reset email sent, check your email', toastConfig)
		} else {
			toast.warn('Give your email to reset your password!', warnConfig)
		}
	}

	const validate = () => {
		if (email.length > 10 && password.length > 5) {
			return true
		} else {
			toast.warn('Invalid form', warnConfig)
		}
	}

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (validate()) {
			try {
				await login(email, password)

				setEmail('')
				setPassword('')

				router.push("/")
			} catch (error) {
				toast.warn('Something went wrong!', warnConfig)
			}
		}
		setLoading(false)
	}


	return (
		<div className="hero min-h-screen bg-base-200">
			<Head>
				<title>StudentProfile - Login</title>
				<link rel="icon" href="https://picsum.photos/200/200" />
			</Head>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
			/>
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
					<p className="py-6">Login to your student profile</p>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								name="email"
								type="text"
								placeholder="email"
								className="input input-bordered"
								onChange={handleChange} />
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								name="password"
								type="password"
								placeholder="password"
								className="input input-bordered"
								onChange={handleChange} />
							<label className="label">
								<a href="#" className="label-text-alt link link-hover" onClick={handlePasswordReset}>Forgot password?</a>
							</label>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-primary" onClick={handleSubmit}>Login</button>
						</div>
						<div className="mt-6">
              Do not have an account?
              <Link legacyBehavior href="/signup">
                <a className='underline'>
                  Sign up
                </a>
              </Link>
            </div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login

const toastConfig = {
	position: "top-center",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
}

const warnConfig = {
	position: "top-center",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
}