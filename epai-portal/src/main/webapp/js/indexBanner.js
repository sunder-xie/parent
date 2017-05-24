 $(function() {
        $('body').on('click',function(){
        	var _th=$(this),
        	hot=_th.parents('.hot'),
        	goods=_th.parents('.goods-list'),
        	url=_th.attr('href')=='javascript:;'?'':('_'+_th.attr('href')),
        	analyze=_th.attr('data-analyze');
        	if(hot.length){
        		var index=hot.find('a').index(this)+1;
        		var d=hot.attr('data-analyze').split(',');
        		analytical(d[0],d[1]+fillZero(index,2)+'_'+_th.text()+url)
        		}
        	else if(goods.length){
        		var index=goods.find('a').index(this)+1;
        		var d=goods.attr('data-analyze').split(',');
        		analytical(d[0],d[1]+fillZero(index,2)+'_'+_th.find('h3').text()+_th.find('h4').text()+url)
        		}
        	else if(analyze){
        		var d=analyze.split(',');
        		analytical(d[0],d[1]+url)
        	}});
        	
        $.fn.lazyhover=function(fuc_on,de_on,de_out){
        	var self=$(this);
        	var flag=1;
        	var h;
        	var handle=function(elm){
        		clearTimeout(h);
        		if(!flag){
        			self.removeData("timer")
        		}
        		return flag?fuc_on.apply(elm):null
        	};
        		var time_on=de_on||0;
        		var time_out=de_out||500;
        		var timer=function(elm){
        			h&&clearTimeout(h);
        			h=setTimeout(function(){handle(elm)},flag?time_on:time_out);
        			self.data("timer",h)};
        			self.hover(function(){
        				flag=1;timer(this)},function(){flag=0;timer(this)}
        			)};
        			function HtmlSlidePlayer(config){
        				this.n=0;
        				this.j=0;
        				this.first_show=1;
        				var _this=this;
        				var t;
        				var defaults={
        					fontsize:12,right:10,bottom:15,time:5000,autosize:0,slidearrow:false
        				};
        				this.config=$.extend(defaults,config);
        				this.count=$("#mtsBanner li").length;this.factory=function(){
        					$("#mtsBanner").css({position:"relative",zIndex:"0",overflow:"hidden",height:$("#mtsBanner ul").height()+"px"});
        					$("#mtsBanner").prepend("<a href='javascript:;' class='move_left'></a><a href='javascript:;' class='move_right'></a>");
        					$("#mtsBanner").prepend("<div class='slide_control'></div>");
        					$("#mtsBanner ul").css({position:"relative",zIndex:"0",margin:"0",padding:"0",overflow:"hidden",width:"100%"});
        					$("#mtsBanner li").css({position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden"}).hide().each(function(i){$("#mtsBanner .slide_control").append("<a>"+(i+1)+"</a>")});
        					this.resetclass("#mtsBanner .slide_control a",0);
        					this.slide();
        					t=setInterval(this.autoplay,this.config.time);
        					$("#mtsBanner .slide_control a").eq(0).triggerHandler("mouseover");
        					var slideContorlWidth=$(".slide_control").width();
        					$(".slide_control").css({marginLeft:-slideContorlWidth/2})};
        					this.slide=function(){$("#mtsBanner .slide_control a").lazyhover(function(){_this.j=$(this).text()-1;
        						_this.n=_this.j;if(_this.j>=_this.count){return}
        						moveFun(_this.first_show,_this.j)},200,500);
        						$("#mtsBanner").delegate("a.move_left","click",function(){_this.j=$("#mtsBanner .slide_control a.mall_dot_hover").text()-1;_this.j-=1;_this.n=_this.j;
        						if(_this.j>=_this.count){
        							this.j=0
        						}
        						if(_this.j<0){_this.j=_this.count-1}
        						$("#mtsBanner .slide_control a").eq(_this.j).triggerHandler("mouseover")}).delegate("a.move_right","click",function(){_this.j=$("#mtsBanner .slide_control a.mall_dot_hover").text()-1;
        						_this.j+=1;
        						_this.n=_this.j;
        						if(_this.j>=_this.count){_this.j=0}
        						$("#mtsBanner .slide_control a").eq(_this.j).triggerHandler("mouseover")})};
        						function moveFun(first_show,j){if(first_show){_this.first_show=0;
        							$("#mtsBanner li:eq("+j+")").show().addClass("on").siblings("li").removeClass("on").hide();
        							$("#mtsBanner li:eq("+0+")").removeAttr("lazyload").find("img").each(function(index,element){if($(this).attr('data-original')!='http://'){$(this).attr('src',$(this).attr('data-original'))}})}else{var li=$("#mtsBanner li:eq("+j+")");
        							var next_li;
        							if(_this.count>=_this.j+1){
        								next_li=$("#mtsBanner li:eq("+(j+1)+")")}
        							li.fadeIn("200",function(){
        								$(this).addClass("on")}).siblings("li").fadeOut("200",function(){$(this).removeClass("on")});
        								var bg_src=li.attr("lazyload");
        								if(bg_src!=undefined){li.removeAttr("lazyload");
        								li.find("img").each(function(index,element){if($(this).attr('data-original')!='http://'){
        									$(this).attr('src',$(this).attr('data-original'))}})}}
        							_this.resetclass("#mtsBanner .slide_control a",j);
        							var url=$("#mtsBanner li").eq(j).find('a').attr('href');
//      							$("#mtsBanner").find('.move_left').attr('onclick','analytical("焦点图左右导航","焦点图左导航_首页焦点图0'+parseInt(j+1)+'_'+url+'")');
//      							$("#mtsBanner").find('.move_right').attr('onclick','analytical("焦点图左右导航","焦点图右导航_首页焦点图0'+parseInt(j+1)+'_'+url+'")')
									}
        						$("#mtsBanner").delegate("","mouseover",function(){$(this).find("a.move_left,a.move_right").stop("true","true").fadeIn("fast")});
        						$("#mtsBanner").delegate("","mouseleave",function(){$(this).find("a.move_left,a.move_right").stop("true","true").fadeOut("fast")});
        						$("#mtsBanner").mouseover(function(){clearInterval(t)});$("#mtsBanner").mouseout(function(){t=setInterval(_this.autoplay,_this.config.time)});this.autoplay=function(){_this.n=_this.n>=(_this.count-1)?0:++_this.n;
        							$("#mtsBanner .slide_control a").eq(_this.n).triggerHandler("mouseover")};this.resetclass=function(obj,i){$(obj).removeClass("mall_dot_hover").addClass("mall_dot");$(obj).eq(i).addClass("mall_dot_hover");
        							if(!window.XMLHttpRequest){$(".img_slider_trigger").css("zoom","1")}};this.factory()}HtmlSlidePlayer({autosize:0,fontsize:12,time:4000});
    });
 window.dataLayer = window.dataLayer || [];    
function analytical(title,str){
	dataLayer.push({"bannerlabel":title,"banneraction":str,"event":"bannerclick"})
};