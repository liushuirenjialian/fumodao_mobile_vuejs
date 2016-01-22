var toutiao_url = "http://games.hoolai.com/cms/?post_id=6643&json=get_post&include=title";
var news_url="http://games.hoolai.com/cms/?cat=227&json=get_category_posts&include=title,categories,date&count=500";
/*var Url="http://games.hoolai.com/cms/?json=get_category_posts&cat=208&include=title,content,custom_fields,date,categories&count=500";
*/
$(document).ready(function(){
    request(toutiao_url, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var _data = data.post;
            if (_data) {
                $('div.news_bg a.toutiao').text(_data.title).attr('href', 'fmddetail.html?post_id=' + _data.id);
            } else {
                console.log("后台没有发文章");
            }


        }
    });

    request(news_url,function(err,data){

        //格式化date
        Date.prototype.Format = function(format) {
            var o = {
                "M+" : this.getMonth() + 1, // month
                "d+" : this.getDate(), // day
                "h+" : this.getHours(), // hour
                "m+" : this.getMinutes(), // minute
                "s+" : this.getSeconds(), // second
                "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
                "S" : this.getMilliseconds()
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "")
                        .substr(4 - RegExp.$1.length));
            }
            for ( var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1,
                            RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
                                    .substr(("" + o[k]).length));
                }
            }
            return format;
        };
       /*  new Date(date).Format("yyyy-MM-dd")
*/
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
             var date="";
            if(post.date){
             var ddd= new Date(post.date).Format("yyyy-MM-dd")
            posts+='<li class="page'+p+'"><a href="fmddetail.html?tag='+window.tag+'&post_id='+post.id+'">'+post.title+'</a><i>'+ddd+'</i></li>';
            }
            else{
            posts+='<li class="page'+p+'"><a href="fmddetail.html?tag='+window.tag+'post_id='+post.id+'">'+post.title+'</a></li>';
            }
        }
   /*     if(total<5){
              $(".more").hide();
        }*/
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
