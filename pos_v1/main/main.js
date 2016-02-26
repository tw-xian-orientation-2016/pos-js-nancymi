const BARCODE_LENGTH = 10;

function printReceipt(items) {
  var cartItemList = getCartItemList(items);
  var itemInfoList = getItemInfoList(cartItemList);
  var itemPriceList = caculatePrice(itemInfoList);
  var priceInfo = caculateTotalPrice(itemPriceList);
  var shoppingInfoStr = generateShoppingInfoStr(priceInfo);

  console.log(shoppingInfoStr);
}

function getCartItemList(tags) {
  var cartItemList = [];
  tags.forEach(function(tag) {
    var cartItem = extractTagStr(tag);
    addItemToList(cartItem, cartItemList);
  });
  return cartItemList;
}

function extractTagStr(tagStr) {
  if (tagStr.length < BARCODE_LENGTH) {
    throw 'illegal item.';
  }
  var tag = tagStr.split('-');
  var barcode = tag[0];
  var count = parseFloat(tag[1] || 1);
  var cartItem = new cartitem(barcode, count);
  return cartItem;
}

function addItemToList(cartItem, cartList) {
  var previousCount = cartList[cartItem.barcode] || 0;
  var currentCount = previousCount + cartItem.count;
  cartList[cartItem.barcode] = currentCount;
}

function getItemInfoList(cartItemList) {
  var items = loadAllItems();
  var itemInfoList = [];
  items.forEach(function(item) {
    var barcode = item.barcode;
    if (cartItemList[barcode]) {
      var itemInfo = new iteminfo(item, cartItemList[barcode]);
      itemInfoList.push(itemInfo);
    }
  });
  return itemInfoList;
}

function caculatePrice(itemInfoList) {
  var itemPriceList = [];
  itemInfoList.forEach(function(itemInfo) {
    var normalPrice = caculateItemNormalPrice(itemInfo);
    var promPrice = caculateItemPromPrice(itemInfo);
    var itemPrice = new itemprice(normalPrice, promPrice, itemInfo);
    itemPriceList.push(itemPrice);
  });
  return itemPriceList;
}

function caculateItemNormalPrice(itemInfo) {
  var price = itemInfo.item.price;
  var count = itemInfo.count;
  var normalPrice = price * count;
  return normalPrice;
}

function caculateItemPromPrice(itemInfo) {
  var itemPromPrice = caculateItemNormalPrice(itemInfo);
  var promotions = loadPromotions();
  promotions.forEach(function(promotion) {
    switch (promotion.type) {
      case 'BUY_TWO_GET_ONE_FREE': {
        promotion.barcodes.forEach(function(barcode) {
          if (itemInfo.item.barcode === barcode) {
            itemPromPrice = promBuyTwoGetOneFree(itemInfo);
          }
        });
        break;
      }
      case 'OTHER_PROMOTION': {
        //TODO finish other promotions' algorithm
        break;
      }
      default: break;
    }
  });
  return itemPromPrice;
}

function promBuyTwoGetOneFree(itemInfo) {
  var promPrice = itemInfo.item.price;
  var promCount = itemInfo.count - parseInt(itemInfo.count/3);
  var itemPromPrice = promPrice * promCount;
  return itemPromPrice;
}

function caculateTotalPrice(itemPriceList) {
  var totalNormalPrice = 0, totalPromPrice = 0;
  itemPriceList.forEach(function(itemPrice) {
    totalNormalPrice += itemPrice.normalPrice;
    totalPromPrice += itemPrice.promPrice;
  });
  var totalProm = totalNormalPrice - totalPromPrice;
  var priceInfo = new priceinfo(totalNormalPrice, totalPromPrice, totalProm, itemPriceList);
  return priceInfo;
}

function generateShoppingInfoStr(priceInfo) {
  var shoppingInfoStr = '***<没钱赚商店>收据***\n';
  for (var i = 0; i < priceInfo.itemPrices.length; i ++) {
    var itemInfo = priceInfo.itemPrices[i].itemInfo;
    var itemPrice = priceInfo.itemPrices[i];
    shoppingInfoStr +=
      ('名称：' + itemInfo.item.name + '，数量：' +
        itemInfo.count + itemInfo.item.unit +
        '，单价：' + itemInfo.item.price.toFixed(2) + '(元)，小计：' +
        itemPrice.promPrice.toFixed(2) + '(元)\n');
  }
  shoppingInfoStr += ('----------------------\n' +
    '总计：'+ priceInfo.totalPromPrice.toFixed(2) + '(元)\n' +
    '节省：'+ priceInfo.totalProm.toFixed(2) + '(元)\n' +
    '**********************');
  return shoppingInfoStr;
}
