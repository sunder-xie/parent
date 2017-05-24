//var baseUrl ="http://192.168.1.76:8080/api";//五
//var baseUrl ="http://maxdailu.eicp.net/api";
var baseUrl ="http://www.pecoo.com/pecooservice/api";
//var baseUrl="http://192.168.1.103:8080/api";//真
//var baseUrl="http://wuwu8023.iok.la:25805/api";
//登录、注册、密码
var loginUrl =baseUrl+'/login/loginIn.htm'; /*登录*/
var registerUrl=baseUrl+'/login/userRegister.htm';/*注册*/
var resetPasswordUrl=baseUrl+'/login/resetPassword.htm';/*重置密码*/
var ValidateImgUrl=baseUrl+'/login/getValidateImgCode.htm'/*获取图形验证码*/
var VerificationCodeUrl=baseUrl+'/login/getVerificationCode.htm'/*获取短信验证码*/
var changePasswordUrl=baseUrl+'/login/changePassword.htm'/*修改密码*/
var VerificationCodeTempUrl=baseUrl+'/login/getVerificationCodeTemp.htm'//图片验证码上的验证码
var updateMobileUrl=baseUrl+'/login/updateMobile.htm'/*修改手机号*/
//首页接口
var KeywordsUrl=baseUrl+'/indexPage/queryHotKeywords.htm';/*搜索关键字*/
var SubwordsUrl=baseUrl+'/indexPage/getSubKinds.htm';/*三级菜单*/
var queryBannerUrl=baseUrl+'/indexPage/queryBanner.htm';/*首页banner部分*/
var queryQualityGoodsUrl=baseUrl+'/indexPage/queryQualityGoods.htm';/*首页今日推荐部分*/
var queryQualityAuctionUrl=baseUrl+'/indexPage/queryQualityAuction.htm';/*首页拍卖会部分*/
var queryQualityFlashGoodsUrl=baseUrl+'/indexPage/queryQualityFlashGoods.htm';/*首页闪购部分*/
var queryIndexPageGoodsUrl=baseUrl+'/indexPage/queryIndexPageGoods.htm';//搜索列表页
var queryPopularGoods=baseUrl+'/indexPage/queryPopularGoods.htm';//猜你喜欢接口
var searchKeywordsUrl=baseUrl+'/indexPage/searchKeywords.htm';//根据关键词查询分页显示
//拍卖会接口
var pageAuctionUrl=baseUrl+'/auction/pageAuctionPc.htm'; //全球拍卖会
var queryAuctionGoodsUrl=baseUrl+'/auction/queryAuctionGoods.htm'; //拍卖会详情


//收货地址接口
var getAddressList=baseUrl+'/verify/address/getAddressList.htm';/*用户收货地址列表*/
var getAddressUrl=baseUrl+'/verify/address/addAddress.htm';/*添加收货地址*/
var queryDefaultAddress=baseUrl+'/verify/address/queryDefaultAddress.htm';/*查询默认收货地址*/
var updateAddressUrl=baseUrl+'/verify/address/updateAddress.htm';/*编辑收货地址*/
var deleteAddress=baseUrl+'/verify/address/deleteAddress.htm';/*删除收货地址*/

//分类列表
var queryKindsUrl=baseUrl+'/goods/queryKinds.htm';/*二级三级名称*/
var querySecondGooodsUrl=baseUrl+'/goods/querySecondGooods.htm';/*分类下的拍品列表*/

//拍品详情接口
var queryGoodsMessUrl=baseUrl+'/goods/queryGoodsMess.htm';//拍品详情展示
var vcreateOrderUrl=baseUrl+'/verify/createOrder.htm';//判断是否有保证金出价

//收藏、取消收藏
var addUserCollectionUrl=baseUrl+'/verify/collection/addUserCollection.htm';//收藏
var delUserCollectionUrl=baseUrl+'/verify/collection/delUserCollection.htm';//取消收藏

//闪购
var querySecondGooodsfUrl=baseUrl+'/goods/querySecondGooodsf';//闪购列表
var queryFgoodsMessUrl=baseUrl+'/goods/queryFlashsaleGood.htm'; //闪购详情
var getSubSaleHotKindsUrl=baseUrl+'/indexPage/getSubSaleHotKinds';//闪购分类
var createFOrderUrl=baseUrl+'/verify/createFOrder';//闪购下单
var queryHaveFlashGoods=baseUrl+'/verify/flashOrder/queryHaveFlashGoods.htm';//已下单
var queryUnDeliverFlashGoods=baseUrl+'/verify/flashOrder/queryUnDeliverFlashGoods';//闪购待付运费
var queryDeliverFlashGoods=baseUrl+'/verify/flashOrder/queryDeliverFlashGoods';//已发货
var receiptFlashOrder=baseUrl+'/verify/flashOrder/receiptFlashOrder';//确认收货
var queryCompleteFlashGoods=baseUrl+'/verify/flashOrder/queryCompleteFlashGoods';//已完成
var queryFaildFlashGoods=baseUrl+'/verify/flashOrder/queryFaildFlashGoods';//购买失败订单
var setFlashOrderPayWeb=baseUrl+'/verify/flashOrder/setFlashOrderPayWeb';//闪购支付
var cancelFlashOrderUrl=baseUrl+'/verify/flashOrder/cancelFlashOrder';//取消订单
//支付闪购订单
var setFlashOrderPayWebUrl=baseUrl+'/verify/flashOrder/setFlashOrderPayWeb.htm';
//我的闪购订单-付款页面详情
var getFlashOrderPayMessUrl=baseUrl+'/verify/flashOrder/getFlashOrderPayMess.htm';

