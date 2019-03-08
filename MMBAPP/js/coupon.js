
$(function(){


    //渲染内容
    $.ajax({
        url:'http://127.0.0.1:9090/api/getcoupon',
        dataType:'json',
        success:function(info){
            console.log(info);
            
            //获取数据
            var htmlStr = template('contentTpl',info);
            //渲染到页面中
            $('.m_main').html(htmlStr);


        }

    })

})