import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

interface ScoreProps {
	score: number
}

export default function Score( props: ScoreProps ) {
	const [bestScore, setBestScore] = useLocalStorage( "bestScore", 0 )
	useEffect( () => {
		if ( props.score > bestScore ) {
			setBestScore( props.score )
		}
	},[bestScore, props.score, setBestScore] )
	return (
		<div className="p-2 w-full flex justify-between">
			<p className="font-bold text-white">Score: {props.score}</p>
			<p className="font-bold text-white">High Score: {bestScore}</p>
		</div>
	)
}
