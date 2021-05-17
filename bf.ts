import { Buffer } from 'https://deno.land/std/io/mod.ts'

const msg = 'helloww0'

const te = new TextEncoder()

const encodeMsg = te.encode(msg)
const buff = new Buffer()

// buff.write(encodeMsg)

// console.log(await buff.toString())
// console.log(await Deno.stdout.write(encodeMsg))

async function prompt(message: string = '') {
	const buf = new Uint8Array(1024)
	await Deno.stdout.write(new TextEncoder().encode(message + ': '))
	const n = <number>await Deno.stdin.read(buf)
	return new TextDecoder().decode(buf.subarray(0, n)).trim()
}

prompt('write here').then((data) => console.log(data))

const title = await prompt('Post Title')
