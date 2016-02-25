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
  var items = getAllItems();
  var itemInfoList = new Array();
  for (item in items) {
    if (cartList[item.barcode] != null) {
      var cartItem = new cartitem(item, cartItemList[item.barcode]);
      itemInfoList.push(cartItem);
    }
  }
  return itemInfoList;
}

function caculatePrice(cartItemList) {

}

function caculateTotalPrice(itemPriceList) {

}

function generateShoppingInfoStr(priceInfoList) {

}