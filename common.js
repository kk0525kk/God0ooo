$(document).ready(function(){
	var colorarray = [
	'#1A1A1A',
	'#252525',
	'#303131',
	'#3B3C3C',
	'#464747',
	'#515353',
	'#5C5E5E',
	'#676A6A',
	'#727575',
	'#7D8080',
	'#878C8C',
	'#929797',
	'#929797',
	'#878C8C',
	'#7D8080',
	'#727575',
	'#676A6A',
	'#5C5E5E',
	'#515353',
	'#464747',
	'#3B3C3C',
	'#303131',
	'#252525',
	'#1A1A1A']
		// body{    
		// 	background: #111111;
		// }
		// $('body').css({'background-color':colorarray[parseInt(new Date().getHours())]})
		// $('body').append('\
		// 	<div class="button_wrapper">\
		// 		<a class="button button_0" href="http://theverycommonland.site">Home</a>\
		// 		<div class="button button_1">flat view</div>\
		// 		<div class="sm_button_wrapper">\
		// 			<a class="sm_button sm_button_1" href="group1.html">group1</a>\
		// 			<a class="sm_button sm_button_1" href="group2.html">group2</a>\
		// 			<a class="sm_button sm_button_1" href="group3.html">group3</a>\
		// 			<a class="sm_button sm_button_1" href="group4.html">group4</a>\
		// 			<a class="sm_button sm_button_1" href="group5.html">group5</a>\
		// 			<a class="sm_button sm_button_1" href="group6.html">group6</a>\
		// 		</div>\
		// 		<div class="button button_2">spreadsheet</div>\
		// 		<div class="sm_button_wrapper">\
		// 			<a class="sm_button sm_button_2" href="https://docs.google.com/spreadsheets/d/17-wdOY76BsW3Xr9MakF6hcJ1eM2G34RNKFfzVf5c144">group1</a>\
		// 			<a class="sm_button sm_button_2" href="https://docs.google.com/spreadsheets/d/1R-TEOnvpGgdsiS6aJiobblwXHKcEll-2F5lBjVfTA0A">group2</a>\
		// 			<a class="sm_button sm_button_2" href="https://docs.google.com/spreadsheets/d/1pYcnLWRB1F56yipb4I0ZYDr8tnEUBHEhTgQTXwcnsGE">group3</a>\
		// 			<a class="sm_button sm_button_2" href="https://docs.google.com/spreadsheets/d/1bxTsCl2Ay3GlAUSP6ekdYBdsKo1In96yRmVRX35DmCo">group4</a>\
		// 			<a class="sm_button sm_button_2" href="https://docs.google.com/spreadsheets/d/1nvYyOnydX6PyumMl3UKFux5l7HdIZMMczpfHdezyf8E">group5</a>\
		// 			<a class="sm_button sm_button_2" href="https://docs.google.com/spreadsheets/d/1bxTsCl2Ay3GlAUSP6ekdYBdsKo1In96yRmVRX35DmCo">group6</a>\
		// 		</div>\
		// 		<div class="button button_0 button_00">about/How to</div>\
		// 		<div class="button button_3">single view</div>\
		// 		<div class="sm_button_wrapper">\
		// 			<a class="sm_button sm_button_3" href="group1_three.html">group1</a>\
		// 			<a class="sm_button sm_button_3" href="group2_three.html">group2</a>\
		// 			<a class="sm_button sm_button_3" href="group3_three.html">group3</a>\
		// 			<a class="sm_button sm_button_3" href="group4_three.html">group4</a>\
		// 			<a class="sm_button sm_button_3" href="group5_three.html">group5</a>\
		// 			<a class="sm_button sm_button_3" href="group6_three.html">group6</a>\
		// 		</div>\
		// 	</div>\
		// 	<div class="popup">\
		// 		<img src="img/close.png" class="close">\
		// 		In this workshop, we are building a collective virtual space. Here, everyone is invited as a user but also as a developer of the space.<br>\
		// 		<br>\
		// 		Everyone can use the space but also build, change, and destroy the space. By doing so, the space can reflect each person’s culture, mingle them, and eventually recreate the collective culture. Space forms new relationships between people and shifts relationships. Space is ongoing, ever growing, and never ending. Space is built on top of the beliefs of each other, as it is a group work.<br>\
		// 		<br>\
		// 		Therefore, common space does not only imply the space where we can gather, chat, and hang out. The recreated visuals developed by single developers without residents’ consideration cannot be a collective space.<br>\
		// 		<br>\
		// 		This website uses Google Sheets as a text editor to use the software’s collaboration features. Anyone can change a value on the spreadsheet, and the change is directly applied to the space, changing the space’s structure, color, and texture. <br>\
		// 		<br>\
		// 		use arrow keys &larr; &uarr; &rarr; &darr; to navigate\
		// 	</div>\
		// ')
  		$('.button_0').hover(function(){
			$(this).addClass('invert')
  		},function(){
  			$('.invert').removeClass('invert')
  		})
  		$('.sm_button').hover(function(){
			$(this).attr('class').split('sm_button_')[1].split(' ')[0]
			$(this).addClass('invert')
  		},function(){
  			$('.invert').removeClass('invert')
  		})
			$('.button_00').click(function(){
				$('.popup').show()
			})
			$('.close').click(function(){
				$('.popup').hide()
			})
})