// Stylish Select
// Developer: Adam Culpepper | @adamculpepper
// https://github.com/adamculpepper/stylish-select

/*
TODO
- pull over classes that are on the initial <select> into the rendered version
- active states
- make into proper jQuery plugin
*/


$.fn.stylishSelect = function() {
    //this.css( "color", "green" );
    var selectContainerWidth = 0;

	var initSelects = function() {
		$('.stylish-select').each(function(e) {
			var selectOptions = [];
			var selectHtml = '';
			var selectIndex = e;
			var selectOptionPlaceholder = $(this).attr('data-select-placeholder') || '';
			var selectOptionTheme = $(this).attr('data-select-theme') || '';
			var selectOptionWidth = $(this).attr('data-select-width') || '';

			$(this).find('option').each(function() {
				var option = $(this);
				var optionText = option.text();
				var optionValue = option.val();

				selectOptions.push({
					'text': optionText,
					'value': optionValue
				});
			});

			$(this).wrap('<div class="stylish-select-container" data-select-id="' + selectIndex + '" data-select-theme="' + selectOptionTheme + '" data-select-width="' + selectOptionWidth + '" data-select-state="closed">');

			selectHtml += '<div class="stylish-select-selected">' + (selectOptionPlaceholder != '' ? selectOptionPlaceholder : selectOptions[0].text) + '</div>';
			selectHtml += '<ul class="stylish-select-list">';

			$.each(selectOptions, function(index, value) {
				selectHtml += '<li data-select-option-value="' + selectOptions[index].value + '">' + selectOptions[index].text + '</li>';
			});

			selectHtml += '</ul>';

			$(this).after(selectHtml);

			//console.table(selectOptions);

			if (selectOptionWidth == 'auto') {
				var arrowWidth = 40;

				// create test element
				var $test = $('<div class="stylish-select-dropdown-sizer">').html(selectHtml).css({
					'border': '5px solid red',
					'font-size': $(this).css('font-size'),	// ensures same size text.
					'visibility': 'hidden'					// prevents FOUC
				});

				// add to parent, get width, and get out
				$test.appendTo($(this).parent());
				var width = $test.outerWidth();

				console.warn(width);
				$test.remove();

				// set select width
				$(this).closest('.stylish-select-container').width(width + arrowWidth);
			}

			$(this).hide();
		});
	}

	$(document).on('click', '.stylish-select-container > .stylish-select-selected', function(e) {
		var dropdownsOpen = $('.stylish-select-list:visible').length;

		if (dropdownsOpen > 0) {
			hideDropdowns();
		}

		$(this).find('+ .stylish-select-list').show();
		$(this).closest('.stylish-select-container').attr('data-select-state', 'open');
	});

	$(document).on('click', function(e) {
		if ( !$(e.target).is('.stylish-select-selected, .stylish-select-list') ) {
			hideDropdowns();
		}
	});

	$(document).on('click', '.stylish-select-list li', function(e) {
		var clicked = $(e.target);
		var selectedText = clicked.text();
		var selectedValue = clicked.attr('data-select-option-value');
		var clickedSelectIndex = clicked.closest('.stylish-select-container').attr('data-select-id');
		var selectContainer = $('.stylish-select-container[data-select-id=' + clickedSelectIndex + ']');
		selectContainer.find('.stylish-select').val(selectedValue);
		selectContainer.find('.stylish-select-selected').text(selectedText);
	});

	$(document).on('change', '.stylish-select-container select', function(e) {
		var optionText = $(this).find(':selected').text();
		var optionValue = $(this).val();

		$(this).closest('.stylish-select-container').find('.stylish-select-selected').text(optionText);
	});

	var hideDropdowns = function() {
		$('.stylish-select-list').hide();
		$('.stylish-select-container').attr('data-select-state', 'closed');
	}

	initSelects();    
};
