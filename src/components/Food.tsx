interface FoodProps {
    dot: number[]
}

export default function Food(props: FoodProps) {
    const styleFood = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }
    return (
        <div className="snake-food absolute w-[16px] h-[16px] block before:h-full before:w-full before:content-[url('/food.svg')] before:relative before:-top-[16px] before:-left-[7px]" style={styleFood}>
        </div>
    )
}