//个人中心
var queryMyCollectionUrl=baseUrl+'/verify/collection/queryMyCollection.htm';//查个人中心收藏
var queryMyMessagesStateCountUrl=baseUrl+'/verify/pecooMessage/queryMyMessagesStateCount.htm'//查找我的站内信未读数量
var queryMyMessagesUrl=baseUrl+'/verify/pecooMessage/queryMyMessages.htm'//站内信列表
var readMessageUrl=baseUrl+'/verify/pecooMessage/readMessage.htm'//阅读站内信
var delMessageUrl=baseUrl+'/verify/pecooMessage/delMessage.htm'//站内信删除

//未做部分
//我的推荐记录myReferrer.html//
var queryUserRecommendsUrl=baseUrl+'/verify/account/queryUserRecommends.htm';
//我要推荐myReferrer.html
var getRecommendCodeUrl=baseUrl+'/verify/account/getRecommendCode.htm';//我要推荐
//推荐订单
var ChannelOrderListUrl=baseUrl+'/verify/order/queryChannelOrderList.htm';
//代金券myVoucher.html
var queryVoucherUrl=baseUrl+'/verify/account/queryVoucher.htm';//代金券
//兑换代金券myVoucher.html
var convertVoucherUrl=baseUrl+'/verify/account/updatePecooVoucherProvideStart.htm';//兑换代金券
//个人中心首页mine.html//  var userWebCenterUrl=baseUrl+'/verify/account/userWebCenter.htm';//个人中心首页
var queryMyPecooUrl=baseUrl+'/verify/account/queryMyPecoo.htm';//我的拍库

//收货地址，详情页有写，但样式不同。
//用户收货地址列表myAddress.html//
var getAddressList=baseUrl+'/verify/address/getAddressList.htm';/*用户收货地址列表*/
//添加收货地址
var addAddressUrl=baseUrl+'/verify/address/addAddress.htm';/*添加收货地址*/
//查询默认收货地址var queryDefaultAddress=baseUrl+'/verify/address/queryDefaultAddress.htm';/*查询默认收货地址*/
//编辑收货地址
var updateAddressUrl=baseUrl+'/verify/address/updateAddress.htm';/*编辑收货地址*/
//删除收货地址
var deleteAddressUrl=baseUrl+'/verify/address/deleteAddress.htm';/*删除收货地址*/
//设置默认收货地址 var setDefaultAddressUrl=baseUrl+'/verify/address/setDefaultAddress.htm';//设置默认收货地址

//拍卖订单（每个订单会多个状态改变，可以借鉴线上拍卖订单）
//专享拍品myShop.html
var queryAllBidGoodsUrl=baseUrl+'/verify/order/queryAllBidGoods.htm';//专享拍品
//已出价myBid.html
var queryHaveBidGoodsUrl=baseUrl+'/verify/order/queryHaveBidGoods.htm';//已出价
//竞拍成功myBuction.html
var querySuccBidGoodsUrl=baseUrl+'/verify/order/querySuccBidGoods.htm';//竞拍成功
//已付款myPay.html
var queryPaidBidGoodsUrl=baseUrl+'/verify/order/queryPaidBidGoods.htm';//已付款
//已发货myShipper.html
var queryDeliverBidGoodsUrl=baseUrl+'/verify/order/queryDeliverBidGoods.htm';//已发货
//已完成myBuy.html
var queryCompleteBidGoodsUrl=baseUrl+'/verify/order/queryCompleteBidGoods.htm';//已买到
//竞拍失败myBuctionFail.html
var queryFailedBidGoodsUrl=baseUrl+'/verify/order/queryFailedBidGoods.htm';//竞拍失败
//取消订单
var cancelBidOrderUrl=baseUrl+'/verify/order/cancelBidOrder.htm';
//确认收货
var receiptBidOrderUrl=baseUrl+'/verify/order/receiptBidOrder.htm';
//支付订单
var setOrderPaymentUrl=baseUrl+'/verify/order/setOrderPayment.htm';
//我的订单-获取付款页面信息
var getOrderPayMessUrl=baseUrl+'/verify/order/getOrderPayMess.htm';

//我的账户（充值提现等）
//我的钱包 myAccount.html
var queryMyAssetsUrl=baseUrl+'/verify/account/queryMyPecoo.htm'//我的钱包
//保证金与余额互转
var transferAccountsUrl=baseUrl+'/verify/account/transferAccounts.htm';//保证金与余额互转
//充值记录
var queryMyRechargeUrl=baseUrl+'/verify/rechargelog.htm';//充值记录
//提现记录
var queryMyWithdrawUrl=baseUrl+'/verify/withdrawlog.htm';//提现记录
//消费记录
var queryMyDebitUrl=baseUrl+'/verify/orderpaylog.htm';//消费记录

var creatRechargeOrderUrl=baseUrl+'/verify/creatRechargeOrder.htm';//生成充值订单
var getRechargeOrderUrl=baseUrl+'/verify/getRechargeOrder.htm';//查询充值订单
var rechargeUrl=baseUrl+'/verify/recharge.htm';//支付充值订单
var getOrderByUserUrl=baseUrl+'/verify/account/getOrderByUser.htm';//我的拍品

var creatWithdrawOrderUrl=baseUrl+'/verify/creatWithdrawOrder.htm';//提现


var getRechargeOrderState=baseUrl+'/verify/getRechargeOrderState.htm';//订单支付自查
var querySaveTokenUrl=baseUrl+'/verify/account/querySaveToken.htm';//防重复提交获得Token