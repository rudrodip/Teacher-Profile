import React from 'react'
import Head from 'next/head'
import InfoPanel from '@/components/profile/infoPanel'
import EditPanel from '@/components/profile/editPanel'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { user, userInfo, upload, updateUserData, setUserInfo } = useAuth()

  if (userInfo) return (
    <main>
      <Head>
        <title>{userInfo ? userInfo.name : 'Teacher Profile'}</title>
        <link rel="icon" href='/logo/logo.png' />
      </Head>
      <section className='parent min-h-screen'>
        <div className='hero flex justify-between flex-wrap items-start'>
          <div className='flex-1 w-full md:w-1/3 p-5 m-3 shadow-xl rounded-2xl bg-gray-800 h-full'>
            <div className='text-sm text-gray-200 my-3'>
              <div className="block mx-auto rounded-full h-60 w-60 bg-cover bg-center" style={{ backgroundImage: `url('${userInfo ? userInfo.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}` }}></div>
            </div>
            <InfoPanel userInfo={userInfo} />
            {userInfo?.socials && Object.keys(userInfo?.socials).length > 0 &&
              <div>
                <h1 className='mt-4 text-md text-blue-500 font-semibold text-left'>Social Media</h1>
                <div className='text-left mr-2 flex flex-wrap'>
                  {userInfo?.socials && Object.keys(userInfo.socials).map((i, index) => {
                    return (
                      <a key={index} className='ml-3 mt-3' href={userInfo.socials[i]} target="_blank" rel="noreferrer">
                        <img src={socialMediaIcons[i.toLowerCase()]} className="w-8 h-8" alt={i.toLowerCase()} />
                      </a>
                    )
                  })}
                </div>
              </div>
            }
          </div>
          <div className='flex-2 w-full md:w-2/3 p-5 m-3 shadow-xl rounded-2xl bg-gray-800 h-full'>
            <EditPanel user={user} userInfo={userInfo} upload={upload} updateUserData={updateUserData} setUserInfo={setUserInfo} />
          </div>
        </div>
      </section>
    </main>
  )
}

const socialMediaIcons = {
  "facebook": "/logo/facebook.png",
  "instagram": "/logo/instagram.png",
  "discord": "/logo/discord.png",
  "github": "/logo/github.png",
  "whatsapp": "/logo/whatsapp.png",
  "reddit": "/logo/reddit.png",
  "linkedin": "/logo/linkedin.png",
  "youtube": "/logo/youtube.png",
  "twitter": "/logo/twitter.png",
  "telegram": "/logo/telegram.png",
}