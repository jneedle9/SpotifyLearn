import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Songs from '../components/Songs'
import Player from '../components/Player'
import { getSession, GetSessionParams } from 'next-auth/react'








export default function Home () {
  
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify 2.0</title>
      </Head>
    <main className='flex'>
      <Sidebar/> 
      <Center/>
      
    </main>
    <div className='sticky bottom-0'>
      <Player/>
    </div>

    </div>
    
  )
}

export async function getServerSideProps(props: GetSessionParams | undefined){
  const session = await getSession(props);

  return{
    props:{
      session,
    }
  }
}


