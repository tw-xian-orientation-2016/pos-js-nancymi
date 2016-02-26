function item(barcode, name, unit, price) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price;
}

function cartitem(barcode, count) {
  this.barcode = barcode;
  this.count = count;
}

function iteminfo(item, count) {
  this.item = item;
  this.count = count;
}

function itemprice(normalPrice, promPrice, itemInfo) {
  this.itemInfo = new Object();
  this.itemInfo = itemInfo;
  this.normalPrice = normalPrice;
  this.promPrice = promPrice;
}

function priceinfo(totalNormalPrice, totalPromPrice, totalProm, itemPrices) {
  this.totalNormalPrice = totalNormalPrice;
  this.totalPromPrice = totalPromPrice;
  this.totalProm = totalProm;
  this.itemPrices = itemPrices;
}
