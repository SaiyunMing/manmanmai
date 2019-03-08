

$(function () {

    // 渲染标题
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
        dataType: 'json',
        success: function (info) {
            console.log(info);
            
            //获取数据
            var htmlStr = template('navTpl', info);
            //渲染到页面中
            $('.list').html(htmlStr);

            // 动态设置ul的宽
            setWidth();

            new IScroll('.nav', {
                scrollX: true,
                scrollY: false
            });
        }
    })

    var titleId = 1;
    $('.nav .list').on('click','a',function(){
        //获取 存在 a 身上的 id
        titleId = $(this).data().id;
        // 被点击的a 添加 current 类
        $('.nav .list a').removeClass('current');
        $(this).addClass('current');


        // 传给后台,返回数据渲染页面
        render(titleId);

    })


    // 渲染内容
    render(titleId);
    function render(){

        $.ajax({
            url:"http://127.0.0.1:9090/api/getbaicaijiaproduct",
            data:{
                titleid:titleId
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                
                //获取数据
                var htmlStr = template('contentTpl',info);
                $('.content').html(htmlStr);
            }
    
        })
    
    }








    function setWidth() {

        // 1.获取所有的li,
        // 2.将li 的宽的和求出来
        // 3.设置给ul的宽
        var width = 0;
        $('.nav .list li').each(function (i, v) {
            width += $(v).innerWidth();
        })
        $('.nav .list').width(width);

    }




})