import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

const canvas = document.querySelector('canvas')

const dataConverter = event => ({
    x: event.offsetX,
    y: event.offsetY,
    ctx: event.target.getContext('2d')
})

const drawing = currentPosition => {
    currentPosition.ctx.fillRect(currentPosition.x, currentPosition.y, 5, 5)
}

fromEvent(canvas, 'mousemove')
    .pipe(map(dataConverter))
    .subscribe(drawing)
