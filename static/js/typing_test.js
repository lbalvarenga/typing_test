import * as dict from "./dict.js";

// Generates a randomized text string with given amount
// of words from a given word array.
function generate_text(word_count, word_array) {
    var random_array = []; var text = '';
    for (var i = 0; i < word_count; ++i) {
        random_array[i] = word_array[Math.floor(Math.random() * word_array.length)];
        text += random_array[i];
    }
    return text;
}

// Updates a given progress bar width and completion percentage. The time
// and rate units are in seconds. 
// In order to call it, create a global variable int_id, then do

// int_id = setInterval(progress, interval, bar, min_width, time, rate, callback);

// Callback is usually progress_done() and rate should equal the interval set.
var progress_percent = 0;
function progress(bar, min_width, time, rate, callback) {
    $(bar).text(Math.round(progress_percent) + '%');
    progress_percent += (100 / time) * rate;
    if (progress_percent <= min_width) {
        $(bar).css('width', (min_width + '%'));
    }
    if (progress_percent > min_width) {
        $(bar).css('width', (progress_percent + '%'));
    }
    if (progress_percent >= 100) {
        clearInterval(int_id);
        callback(bar, min_width);
    }
    return;
}

// Acts as a callback for progress(), Changing the bar
// to a 'done' state. If the reset flag is set, it will
// reset the bar to the 0% state.
function progress_done(bar, min_width, reset = false) {
    clearInterval(int_id);
    if (reset) {
        // Ugly but quick lol
        test_active = false;
        text = generate_text(100, dict.get());
        $('#generated-text').html(text);
        progress_percent = 0;
        previous_errors = [];
        display_text = text;
        typed = 0;
        accuracy = 0;
        current_pos = 0;
        errors = [];
        $(bar).text('0%');
        $(bar).css('background-color', '#007bff');
        $(bar).css('width', (min_width + '%'));
        $('#type-input').val('');
        $('#type-input').prop('disabled', false);
        $('#finished-alert').hide();
        return;
    }
    $(bar).text('Done!');
    $(bar).css('background-color', '#28a745'); // Green color
    // Custom properties
    $('#finished-alert').show();
    $('#type-input').prop('disabled', true);
    return;
} export { progress_done };

//----------------
var int_id;
var test_active = false;
var text = generate_text(100, dict.get());
var previous_errors = [];
var typed = 0;
var accuracy = 0;
var current_pos = 0;
var errors = [];
var display_text = text.slice(0, current_pos) + '<span class="cursor">' + text.charAt(current_pos) + '</span>' + text.slice(current_pos + 1);
$('#generated-text').html(display_text);
$('#type-input').keydown(function (event) {
    if (!test_active) {
        int_id = setInterval(progress, 100, $('#progress-bar'), 5, 60, 0.1, progress_done);
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
        display_text = text.slice(0, current_pos) + '<span class="cursor">' + text.charAt(current_pos) + '</span>' + text.slice(current_pos + 1);
    }
    else {
        display_text = text.slice(0, errors[0]);
        for (var i = 0; i < errors.length; i++) {
            if (errors.length - 1 != i) {
                previous_errors[i] = '<span class="error">' + text.charAt(errors[i]) + '</span>' + text.slice(errors[i] + 1, errors[i + 1]);
            }
            else {
                previous_errors[i] = '<span class="error">' + text.charAt(errors[i]) + '</span>' + text.slice(errors[i] + 1, current_pos) + '<span class="cursor">' + text.charAt(current_pos) + '</span>' + text.slice(current_pos + 1);
            }
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
//----------------------