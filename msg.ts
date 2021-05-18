class MessageNode {
	message: string
	prev: any
	next: any

	constructor(message: string, prev: any = null, next: any = null) {
		this.message = message
		this.prev = prev
		this.next = next
	}
}

class Message {
	index: number
	root: MessageNode

	constructor(index: number = 0, root: any = null) {
		this.index = index
		this.root = root
	}

	static isMessage(str: unknown): str is string {
		return typeof str === 'string'
	}

	addNode(msg: string) {
		const newNode = new MessageNode(msg)

		if (!this.root) {
			this.root = newNode
			return
		}

		if (!this.root.next) {
			this.root.next = newNode
			return
		}

		let rootNode = this.root

		while (rootNode.next) {
			rootNode = rootNode.next

			if (!rootNode.next) {
				this.root = newNode
			}
		}
	}

	moveUpwards(loops: number) {
		while (this.index <= loops) {
			if (this.root) {
				console.log(this.root)
			}
			this.index++
		}
	}

	moveDownwards(loops: number) {
		while (this.index >= loops) {
			if (this.root) {
				console.log(this.root)
			}
			this.index--
		}
	}
}

const m = new Message(1)

m.addNode('test')
m.addNode('test2')
m.addNode('test3')
m.addNode('test4')
m.addNode('test5')

console.log(m.root)

// m.moveUpwards(10)
