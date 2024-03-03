
class Inventory {

  static fetch() {
    var result = cache.get('inventory')
    if (result == null) {
      let ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
      let sheetArr = ss.getSheetByName('inventory').getDataRange().getValues();
      const headerRow = sheetArr.shift();
      const dataAsObjArr = sheetArr.map(row => {
        let dataObj = {};
        headerRow.forEach((header, index) => {
          dataObj[header] = row[index]
        });
        return dataObj;
      })
      cache.put('inventory', JSON.stringify(dataAsObjArr))
    }
    return ContentService.createTextOutput(cache.get('inventory'))|| [];
  }

  static fetchRaw() {
    let ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    let sheetArr = ss.getSheetByName('inventory').getDataRange().getValues();
    const headerRow = sheetArr.shift();
    const dataAsObjArr = sheetArr.map(row => {
      let dataObj = {};
      headerRow.forEach((header, index) => {
        dataObj[header] = row[index]
      });
      return dataObj;
    })
    return dataAsObjArr
  }

  static create(data) {
    let ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    let sheet = ss.getSheetByName('inventory')
    data.forEach(dataitem => {
      let row = [];
      for (var i = 0; i < sheetHeader.length; i++) {
        row.push(dataitem[sheetHeader[i]])
      }
      sheet.appendRow(row)
    })
    return ContentService.createTextOutput(JSON.stringify({ status: 'Created' })).setMimeType(ContentService.MimeType.JSON);
  }


  static update(data) {
    let ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    const sheet = ss.getSheetByName('inventory')
    const sheetHeader = sheet.getDataRange().getValues().shift()
    data.forEach(dataItem => {
      for (let i = 2; i <= sheet.getLastRow(); i++) {
        if (sheet.getRange(i, 1).getValue() == dataItem.id) {
          let row = []
          for (let j = 0; j < sheetHeader.length; j++) {
            row.push(dataItem[sheetHeader[j]])
          }
          sheet.getRange(i, 1, 1, sheetHeader.length).setValues([row])
        }
      }
    })
    return ContentService.createTextOutput(JSON.stringify({ status: 'Updated' })).setMimeType(ContentService.MimeType.JSON);
  }

  static delete(data) {
    let ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    let sheet = ss.getSheetByName('inventory')
    data.forEach(dataItem => {
      const rowCount = sheet.getLastRow()
      for (let i = rowCount; i >= 2; i--) {
        if (sheet.getRange(i, 1).getValue() == dataItem.id) {
          sheet.deleteRow(i)
        }
      }
    })
    return ContentService.createTextOutput(JSON.stringify({ status: 'Deleted' })).setMimeType(ContentService.MimeType.JSON);
  }
}

