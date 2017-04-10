# jQuery.AutoSaveForm
jQuery plugin for auto saving forms while editing. To use simply add the following line to your ready function:

```javascript
$('form').autoSaveForm();
```

[Demo](https://depuits.github.io/jQuery.AutoSaveForm/demo)

## Install
You can download the [jquery.auto-save-form.js](https://raw.github.com/depuits/jQuery.AutoSaveForm/master/jquery.auto-save-form.js) file to include in your page or you can install it using [Bower](http://twitter.github.com/bower/):

```bash
$ bower install jquery.auto-save-form
```

##Requirements
jQuery version 1.7 or higher.

## Usage
```javascript

$(function() {
	var $form = $('form');
	var $formStatusHolder = $('.js-form-status-holder');

    // Enable on all forms
    $form.autoSaveForm();

    // or with options
    $form.autoSaveForm({ delay: 2000 });

    // The following triggers confirm to the beforeSend, error and success ajax callbacks.
	$form.on('beforeSave.autoSaveForm', function (ev, $form, xhr) {
		// called before saving the form
		// here you can return false if the form shouldn't be saved
		// eg. because of validation errors.
		if (!$form.valid()) {
			return false;
		}

		// Let the user know we are saving
		$formStatusHolder.html('Saving...');
		$formStatusHolder.removeClass('text-danger');
	});

	$adminForm.on('saveError.autoSaveForm', function (ev, $form, jqXHR, textStatus, errorThrown) {
		// The saving failed so tell the user
		$formStatusHolder.html('Saving failed! Please retry later.');
		$formStatusHolder.addClass('text-danger');
	});
	$adminForm.on('saveSuccess.autoSaveForm', function (ev, $form, data, textStatus, jqXHR) {
		// Now show the user we saved and when we did
		var d = new Date();
		$formStatusHolder.html('Saved! Last: ' + d.toLocaleTimeString());
	});
});


// To manually trigger a save on the form you can call
$('#my-form').trigger('save.autoSaveForm');

```

### Options
| parameter     | description                                         | default                                                |
|---------------|-----------------------------------------------------|--------------------------------------------------------|
| timeout       | Time delay between input and the saving of the data | 1000                                                   |
| fieldEvents   | The events on which a save will be initiated        | change keyup propertychange input                      |
| fieldSelector | Selector for the fields to monitor for changes      | :input:not(input[type=submit]):not(input[type=button]) |
