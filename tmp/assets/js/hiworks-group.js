$(function() {
	
	var nice = $("html").niceScroll({cursorcolor:"#aaa",cursorwidth:"8px"});  // The document page (body)
	$("#noticeArea").niceScroll({cursorborder:"",cursorcolor:"#aaa",cursorwidth:"8px",boxzoom:false}); // First scrollable DIV


	$('.boxArea textarea').focus(function(){
        $(this).parent().parent('.boxArea').addClass('boxFocus');
    });
	$('.boxArea textarea').blur(function(){
        $('.boxArea').removeClass('boxFocus');
    });


	//search focus in-out
	$('.group-search input[type="text"]').focus(function(){
        $('.group-search').addClass('press');
    });
	$('.group-search input[type="text"]').blur(function(){
        $('.group-search').removeClass('press');
    });

	//header slideLayer
	$('.groupSet').click(function(event){
		event.stopPropagation();
		$('.group-detail').slideToggle();
	});
		
	$('.group-detail').click(function(event) {
         event.stopPropagation();
    });

	$(window).click(function(event) {
		$('.group-detail').slideUp();
	});

	$('.userbtn').click(function(){
		$('.user-detail').slideToggle();
	});
	$('.userbtn').focusout(function(){
        $('.user-detail').css('display','none');
    });
	

  
});