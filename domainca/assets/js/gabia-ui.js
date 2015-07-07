// gabiaui v0.1
// by @dochoul (http://www.dochoul.com/, dochoul@gmail.com)
if (typeof jQuery === 'undefined') {
	throw new Error('gabiaui requires jQuery');
}

(function($) {
	
	/* $.skip navigation */
	$.fn.skipNavi = function() {
		$(this).click(function() {
			var cnt = $('#container');
			cnt.attr({tabIndex:-1}).focus();
		});
	};

	/* layer */
	$.fn.layer = function() {
		var layer = $(this);
		layer.toggle();
		$(this).find('[data-layer="hide"]').click(function(event) {
			layer.hide();
		});
		return false;
	};

	/* $.modal */
	$.fn.modal = function() {
        var $modalWindow = $(this);
        var $dim = $('#dim');
        var   focusedElementBeforeWindow = $(':focus');
        $dim.empty();
        
        var modalHide = function(event) {
            event.preventDefault();
            gLayer.close('dim');
            $dim.empty();
            focusedElementBeforeWindow.focus();         
            
        }
        $modalWindow.clone(true).appendTo('#dim');
        $dim.find('#'+$modalWindow.attr("id")).show();
        $dim.find('button[data-modal="hide"]').on('click', modalHide);
                
        gLayer.open('dim', true);
	};

	/* $.tab */
	$.fn.tab = function() {
        $(this).each(function() {
            var _tab = this;
            var targetId = [];
            $(this).children("li").children("button").each(function() {
                var thisId = $(this).attr('data-tab');
                $(this).click(function(event) {
                    event.preventDefault();
                    $(event.target).parents().children("li.active").removeClass("active");
                    $(event.target).parents("li").addClass("active");
                    $(event.target).parents("div.modal_window").find(targetId.join(", ")).not(thisId).hide();
					$(targetId.join(", ")).not(thisId).hide();
                    $(event.target).parents("div.modal_window").find(thisId).show();
					$(thisId).show();
                });
                targetId.push(thisId);
            });
        });

	};

	/* $.accordion */
	$.fn.accordion = function(time) {
		var slide_time = (time === 0 || time === 'null') ? slide_time = 300 : slide_time = time;
		var	$accordion = $(this);
		var	$accordion_header = $accordion.find('[data-accordion="header"]');
		var	$accordion_icon = $accordion_header.find('[data-accordion="icon"]');

		$accordion_header.click(function() {
			var $this_content = $(this).parent().find('[data-accordion="content"]');
			var	$this_icon = $(this).parent().find('[data-accordion="icon"]');
			$accordion_icon.removeClass('active');
			$this_icon.addClass('active');
			$accordion.find('[data-accordion="content"]').slideUp(slide_time);
			if($this_content.css('display') == 'none') {
				$this_content.slideDown(slide_time);
			}else{
				$this_content.slideUp(slide_time);
				$this_icon.removeClass('active');
			}
		});
	};

	/* dropdown */
	$.fn.dropdown = function() {
		'use strict';
		var $this = $(this);
		var isdisabled = $('.function-btn').hasClass('disabled');
		if(!isdisabled){
			$(this).find('[data-dropdown="head"]').click(function(event) {
				var $parent = $(this).parent();
				var isActive = $parent.hasClass('on');
				hideDropdown();
				if (!isActive) $parent.toggleClass('on');
				return false;
			});
		}
		function hideDropdown(e) {
			$('[data-dropdown="head"]').each(function () {
				var $this = $(this);
				var $parent = $(this).parent();
				if (!$parent.hasClass('on')) return;
				$parent.removeClass('on');
			});
		}
		$(document).on('click', hideDropdown);
	};

	/* init */
	$.init = function() {
		$('#accessibility a').skipNavi();
		$(document).find('[data-tab="tab"]').tab();
		$(document).find('[data-ui="dropdown"]').dropdown();
	};
	
})(jQuery);

$(document).ready(function(){
	$.init();
	var isMultiSearch = 'false';
	$('.toggle-search-btn').click(function() {
		if(isMultiSearch) {
			$('#singleSearch').hide();
			$('#multiSearch').show();
			$(this).text('하나 검색 ▲');
		}else{
			$('#singleSearch').show();
			$('#multiSearch').hide();
			$(this).text('복수 검색 ▼');
		}
		isMultiSearch = !isMultiSearch;
	});

	/* switch */
	$('.switch input[type=checkbox]').click(function() {
		if( $(this).attr('checked')) {
			$(this).removeAttr('checked');
			$(this).parent().removeClass('on');
		} else {
			$(this).attr('checked','checked');
			$(this).parent().addClass('on');
		}
	});

	/* category */
	var isCateGory = 'false';
	var cateGory = $('#lnbCategory');
	cateGory.find('.state').click(function(event) {
		if(isCateGory) {
			cateGory.find('ul').hide();
			$(this).find('.arrow').text('▶');
		} else {
			cateGory.find('ul').show();
			$(this).find('.arrow').text('▼');
		}
		isCateGory = !isCateGory;
	});

	/* help */
	var isHelp = 'false';
	var helpBtn = $('button.help');
	var help = $('#help-area');
	helpBtn.click(function(event) {
		if(isHelp) {
			$('#container').hide();
			help.show();
		} else {
			$('#container').show();
			help.hide();
		}
		isHelp = !isHelp;
	});
});