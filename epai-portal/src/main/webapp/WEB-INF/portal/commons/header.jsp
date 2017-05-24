<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
    //搜索
    function searchKeyword(){
        window.location.href = "/search?keyword=" + $("#keyword").val();
    }
</script>
<div class="headerCenter rel clear">
    <a href="888888/index.html" target="_blank" class="fl headerLogo"><img src="/images/logo.png"></a>
    <a href="888888/index.html" target="_blank" class="fl headerGif">
        <%--<img src="/images/gif.gif">--%></a>
    <p class="fl">
        <input type="button" value="搜索" class="headerBtn fr" onclick="searchKeyword()">
        <input type="text" placeholder="请输入搜索内容" class="headerInt fr" id="keyword">
        <!--<ul class="headCenUl abs none" id="matchingUl">
        </ul>-->
    </p><p class="fl headerCenterP">
    热门搜索：
    <span id="indexSearchKeyList"><a target="_blank" href="888888/artList.html?kindCode=004002022">劳力士&nbsp;</a><a target="_blank" href="888888/artList.html?kindCode=003062">花瓶&nbsp;</a><a target="_blank" href="888888/artList.html?kindCode=005001">手链&nbsp;</a><a target="_blank" href="888888/artList.html?kindCode=005007007">项链&nbsp;</a><a target="_blank" href="888888/artList.html?kindCode=005009">戒指&nbsp;</a><a target="_blank" href="888888/artList.html?kindCode=006008">银器&nbsp;</a></span>
</p>
    <p></p>
    <div class="paipinDiv rel">
        <a style="display:none;" href="888888/mine.html">
            <img src="/images/paipinCar.png" class="header_san">&nbsp;&nbsp;&nbsp;&nbsp;
            我的拍品&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="/images/paipinSan.png" class="header_san">
        </a>
        <div id="getOrderByUserHead" class="abs none headPaiDiv">
        </div>
    </div>
</div>