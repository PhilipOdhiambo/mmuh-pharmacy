// Id of sheet we are woking with
// const ss = SpreadsheetApp.openById("1EN1jDQmz22_A8VxtTyMpORHKiRezW4Zx1wND2iCbEFs");

const cache = CacheService.getScriptCache()

const timestamp = new Date();
// const date = timestamp.getDate()  + "/" + (timestamp.getMonth()+1) + "/" + timestamp.getFullYear()
// const date = timestamp;

function doGet(e) {
  const collection = e.parameter.collection;


  if (collection == 'tracer') {
    return Tracer.fetch()
  }

  if (collection == 'inventory') {
    return Inventory.fetch()
  }

  if (e.parameter.utils == 'true') {
    const id = Utilities.getUuid()
    const timestamp = new Date();
    const utils = { timestamp, id }
    return ContentService.createTextOutput(JSON.stringify(utils)).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({}))
}


function doPost(e) {
  const data = JSON.parse(e.postData.contents); // An array of one or more objects
  const collection = e.parameter.collection; // string
  const method = e.parameter.method; // string
  if (collection == 'tracer') {
    if (method == 'create') {
      return Tracer.create(data)
    }
    if(method == 'update') {
      return Tracer.update(data)
    }
    if (method=='delete') Tracer.delete(id)
  }
}

