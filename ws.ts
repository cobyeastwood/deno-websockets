import {
	WebSocket,
	isWebSocketCloseEvent
} from 'https://deno.land/std/ws/mod.ts'

import EventEmitter from 'https://deno.land/x/events@v1.0.0/mod.ts'

const ee = new EventEmitter()

function listener(num: number, bool: boolean): void {
	console.log(num, bool)
}

// const events = new EventEmitter() // https://github.com/deno-library/events

ee.on('message', listener)

interface Brodcast {
	name: string
	message: string
}

let sockets = new Map<string, WebSocket>()

let index = 0

const brodcastEvent = (brd: Brodcast) => {
	ee.emit('message', index, true)

	sockets.forEach((ws: WebSocket) => {
		ws.send(JSON.stringify(brd))
	})
}

const wsConn = async (ws: WebSocket) => {
	const currentIndex = index.toString()

	sockets.set(currentIndex, ws)

	for await (const wse of ws) {
		if (isWebSocketCloseEvent(wse)) {
			sockets.delete(currentIndex)
		}

		if (typeof wse === 'string') {
			let parsedWse = JSON.parse(wse.toString())
			brodcastEvent(parsedWse)
			index++
		}
	}
}

export { wsConn }
