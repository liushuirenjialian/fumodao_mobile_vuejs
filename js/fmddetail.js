    function request(url){
    	var deferred=$.Deferred();
    	$.ajax({
    		url:url,
    		type:"POST",
    		dataType:"JSONP",
    		success:function(data,status,xhr){
    			deferred.notify("fetching");
    			if(data)
    				{deferred.resolve(data.post);}
    			else{deferred.reject("nothing");}
    		},error:function(xhr,errorType,error){

    		}
    	});
    	return deferred
    }
    //过滤
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
/*   	var hash=window.location.search;
   var url="http://games.hoolai.com/cms"+hash+"&json=get_category_posts&&include=title,content,custom_fields,date,categories&count=500";*/
$(document).ready(function(){
	 	var hash=window.location.search;
	 	var args = getArgs(hash);
    var tagg=args['tag'];
    if(tagg==232){
      $('div.back a').attr('href','fmdstrategy.html');
    }
    else{
     
        $('div.back a').attr('href','fmdlist.html');
    }
    

    console.log('tag'+tagg);
     console.log('args'+hash)
    var url = 'http://games.hoolai.com/cms/?post_id=' + args['post_id'] + '&json=get_post&include=title,content,author,date';
     var pormise=request(url);
    pormise.then(function(data){
    	console.log(typeof data); 
    	if(data){
    	var title='';
    	var datt='';
    	var htmlStr='';
    	title+='<h2>'+data.title+'</h2>'
    	$('div.cont .title').html(title);
 /*   	datt+='<p>'+data.date+'</p>'
    	$('.team').html(datt);*/
    	htmlStr+='<p>'+data.content+'</p>'
    	$('.art_cont').html(htmlStr);
    	var $title_two=$('div.cont').find('div.art_cont p.title_two');
    	$title_two.text('data.title');
    		/*$('div .cont').children("h2.title").text(data.title);
    		$('div.cont').children("")*/
    		 $('div.cont').children('p.team').text('作者：' + data.author.name + ' 发布时间：' + data.date);
        /*    $('div.cont').children('h2.title').text(data.title);
            $('div.cont').children('div.art_cont').html(data.content);*/
    	}
    	
    	// 图片自适应居中aligncenter alignleft alignright
  
          $('div.art_cont img').parent().wrap('<div class="weirao"></div>')
           var $cont_imgt=$('div.cont');
           var $img=$cont_imgt.find('div.weirao');
           $img.each(function(){
           	$this=$(this);
           	var $cms_img=$this.find('img');
           	if($cms_img.hasClass('alignright')){
              $this.css('text-align','right');
           	}
           	if($cms_img.hasClass('alignleft')){
              $this.css('text-align','left');
           	}
           	if($cms_img.hasClass('aligncenter ')){
              $this.css('text-align','center');
           	}
           	if($cms_img.hasClass('alignnone')){
           		$this.css('text-align','center');
           	}
           })
       /*图片自适应页面宽度*/
         var $img=$('div.art_cont img');
         var curr_img=600;
         $img.each(function(){
         	if($img){
            var width=parseInt($(this).css('width'));
            var height=parseInt($(this).height());
            console.log('当前宽度：'+width+''+'当前高度：'+height);
            if(width>curr_img){
            	var var_height=height / width*curr_img;
            	$(this).width(curr_img);
            	$(this).height(var_height);
            	console.log('现在宽度：'+width+''+'现在高：'+height);
            }
            }
         })
    	
    })
})