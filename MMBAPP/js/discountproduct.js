

$(function(){
    var id = location.search.split('=')[1];
    // var id = arr[1].split('=')[1];
    // var key = arr[0].split('=')[1];
    // console.log(productid );    
    console.log(id );
    
   

    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getdiscountproduct',
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







