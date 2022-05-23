import type { NextPage } from 'next'
import Head from 'next/head'

import LoginLayout from 'components/layouts/LoginLayout'
import AfterSignUp from 'components/AfterSignUp'



const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Success</title>
        <meta name="description" content="Login success page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginLayout>
        <AfterSignUp />
      </LoginLayout>
    </div>
  )
}

export default Home
