import Head from 'next/head'
import '../styles/globals.css'

function RetroSnake( { Component, pageProps } ) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <title>Retro Snake Game</title>
        <meta name="description" content="A Nextjs recreation of the snake game we all played and loved back in the day." />
        <meta name="keywords" content="snake game, retro, nextjs, reactjs" />
        <meta name="author" content="JC Palmes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default RetroSnake
