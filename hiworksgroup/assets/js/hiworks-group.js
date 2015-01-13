$(function() {
	
	var nice = $("html").niceScroll({cursorcolor:"#aaa",cursorwidth:"8px"});  // The document page (body)
	$("#noticeArea").niceScroll({cursorborder:"",cursorcolor:"#aaa",cursorwidth:"8px",boxzoom:false}); // First scrollable DIV

	$('.boxArea textarea').focus(function(){
        $(this).parent().parent('.boxArea').addClass('boxFocus');
    });
	$('.boxArea textarea').blur(function(){
        $('.boxArea').removeClass('boxFocus');
    });

	$("#newsTarea").bind('keyup keydown',function(){
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

	$('.reTarea').bind('keyup keydown',function(){
		var txtRe = $(this).val();
		if(txtRe == ''){
			$(this).parent().parent().find('.btnRight .small').removeClass('accent');
		} else {
			$(this).parent().parent().find('.btnRight .small').addClass('accent');
		}
	});

	/*$('.reTarea').bind('keyup keydown',function(){
		var txtRe = $(this).val();
		if(txtRe == ''){
			$(this).parents('.boxArea').children('.small').removeClass('accent');
		} else {
			$(this).parents('.boxArea').children('.small').addClass('accent');
		}
	});*/


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