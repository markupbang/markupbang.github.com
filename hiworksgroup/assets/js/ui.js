$(function() {

	/* scroll area set: pluing-Nicescroll(http://areaaperta.com/nicescroll/) */
	var nice;
	$("#noticeArea,#contents,#main-contents").niceScroll({cursorborder:"",cursorcolor:"#aaa",cursorwidth:"8px",boxzoom:false});
	
	/* placeholder: plugin(https://github.com/mathiasbynens/jquery-placeholder) */
	$('input, textarea').placeholder();
	
	/* header */
	var timer = 150;
	$('.groupSet').click(function(event){
		event.stopPropagation();
		$('.group-detail').fadeToggle(timer);
	});		
	$('.group-detail').click(function(event) {
         event.stopPropagation();
    });
	$('.userbtn').click(function(event){
		event.stopPropagation();
		$('.user-detail').fadeToggle(timer);
	});
	$('.user-detail').click(function(event) {
         event.stopPropagation();
    });
	var clickOrTap = ( typeof document.body.ontouchend === "undefined" ) ? 'click' : 'touchend';
		$( "body" ).on( clickOrTap, function(event) {
		$('.group-detail').fadeOut(timer);
		$('.user-detail').fadeOut(timer);
	});
	//search focus in-out
	$('.group-search input[type="text"]').bind('focus blur', function(event) {
		var eventType = event.type;
		(eventType == 'focus') ? $('.group-search').addClass('press') : $('.group-search').removeClass('press');
	});
	/* //header */
	
	/* 새로운 소식 textarea */
    $('#newsTarea').bind('focus blur', function(event) {
    	var eventType = event.type;
    	var txtArea = $(this).parent().parent('.boxArea');
    	(eventType == 'focus') ? txtArea.addClass('boxFocus') : txtArea.removeClass('boxFocus');
    });
	$('#newsTarea').bind('keyup keydown', function(event) {
		var txtPre = $(this).val();
		if(txtPre === '' || txtPre === null){
			$('#btnReg').removeClass('accent');
			$('.btnRight #btnCc').addClass('hide');
		} else {
			$('#btnReg').addClass('accent');
			$('.btnRight #btnCc').removeClass('hide');
		}
	    $(this).height(60);
	    var scrollval = event.target.scrollHeight;
	    $(this).height(scrollval);
	});

	/* 댓글 textarea */
	$('.reTarea').bind('keyup keydown', function(event) {
		var txtRe = $(this).val();
		var registerBtn = $(this).parent().parent().find('.btnRight .small');
		if(txtRe === '' || txtRe === 'null'){
			registerBtn.removeClass('accent');
		} else {
			registerBtn.addClass('accent');
		}
	    //$(this).height(30);
	    var scrollval = event.target.scrollHeight;
	    $(this).height(scrollval);
	});
	$('.reTarea').bind('focusin focusout', function(event) {
		var eventType = event.type;
		if(eventType === 'focusin') {
			$(this).parent().parent().addClass('boxFocus');
		}else{
			$(this).parent().parent().removeClass('boxFocus');
		}
	});
	/* //댓글 textarea */

	$("#btnCc").click(function() {
		var q = confirm('글 작성을 취소 하시겠습니까?');
		if(q) {
			$('#btnReg').removeClass('accent');
			$('.btnRight #btnCc').addClass('hide');
			$('#newsTarea').text('');
		}else{
			$('#newsTarea').text($('#newsTarea').val());
			$('#newsTarea').focus();
			return false;
		}
	});	

	/*var isCollapse = true;
	$('.ico-collapse').click(function() {
		if(isCollapse) {
			$(this).addClass('ico-expand');
			$(this).parent().parent().parent().find('.work-list').show();
			$(this).attr('title', '펼치기');
		}else{
			$(this).removeClass('ico-expand');
			$(this).parent().parent().parent().find('.work-list').hide();
			$(this).attr('title', '접기');
		}
		isCollapse = !isCollapse;
	});*/

	/**/
	$('.folder-arrow').click(function(event) {
		$(this).parent().parent().siblings('.work-list').toggle();
		$(this).toggleClass('ico-expand');
		if($(this).attr('title') == '펼치기') {
			$(this).attr('title', '접기');
		}else{
			$(this).attr('title', '펼치기');
		}	
	});

});


var GabiaUI = GabiaUI || {}

GabiaUI.Modal = function(element) {
	var modalWindow = element;
	var dim = $('.dim');
	//modal show
	modalWindow.show();
	dim.show();
	modalWindow.css('marginLeft', -(modalWindow.width() / 2));
	modalWindow.css('marginTop', -(modalWindow.height() / 2));
	//focus positioning
	var focusedElement = setFocus(modalWindow);
	//modal hide
	this.hideModal = function() {
		modalWindow.hide();
		dim.hide();
		focusedElement.focus();
	}
	/*inspire by accessible-modal-dialog : www.github.com/gdkraus/accessible-modal-dialog*/
	function setFocus(element) {
		var ele = element;
		var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
		var focusedElementBeforeModal;
		focusedElementBeforeModal = $(':focus');
	   	var o = ele.find('*');
	    o.filter('p');
	    o.filter(focusableElementsString).filter(':visible').first().focus();
	    return focusedElementBeforeModal;
	}
}