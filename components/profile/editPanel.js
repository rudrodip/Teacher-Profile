import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import TextFormField from '../form/textFormField'
import { FileInputButton } from '../fileInput';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPanel = ({ user, userInfo, upload, updateUserData, setUserInfo }) => {

  const [loading, setLoading] = useState(false)
  const [changes, setChanges] = useState(false)
  // profile picture
  const [image, setImage] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState(null)
  // form values
  const [name, setName] = useState(userInfo.name)
  const [fname, setFname] = useState(userInfo?.fname)
  const [mname, setMname] = useState(userInfo?.mname)
  const [fcontact, setFcontact] = useState(userInfo?.fcontact)
  const [mcontact, setMcontact] = useState(userInfo?.mcontact)
  const [phone, setPhone] = useState(userInfo?.phone)

  // profile picture change
  const onImageChange = async (image) => {
    if (image.size > 5242880) {
      toast.warn("File size should be less than 5MB", warnConfig);
    } else {
      setImage(image);
      setTempImageUrl(URL.createObjectURL(image))
    }
  };

  const deselectImage = () => {
    setImage(null)
    setTempImageUrl(null)
  }

  // form value change handler
  const handleChange = (e) => {
    setChanges(true)
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'fname') {
      setFname(e.target.value)
    }
    else if (e.target.name == 'mname') {
      setMname(e.target.value)
    }
    else if (e.target.name == 'fcontact') {
      setFcontact(e.target.value)
    }
    else if (e.target.name == 'mcontact') {
      setMcontact(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
  }

  const discardChanges = () => {
    setName(userInfo?.name)
    setFname(userInfo?.fname)
    setMname(userInfo?.mname)
    setFcontact(userInfo?.fcontact)
    setMcontact(userInfo?.mcontact)
    setPhone(userInfo?.phone)
    setChanges(false)
  }


  const handleSubmit = async (e) => {
    setLoading(true)
    setChanges(false)
    e.preventDefault();
    try {
      let data = {
        name: name,
        phone: phone,
      }
      if (image) {
        userInfo.photoURL = URL.createObjectURL(image);
        user.photoURL = URL.createObjectURL(image);
        let url = await upload(image, user, setLoading);
        data["photoURL"] = url;
      }
      Object.keys(data).map(key => {
        userInfo[key] = data[key]
      })
      updateUserData(user, data);
      toast("Updated", successToastConfig);
      setUserInfo({...userInfo})
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <section className="max-w-4xl p-6 mx-auto rounded-md my-10">
        <h1 className="text-xl font-bold text-white capitalize text-center">Edit Profile</h1>
        {tempImageUrl ?
          <div className='text-sm text-gray-200 mt-3'>
            <div className="block mx-auto rounded-full h-40 w-40 bg-cover bg-center" style={{ backgroundImage: `url('${tempImageUrl}` }}>
              <button className="btn btn-circle" onClick={deselectImage}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          : ''}

        <div className="py-6 px-3 flex justify-center">
          <FileInputButton
            label="Change profile picture"
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
              name="name"
              handleChange={handleChange}
              value={name}
            />
            <TextFormField
              label="Personal Phone"
              value={phone}
              name="phone"
              handleChange={handleChange}
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
                Saving...
              </button>
            </div>
          }
        </form>
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 leading-5 text-white transition-all duration-200 transform bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md hover:scale-110 focus:outline-none focus:bg-gray-600"
            onClick={handleSubmit}
            disabled={loading}
          >Save Edit
          </button>
          
          {changes &&
            <button
              className="ml-2 px-6 py-2 leading-5 text-white transition-all duration-200 transform bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md hover:scale-110 focus:outline-none focus:bg-gray-600"
              onClick={discardChanges}
              disabled={loading}
            >Discard
            </button>
          }
        </div>
      </section>
    </div>
  )
}

export default EditPanel

const successToastConfig = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
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