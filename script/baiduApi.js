const fs = require('fs')
const path = require('path')

const AipOcrClient = require('baidu-aip-sdk').ocr

const config = require('../config/api.config.js')
const filesName = require('./readFileNames.js')


// 设置APPID/AK/SK
const APP_ID = config.APP_ID;
const API_KEY = config.API_KEY;
const SECRET_KEY = config.SECRET_KEY;

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
const len = filesName.length;

async function asyncGetRes() {
	let arr = [];
	console.log('---------------请稍等，正在识别图片--------------')
	for(let i=0; i<filesName.length; i++) {
		const image = fs.readFileSync(path.join(__dirname, '../images/bankCard/' + filesName[i])).toString("base64");
		
		// 调用银行卡识别
		let res = await client.bankcard(image);
		res['result']['filename'] = filesName[i];
		res['result']['extension'] = filesName[i].split('.')[1]
		const rate = parseInt(((i+1)/len)*100);
		console.log(`完成: ${rate}%`);
		arr.push(res)
	}
	console.log('---------------图片识别完成--------------------')
	console.log(arr)
	return arr;
}


module.exports = asyncGetRes;

