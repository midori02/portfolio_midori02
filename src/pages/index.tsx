import { AboutContainer } from 'components/containers'
import { AboutTemplate } from 'components/templates'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <AboutContainer />
    </div>
  )
}

export default Home
