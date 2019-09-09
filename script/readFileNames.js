const fs = require('fs')
const path = require('path')

let arr = []

const files = fs.readdirSync(path.join(__dirname, '../images'))

files.forEach(i => {
	arr.push(i)
})

module.exports = arr;