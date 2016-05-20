$(document).ready(function(){
	var counter = 0;

	$('#cat-img').click(function(){
		counter++;
		$('.counter').text(counter);
	});


});
