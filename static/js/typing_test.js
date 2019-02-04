$('#prog-bar').css('width', '3%');

String.prototype.splice = function (start, del_count, new_str) {
    return this.slice(0, start) + new_str + this.slice(start + Math.abs(del_count));
};

function generate_text(word_count) {
    var text = [];
    for (var i = 0; i < word_count; ++i) {
        text[i] = dict[Math.floor(Math.random() * dict.length)];
    }
    return text;
}

var test_active = false;
function toggle_start() {
    if (test_active)
    {
        return;
    }
    setInterval(progress, 100, 0.1);
    return;
}

word_array = generate_text(70);
var text = '';
for (var i = 0; i < word_array.length; ++i) {
    text += ' ';
    text += word_array[i];
}

$('#generated-text').text(text);

var disp; var mistakes = 0; var cpm = 0;
$('#type-input').bind('input', function () {
    current_pos = $(this).val().length;
    current_char = $(this).val().charAt(current_pos - 1);
    text_char = text.charAt(current_pos);

    if ($(this).val().length > 0) {
        toggle_start();
        test_active = true;
    }

    //highlighting
    if (current_char == text_char) {
        if (current_char != ' ')
        {
            cpm++;
        }
        disp = text.splice(current_pos + 1, 1, '<span id="correct">' + text.charAt(current_pos + 1) + '</span>');
    }
    else {
        mistakes++;
        disp = text.splice(current_pos + 1, 1, '<span id="incorrect">' + text.charAt(current_pos + 1) + '</span>');
    }
    var generated_text = document.getElementById('generated-text');
    generated_text.innerHTML = disp;

    //stats
    $('#wpm').text((cpm / 4).toFixed(0));
    $('#wpm-banner').text((cpm / 4).toFixed(0));
    $('#cpm').text(cpm);
    $('#cpm-banner').text(cpm);
    accuracy = 100 - (mistakes / $(this).val().length) * 100;
    $('#accuracy').text(accuracy.toFixed(1) + '%');
    $('#accuracy-banner').text(accuracy.toFixed(1) + '%');
});