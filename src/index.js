import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

// initialize elements
const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext('2d')
const clearButton = document.querySelector('button')

// creation of streams
const rectangle$ = fromEvent(canvas, 'mousemove')
const clear$ = fromEvent(clearButton, 'click')

// rectangle methods
const dataConverter = event => ({
    x: event.offsetX,
    y: event.offsetY,
    ctx: event.target.getContext('2d')
})

const drawing = currentPosition => {
    currentPosition.ctx.fillRect(currentPosition.x, currentPosition.y, 5, 5)
}

// clear methods


// stream handlers
rectangle$
    .pipe(map(dataConverter))
    .subscribe(drawing)

clear$
    .subscribe(()=> {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
    })