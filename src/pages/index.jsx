import Head from 'next/head'
import Image from 'next/image'
import { Asap_Condensed, Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Typography } from '@mui/material'
import Layout from '@/components/layout'
import { Box } from '@mantine/core'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
      <Layout>
      <Box sx={{height:"100vh",backgroundColor:"gray"}}></Box>
      </Layout>
  )
}
