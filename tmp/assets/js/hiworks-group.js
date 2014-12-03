$(function() {
	
	var nice = $("html").niceScroll({cursorcolor:"#aaa",cursorwidth:"8px"});  // The document page (body)
	$("#noticeArea").niceScroll({cursorborder:"",cursorcolor:"#aaa",cursorwidth:"8px",boxzoom:false}); // First scrollable DIV

	$('.boxArea textarea').focus(function(){
        $(this).parent().parent('.boxArea').addClass('boxFocus');
    });
	$('.boxArea textarea').blur(function(){
        $('.boxArea').removeClass('boxFocus');
    });

	$("#newsTarea").keyup(function(){
		var txtPre = $(this).val();
		if(txtPre === ''){
			$('#btnReg').removeClass('accent');
			$('.btnRight #btnCc').addClass('hide');
		} else {
			$('#btnReg').addClass('accent');
			$('.btnRight #btnCc').removeClass('hide');
		}
	});

	$("#btnCc").click(function(){
		$('#btnReg').removeClass('accent');
		$('.btnRight #btnCc').addClass('hide');
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
		$('.group-detail').slideToggle('fast');
	});		
	$('.group-detail').click(function(event) {
         event.stopPropagation();
    });
	$('.userbtn').click(function(){
		event.stopPropagation();
		$('.user-detail').slideToggle('fast');
	});
	$('.user-detail').click(function(event) {
         event.stopPropagation();
    });
	var clickOrTap = ( typeof document.body.ontouchend === "undefined" ) ? 'click' : 'touchend';
		$( "body" ).on( clickOrTap, function(event) {
		$('.group-detail').slideUp('fast');
		$('.user-detail').slideUp('fast');
	});
  
});