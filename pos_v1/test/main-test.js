describe('pos', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];

    cartItemList = new Array();
    cartItemList['ITEM000001'] = 5;
    cartItemList['ITEM000003'] = 2;
    cartItemList['ITEM000005'] = 3;

    itemInfoList = new Array();
    itemInfoList.push(allItems[1], 5);
    itemInfoList.push(allItems[3], 2);
    itemInfoList.push(allItems[5], 3);

    itemPriceList = new Array();
    itemPriceList.push(new itemprice(15.00, 9.00, itemInfoList[0]));
    itemPriceList.push(new itemprice(30.00, 30.00, itemInfoList[1]));
    itemPriceList.push(new itemprice(13.50, 13.50, itemInfoList[2]));

    priceInfo = new priceinfo(58.50, 52.50, itemPriceList);

    shoppingListStr = 
      '***<没钱赚商店>收据***\n' +
      '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
      '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
      '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
      '----------------------\n' +
      '总计：51.00(元)\n' +
      '节省：7.50(元)\n' +
      '**********************';
  });

  it('should print correct text', function() {

    spyOn(console, 'log');

    printReceipt(inputs);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
      '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
      '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
      '----------------------\n' +
      '总计：51.00(元)\n' +
      '节省：7.50(元)\n' +
      '**********************';

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should extract inputs correctly', function() {
    expectCartItemList = getCartItemList(inputs);
    expect(cartItemList).toEqual(expectCartItemList);
  });

  it('should output correct itemInfoList', function () {
    expectItemInfoList = getItemInfoList(cartItemList);
    expect(itemInfoList).toEqual(expectItemInfoList);
  });

  it('should output correct itemPriceList', function () {
    expectItemPriceList = caculatePrice(itemInfoList);
    expect(itemPriceList).toEqual(expectItemPriceList);
  });

  it('should output correct priceInfo', function () {
    expectPriceInfo = caculateTotalPrice(itemPriceList);
    expect(priceInfo).toEqual(expectPriceInfo);
  });

  it('shoule output correct shoppingListStr', function() {
    expectShoppingListStr = generateShoppingListStr(priceInfo);
    expect(priceInfo).toEqual(expectShoppingListStr);
  });

});
