var displayInfo = '';
var operation = '';
var lastOperation = '';

function showClick(selector) {
    $(selector).addClass('button-down')
    setTimeout(function(selector){
        $(selector).removeClass('button-down')
    },100, selector)
}

$(document).on('keypress', function (event) {

    if ( event.which == 13 ) {
        console.log('here in equal');
         handlePressEqual();
    }

    if (event.which === 99) {
        handleAC();
    }

    if (event.which <= 47 && event.which >= 42) {
    	switch (event.which) {
    		case 43:
    			operation = '+';
                $('*[data-operation="+"]').addClass('activeOperation');
                showClick('*[data-operation="+"]');
    			break;
    		case 45:
    			operation = '-';
                $('*[data-operation="-"]').addClass('activeOperation');
    			break;
    		case 42:
    			operation = '*';
                $('*[data-operation="*"]').addClass('activeOperation');
    			break;
    		case 47:
    			operation = '/';
                $('*[data-operation="/"]').addClass('activeOperation');
    			break;
    	}
        handleOperationNotEqual();
        lastOperation = operation;
    }

    var val = parseInt(event.which);
    if (val <= 57 && val >= 48) {
        val = val - 48;
        showClick('*[data-value="' + val + '"]')

        if (displayInfo === '0') {
            displayInfo = val;
        } else {
            displayInfo += (val + '');
        }
        $('.displayDigits').html(displayInfo);
    }
});

$(document).on('mousedown', '.button', function () {
    $(this).addClass('button-down');
});

function handlePressEqual() {
    showClick('*[data-operation="="]')
    var val1 = parseFloat($('.smallDisplay').html());
    var val2 = parseFloat($('.displayDigits').html());
    $('.displayDigits').html(eval(val1 + lastOperation + val2));
    $('.smallDisplay').html('');
    $('*[data-operation]').removeClass('activeOperation');
}

function handleOperationNotEqual() {
    console.log('here in operation')
    $('.smallDisplay').html($('.displayDigits').html())
    $('.displayDigits').html('0');
    displayInfo = '';
}

function handleAC() {
    showClick('*[data-action="AC"]')
    displayInfo = '0'
    lastOperation = '';
    $('.displayDigits').html(displayInfo);
    $('.smallDisplay').html('');
}

function handlePercent() {
    var val = parseFloat($('.displayDigits').html());
    displayInfo = (val/100).toString();
    $('.displayDigits').html(displayInfo);
}

function handlePlusMinus() {
    var val = parseFloat((displayInfo));
    if (val < 0) {
        displayInfo = Math.abs(val);
    } else {
        displayInfo = (0 - val);
    }
    $('.displayDigits').html(displayInfo);
}

$(document).on('mouseup', '.button', function () {
    $(this).removeClass('button-down');
    if (typeof $(this).data('value') !== 'undefined') {
        if (displayInfo === '0') {
            displayInfo = $(this).data('value')
        } else {
            displayInfo += ($(this).data('value') + '');
        }
        $('.displayDigits').html(displayInfo);
    }

    if ( $(this).data('operation') ) {
        operation = $(this).data('operation');
        if (operation === '=') {
            handlePressEqual();
        } else {
            handleOperationNotEqual()
        }
        lastOperation = operation;
    }

    if ($(this).data('action')) {
        switch($(this).data('action')) {
          case 'AC':
            handleAC();
            break;
          case '%':
            handlePercent();
            break;
          case '+/-':
            handlePlusMinus();
            break;
          default:
            // code block
        }
    }
});
