
$(function () {

    // 1.渲染分类标题
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getbrandtitle',
        dataType: 'json',
        success: function (info) {
            console.log(info);
            //获取数据
            var htmlStr = template('classifyTitleTpl', info);
            //渲染到页面中
            $('.classifyTitle').html(htmlStr);
        }
    })


})