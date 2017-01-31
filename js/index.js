$(document).ready(function(){
    $head = $("header");
    $ul = $head.find('.navbar .container .collapse .nav');
    $li = $ul.find('li');
    $("#pack").shuffling().on("afterEvent",function(event,date){
        var index = date.index;
        $li.removeClass('active').eq(index).addClass('active');     
    });
    $li.on('click',function(){
        var alt = $(this).index();
        $li.removeClass('active').eq(alt).addClass('active'); 
    })
//echart柱形图
    var myChart = echarts.init(document.getElementById('known'));
    var dataAxis = ['HTML', 'CSS', 'JAVASCRIPT', 'JQUERY', 'BOOTSTRAP', 'LESS', 'PHOTOSHOP'];
    var dataTips = ['熟悉W3C标准，熟练使用标签和熟悉HTML5新定义标签，了解SVG和canvas',"熟悉div+CSS布局，了解CSS3 新加入的特性,了解CSS3动画","重视JS原生代码，将进行ES6学习","熟悉API巧使JQ写便利小插件","熟悉相应API，并熟练进行响应式开发","熟悉使用预编程Less","熟悉PS切图工具，进行简单操作"];
    var data = [94, 90, 80, 84, 85, 88, 90];
    var yMax = 100;
    var dataShadow = [];
    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    option = {
        title: {
            text: '自我评比',
            left:'40%',
            textStyle: {
                color: '#443323',
                fontStyle: 'normal',
                fontWeight: 'bolder',
                fontFamily: 'sans-serif',
                fontSize: 20,
            }
        },
        tooltip: {},
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: true,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        series : [{
            name :'自评',
            type:'bar',
            data:dataAxis
        }],
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(238,238,238,0.09)'}
                },
                barGap:'-100%',
                barCategoryGap:'50%',
                data: dataShadow,
                animation: false
            },
            {
                name: '自评',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#adfdf5'},
                                {offset: 0.5, color: '#23f7e3'},
                                {offset: 1, color: '#23f7e3'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#23f7e3'},
                                {offset: 0.7, color: '#23f7e3'},
                                {offset: 1, color: '#adfdf5'}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };
    var dataBox = $("<div></div>");//表格下面技能对应介绍
    dataBox.addClass('boxTip text-center container animate');
    $("#known").append(dataBox);
    myChart.on('click',function(e){
        for(var props in dataAxis){//遍历数组
            if( dataAxis[props] === e.name){
                dataBox.addClass('pad');
                dataBox.text(dataTips[props]);
            }
        }   
    })
    myChart.setOption(option);
//3D轮播调用
    $("#lb-pack").showSlip();
});