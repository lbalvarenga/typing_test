import * as dict from "./dict.js";
window.onload = typing_test($('#type-input'), $('#generated-text'));

// Brain of the website.
// Responsible for input handling and stats tracking.
var int_id;
function typing_test(input, output, active = false) {
    var generated_text = generate_text(200, dict.get());
    var output_text    = '<span class="cursor">' + generated_text.charAt(0) + '</span>' + generated_text.slice(1);

    var cursor_position      =  0;
    var correctly_typed      =  0;
    var typing_errors        = [];
    var typing_errors_markup = [];
    var accuracy = 100;
    $(output).html(output_text);
    
    $(input).keydown(function (event) {
        // Activate test when user starts to type
        if (!active) {
            int_id = setInterval(progress, 100, $('#progress-bar'), 5, 60, 0.1, progress_done);
            active = true;
        }

        // If key pressed was backspace
        if (event.keyCode == 8) {
            if (cursor_position > 0)
            { cursor_position--; }

            if (correctly_typed > 0                           &&
                generated_text.charAt(cursor_position) != ' ' &&
                typing_errors.indexOf(cursor_position) == -1)
            { correctly_typed--; }

            if (typing_errors.indexOf(cursor_position) != -1)
            { typing_errors.pop(); }
        }
        else {
            if (event.key == generated_text.charAt(cursor_position))
            {
                if (generated_text.charAt(cursor_position) != ' ')
                { correctly_typed++; }
            }

            else if (event.key != 'Shift') 
            { typing_errors.push(cursor_position); }

            if (event.key != 'Shift')
            { cursor_position++; }
        }

        if (typing_errors.length == 0) 
        { output_text = generated_text.slice(0, cursor_position) + '<span class="cursor">' + generated_text.charAt(cursor_position) + '</span>' + generated_text.slice(cursor_position + 1); }

        else {
            output_text = generated_text.slice(0, typing_errors[0]);
            for (var i = 0; i < typing_errors.length; i++) {
                var error_markup  = '<span class="error">'  + generated_text.charAt(typing_errors[i]) + '</span>';
                var cursor_markup = '<span class="cursor">' + generated_text.charAt(cursor_position)  + '</span>' + generated_text.slice(cursor_position + 1);
                if (typing_errors.length - 1 != i)
                { typing_errors_markup[i] = error_markup + generated_text.slice(typing_errors[i] + 1, typing_errors[i + 1]); }

                else
                { typing_errors_markup[i] = error_markup + generated_text.slice(typing_errors[i] + 1, cursor_position) + cursor_markup; }
                output_text += typing_errors_markup[i];
            }
        }

        $(output).html(output_text);

        // Stats
        //TODO: refactor stats
        $('#wpm').text(Math.round(correctly_typed / 4));
        $('#wpm-banner').text(Math.round(correctly_typed / 4));

        $('#cpm').text(correctly_typed);
        $('#cpm-banner').text(correctly_typed);

        if (typing_errors.length > 0) 
        { accuracy = 100 - (100 * typing_errors.length / cursor_position); }

        else
        { accuracy = 100; }

        $('#accuracy').text(accuracy.toFixed(2) + '%');
        $('#accuracy-banner').text(accuracy.toFixed(2) + '%');
        });

    return;
}

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
        progress_percent = 0;
        $(bar).text('0%');
        $(bar).css('background-color', '#007bff');
        $(bar).css('width', (min_width + '%'));

        // Custom properties
        $('#finished-alert').hide();
        $('#type-input').prop('disabled', false);
        $('#type-input').val('');
        typing_test($('#type-input'), $('#generated-text'));
        return;
    }
    $(bar).text('Done!');
    $(bar).css('background-color', '#28a745'); // Green color
    // Custom properties
    $('#finished-alert').show();
    $('#type-input').prop('disabled', true);
    return;
} export { progress_done };