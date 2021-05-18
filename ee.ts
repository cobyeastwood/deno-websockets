interface ProductLabel {
	title: string
	price: number
	upc: Uint32Array | Int32Array
}

class Label implements ProductLabel {
	title: string
	price: number
	upc: Uint32Array | Int32Array

	constructor(title, price, upc) {
		this.title = title
		this.price = price
		this.upc = upc
	}
}

const makeProductLabel = (
	title: string,
	price: number,
	upc: Uint32Array | Int32Array
): ProductLabel => {
	const l = new Label(title, price, upc)
	console.log(l)
	return l
}

makeProductLabel('shirt', 10.0, new Int32Array(10).fill(100))
