


$(function () {

    var obj = {};
    var productid = location.search.slice(1);
    var arr = productid.split('&');
    
    arr.forEach(function (v, i) {
        var key = v.split('=')[0];
        var value = v.split('=')[1];
        obj[key] = value;

    })
    obj['category'] = decodeURI(obj.category);
    console.log(obj);
    
    // obj[]
    // console.log(productid);
    // 商品详情
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproduct',
        data: {
            productid: obj.productId
        },
        dataType: 'json',
        success: function (info) {
            //渲染商品详情
            var htmlStr = template('productTpl', info);
            $('.content').html(htmlStr);


            //渲染路径导航
            // 获取商品名称
            var productName = info.result[0].productName.split(' ')[0];
            // 获取商品分类名称 
            obj['productName'] = productName;
            var result = [obj];
           console.log(result);
           
            var htmlStr1 = template('navTpl', {obj1:result});
            $('.m_main .nav').html(htmlStr1);
            
        }

    })


    //商品评论
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproductcom',
        data: {
            productid: obj.productId
        },
        dataType: 'json',
        success: function (info) {
            var htmlStr = template('commentTpl', info);
            $('.listContent').html(htmlStr);
        }

    })
















})