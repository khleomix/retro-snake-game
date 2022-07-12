import React from 'react';
import Food from '../components/Food';
import Snake from '../components/Snake';
import Score from './Score';
import useSound from 'use-sound';
import Image from 'next/image'
import { useSwipeable } from "react-swipeable";

const getRandomCoords = () => {
	let min = 1;
	let max = 90
	let x = Math.floor( ( Math.random() * ( max-min + 1 ) + min ) /2 ) * 2;
	let y = Math.floor( ( Math.random() * ( max-min + 1 ) + min ) /2 ) * 2;
	return [x,y]
}

const initialState = {
	food: getRandomCoords(),
	speed: 100,
	sound: "",
	pause: false,
	play: false,
	gameOver: "",
	direction: 'RIGHT',
	snakePixels: [
		[0,0],[4,0]
	]
}

// Add sound effects.
const FooterSfx = () => {
  	const [play, { stop }] = useSound('/wonderful.mp3');

  	return (
		<small className="text-primary text-base p-1">A retro snake game made with Nextjs and React by <a href="https://khleomix.com/" target="_blank" rel="noreferrer" className="text-pink-100 hover:text-pink-200" onMouseEnter={() => play()} onMouseLeave={() => stop()}>JC Palmes</a></small>
  	);
};

  const HandlersBox = () => useSwipeable({
    onSwiped: ({ dir, event }) => {
      // NOTE: this stops the propagation of the event
      // from reaching the document swipe listeners
      event.stopPropagation();

      setBoxSwipes((s) => [
        ...s,
        { dir, timeStamp: Math.floor(event.timeStamp) }
      ]);
    },
    // NOTE: another approach via onSwiping
    // onSwiping: ({ event }) => event.stopPropagation(),
    preventDefaultTouchmoveEvent: true
  });

const handleTouch = (key) => {
  handleKeyDown({keyCode:key});
}

const SwipeHandlers = () => useSwipeable({
  onSwipedLeft: () => handleTouch('37'),
  onSwipedUp: () => handleTouch('38'),
  onSwipedRight: () => handleTouch('39'),
  onSwipedDown: () => handleTouch('40')
});

class Game extends React.Component {
	state = initialState


	componentDidMount(): void {
		setInterval(this.moveSnake, this.state.speed)
		document.onkeydown = this.onKeyDown;

	}

	componentDidUpdate( prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any ): void {
		this.checkIfOutOfBorders();
		this.checkIfCollapsed();
		this.checkIfEat();
	}

	onKeyDown = ( e: any ) => {
		e = e || window.event;
	  	switch ( e.keyCode ) {
			case 38:
				this.setState( {direction: 'UP'} );
				break;
			case 40:
				this.setState( {direction: 'DOWN'} );
				break;
			case 37:
				this.setState( {direction: 'LEFT'} );
				break;
			case 39:
				this.setState( {direction: 'RIGHT'} );
				break;
		}
	}

	moveSnake = () => {
		let dots = [...this.state.snakePixels]
		let head = dots[dots.length - 1]

		switch ( this.state.direction ){
			case 'RIGHT':
				head = [head[0] + 2, head[1]]
				break;
			case 'LEFT':
				head = [head[0] - 2, head[1]]
				break;
			case 'DOWN':
				head = [head[0], head[1] + 2]
				break;
			case 'UP':
				head = [head[0], head[1] - 2]
				break;
		}
		if ( !this.state.pause && this.state.play ) {

			dots.push( head );
			dots.shift();
			this.setState( {
				snakePixels: dots
			} )
		}
	}

	checkIfOutOfBorders() {
		let head = this.state.snakePixels[this.state.snakePixels.length - 1];
		if ( head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0 ){
			this.onGameOver();
		}
	}

	checkIfCollapsed() {
		let snake = [...this.state.snakePixels];
		let head = snake[snake.length - 1];
		snake.pop()
		snake.forEach( dot => {
			if ( head[0] == dot[0] && head[1] == dot[1] ){
				this.onGameOver();
			}
		} )
	}

	checkIfEat() {
		let head = this.state.snakePixels[this.state.snakePixels.length - 1];
		let food = this.state.food;
		if ( head[0] == food[0] && head[1] == food[1] ) {
			this.setState( {
				food: getRandomCoords()
			} )
			this.enlargeSnake();
			this.increaseSpeed();
		}
	}

