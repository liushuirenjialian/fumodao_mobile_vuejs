  var url = "http://games.hoolai.com/cms/?json=get_category_posts&cat=221&include=title,content,categories,custom_fields&count=10000";
$(document).ready(function(){
   //三四选项卡 点击 对应关系
     

//先把 icon的图片按钮从数据读出来 
    function createHtml(cat,posts)
    {     
       	var dataout=Getdatalist(cat,posts);//放到Dataout 数组
       	var $con=$("div.content" + cat);
         var ulhtml=$("#hero");
               ulhtml.html("");
       var leng=dataout.length;
        for(var i=0;i<leng;i++){
        	var data=dataout[i];
        	var custom_fields=data.custom_fields;
        	var icon_h="";
        	if(custom_fields.icon_h){
        		icon_h=custom_fields.icon_h[0];
        	}
        	var templi=$('<li/>');
        	var val='<span class="shadow"></span><img src="'+icon_h+'" alt="" />';
        	templi.append(val);
        	ulhtml.append(templi);
        	ulhtml.find('li:first').find('span').css('display','none');
        }
       /*if(leng!=0){
            var hero_list='';
       	for(var i=0;i<leng;i++){
       	  if(dataout[i].custom_fields)
       	  {
       	  	if(dataout[i].custom_fields.icon){
             hero_list+='<li><span class="shadow"></span><img src="'+dataout[i].custom_fields.icon+'" alt="" /></li>';
       	  	}
       	  	else{
               hero_list+='<li><span class="shado"></span><img src="" alt="" /></li>';
       	  	}
       	  }}
          ulhtml.append()
           
       }*/
 
    //获取英雄详细 、中间三部分
    var get_heroinfo=$con.find('div.heor_info');
    var $hero_list=get_heroinfo.find('div.heor1'+i);
    var $img_bg=get_heroinfo.find('div.img_bg');
    var $tablent_total=get_heroinfo.find('div.tablent_total');
    var $wuqi=get_heroinfo.find('div.wuqi')
    var $qiyuan=get_heroinfo.find('div.qiyuan');
       for(var i=0;i<leng;i++){
          $get_heroinfo.append('<div class="heor_info  heor1"><div class="heor_bg"> <div class="img_bg"></div><div class="tablent_total"><div class="talent"></div><div class="tab_four"><ul class="title"></ul><ul class="cont"><span class="mark "></span></ul></div></div><div class="wuqi"><img src="" alt="" /><div class="info_wuqi"></div></div> <div class="qiyuan"><div class="talent"></div><div class="tab_three"><ul class="title"></ul><ul class="cont"><span class="mark"></span></ul></div></div></div></div>');
          
          /*背景英雄图*/
           var data=dataout[i];
          var custom_fields=data.custom_fields;
          var img_he="";
          if(custom_fields.img_he){
            img_he=custom_fields.img_he[0];
          }
              if(img_he){
                $img_bg.attr('src',img_he)
              }
          // jineng

          //wuqi
          if(dataOut[i].custom_fields.weapon_name != undefined) {
              $wuqi.find('span.name').text(dataOut[i].custom_fields.weapon_name[0]);
              if(dataOut[i].custom_fields.weapon_image != undefined) {
                $wuqi.find('img').attr('src', dataOut[i].custom_fields.weapon_image[0]);
              }
            } else {
                if(dataOut[i].custom_fields.weapon_image != undefined) {
                    $wuqi.find('img').attr('src', dataOut[i].custom_fields.weapon_image[0]);
                }
                else {
                    $wuqi.remove();
                }
            }
            //武器介绍 title con
            //title begin
            $info_wuqi=$wuqi.find('div.info_wuqi');
            $tianmeng_info=$wuqi.find('div.tianmeng_info');
          if(dataout[i].custom_fields.weapon_inro != undefined){
            $info_wuqi.text(dataout[i].custom_fields.weapon_inro[0]);
          }
          else{
            $info_wuqi.remove();
          }
          //con
           if(dataout[i].custom_fields.weapon_inro != undefined){
            $tianmeng_info.text(dataout[i].custom_fields.weapon_inro[0]);
          }
          else{
            $tianmeng_info.remove();
          }
          //con end

     //qiyuan
       }
 
      }
})

function Getdatalist(cat,posts) {
        var posts_len=posts.length;
        var datalist=[];
        if(posts_len==0){
        	return null;
        }
        for(var i=0;i<posts_len;i++){
        	var cat_leng=posts[i].categories.length;
        	for(var j=0;j<cat_leng;j++)
        	{
        		if(posts[i].categories[j].id==cat)
        			datalist.push(posts[i]);
        	}
        }
        return  datalist;
     } 

function request(url,cal){
	$.ajax({
		type:"POST",
		url:"url",
		datatype:"jsonp",
		success:function(resp){
			cal(false,resp);
		},
		error:function(resp)
		{
			cal(resp)
		}

	})
}