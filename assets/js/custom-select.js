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
			var selectId = e;
			var selectPlaceholder = $(this).attr('data-select-placeholder') || '';

			//$(this).attr('data-select-id', selectId);


			$(this).find('option').each(function() {
				var option = $(this);
				var optionText = option.text();
				var optionValue = option.val();

				selectOptions.push({
					'text': optionText,
					'value': optionValue
				});
			});

			$(this).wrap('<div class="custom-select-container" data-select-id="' + selectId + '">');

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
		$(this).find('+ .custom-select-list').show();
	});

	$(document).on('click', function(e) {
		// var a = e;
		// var b = e.target;
		// var c = $(e.target).is('.custom-select-selected');
		//debugger;

		if ( !$(e.target).is('.custom-select-selected, .custom-select-list, .custom-select-list li') ) {
			$('.custom-select-list').hide();
		}
	});


	$(document).on('click', '.custom-select-list li', function(e) {
		var clicked = $(e.target);
		var selectedText = clicked.text();
		var selectedValue = clicked.attr('data-select-option-value');
		var clickedSelectId = clicked.closest('.custom-select-container').attr('data-select-id');

		var selectContainer = $('.custom-select-container[data-select-id=' + clickedSelectId + ']');
		selectContainer.find('.custom-select').val(selectedValue);
		selectContainer.find('.custom-select-selected').text(selectedText);


		//debugger;

	});












	initSelects();


});
