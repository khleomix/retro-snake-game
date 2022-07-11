import { useState } from 'react';
import Game from '../components/Game';

export default function Home() {
  const [play, setPlay] = useState(false);
  function statusPlay() {
    setPlay(play ? false : true)
  }

  return (
    <div className="p-0 m-0 text-lg bg-tertiary overflow-x-hidden text-center font-sans flex justify-center w-screen h-screen">
        <Game />
    </div>
  )
}
