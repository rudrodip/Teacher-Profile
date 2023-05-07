import React from 'react'

const InfoPanel = ({ userInfo }) => {
  return (
    <div className='info'>
      <h1 className="text-3xl my-2 font-bold pt-8 lg:pt-0">{userInfo?.name}</h1>
      <div className='text-lg mt-2'>
        <span className='font-semibold'>Email: </span>
        <a href={`mailto:${userInfo?.email}`} className='underline text-blue-400'>{userInfo?.email}</a>
      </div>
      <div className='text-lg mt-2'>
        <span className='font-semibold'>Phone: </span>
        <a href={`tel:${userInfo?.phone}`}>{userInfo?.phone}</a>
      </div>
    </div>
  )
}

export default InfoPanel