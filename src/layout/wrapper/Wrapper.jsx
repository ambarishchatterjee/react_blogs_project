import React from 'react'
import Header from '../header/Header'

export default function Wrapper({children}) {
  return (
    <>
    <Header/>
    {children}
      
    </>
  )
}
