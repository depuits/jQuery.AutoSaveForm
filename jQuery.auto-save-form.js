(function ($) {
	$.fn.autoSaveForm = function (options) {
		var settings = $.extend({
			timeout: 1000,
			fieldEvents : 'change keyup propertychange input',
			fieldSelector: ":input:not(input[type=submit]):not(input[type=button])"
		}, options); //TODO edit options 

		var initForm = function ($form) {
			var timeoutId = 0;
			var fields = $form.find(settings.fieldSelector);
			$(fields).on(settings.fieldEvents, function (evt) {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function() {
					save($form)
				}, settings.timeout);
			});
		};

		var save = function ($form) {
			$.ajax({
				url: $form.attr('action'),
				type: $form.attr('method'),
				data: $form.serialize(), // serializes the form's elements.
				beforeSend: function (xhr) {
					// Let them know we are saving
					var ret = $form.triggerHandler('beforeSave.autoSaveForm', [$form, xhr]);
					if (ret === false) {
						return false;
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$form.trigger('saveError.autoSaveForm', [$form, jqXHR, textStatus, errorThrown]);
				},
				success: function (data, textStatus, jqXHR) {
					$form.trigger('saveSuccess.autoSaveForm', [$form, data, textStatus, jqXHR]);
				},
			});
		};

		return this.each(function (elem) {
			var $form = $(this);
			if (!$form.is('form')) {
				return;
			}

			$form.submit(function (e) {
				save();
				e.preventDefault();
			});

			// Add a custom events
			$form.on('save.autoSaveForm', function () { save($form); });
			initForm($form);
		});
	};
}(jQuery));
