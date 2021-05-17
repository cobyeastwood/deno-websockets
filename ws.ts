import {
	WebSocket,
	isWebSocketCloseEvent
} from 'https://deno.land/std/ws/mod.ts'

import EventEmitter from 'https://deno.land/x/events@v1.0.0/mod.ts'

const events = new EventEmitter() // https://github.com/deno-library/events

events.on('send', (a) => {
	console.log('sent websocket message: ', a)
})

interface Brodcast {
	name: string
	message: string
}

let sockets = new Map<string, WebSocket>()

let index = 0

const brodcastEvent = (brd: Brodcast) => {
	events.emit('send', index)

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
		}
	}

	index++
}

export { wsConn }
