const baiduDiscern = require('./script/baiduApi.js')
const createExcel = require('./script/createExcel.js')

baiduDiscern().then(res => {
	createExcel(res)
});
