// Custom Select
// https://github.com/adamculpepper/custom-select

/*
TODO
- pull over classes that are on the initial <select> into the rendered version

*/

$(function() {
	var initSelects = function() {
		$('.custom-select').each(function(e) {
			var selectOptions = [];
			var selectHtml = '';
			var selectIndex = e;
			var selectPlaceholder = $(this).attr('data-select-placeholder') || '';
			var selectTheme = $(this).attr('data-select-theme') || '';
			console.warn(selectTheme);
			//debugger;

			$(this).find('option').each(function() {
				var option = $(this);
				var optionText = option.text();
				var optionValue = option.val();

				selectOptions.push({
					'text': optionText,
					'value': optionValue
				});
			});

			$(this).wrap('<div class="custom-select-container" data-select-id="' + selectIndex + '" data-select-theme="' + selectTheme + '">');

			selectHtml += '<div class="custom-select-selected red">' + (selectPlaceholder != '' ? selectPlaceholder : selectOptions[0].text) + '</div>';
			selectHtml += '<ul class="custom-select-list">';

			$.each(selectOptions, function(index, value) {
				selectHtml += '<li data-select-option-value="' + selectOptions[index].value + '">' + selectOptions[index].text + '</li>';
			});

			selectHtml += '</ul>';

			$(this).after(selectHtml);

			console.table(selectOptions);
		});
	}

	$(document).on('click', '.custom-select-container > .custom-select-selected', function() {
		$(this).addClass('blue');
		$(this).find('+ .custom-select-list').addClass('green');
		
		var dropdownsOpen = $('.custom-select-list:visible').length;

		if (dropdownsOpen > 0) {
			$('.custom-select-list').hide();
		}

		$(this).find('+ .custom-select-list').show();
	});

	$(document).on('click', function(e) {
		if ( !$(e.target).is('.custom-select-selected, .custom-select-list') ) {
			$('.custom-select-list').hide();
		}
	});

	$(document).on('click', '.custom-select-list li', function(e) {
		var clicked = $(e.target);
		var selectedText = clicked.text();
		var selectedValue = clicked.attr('data-select-option-value');
		var clickedSelectIndex = clicked.closest('.custom-select-container').attr('data-select-id');

		var selectContainer = $('.custom-select-container[data-select-id=' + clickedSelectIndex + ']');
		selectContainer.find('.custom-select').val(selectedValue);
		selectContainer.find('.custom-select-selected').text(selectedText);
		//debugger;

	});






	initSelects();
});
