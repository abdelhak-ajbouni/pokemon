import type { NextPage } from 'next'
import Head from 'next/head'

import LoginLayout from 'components/layouts/LoginLayout'
import SignUpForm from 'components/SignUpForm'  

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginLayout>
        <SignUpForm />
      </LoginLayout>
    </div>
  )
}

export default Home
