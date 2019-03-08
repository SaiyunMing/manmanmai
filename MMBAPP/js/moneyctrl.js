



$(function () {
    // 后台传过来的数据 pageid 是从0 开始的;
    var pageid = 0; //当前页码
    var totalCount = 0; //总页码

    // 1.渲染页面
    render();
    function render(){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getmoneyctrl',
            data: {
                pageid :pageid
            },
            dataType: 'json',
            success: function (info) {
    
                //获取数据
                var htmlStr = template('productListTpl',info);
                //渲染到页面中
                $('.m_main .content').html(htmlStr);
                
                //刷新总页码
                totalCount = Math.ceil(info.totalCount / info.pagesize);
                var num = pageid + 1;
                $('.Pagination span').text(num  + '/' + totalCount);
            }
    
    
        })


    }


    // 2.给按钮注册点击事件,
        // 1.点击上一页,让页码 ++ ,重新渲染内容
        // 2.点击下一页,让页码 --,重新渲染内容
        // 3.点击页码小箭头,可以跳转对应页面
    $('.Pagination button').on('click', function () {

        //如果点击下一页
        if ($(this).hasClass('next')) {
            // 页码++
            pageid++;
            // 当前页码大于最大页码时,让当前页码等于最大页码
            pageid = pageid > totalCount - 1 ? totalCount -1 : pageid;
            // 重新渲染内容
            render();
            
            

        }
        //点击下一页
        else {
            pageid--
            // 当前页码小于最小页码时,让当前页码等于最小页码
            pageid = pageid <= 0 ? 0 : pageid;
            // 重新渲染内容
            render();
        }

        //当前页码为最小值时,禁用上一页按钮
        $(".prev").attr("disabled", pageid <= 0);
        //当前页码为最大值时,禁用下一页按钮
        $(".next").attr("disabled", pageid >= totalCount - 1);

    })














})