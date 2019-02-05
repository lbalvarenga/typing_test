$('#prog-bar').css('width', '3%');

function generate_text(word_count) {
    var text = [];
    for (var i = 0; i < word_count; ++i) {
        text[i] = dict[Math.floor(Math.random() * dict.length)];
    }
    return text;
}

var test_active = false;
function toggle_start() {
    if (test_active) {
        return;
    }
    intId = setInterval(progress, 100, 0.1);
    return;
}

word_array = generate_text(70);
var text = '';
for (var i = 0; i < word_array.length; ++i) {
    text += word_array[i];
    text += ' ';
}

$('#generated-text').html(text);
var previous_errors = [];
var display_text = text;
var typed = 0;
var accuracy = 0;
var current_pos = 0;
var errors = [];
$('#type-input').keydown(function (event) {
    if (!test_active) {
        toggle_start();
        test_active = true;
    }

    if (event.keyCode == 8) {
        if (current_pos > 0) {
            current_pos--;
        }
        if (typed > 0) {
            if (text.charAt(current_pos) != ' ') {
                if (errors.indexOf(current_pos) == -1) {
                    typed--;
                }
            }
        }
        if (errors.indexOf(current_pos) != -1) {
            errors.pop();
        }
    }
    else {
        if (event.key == text.charAt(current_pos)) {
            if (text.charAt(current_pos) != ' ') {
                typed++;
            }
        }
        else {
            if (event.key != 'Shift') {
                errors.push(current_pos);
            }
        }
        if (event.key != 'Shift') {
            current_pos++;
        }
    }

    if (errors.length == 0) {
        display_text = text;
    }
    else {
        display_text = text.slice(0, errors[0]);
        for (var i = 0; i < errors.length; i++) {
            previous_errors[i] = '<span class="error">' + text.charAt(errors[i]) + '</span>' + text.slice(errors[i] + 1, errors[i + 1]);
        }
        for (var i = 0; i < errors.length; i++) {
            display_text += previous_errors[i];
        }
    }
    $('#generated-text').html(display_text);

    //Stats
    $('#wpm').text(Math.round(typed / 4));
    $('#wpm-banner').text(Math.round(typed / 4));

    $('#cpm').text(typed);
    $('#cpm-banner').text(typed);

    if (errors.length > 0) {
        accuracy = 100 - (100 * errors.length / current_pos);
    }
    else {
        accuracy = 100;
    }
    $('#accuracy').text(accuracy.toFixed(2) + '%');
    $('#accuracy-banner').text(accuracy.toFixed(2) + '%');
    
});