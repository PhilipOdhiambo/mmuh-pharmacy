class Tracer {
  // static ss = "1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc";
  static fetch() {
    var result = cache.get('tracer')
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
      let tracerObjArr = dataAsObjArr.filter(item => item.IsTracerItem == 1)
      cache.put('tracer',JSON.stringify(tracerObjArr))
      result = cache.get('tracer')
    }

    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON) || [];
  }

  static fetchRaw() {
    let ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    let collection = ss.getSheetByName('inventory').getDataRange().getValues();
    const headerRow = collection.shift();
    const dataAsObjArr = collection.map(row => {
      let dataObj = {};
      headerRow.forEach((header, index) => {
        dataObj[header] = row[index]
      });
      return dataObj;
    })
    let tracerArr = dataAsObjArr.filter(item => item.IsTracerItem == 1)
    return tracerArr
  }

  static create(data) {
    let ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    let sheet = ss.getSheetByName('inventory')
    let sheetHeaders = Object.keys(data[0])
    data.forEach(dataitem => {
      let row = [];
      sheetHeaders.forEach(header => row.push(dataitem[header]))
      sheet.appendRow(row)
    })
    return ContentService.createTextOutput(JSON.stringify({ status: 'Created' })).setMimeType(ContentService.MimeType.JSON);

  }


  static update(data) {
    const ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    const sheet = ss.getSheetByName('inventory')
    const collection = sheet.getDataRange().getValues()
    const sheetHeaders = collection.shift()
    let idIndex = sheetHeaders.indexOf('Id')
    for (let i = 0; i < collection.length; i++) {
      if (collection[i][idIndex] == data.Id) {
        sheet.getRange(i + 2, sheetHeaders.indexOf("IsAvailable") + 1).setValue(data.value)
        break
      }
    }
    cache.put('tracer', JSON.stringify(Tracer.fetchRaw()))
    return ContentService.createTextOutput(cache.get('tracer'))
  }

  static delete(data) {
    const ss = SpreadsheetApp.openById("1RX0Zz_9LkdIv5R2VeRfg0NnELdcWWF3Nad9QtCH9gAc");
    const sheet = ss.getSheetByName('inventory')
    data.forEach(dataItem => {
      const rowCount = sheet.getLastRow()
      for (let i = rowCount; i >= 2; i--) {
        if (sheet.getRange(i, 1).getValue() == dataItem.id) {
          sheet.deleteRow(i)
        }
      }
    })
    return 'Deleted'
  }

}
