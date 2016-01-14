var toutiao_url = "http://games.hoolai.com/cms/?post_id=6643&json=get_post&include=title";
var news_url="http://games.hoolai.com/cms/?cat=227&json=get_category_posts&include=title,categories,date&count=500";
var Url="http://games.hoolai.com/cms/?json=get_category_posts&cat=208&include=title,content,custom_fields,date,categories&count=500";

$(document).ready(function(){
    request(toutiao_url, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var _data = data.post;
            if (_data) {
                $('div.news_bg a.toutiao').text(_data.title).attr('href', 'newsContent.html#post_id=' + _data.id);
            } else {
                console.log("后台没有发文章");
            }


        }
    });

    request(Url,function(err,data){
        if(err){console.log(err);}
        else{
            /*var Newdata=data.post;*/
            var posts='';
            var total=data.posts.length;
            var rows=6;
            var p=-1;
            for(var i=0;i<total;i++)
            {
                var post=data.posts[i];
                if(i%rows==0){//6/16=0  11/5=
                    p++;
                }
        
            if(post.custom_fields.date){
            posts+='<li class="page'+p+'"><a href="newsContent.html?&post_id='+post.id+'">'+post.title+'</a><i>'+post.custom_fields.date+'</i></li>';
            }
            else{
                posts+='<li class="page'+p+'"><a href="newsContent.html?post_id='+post.id+'">'+post.title+'</a></li>';
            }
        }
        index.countPage=p;
     /*   debugger*/
        index.page=0;
        document.getElementById("pages").innerHTML=posts;
        $('#pages').find('li').hide();
        $('.page0').show(); 
           }
    })
})
/*
var index={};
function clickNextPage(){

    index.page++;
    $(".page"+index.page).show();
    if(index.page==index.countPage){
        $(".more").hide();
    }
}*/
var index={};
function clickNextPage(){

    index.page++;
    $(".page"+index.page).show();
    if(index.page==index.countPage){
        $(".more").hide();
    }
}

function getDataList(cat, posts) {

    var posts_len = posts.length;
    var dataList = [];
    if (posts_len == 0) {
        return null;
    }
    for(var i=0;i<posts_len;i++)
    {
    var cat_leng=posts[i].categories.length;
     for(var j=0;j<cat_leng;j++)
     {
      if(posts[i].categories[j].id==cat)
        dataList.push(posts[i]);
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
