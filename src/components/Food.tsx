interface FoodProps {
    dot: number[]
}

export default function Food(props: FoodProps) {
    const styleFood = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }
    return (
        <div className="snake-food absolute w-4 h-4 block before:h-4 before:content-[url('../../public/food.svg')] before:-left-[6px] before:absolute before:-top-[17px] before:w-4" style={styleFood}>
        </div>
    )
}
