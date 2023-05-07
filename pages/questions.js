import React, { useState, useEffect } from 'react'
import QuestionAccordion from '@/components/questions/questionAccordion';
import SelectionBox from '@/components/form/selectionBox';

import { db } from '@/src/config/firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit
} from "firebase/firestore";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Questions = () => {
  const { userInfo } = useAuth()
  const [questions, setQuestions] = useState([])
  const [filtered, setFiltered] = useState([])
  const [subject, setSubject] = useState("Physics")

  useEffect(() => {
    const subObject = {
      "Physics": "physics_stack",
      "Chemistry": "chemistry_stack",
      "Math": "math_stack",
    }

    const docRef = collection(db, subObject[subject]);
    let queryParam = query(docRef, orderBy("time"))
    getDocs(queryParam).then((snapshots) => {
      setQuestions(snapshots.docs)
      setFiltered(snapshots.docs)
    })

  }, [subject])

  const handleChange = (e) => {
    if (e.target.name == "personal") {
      setPersonal(!personal)
    }
    if (e.target.name == "subject") {
      setSubject(e.target.value)
    }
  }

  return (
    <div>
      <div className='w-full lg:w-2/3 container mx-auto'>
        <h1 className="text-3xl font-medium title-font py-8 text-white text-center">QNA</h1>
        <div className='max-x-xl'>
          <div className="form-control w-32">
            <SelectionBox
              label="Subject"
              name="subject"
              options={["Physics", "Chemistry", "Math"]}
              handleChange={handleChange}
            />
          </div>
        </div>
        <QuestionAccordion array={filtered} />
      </div>
    </div>
  )
}

export default Questions