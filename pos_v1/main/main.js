//TODO: Please write code in this file.
function printReceipt(items) {
  var cartItemList = getCartItemList(items);
  var itemInfoList = getItemInfoList(cartItemList);
  var itemPriceList = caculatePrice(itemInfoList);
  var priceInfo = caculateTotalPrice(itemPriceList);
  var infoStr = generateShoppingInfoStr(priceInfoList);

  //return infoStr;
}

function getCartItemList(items) {
  var cartList = new Array();
  for (var i = 0; i < items.length; i ++) {
    cartItem = extractMsg(items[i]);
    addItemToList(cartItem, cartItemList);
  }
  return cartItemList;
}

function extractMsg(itemStr) {
  if (itemStr.length < 10) {
    throw "illegal item.";
  }
  var barcode = "";
  var count = 1;
  var itemStrObj = new String(itemStr);
  var barcode = itemStrObj.substring(0, 10);
  if (itemStrObj.length > 10) {
    count = itemStrObj.substring(11, itemStr.length);
  }
  var cartItem = new cartitem(barcode, count);
  return cartItem;
}

function addItemToList(cartItem, cartList) {
  if (cartList[cartItem.barcode] == null) 
    cartList[cartItem.barcode] = cartItem.count;
  else
    cartList[cartItem.barcode] += cartItem.count;
}

function getItemInfoList(cartItemList) {
  var items = loadAllItems();
  var itemInfoList = new Array();
  for (var i = 0; i < items.length; i ++) {
    var barcode = items[i].barcode;
    if (cartItemList[barcode] != null) {
      var itemInfo = new iteminfo(items[i], cartItemList[barcode]);
      itemInfoList.push(itemInfo);
    }
  }
  return itemInfoList;
}

function caculatePrice(itemInfoList) {
  var itemPriceList = new Array();
  for (var i = 0; i < itemInfoList.length; i ++) {
    var normalPrice = caculateItemNormalPrice(itemInfoList[i]);
    var promPrice = caculateItemPromPrice(itemInfoList[i]);
    var itemPrice = new itemprice(normalPrice, promPrice, itemInfoList[i]);
    itemPriceList.push(itemPrice);
  }
  return itemPriceList;
}

function caculateItemNormalPrice(itemInfo) {
  var normalPrice = new Number(itemInfo.item.price * itemInfo.count);
  normalPrice.toFixed(2);
  return normalPrice;
}

function caculateItemPromPrice(itemInfo) {
  var itemPromPrice = caculateItemNormalPrice(itemInfo);
  var promotions = loadPromotions();
  for (var i = 0; i < promotions.length; i ++) {
    switch(promotions[i].type) {
      case 'BUY_TWO_GET_ONE_FREE': {
        for (var j = 0; j < promotions[i].barcodes.length; j ++) {
          if (itemInfo.item.barcode == promotions[i].barcodes[j]) {
            itemPromPrice = promByTwoGetOneFree(itemInfo);
          }
        }
        break;
      }
      case 'OTHER_PROMOTION': {
        //TODO finish other promotions' algorithm
      }
      default: break;
    }
  }
  return itemPromPrice;
}

function promByTwoGetOneFree(itemInfo) {
  var itemPromPrice = new Number(itemInfo.item.price * (itemInfo.count - parseInt(itemInfo.count/3)));
  itemPromPrice.toFixed(2);
  return itemPromPrice;
}

function caculateTotalPrice(itemPriceList) {
  var totalPrice = caculateTotalNormalPrice(itemPriceList);
  var totalPromPrice = caculateTotalPromPrice(itemPriceList);
  var prom = totalPrice - totalPromPrice;
  var priceInfo = new priceinfo(totalPrice, totalPromPrice, prom, itemPriceList);
  return priceInfo;
}

function caculateTotalNormalPrice(itemPriceList) {
  var totalPrice = new Number();
  for (var i = 0; i < itemPriceList.length; i ++) {
    totalPrice += itemPriceList[i].normalPrice;
  }
  totalPrice.toFixed(2);
  return totalPrice;
}

function caculateTotalPromPrice(itemPriceList) {
  var totalPromPrice = new Number();
  for (var i = 0; i < itemPriceList.length; i ++) {
    totalPromPrice += itemPriceList[i].promPrice;
  }
  totalPromPrice.toFixed(2);
  return totalPromPrice;
}

function generateShoppingInfoStr(priceInfoList) {

}