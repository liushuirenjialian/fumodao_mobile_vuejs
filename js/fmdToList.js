
function getArgs(strs) {
    var _strs = strs.length > 0 ? strs.substring(1) : '',
        args = {},
        items = _strs.split('&'),
        len = items.length,
        mame = null,
        value = null,
        item = [];
    if (_strs.length == 0) {
        console.log('没有要读取的字符串');
        return;
    }
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = item[0];
        value = item[1];
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[name] = value;
    }
    return args;
}
$(document).ready(function(){
  var url = "http://games.hoolai.com/cms/?cat=226&json=get_category_posts&include=title,categories,date&count=1500";

/*  var url = "http://games.hoolai.com/cms/?cat=147&json=get_category_posts&include=title,categories,date&count=1500";
*/ 

/*var hash=window.location.search;
var args=getArgs(hash);

var cat;*/
cat=getArgs['tag'];
 request(url,function(err,data){

 
        //格式化date
     /* Date.prototype.Format = function(format) {
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
      };*/
  	if(err){console.log(err);}
  	else {
  		var $data=data.posts;
  		var $newslist=getDataList(227,$data);
  		var $telllist=getDataList(230,$data);
  		var $newlist=getDataList(228,$data);
  		var $actilist=getDataList(229,$data);
/*  		var $newslist=getDataList(149,$data);
  		var $telllist=getDataList(151,$data);
  		var $newlist=getDataList(148,$data);
  		var $actilist=getDataList(150,$data);
*/      var $zuixin=$('div.cont').find('ul.TAB_FOUR').find('li.news');
        var $gonggao=$('div.cont').find('ul.TAB_FOUR').find('li.tell');
        var $xinwen=$('div.cont').find('ul.TAB_FOUR').find('li.new');
        var $huodong=$('div.cont').find('ul.TAB_FOUR').find('li.acti');
        var $exp_ul=$('div.cont').find('ul.exp_ul');
        if(cat==227){
          $zuixin.siblings('li').removeClass('cur');
            $zuixin.addClass('cur');
          $exp_ul.html(getPageofData($newslist,'【最新】',227));
          more();
          
        }
        if(cat==228){
          $xinwen.siblings('li').removeClass('cur');
            $xinwen.addClass('cur');
          $exp_ul.html(getPageofData($newlist,'【新闻】',228));
          more();

        }
        if(cat==229){
          $huodong.siblings('li').removeClass('cur');
            $huodong.addClass('cur');
           $exp_ul.html(getPageofData($actilist,'【活动】',229));
           more();
               
        }
        if(cat==230)
        {
          $gonggao.siblings('li').removeClass('cur');
            $gonggao.addClass('cur');
          $exp_ul.html(getPageofData($telllist,'【公告】',230));
          more();
        }

      $exp_ul.html(getPageofData($newslist,'【最新】',227));
          $zuixin.click(function(){
          	$zuixin.siblings('li').removeClass('cur');
          	$zuixin.addClass('cur');
          	 $exp_ul.html(getPageofData($newslist,'【最新】',227));
          })
           $gonggao.click(function(){
          	$gonggao.siblings('li').removeClass('cur');
          	$gonggao.addClass('cur');
          	 $exp_ul.html(getPageofData($telllist,'【公告】',230));
          })
            $xinwen.click(function(){
          	$xinwen.siblings('li').removeClass('cur');
          	$xinwen.addClass('cur');
          	 $exp_ul.html(getPageofData($newlist,'【新闻】',228));
          })
             $huodong.click(function(){
          	$huodong.siblings('li').removeClass('cur');
          	$huodong.addClass('cur');
          	 $exp_ul.html(getPageofData($actilist,'【活动】',229));
          })



  	}
  })

  function getPageofData(dataList, mark, tag) {
    var posts = '';
    var post='';
    if (dataList) {
        var total = dataList.length;
        var rows=10;
        var p=-1;
        for(var i=0;i<total;i++){
       /*   var p=-1;*/
          var post=dataList[i];
          if(i%rows==0){p++;}
          if (post.date) {
            var ddd=post.date.substr(5,5);
             // var ddd= new Date(post.date).Format("MM-dd"); 
              /*$('.exp_ul time').text('<p>[]</p>')*/
              /*window.tag=226;*/
              posts+='<li class="page'+p+'"><span class="mark m1 ">'+mark+'</span><a href="fmddetail.html?tag='+tag+'&post_id='+post.id+'">'+post.title+'</a><span class="time ti">'+ddd+'</span></li>';
        } else {     
                posts+='<li class="page'+p+'"><span class="mark m1 ">'+mark+'</span><a href="fmddetail.html?tag='+tag+'&post_id='+post.id+'">'+post.title+'</a><span class="time ti"></span></li>';
          
        }}
        index.countPage=p;
        index.page=0;
         document.getElementById("pages").innerHTML=posts;
        $('#pages').find('li').hide();
        $('.page0').show(); 

    }        

  }

  /*function clickmore(){
    index.page++;
    $('.page'+index.page).show();
    if(index.page==index.countPage){$('.more').hide();}
  }*/

    

})
  var index={};
  function clickNextPage(){
    
    index.page++;
    $(".page"+index.page).show();
    if(index.page==index.countPage){
        $(".more").hide();
    }
}
   function more(){
    var $more=$('div.cont').children('a.more');
    var $TAB_FOUR=$('ul.TAB_FOUR').find('li');
    var $cur;
  $TAB_FOUR.each(function(){
    if($(this).hasClass('cur')){
       $cur=$(this);
    }
  })

  if($cur.hasClass('news')){
   clickNextPage();
    }
  
  if($cur.hasClass('new')){
   clickNextPage();
    }
  
  if($cur.hasClass('acti')){
  clickNextPage();
    
  }
}

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