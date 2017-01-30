$(document).ready(function(){
    $("#pack").shuffling();
//图标
    var myChart = echarts.init(document.getElementById('known'));
    var dataAxis = ['HTML', 'CSS3', 'JAVASCRIPT', 'JQUERY', 'BOOTSTRAP', 'LESS', 'PHOTOSHOP'];
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
    myChart.on('click',function(){
        console.log(this);
             
    })
    myChart.setOption(option);

//作品展示
    $("#lb-pack").showSlip();
});