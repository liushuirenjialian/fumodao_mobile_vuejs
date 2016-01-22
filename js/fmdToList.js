$(document).ready(function(){
/*  var url = "http://games.hoolai.com/cms/?cat=226&json=get_category_posts&include=title,categories,date&count=1500";
*/
  var url = "http://games.hoolai.com/cms/?cat=147&json=get_category_posts&include=title,categories,date&count=1500";

 request(url,function(err,data){
  	if(err){console.log(err);}
  	else{
  		var $data=data.posts;
  		/*var $newslist=getDataList(227,$data);
  		var $telllist=getDataList(230,$data);
  		var $newlist=getDataList(228,$data);
  		var $actilist=getDataList(229,$data);*/
  		var $newslist=getDataList(149,$data);
  		var $telllist=getDataList(151,$data);
  		var $newlist=getDataList(148,$data);
  		var $actilist=getDataList(150,$data);
        var $zuixin=$('div.cont').find('ul.TAB_FOUR').find('li.news');
        var $gonggao=$('div.cont').find('ul.TAB_FOUR').find('li.tell');
        var $xinwen=$('div.cont').find('ul.TAB_FOUR').find('li.new');
        var $huodong=$('div.cont').find('ul.TAB_FOUR').find('li.acti');
        var $exp_ul=$('div.cont').find('ul.exp_ul');
         /* $exp_ul.html(getPageofData($newlist,'【最新】',227));*/
          $zuixin.click(function(){
          	$zuixin.siblings('li').removeClass('cur');
          	$zuixn.addClass('cur');
          	 $exp_ul.html(getPageofData($newlist,'【最新】',227));
          })
           $gonggao.click(function(){
          	$gonggao.siblings('li').removeClass('cur');
          	$gonggao.addClass('cur');
          	 $exp_ul.html(getPageofData($newlist,'【公告】',230));
          })
            $xinwen.click(function(){
          	$xinwen.siblings('li').removeClass('cur');
          	$xinwen.addClass('cur');
          	 $exp_ul.html(getPageofData($newlist,'【新闻】',228));
          })
             $huodong.click(function(){
          	$huodong.siblings('li').removeClass('cur');
          	$huodong.addClass('cur');
          	 $exp_ul.html(getPageofData($newlist,'【活动】',229));
          })
  	}
  })
  
  var index={};
  function getPageofData(dataList,mark,tag){
    var posts="";
    var length="";

    var post;
    length=post.length;//未得到数据 。。。。。
    var rows=10;
    var p=-1;
    for(var i=0;i<length;i++){
    	if(i%rows==0){
    		p++;
    	}
    if(dataList){
    	post=dataList[i];
      posts+='<li><span class="mark m1 page'+p+'">'+mark+'</span><a href="fmddetail.html?tag='+window.tag+'&post_id='+post.id+'">'+post.title+'</a><span class="time ti">'+post.date+'</span></li>';
    }
   else{
   	  posts+='<li><span class="mark m1 page'+p+'">'+mark+'</span><a href="fmddetail.html?tag='+window.tag+'&post_id='+post.id+'">'+post.title+'</a><span class="time ti"></span></li>';

   }}  return posts;
    index.countPage=p;
     /* debugger*/
        index.page=0;
        document.getElementById("pages").innerHTML=posts;
        $('#pages').find('li').hide();
        $('.page0').show(); 
  }

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

        // }
    }
    return dataList;
}
/*function getDataList(cat, posts) {
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
}*/
function  request(url,cal){
  $.ajax({
  	 url:url,
  	 dataType:'jsonp',
  	 Type:'post',
  	 success:function(resp){
  	 	cal(false,resp);
  	 },
  	 error:function(resp){
  	 	cal(resp);
  	 }
  })

}