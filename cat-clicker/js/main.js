$(document).ready(function(){
	var counter = 0;
	var counter2 = 0;


	$('#cat-img').click(function(){
		counter++;
		$('.counter').text(counter);
	});

	$('#cat2-img').click(function(){
		counter2++;
		$('.counter2').text(counter2);
	});


});
