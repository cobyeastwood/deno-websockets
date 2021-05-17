import { serve } from 'https://deno.land/std/http/server.ts'
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts'

import { wsConn as ws } from './ws.ts'

const server = serve({ port: 3001 })

for await (const req of server) {
	if (req.url === '/') {
		req.respond({
			status: 200,
			body: await Deno.open('./index.html')
		})
	}

	if (req.url === '/ws' && acceptable(req)) {
		acceptWebSocket({
			conn: req.conn,
			bufReader: req.r,
			bufWriter: req.w,
			headers: req.headers
		}).then(ws)
	}
}
