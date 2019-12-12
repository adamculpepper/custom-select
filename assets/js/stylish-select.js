// Stylish Select
// Developer: Adam Culpepper | @adamculpepper
// https://github.com/adamculpepper/stylish-select

/*
TODO
- pull over classes that are on the initial <select> into the rendered version
- active states
- make into proper jQuery plugin
*/

$(function() {
	var initSelects = function() {
		$('.stylish-select').each(function(e) {
			var selectOptions = [];
			var selectHtml = '';
			var selectIndex = e;
			var selectPlaceholder = $(this).attr('data-select-placeholder') || '';
			var selectTheme = $(this).attr('data-select-theme') || '';

			$(this).find('option').each(function() {
				var option = $(this);
				var optionText = option.text();
				var optionValue = option.val();

				selectOptions.push({
					'text': optionText,
					'value': optionValue
				});
			});

			$(this).wrap('<div class="stylish-select-container" data-select-id="' + selectIndex + '" data-select-theme="' + selectTheme + '" data-select-state="closed">');

			selectHtml += '<div class="stylish-select-selected">' + (selectPlaceholder != '' ? selectPlaceholder : selectOptions[0].text) + '</div>';
			selectHtml += '<ul class="stylish-select-list">';

			$.each(selectOptions, function(index, value) {
				selectHtml += '<li data-select-option-value="' + selectOptions[index].value + '">' + selectOptions[index].text + '</li>';
			});

			selectHtml += '</ul>';

			$(this).hide().after(selectHtml);

			//console.table(selectOptions);
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

	var hideDropdowns = function() {
		$('.stylish-select-list').hide();
		$('.stylish-select-container').attr('data-select-state', 'closed');
	}

	initSelects();
});
