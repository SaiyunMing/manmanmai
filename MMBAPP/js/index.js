
$(function(){

    // 1.导航部分渲染
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getindexmenu',
        dataType:'json',
        success:function(info){
            //准备数据
            var htmlStr = template('navTpl',info);
            //将数据渲染页面中
            $('#nav').html(htmlStr);
            // info.result.forEach(function(v,i){
            //     console.log(v.titlehref);
                
            // })
        }
    })

    // 2.打折部分渲染
    $.ajax({
        // type:'get',
        url:'http://127.0.0.1:9090/api/getmoneyctrl',
        dataType:'json',
        success:function(info){
            //准备数据
            var htmlStr = template('discountTpl', info);
            //将数据渲染到页面中
            $('#disContent').html(htmlStr);
            console.log(info);
            
        }

    })

    // 3.点击导航栏中 更多 图标,可以显示或隐藏第三行菜单
        /**
         * 1.找到这个按钮
         * 2.注册事件委托
         * 3.阻止 a标签 跳转
         * 4.让第三行显示和隐藏
         * 
         */
    $('.m_main #nav').on('click','a[href="javascript:;"]',function(){
        $('#nav li').each(function(i,v){
            if(i>=8){
                $(v).toggleClass('hide');
            }
        })
        
    })

})