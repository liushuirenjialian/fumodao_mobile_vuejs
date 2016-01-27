$(document).ready(function(){
 request(url,function(err,data){
        if(err){console.log(err);}
        else{
            
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
                var ddd=post.date.substr(5,5);
                window.tag=232;
         /*  var ddd= new Date(post.date).Format("yyyy-MM-dd")，首先是 ie 对 new Date('2014-10-01')会得到NaN.Date.parse()方法不能兼容所有浏览器的。在ie中不能正常解析格式为2015-01-04的数据 */
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
var index={};
function clickNextPage(){
    
  index.page++;
    $(".page"+index.page).show();
    if(index.page==index.countPage){
        $(".more").hide();
    }
}
var url="http://games.hoolai.com/cms/?cat=232&json=get_category_posts&include=title,categories,date&count=500";
function request(url,cal){
	$.ajax({
		url:url,
		dataType:'jsonp',
		type:'post',
		 success: function(resp) {
            cal(false, resp);
        },
        error: function(resp) {
            cal(resp)
        }
	})
}