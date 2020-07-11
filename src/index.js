import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

// initialize elements
const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext('2d')
const decrementButton = document.getElementById('decrement')
const incrementButton = document.getElementById('increment')
const clearButton = document.getElementById('clear')
const count = document.getElementById('count')

let brushWidth = 5;
count.value = brushWidth;

// creation of streams
const rectangle$ = fromEvent(canvas, 'mousemove')
const clear$ = fromEvent(clearButton, 'click')
const decrement$ = fromEvent(decrementButton, 'click')
const increment$ = fromEvent(incrementButton, 'click')

// rectangle methods
const dataConverter = event => ({
    x: event.offsetX,
    y: event.offsetY,
    ctx: event.target.getContext('2d')
})

const drawing = currentPosition => {
    currentPosition.ctx.fillRect(currentPosition.x, currentPosition.y, brushWidth, brushWidth)
}

// clear methods
const clearCanvas = () => {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
}

// drawing options
const increment = ()=>{
    if (brushWidth < 80) {
        brushWidth++
        count.value = brushWidth
    }
}

const decrement = ()=> {
    if (brushWidth > 1) {
        brushWidth--
        count.value = brushWidth
    }
}

// stream handlers
rectangle$
    .pipe(map(dataConverter))
    .subscribe(drawing)

clear$
    .subscribe(clearCanvas)

decrement$
    .subscribe(decrement)
    
increment$
    .subscribe(increment)
