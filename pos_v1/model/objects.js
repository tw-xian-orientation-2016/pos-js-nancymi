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
  this.item = new Object();
  this.item = item;
  this.count = count;
}

function itemprice(normalPrice, promPrice, itemInfo) {
  this.itemInfo = new Object();
  this.itemInfo = itemInfo;
  this.normalPrice = normalPrice;
  this.promPrice = promPrice;
}

function priceinfo(totalPrice, totalPromPrice, itemPrices) {
  this.itemPrices = new Array();
  this.itemPrices = itemPrices;
  this.totalPrice = totalPrice;
  this.totalPromPrice = totalPromPrice;
}