

$(function(){
    
    var id = location.search.split('=')[1];
    

    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        data:{
            productid :id 
        },
        dataType:'json',
        success:function(info){
            console.log(info);
            
            //获取数据
            var htmlStr = template('mainTpl',info);
            //渲染到页面中
            $('.m_main').html(htmlStr);


        }










    })












})







