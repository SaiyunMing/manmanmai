

$(function(){

    // 1.给店铺名称注册点击事件
    $('.m_main .nav .shopName').on('click', function(){

            var url = 'http://127.0.0.1:9090/api/getgsshop';
            renderNav(url,'.shopName_dropDown','shopNameTpl');
            $('.areaid_dropDown').hide();
            $('.shopName_dropDown').toggle();
            
    })

    // 2.给地区名称注册点击事件
    $('.m_main .nav .areaid').on('click', function(){
        
            var url = 'http://127.0.0.1:9090/api/getgsshoparea';
            renderNav(url,'.areaid_dropDown','areaidTpl');
            $('.shopName_dropDown').hide();
            $('.areaid_dropDown').toggle();
    })

    var obj = {'shopid': 0 , 'areaid' : 3};
    // 初始化页面
    render(obj);
    // 3.给店铺名称下拉菜单注册事件委托, 
        // 1.点击下拉菜单列表 , 获取对应的 id 和对应的 值 ,
        // 2.将id 存储到一个对象中 将值设置到标题
        // 3.给下拉菜单列表添加 show类 , 显示被选中;
    $('.shopName_dropDown').on('click','li',function(){
        // // 获取地区id
        // var areaId = $(this).data().areaid;
        // 1.
            // 获取店铺id
            var shopId = $(this).data().shopid;
            // 获取值
            var text = $(this).children('span').text();
        // 2.
            //存储id
            obj['shopid'] = shopId;
            //设置标题
            $('.shopName span').text(text);
        // 3.
            //排他
            $('.shopName_dropDown li .selected').removeClass('show');
            //添加show类
           $(this).children( '.selected').addClass('show');
           $('.shopName_dropDown').toggle(); 
        // 4.渲染主要内容
        render(obj);
    })

    // 4.给地区名称下拉菜单注册事件委托, 
        // 1.点击下拉菜单列表 , 获取对应的 id 和对应的 值 ,
        // 2.将id 存储到一个对象中 将值设置到标题
        // 3.给下拉菜单列表添加 show类 , 显示被选中;
    $('.areaid_dropDown').on('click','li',function(){
        // // 获取地区id
        // var areaId = $(this).data().areaid;
        // 1.
            // 获取地区id
            var areaId = $(this).data().areaid;
            // 获取值
            var text = $(this).children('span').text().slice(0,2);
        // 2.
            //存储id
            obj['areaid'] = areaId;
            //设置标题
            $('.areaid span').text(text);
        // 3.
            //排他
            $('.areaid_dropDown li .selected').removeClass('show');
            //添加show类
           $(this).children( '.selected').addClass('show');
           $('.areaid_dropDown').toggle(); 

        // 4.渲染主要内容
        render(obj);

    })








    //渲染下拉菜单
    function renderNav(url,box,tplId){
        $.ajax({
            url:url,
            dataType:'json',
            success:function(info){
                //获取数据
                var htmlStr = template(tplId,info);
                //渲染到页面中
                $(box).html(htmlStr);
                //默认下拉菜单列表第一个选中
                $(box).children('li').eq(0).hasClass('show');
                //获取下拉菜单第一个的值,设置给标题
            }
        })
    }


    // 渲染内容部分
    function render(obj){
        // 获取对象长度
        var length = Object.keys(obj).length;
        if( length < 2){
            console.log(21);
            return;
        }
        
        $.ajax({
            url:'http://127.0.0.1:9090/api/getgsproduct',
            data: obj,
            dataType:'json',
            success:function(info){
                //获取数据
                var htmlStr = template('contentTpl',info);
                //渲染到页面中
                $('.content ul').html(htmlStr);
            }
        })
    }



})