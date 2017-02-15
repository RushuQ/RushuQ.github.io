$(document).ready(function(){$head=$("header");$ul=$head.find(".navbar .container .collapse .nav");$li=$ul.find("li");$("#pack").shuffling().on("afterEvent",function(event,date){var index=date.index;$li.removeClass("active").eq(index).addClass("active")});$li.on("click",function(){var alt=$(this).index();$li.removeClass("active").eq(alt).addClass("active")});var myChart=echarts.init(document.getElementById("known"));var dataAxis=["HTML","CSS","JAVASCRIPT","JQUERY","BOOTSTRAP","PHOTOSHOP","nodejs"];var dataTips=["熟悉W3C标准，熟练使用标签和熟悉HTML5新定义标签，了解SVG和canvas","熟悉div+CSS布局，了解CSS3 新加入的特性,了解CSS3动画","重视JS原生代码熟悉API，将进行ES6学习","熟悉API巧使JQ写便利小插件,熟悉AJAX的运行","熟悉相应API，熟悉使用预编程Less,并灵活应用于响应式开发","熟悉PS切图工具，进行简单操作","会简单搭建后台服务和用于下载插件"];var data=[94,90,82,84,89,88,62];var yMax=100;var dataShadow=[];for(var i=0;i<data.length;i++){dataShadow.push(yMax)}option={title:{text:"自我评比",subtext:"提示:可点击可滑动",left:"40%",subtextStyle:{color:"#e4edf5"},textStyle:{color:"#443323",fontStyle:"normal",fontWeight:"bolder",fontFamily:"sans-serif",fontSize:20,}},tooltip:{},xAxis:{data:dataAxis,axisLabel:{inside:true,textStyle:{color:"#fff"}},axisTick:{show:false},axisLine:{show:false},z:10},yAxis:{axisLine:{show:false,lineStyle:{color:"#fff"}},axisTick:{show:false},axisLabel:{textStyle:{color:"#fff"}}},series:[{name:"自评",type:"bar",data:dataAxis}],dataZoom:[{type:"inside"}],series:[{type:"bar",itemStyle:{normal:{color:"rgba(238,238,238,0.09)"}},barGap:"-100%",barCategoryGap:"50%",data:dataShadow,animation:false},{name:"自评",type:"bar",itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#adfdf5"},{offset:0.5,color:"#23f7e3"},{offset:1,color:"#23f7e3"}])},emphasis:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#23f7e3"},{offset:0.7,color:"#23f7e3"},{offset:1,color:"#adfdf5"}])}},data:data}]};var dataBox=$("<div></div>");dataBox.addClass("boxTip text-center container animate");$("#known").append(dataBox);myChart.on("click",function(e){for(var props in dataAxis){if(dataAxis[props]===e.name){dataBox.addClass("pad");dataBox.text(dataTips[props])}}});myChart.setOption(option);$("#lb-pack").showSlip()});function showPage(obj){obj.style.display="block";obj.onclick=function(){this.style.display="none"}};