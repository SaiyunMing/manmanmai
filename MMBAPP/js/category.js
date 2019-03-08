
$(function () {

    // 1.渲染分类标题
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategorytitle',
        dataType: 'json',
        success: function (info) {
            // console.log(info);
            //获取数据
            var htmlStr = template('classifyTitleTpl', info);
            //渲染到页面中
            $('#classifyTitle').html(htmlStr);
        }
    })
    
    // 2.渲染分类列表
    var flag = true;
    $('.m_main #classifyTitle').on('click', 'li', function () {
        // 判断  点击的li 下面的 (ul.classifyList) 元素是否有 show类,有就删除,隐藏如果下面代码不执行
        if($(this).children('.classifyList').hasClass('show')){
            console.log(21);
            $(this).find('.classifyList').removeClass('show');
            return;
        }
        //排他,  让所有盒子先隐藏
        $('.classifyList').each(function (i, v) {
            $(v).removeClass('show');
        })  
        //显示  ul.classifyList  添加show类
        $(this).find('.classifyList').addClass('show');
        

        // 获取分类标题的id
        var id = $(this).data(id);
        // console.log(id.id);
        console.log(id);
        // $('.classifyList').hide(); 
        // $('.classifyList').removeClass('hide');
        
       

        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcategory',
            data: {
                titleid: id.id
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                //获取数据
                var htmlStr = template('classifyListTpl', info);
                //渲染到页面中
                $('.classifyList').html(htmlStr);
                // $('.classifyList').hide();
                //让其他分类列表隐藏
                // $('.classifyList').addClass('hide');
                // $('#classifyTitle').on('click','li',function(){
                  

                // })

                
                // $('.classifyList').eq(id.id).toggle();



            }


        })
    })




})