import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'

import Logo from '../components/logo'

const IndexPage = (props) => (
  <div className="root">
    <Head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>tinyrobot.science</title>
    </Head>
    <style jsx global>{`
      body {
        background-color: cornsilk;
      }
    `}</style>
    <style jsx>{`
      .root {
        font-family: sans-serif;
        margin: 10vh 0;
      }
      @media (min-width: 600px) {
        .root {
          margin-left: 21vw;
          margin-right: 21vw;
        }
      }
      p {
        text-align: center;
        font-size: 3rem;
        line-height: 2.5rem;
      }
    `}</style>

    <p>{props.hipku}</p>

    <Logo/>
  </div>
)

IndexPage.getInitialProps = async ({ req }) => {
  const API_URL = process && process.env && process.env.API_URL;
  if (API_URL) {
    const res = await fetch(`${API_URL}/hipku/${req.ip}`, { method: "POST" });
    const data = await res.json();
    return data;
  } else {
    return { hipku: "In nothing everything is possible" };
  }
}

export default IndexPage;
