

$(function(){

    var brandtitleid = location.search.split('=')[1];
    

    // 1.品牌排行渲染
    $.ajax({
        url:'http://127.0.0.1:9090/api/getbrand',
        data:{
            brandtitleid:brandtitleid
        },
        dataType:'json',
        success:function(info){
            // console.log(info);
            
            //获取数据
            var htmlStr = template('brandListTpl',info);
            // 渲染在页面中
            $('.brandList').html(htmlStr);

            $('.brandList li').each(function(i,v){
                if( i == 0 ){
                    $(v).find('.icon_left').css('backgroundColor','#f10e0e');
                }
                if( i == 1 ){
                    $(v).find('.icon_left').css('backgroundColor','#ff9414');
                }
                if( i == 2 ){
                    $(v).find('.icon_left').css('backgroundColor','#84dc49');
                }
                if( i > 2 ){
                    $(v).find('.icon_left').css('backgroundColor','#c9c8c8');
                }



            })
        }
    })

    
    // 2.销量排行渲染
        // 初始化销量排行渲染
        renderSales(0);
        // 1.给品牌标题注册事件委托,
        // 2.点击获取品牌标题的id , 根据id  发送ajax 获取数据
    $('.brandList').on('click','li',function(){
        var brandtitleid = $(this).data().brandtitleid;
        
        renderSales(brandtitleid);

    })
        
    // 3.销量排行商品的评论
        // 初始化销量评论渲染
        renderComment(0);
        // 1.给品牌标题注册事件委托,
        // 2.点击获取品牌标题的id , 根据id  发送ajax 获取数据
    $('.content').on('click','li',function(){
        //获取商品id
        var productid = $(this).data().productid;
        
        // 获取商品图片的src
        var src = $(this).find('img').attr('src');
        
        // document.querySelector('')

        // $('.commentList img').each(function(i,v){
        //     $(v).attr('src',src);
            
        // })
        
        // 销量评论渲染
        renderComment(productid,src);
        // console.log(img);

    })
    
    

    




    // 销量排行渲染
    function renderSales(brandId){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbrandproductlist',
            data: {
                brandtitleid: brandtitleid,
                pagesize : 4
            },
            dataType: 'json',
            success: function (info) {
                //获取数据
                var htmlStr = template('salesTpl', info);
                // 渲染到页面中
                $('.m_main .content').html(htmlStr);
                
            }
        })
    }

    // 销量评论渲染
    function renderComment(productid,src){
        $.ajax({    
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproductcom',
            data: {
                productid : productid
            },
            dataType: 'json',
            success: function (info) {
                //获取数据
                var htmlStr = template('commentTpl', info);
                // 渲染到页面中
                $('.m_main .comment').html(htmlStr);
                // console.log(htmlStr);
                //设置给评论中 Img 
                $('.commentList .imgBox img').attr('src',src);
            }
        })
    }
})





