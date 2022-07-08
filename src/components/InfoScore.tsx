import { useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

interface InfoScoreProps {
    score: number
}

export default function InfoScore(props: InfoScoreProps) {
    const [bestScore, setBestScore] = useLocalStorage("bestScore", 0)
    useEffect(() => {
        if (props.score > bestScore) {
            setBestScore(props.score)
        }
    },[props.score])
    return (
        <div className="p-2 w-full flex justify-between">
            <p className="font-bold text-white">Current Score: {props.score}</p>
            <p className="font-bold text-white">Best Score: {bestScore}</p>

        </div>
    )
}
