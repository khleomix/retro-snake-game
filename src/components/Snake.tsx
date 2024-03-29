interface SnakeProps {
    snakePixels:number[][]
}

export default function Snake( props: SnakeProps ) {
    return (
        <div>
            {props.snakePixels.map( ( dot, index ) => {
                const dotPos = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                }
                return (
                    <div className="snake-dot bg-secondary h-[16px] w-[16px] absolute" key={index} style={dotPos}></div>
                )
            } ) }
        </div>
    )
}
