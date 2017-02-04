$(function(){
    var $count=$(".bs-example table tbody tr td .count");
    var $unit=$(".bs-example table tbody tr td .unit-price");
    var $del=$(".bs-example table tbody tr td.operate .del");
    var $head=$(".bs-example table thead tr th label input");
    var $btn=$count.find('a');
    $btn.on('click', function(ele,boolen) {
        var $this=$(this);
        var $par=$this.parents("tr");
        var val=$this.parents("tr").find('.count input')[0];
        if(!boolen){//boolen为非false时触发加减事件
            if($this.hasClass('add')){
                val.value++;
            }else if($this.hasClass('sub')){
                val.value==1?1&&rectTip("已经最小了，不能再少了"):val.value--;
            }
        }
        $par.find('.sum-price').html(($par.find('.unit-price').html()*val.value).toFixed(2));
        addMoney();
    });
    $unit.on("blur",function(){//触发加号的点击事件来改变金额
        $(this).parents("tr").find('.add').trigger('click',true);
    });
    $count.find("input").on("blur",function(event){
        $(this).parents("tr").find('.add').trigger('click',true);
    });
    $del.on("click",function(){//删除列
        $(this).parents("tr").remove();
        addMoney();
    })
    $(".bs-example table thead tr th label input[type=checkbox]").on("change",function(){//每列的选择框的状态随“全选的状态而改变”
        $(".bs-example table tbody tr td input[type=checkbox]").prop("checked",$(this).prop("checked"));
        if($(this).prop("checked")){
            $(this).parents("table").find("tbody tr").addClass("select");
        }else{
            $(this).parents("table").find("tbody tr").removeClass("select")
        }
        addMoney();
    });
    $(".bs-example table tbody tr td input[type=checkbox]").on("change",function(){//当商品全都选中时，全选按钮处于打钩状态
       var len=$(".bs-example table tbody tr td input:checked").length;
       var $counts=$(".bs-example table tbody tr");
       if(len==$counts.length-1){
        $head.prop("checked",true);
        $(this).parents("tr").addClass('select');
       }else{
        $head.prop("checked",false);
        $(this).parents("tr").removeClass('select');
       }
        addMoney();    
    });
    $(".bs-example table tbody tr td a input[type=file]").on("change",function(){
        var img=this.value;
        if(!/\.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(img)){
            rectTip("图片格式必须是.gif,jpeg,jpg,png等一种");
            return false;
        }//正则判断选择的图片格式
        var f=this.files[0];
        var src=window.URL.createObjectURL(f);
        $(this).prev().attr("src",src);
    })
    $(".bs-example form button").on("click",function(){//克隆模板列包括所有事件
        var $tbody=$(".bs-example form table tbody");
        var $model=$(".bs-example form table tr.model");
        $model.clone(true).show().removeClass("model").appendTo($tbody);
    });
    function rectTip(text){//弹出提示框
        var $dom=$("<div class=\"rect\"><div>");
        $(document.body).append($dom);
        $dom.html(text);
        setTimeout(function(){
            $dom.hide();
        },2000)
    }
    function addMoney(){//计算购物车总价
        var money=0;
        var num=$(".bs-example table tbody tr td input:checked").each(function(){
            money+=Number($(this).parents("tr").find("td span.sum-price").html());
        }).size();//被选中的商品的个数
        $(".footer span:first-child p").html(num);
        $(".footer span:last-child p").html(money.toFixed(2));
    }
    
})