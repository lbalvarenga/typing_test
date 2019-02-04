String.prototype.splice = function (start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

function generate_text(word_count) {
    var dict = ['a', 'very', 'simple', 'dictionary'];
    var text = [];
    for (var i = 0; i < word_count; ++i) {
        text[i] = dict[Math.floor(Math.random() * dict.length)];
    }
    return text;
}

var started = false;
function toggle_start() {
    return;
}

word_array = generate_text(5);
var text = '';
for (var i = 0; i < word_array.length; ++i) {
    text += ' ';
    text += word_array[i];
}

$('#generated-text').text(text);

var disp;
$('#type-input').bind('input', function () {
    current_pos = $(this).val().length;
    current_char = $(this).val().charAt(current_pos - 1);
    text_char = text.charAt(current_pos);

    if ($(this).val().length > 0) {
        toggle_start();
        started = true;
    }

    //highlighting
    if (current_char == text_char) {
        disp = text.splice(current_pos, 1, '<span id="correct">' + text_char + '</span>');
    }
    else {
        disp = text.splice(current_pos, 1, '<span id="incorrect">' + text_char + '</span>');
    }
    var generated_text = document.getElementById('generated-text');
    generated_text.innerHTML = disp;


});