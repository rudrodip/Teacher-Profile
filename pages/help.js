import React, { useState } from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FileInputButton } from '@/components/fileInput'
import SelectionBox from '@/components/form/selectionBox'
import { useAuth } from '@/context/AuthContext'
import { db, storage } from '@/src/config/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

const Help = () => {
  const { userInfo } = useAuth()
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState("Physics")
  const [file, setFile] = useState(null)
  const [question, setQuestion] = useState('')
  const date = new Date()

  const subObject = {
    "Physics": "physics_stack",
    "Chemistry": "chemistry_stack",
    "Math": "math_stack",
  }

  const onFileChange = async (file) => {
    setFile(file)
  }

  const uploadQuestion = async () => {
    setLoading(true)
    const quesRef = doc(db, `${subObject[subject]}/${question}_${date.toDateString()}_${userInfo?.name}`)
    const quesFileRef = ref(storage, `${subObject[subject]}/${question}_${date.toDateString()}_${userInfo?.name}`)

    const data = {
      ques: question,
      time: date,
      studentID: userInfo?.studentID,
    }

    try {
      if (file){
        const snapshot = await uploadBytes(quesFileRef, file)
        let url = await getDownloadURL(quesFileRef)
        data["ques_file"] = url
      }
      setDoc(quesRef, data)
      toast('Uploaded question', successToastConfig)
    } catch (error) {
      console.log(error)
      toast.warn('Error while uploading', warningToastConfig)
    }
    setLoading(false)
  }

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <Head>
        <title>Ask</title>
        <link rel="icon" href='/logo/faq.png' />
      </Head>

      <h1 className='font-bold text-white text-4xl text-center m-5'>Ask a question</h1>
      <div className='container mx-auto w-full lg:w-2/3 rounded-md bg-gray-800 p-3 border-2 border-gray-600'>
        <div className='grid lg:grid-cols-2'>
          <div>
            <h1>Write your question here</h1>
            <textarea type="text" placeholder="question.." className="input input-bordered w-full my-3" onChange={(e) => setQuestion(e.target.value)} />

            <SelectionBox
              label="Subject"
              name="subject"
              value={subject}
              options={["Physics", "Chemistry", "Math"]}
              handleChange={(e) => setSubject(e.target.value)
              }
            />
            <p className='divider'></p>
            <FileInputButton
              label="Upload file"
              uploadFileName="theFiles"
              onChange={onFileChange}
              loading={loading}
              acceptedFileTypes="image/png, image/jpeg, image/jpg"
              allowMultipleFiles={false}
            />
          </div>
          <div className='h-auto flex justify-start align-middle items-center flex-col rounded-md'>
            <p>Preview panel</p>
            <div>
              {
                (file?.type == "image/png" || file?.type == "image/jpg" || file?.type == "image/jpeg")
                  ?
                  <img src={URL.createObjectURL(file)} className='h-72 p-3' />
                  :
                  file?.type == "application/pdf"
                    ?
                    <p>Uploaded: {file.name}</p>
                    :
                    ''
              }
            </div>
          </div>
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
        <div className='flex justify-center'>
          <button className='btn btn-info mt-3 hover:scale-105 duration-150' onClick={uploadQuestion}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Help

const warningToastConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const successToastConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}