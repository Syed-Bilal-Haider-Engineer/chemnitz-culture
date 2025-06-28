'use client'
import React from 'react'
import dynamic from 'next/dynamic'
const CardList = dynamic(() => import('../components/common/Card'), {
  ssr: false
})

function Favorites() {
  return <CardList />
}

export default Favorites