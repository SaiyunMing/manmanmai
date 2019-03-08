
$(function () {
    // var str = location.search.slice(1,2);
    //     // str = str.split('&');
    // console.log(str);
    //分类列表名称
    var category;



    // 1.路径导航渲染
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategorybyid',
        data: {
            categoryid: location.search.slice(1)
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            //获取数据
            var htmlStr = template('navTpl', info);
            // 渲染到页面中
            $('.m_main .nav').html(htmlStr);
            //给分类列表名称赋值
            category = info.result[0].category;
        }
    })

    // console.log(location.search.slice(1));

    // 2.内容渲染
    var pageid = 1; //当前页码
    var totalCount = 0; //总页码
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproductlist',
            data: {
                categoryid: location.search.slice(1),
                pageid: pageid
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                //获取数据
                var htmlStr = template('contentTpl', info);
                // 渲染到页面中
                $('.m_main .content').html(htmlStr);
                
                //刷新总页码
                totalCount = Math.ceil(info.totalCount / info.pagesize);

                $('.Pagination span').text(pageid + '/' + totalCount);
                // console.log(Math.ceil(info.totalCount / info.pagesize));
                console.log();

                // info.result.forEach(function (v, i) {


                // })
            }

        })
    }


    // 3.给按钮注册点击事件,
    // 1.点击上一页,让页码 ++ ,重新渲染内容
    // 2.点击下一页,让页码 --,重新渲染内容
    // 3.点击页码小箭头,可以跳转对应页面
    $('.Pagination button').on('click', function () {

        //如果点击下一页
        if ($(this).hasClass('next')) {
            console.log(21);
            // 页码++
            pageid++;
            // 当前页码大于最大页码时,让当前页码等于最大页码
            pageid = pageid > totalCount ? totalCount : pageid;
            // 重新渲染内容
            render();

        }
        //点击下一页
        else {
            pageid--
            // 当前页码小于最小页码时,让当前页码等于最小页码
            pageid = pageid <= 1 ? 1 : pageid;
            // 重新渲染内容
            render();
        }

        //当前页码为最小值时,禁用上一页按钮
        $(".prev").attr("disabled", pageid <= 1);
        //当前页码为最大值时,禁用下一页按钮
        $(".next").attr("disabled", pageid >= totalCount);

    })

    //点击页码小箭头,可以跳转对应页面
    // $('i[class="fa fa-angle-down"]').on('click',function(){


    //     console.log(21);

    // })


    // 4.给每个商品注册事件委托,点击之后拼接地址;
    $('.m_main .content').on('click', 'a', function () {    
        // 获取商品名称
        var productId = $(this).data().productid;
        //获取分类id
        var categoryid = $(this).data().categoryid;
        console.log();
        console.log('product.html?productId=' + productId + '&category=' + category);


        $(this).attr('href','product.html?productId='+productId+'&category='+category + '&categoryid='+categoryid);
    })



})
