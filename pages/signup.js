import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextFormField from '../components/form/textFormField'
import PasswordInputField from '../components/form/passwordField'
import SelectionBox from '../components/form/selectionBox'
import { FileInputButton } from '../components/fileInput';
import { useAuth } from '../context/AuthContext';

const toast_warn_config = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const Signup = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  // profile picture
  const [image, setImage] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("https://dummyimage.com/200x200")
  // form values
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const { user, signup, createUserData, upload, setUserInfo } = useAuth()

  // profile picture change
  const onImageChange = async (image) => {
    if (image.size > 5242880) {
      toast.warn("File size should be less than 5MB", toast_warn_config);
    } else {
      setImage(image);
      setTempImageUrl(URL.createObjectURL(image))
    }
  };

  // form value change handler
  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  // validates from data
  const validate = () => {
    if (name.length > 3) {
      return true;
    }
    toast.warn('Form not valid! Please check again', toast_warn_config)
    return false;
  }

  // create user-data in db
  const createUser = async () => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      photoURL: "https://dummyimage.com/200x200",
      role: "teacher"
    }

    try {
      let { user } = await signup(email, password)
      if (image) {
        let url = await upload(image, user);
        data["photoURL"] = url;
      }
      data["uid"] = user.uid
      createUserData(user, data)
      setUserInfo(data)
    } catch (error) {
      toast.warn(error, toast_warn_config)
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      if (validate()) {
        await createUser()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  if (user && !loading) {
    router.push('/')
  }

  return (
    <div>
      <Head>
        <title>Teacher Profile - Signup</title>
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

      <section className="max-w-4xl p-6 mx-auto rounded-md my-10">
        <h1 className="text-xl font-bold text-white capitalize">Sign up</h1>
        <div className='text-sm text-gray-200 mt-3'>
          <div className="block mx-auto rounded-full h-40 w-40 bg-cover bg-center" style={{ backgroundImage: `url('${tempImageUrl}` }}></div>
        </div>
        <div className="py-6 px-3 flex justify-center">
          <FileInputButton
            label="Upload avatar"
            uploadFileName="theFiles"
            onChange={onImageChange}
            loading={loading}
            acceptedFileTypes="image/png, image/jpeg, image/jpg"
            allowMultipleFiles={false}
          />
        </div>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <TextFormField
              label="Fullname"
              placeholder="Fullname"
              name="name"
              handleChange={handleChange}
              value={name}
            />
            <TextFormField
              label="Phone"
              placeholder="e.g. 01771122334"
              name="phone"
              handleChange={handleChange}
              value={phone}
            />
            <TextFormField
              label="Email Address"
              placeholder="e.g. example@gmail.com"
              name="email"
              handleChange={handleChange}
              value={email}
            />
            <PasswordInputField
              name='password'
              handleChange={handleChange}
              showPassToggle={true}
              value={password}
            />
          </div>
          {
            loading &&

            <div className='flex justify-center m-5'>
              <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium  rounded-lg border hover:text-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700 inline-flex items-center">
                <svg role="status" className="inline w-4 h-4 mr-2 animate-spin text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                </svg>
                Uploading...
              </button>
            </div>
          }
        </form>
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 leading-5 text-white transition-all duration-200 transform bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md hover:scale-110 focus:outline-none focus:bg-gray-600"
            onClick={handleSubmit}
          >Create Account
          </button>
        </div>
        <div className="text-grey-dark mt-6 text-center">
          Already have an account?
          <Link legacyBehavior href="/login">
            <a className="no-underline border-b border-blue text-blue">
              Log in
            </a>
          </Link>
        </div>
      </section>

    </div >
  )
}

export default Signup