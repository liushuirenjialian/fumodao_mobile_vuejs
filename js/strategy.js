$(document).ready(function(){



})
var url="http://games.hoolai.com/cms/?cat=232&json=get_category_posts&include=title,categories,date&count=500";
function request(cal,url){
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