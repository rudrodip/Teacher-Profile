import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { db } from '@/src/config/firebase.config'
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

const Notices = () => {

  const [notices, setNotices] = useState('')

  useEffect(() => {
    const docRef = collection(db, "notices")
    const queryParam = query(docRef, orderBy("time"))
    getDocs(queryParam)
      .then((snap) => setNotices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Notices</title>
        <link rel="icon" href='/logo/logo.png' />
      </Head>
      <h1 className="text-3xl font-medium title-font py-8 text-white text-center">Notices</h1>
      <div className='container mx-auto'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Time</th>
                <th scope="col" className="px-6 py-3">Download</th>
              </tr>
            </thead>
            <tbody>
              {notices ?
                notices.map((notice) => {
                  return (
                    <tr
                      key={notice?.id}
                      className="border-b bg-gray-800 border-gray-700"
                    >
                      <td className="px-6 py-4">{notice?.title}</td>
                      <td className="px-6 py-4">{notice?.time.toDate().toDateString()}</td>
                      <td className="px-6 py-4">
                        <a
                          href={notice?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >Download</a>
                      </td>
                    </tr>
                  );
                }) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Notices