	enlargeSnake(){
		let newSnake = [...this.state.snakePixels];
		newSnake.unshift( [] );
		this.setState( {
			snakePixels: newSnake
		} )
  	}

  	increaseSpeed() {
		if ( this.state.speed > 10 ) {
			this.setState( {
				speed:this.state.speed - 10
			} )
		}
	}

	onGameOver() {
		this.setState( initialState );
		this.setState( {gameOver: `Game Over! Score: ${this.state.snakePixels.length}. Better luck next time.`} )
	}

	render() {
		return (
	  		<main>
		  		<div className="flex my-2 justify-center">
					{this.state.play ?
						<Score score={this.state.snakePixels.length}/>
					:
						<></>
					}

				</div>

		  		{this.state.play ?
					<>
						<div className={`game-box before:bg-game-box outline outline-secondary outline-4 h-96 lg:h-4/6 w-[90vw] lg:w-[50vw] relative before:block before:h-full before:opacity-[0.1] before:w-full before:text-center ${this.state.pause ? "bg-gray-100" : "bg-primary"}`}>
							<Snake snakePixels={this.state.snakePixels}/>
							<Food dot={this.state.food}/>
							<div className="controller md:hidden absolute w-32 h-32 z-50 right-0 bottom-0">
								<Image
									src="/controller.png"
									alt="Controller"
									width={128}
									height={128}
									className="opacity-80 relative"
								/>
								<button className="btn-up absolute top-2 left-[46px] rounded-md w-9 h-10 hover:bg-black focus:bg-black opacity-20" onClick={() => this.setState( {direction: 'UP'} )} type="button"></button>
								<button className="btn-right absolute right-[7px] top-[46px] rounded-md w-10 h-9 hover:bg-black focus:bg-black opacity-20" onClick={() => this.setState( {direction: 'RIGHT'} )} type="button"></button>
								<button className="btn-left absolute left-[7px] top-[46px] rounded-md w-10 h-9 hover:bg-black focus:bg-black opacity-20" onClick={() => this.setState( {direction: 'LEFT'} )} type="button"></button>
								<button className="btn-down absolute bottom-2 left-[46px] rounded-md w-9 h-10 hover:bg-black focus:bg-black opacity-20" onClick={() => this.setState( {direction: 'DOWN'} )} type="button"></button>
							</div>
						</div>
					</>
				:
					<>
						<div className="text-pink-200 text-3xl font-bold text-center w-full py-2 px-4">
							<span>{this.state.gameOver}</span>
						</div>
						<Image
							src="/snakes.svg"
							alt="Snakes"
							width={300}
							height={300}
						/>
						<h1 className="text-primary text-6xl text-center">The Snake Game</h1>
					</>
		  		}

		  		<div className="flex my-1 justify-center">
					{this.state.play ?
						<button className={`ml-2 btn-secondary border-[inset] border-[6px] border-b-inset-black border-l-inset-black border-r-inset-gray border-t-inset-gray box-border text-white font-bold text-2xl m-4 min-w-[120px] px-4 py-1 uppercase w-auto transition-all duration-75 ${this.state.pause ? "bg-gray-200 hover:bg-gray-100 focus:bg-gray-100" : "bg-blue-100 hover:bg-blue-200 focus:bg-blue-200"}`} onClick={ () => {
							this.setState( {pause: this.state.pause ? false : true} )
						}}>{this.state.pause ? "Resume" : "Pause"}</button>
					:
						<button className="btn-primary border-[inset] border-[6px] border-b-inset-black border-l-inset-black border-r-inset-gray border-t-inset-gray bg-red-100 hover:bg-red-200 focus:bg-red-200 box-border text-white font-bold text-2xl m-4 min-w-[120px] px-4 py-1 uppercase w-auto transition-all duration-75" onClick={ () => {
							if ( this.state.play ) {
								this.setState( initialState );
							} else this.setState( {play: true} )
							}
						}>Play</button>
					}
				</div>
				{this.state.play ?
      				<div {...HandlersBox} className="p-2 m-2 border-2 border-primary text-white">
      					<h4>Swipe here for Box</h4>
      					<h6>
      				    	Swipe anywhere to trigger document swipe, BUT if you swipe in the box
      						we'll attempt to prevent the document swipe
      				  	</h6>
      				</div>
				:
					<></>
				}
				<div className="relative flex item-center justify-center w-full text-center">
					<FooterSfx />
				</div>
	  		</main>
		)
	}
}

export default Game;
