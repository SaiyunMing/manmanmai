

$(function(){
    // 获取优惠券分类id
    var couponid = location.search.split('=')[1];
    //初始化优惠券类别数据
    var obj;
    // 获取每个优惠的下标;
    var i =0;
    var id=0;


    // 1.渲染内容
    
    
    render();
    function render(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getcouponproduct',
            data:{
                couponid:couponid
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                
                //获取数据
                var htmlStr = template('contentTpl',info);
                //渲染到页面中
                $('.content').html(htmlStr);
                // 更新优惠券列表数据
                obj = info;
            }
        })
    }

    // 2.给每个优惠券注册事件委托,点击优惠券,让模态框显示
    $('.m_main .content').on('click','.contentList',function(){
        //获取每个优惠券图片的src;
        // src = $(this).find('img').attr('src');
        // 1.点击显示显示蒙层,
        $('.meng').toggle();
        // 2.获取屏幕高度,设置给蒙层
        var height = window.innerHeight;
        $('.m_main .meng').height(height)
        // 3获取每个优惠的下标;
        i = $(this).data().index;
        // 4.获取优惠券券图片,设置给轮播图
        setImg(i);
        // 5.获取优惠券id
        id =  $(this).attr('id');
       
        // 6.将id设置给 a 的href属性
        //将id设置给 a 的href属性
        setHref(id);
    })

    // 3.给上一页按钮切换点击事件
    $('.meng .prev').on('click',function(){
        i--;
        i = i <=0 ? 0 : i;
        id--;
        //获取优惠券券图片,设置给轮播图
        setImg(i);
        //判断禁用按钮
        isClick(i);
        //将id设置给 a 的href属性
        setHref(id);
    })

    // 4.给下一页按钮切换点击事件
    $('.meng .next').on('click',function(){
        i++;
        i = i >= obj.result.length-1 ? obj.result.length-1 : i;
        id++;
        //获取优惠券券图片,设置给轮播图
        setImg(i);
        //判断禁用按钮
        isClick(i);
        // console.log(i);
        //将id设置给 a 的href属性
        setHref(id);
    })
    
    // 5.给模态框中的img 注册点击事件 ,点击隐藏模态框
    $('.meng .imgBox a').on('click',function(){
        $('.meng').toggle();
        
    })


    //-------------分割线--------------
  
    
    //设置img
    function setImg(index){

        var img = obj.result[index].couponProductImg;
        $('.meng .imgBox a').html(img);
    }
    
    // 判断是否禁用上一页或下一页
    function isClick(i){
        var none = i === 0 || i === $('contentList').length ? 'none' : '' ;
        $('.meng .prev').css('pointer-events',none);
        $('.meng .nextF').css('pointer-events',none);
    }
      
    //模态框中 a 设置锚点
    function setHref(id){
        var href = '#'+id;
        // 6.将id设置给 a 的href属性
        $('.meng .imgBox a').attr('href',href);
    }

})