var toutiao_url = "http://games.hoolai.com/cms/?post_id=6643&json=get_post&include=title";

$(document).ready(function(){
   

    request(toutiao_url, function(err, data) { //今日头条
        if (err) {
            console.log(err);
        } else {
            var _data = data.post;
            // console.log(data.custom_fields);
            // console.log(_data.length);
            if (_data) {
                $('div.news_bg a.toutiao').text(_data.title).attr('href', 'newsContent.html#post_id=' + _data.id);
            } else {
                console.log("后台没有发文章");
            }


        }
    });
})






function getDataList(cat, posts) {
    var posts_len = posts.length;
    var dataList = [];
    if (posts_len == 0) {
        return null;
    }
    for (var j = 0; j < posts_len; j++) {
        var cat_len = posts[j].categories.length;

        for (var i = cat_len - 1; i >= 0; i--) {
            if (posts[j].categories[i].id == cat) {
                dataList.push(posts[j]);
            }
        }

    }
    return dataList;
}

function request(url, cal) {
    $.ajax({
        type: "POST",
        url: url,
        dataType: "jsonp",
        success: function(resp) {
            cal(false, resp);
        },
        error: function(resp) {
            cal(resp)
        }
    });
}
