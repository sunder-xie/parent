<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="love"><%--猜你喜欢--%>


    <meta charset="utf-8">
    <title></title>
    <style>
        /**********猜你喜欢*********/
        .indexTodayTitle{
            width: 1200px;
            margin:0 auto;
            height: 35px;
            padding-top:45px;
            color: #333333;
            font-size:20px;
            line-height:35px;
            border-bottom: 1px solid #666666;
            padding-top: 45px;
        }
        .indexTodayTitle span{
            color: #999;
            font-size: 18px;
            padding-left: 10px;
        }
        .love{
            width:100%;
            height:320px;
            margin:30px 0;
            margin-top:20px;
        }
        .loveP {
            width:1200px;
            margin:0 auto;
            border-bottom: 1px solid #DDDDDD;
            position: relative;
            margin-bottom: 50px;
        }
        .loveP  img{
            width:135px;
            height:32px;
            margin:0 auto;
            display: block;
            position: absolute;
            left: 50%;
            top:-16px;
            margin-left: -68px;
        }
        .loveDiv{
            width:1200px;
            margin:0 auto;
            position: relative;
        }
        .loveDiv ul{
            position: relative;
            overflow: hidden;
            width:1100px;
            padding:0 50px;
            height:250px;
        }
        .loveDiv ul li{
            z-index: 200;
            position: absolute;
            left: -1200px;
            right:0;
        }
        .loveDiv ul li a{
            display: block;
            text-align: center;
            float: left;
            width: 150px;
            height: 220px;
            margin:0 45px;
            margin-top:20px;
        }
        .loveDiv ul li a p{
            text-align: center;
            width:150px;
            line-height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            font-family: "微软雅黑";
        }
        .loveDiv ul li a p.loveImg{
            width:150px;
            height: 150px;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            margin:0 45px;
            margin-bottom: 20px;
        }
        .loveDiv ul li a p.loveP2{
            padding-top:15px;
        }
        .loveDiv ul li img{
            max-width:150px;
            max-height:150px;
            margin-bottom:-10px;
        }
        .loveDiv ul li:first-child{
            left: 0;
        }
        .loveLeft{
            position: absolute;
            left:0px;
            cursor: pointer;
            top:70px;
            z-index: 200;
            opacity: 0.5;
            filter: Alpha(opacity=70);
        }
        .loveRight{
            position: absolute;
            right:0px;
            cursor: pointer;
            top:70px;
            z-index: 200;
            opacity: 0.5;
            filter: Alpha(opacity=70);
        }
        .loveRight:hover,.loveLeft:hover{
            opacity: 1;
            filter: Alpha(opacity=10);
        }
    </style>


    <div class="love">
        <p class="indexTodayTitle" style="padding-top: 15px;">
            猜你喜欢<span>Lovely</span>
        </p>
        <div class="loveDiv" style="overflow: hidden;">
            <ul style="overflow-y: hidden; overflow-x: auto; width: 2400px;">
                <li>
                    <!--<a href="javascript:;" >
                        <p class="loveImg"><img src="../img/index/bana1.jpg" /></p>
                        <p class="loveP2">金额为发财那v刹weriogjew wjeorwen我i结合盖浇饭 </p>
                        <p >$7445456</p>
                    </a> -->
                    <a href="888888/detail.html?goodId=58ff273c230d84c9bbba80fb" target="_blank"><p class="loveImg"><img src="/images/606a4d9fe37c44998b6aead02b4f3962"></p><p class="loveP2">Lot180:18K Cartier Tank Americaine watch with guilloche</p><p>$3000</p></a><a href="888888/detail.html?goodId=58ff4766230d84c9bbba9bcf" target="_blank"><p class="loveImg"><img src="/images/792c6e80645a4e29970f091e34a62ae4"></p><p class="loveP2">Lot176:Jaeger LeCoultre stainless Master Control 1000</p><p>$2000</p></a><a href="888888/detail.html?goodId=58ff6fc0230d84c9bbbabdff" target="_blank"><p class="loveImg"><img src="/images/7ab23dfcdceb456b887465497ed0d842"></p><p class="loveP2">Lot174:Men's Cartier 18K Chrono Reflex Tank Francaise</p><p>$1000</p></a><a href="888888/detail.html?goodId=58fb14f6230d84c9bbb3ee40" target="_blank"><p class="loveImg"><img src="/images/f97bdadfe84b4fdfa0236c5472925d91"></p><p class="loveP2">Lot5181:1.14 CTW Pear Natural Ruby Solitaire Diamond Pendant 14K White Gold - REF-87K5W</p><p>$1</p></a><a href="888888/detail.html?goodId=58fb312e230d84c9bbb490aa" target="_blank"><p class="loveImg"><img src="/images/ec447eb9d6cd4d37985733f006072599"></p><p class="loveP2">Lot5779:14K Yellow Gold Jewelry 0.83 ctw Natural Diamond Solitaire Ring - REF#203W4K-WJ13217</p><p>$1</p></a><a href="888888/detail.html?goodId=58fb3136230d84c9bbb490c2" target="_blank"><p class="loveImg"><img src="/images/c4e454184a4a4f05a523e1d86d12d83b"></p><p class="loveP2">Lot5407:14K Rose Gold Jewelry 1.36 ctw Natural Diamond Solitaire Ring - REF#403G2K-WJ13246</p><p>$1</p></a><a href="888888/detail.html?goodId=58eda09c230d84c9bba3c816" target="_blank"><p class="loveImg"><img src="/images/03fc183577bd48aca85f5f654cc6c32e"></p><p class="loveP2">Lot20:A MEISSEN LARGE FIGURE OF A SHEPHERD AND&nbsp;BERLIN FIGURE OF A NYMPH FEEDING A GOAT, CIRCA 1755 AND 1775 |</p><p>£1200</p></a><a href="888888/detail.html?goodId=58eda237230d84c9bba3ca99" target="_blank"><p class="loveImg"><img src="/images/f45234de0fa64d5eaa201046ba38fc23"></p><p class="loveP2">Lot223:A 'LONGQUAN' CELADON DISH, 14TH-15TH CENTURY |</p><p>£1600</p></a><a href="888888/detail.html?goodId=58ffa987230d84c9bbbb88be" target="_blank"><p class="loveImg"><img src="/images/facd5742897f42cb86c3a33c41c4959f"></p><p class="loveP2">Lot793:Coupe sur pied</p><p>CHF200</p></a><a href="888888/detail.html?goodId=58ffa989230d84c9bbbb88c4" target="_blank"><p class="loveImg"><img src="/images/2a8af21e5f73490399b24e70090a5344"></p><p class="loveP2">Lot784:Plat à bords polylobés et centre bombé</p><p>CHF150</p></a></li>
            </ul>
            <div class="loveLeft"><img src="/images/left1.jpg"></div>
            <div class="loveRight"><img src="/images/right1.jpg"></div>
        </div>
    </div>

    <!--<script type="text/javascript" src="js/jquery-1.11.3.js" ></script>
    <script type="text/javascript" src="js/config.js" ></script>-->
    <script>
        $(function(){
            //猜你喜欢
            getLove();
            roll($(".loveDiv"),$(".loveDiv ul"),$(".loveDiv ul li a"),$(".loveLeft"),$(".loveRight"));
        })
        function getLove(){
            $.ajax({
                url :queryPopularGoods,
                type: "get",
                dataType : "json",
                data : {
                    "sourceMode":"PC",
                    "tokenId":tokenId
                },
                error : function() {
                    //alert("网络繁忙，请稍后再试!");
                },
                success:function(data){
                    var data=data.goods;
                    for(var i=0; i<10; i++){
                        var content='<a href="detail.html?goodId='+data[i].pkId+'"  target="_blank">'+
                            '<p class="loveImg"><img src="'+data[i].thumbnailUrl+'" /></p>'+
                            '<p class="loveP2">Lot'+data[i].lotNum+':'+data[i].goodsName+'</p>'+
                            '<p >'+data[i].priceUnit+''+data[i].startPrice+'</p>'+
                            '</a>';
                        $(".loveDiv ul li").append(content);
                    }
                    roll($(".loveDiv"),$(".loveDiv ul"),$(".loveDiv ul li a"),$(".loveLeft"),$(".loveRight"));
                }
            });


        }

        function roll(box,ul,li,leftbtn,rightbtn){
            //width:只包括dl的宽，；outerWidth:包括dl的宽和border，；outerWidth(true):包括dl的宽和border和margin，；
            var dlWidth = li.outerWidth(true);
            var dlLength = li.size();
            //获取外层隐藏的div里能放几个li
            var divWidth = box.width();
            //数量取整
            var perNum = parseInt(divWidth/dlWidth);
//			console.log(perNum);

            //将ul的宽设置为dl乘以dl数量
            ul.css({"width":dlWidth*dlLength});
            var i=0;
            rightbtn.bind("click",function(){
                i--
//				console.log(i);
                //当i移动（dlLength - perNum）时,最后div应该正好剩下perNum个li；再点击一次，即 i >= (dlLength - perNum + 1);应该返回0，重新开始
                //注意向左是负值，所以i <= -(dlLength - perNum + 1);
                if(i <= -dlLength + perNum -1){
                    i=-dlLength + perNum;
                }
                ul.stop().animate({"left":i*dlWidth})
            })
            leftbtn.bind("click",function(){
                i++
//				console.log(i);
                //向右为正；当i==1时，要使整个li移动到最后边，所以i = -（dlLength - perNum）；即往前移动总的长度减去一个div所包含的长度；
                if(i >= 1){
                    i= 0;
                }
                ul.stop().animate({"left":i*dlWidth})
            })
        }

    </script>
</div>