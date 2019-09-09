const Excel = require('exceljs')
const fs = require('fs')
const path = require('path')

const config = require('../config/api.config.js')

const workbook = new Excel.Workbook()
const FILENAME = config.FILENAME;


var sheet = workbook.addWorksheet('银行卡'); 

sheet.columns = config.HEADER;
sheet.getColumn('B').width = 25.85
sheet.getColumn('C').width = 24.13

function createExcel(datas) {
	datas.forEach((item, index) => {
		sheet.addRows([{
			filename: item.result.filename || '',
			cardNo: item.result.bank_card_number || '',
			dateOfExpiration: item.result.valid_date || ''
		}])
		sheet.getRow(index + 2).height = 103.8;
		sheet.findRow(index + 2).alignment = { vertical: 'middle', horizontal: 'center' };
		const imageId = workbook.addImage({
		  filename: path.join(__dirname, '../images/bankCard' + item.result.filename),
		  extension: item.result.iextension,
		});
		sheet.addImage(imageId, {
		  tl: { col: 1, row: index + 1 },
		  ext: { width: 210, height: 139 }
		});
	})
	workbook.xlsx.writeFile(path.join(__dirname, '../output/' + FILENAME))
	    .then(function(){
	        console.log('生成 xlsx');
	    });
}

module.exports = createExcel

