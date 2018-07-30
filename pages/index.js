import React from 'react'
import Head from 'next/head'
import Logo from '../components/logo'

export default () => (
  <div className="root">
    <Head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>tinyrobot.science</title>
    </Head>
    <style jsx>{`
      .root {
        font-family: sans-serif;
        line-height: 1.33rem;
        bottom: 8vh;
      }
      @media (min-width: 600px) {
        .root {
          margin-left: 21vw;
          margin-right: 21vw;
        }
      }
    `}</style>
    <style jsx global>{`
      body {
        background-color: cornsilk;
      }
    `}</style>

    <Logo className="logo"/>
  </div>
)
