var intId;
var prog_percent = 0;

function progress(int) {

    if (prog_percent >= 100) {
        $('#prog-bar').text('Done!');
        $('#prog-bar').css('background-color', '#28a745');
        $('#test-active').css('display', 'none');
        $('#finished-alert').show();
        $('#type-input').prop('disabled', true);
        clearInterval(intId);
        return;
    }
    else if (prog_percent > 3) {
        $('#prog-bar').css('width', (prog_percent + '%'));
    }
    $('#prog-bar').text(prog_percent.toFixed(0) + '%');
    prog_percent += (10 / 6) * int;
}

function retry() {
    test_active = false;
    previous_errors = [];
    typed = 0;
    accuracy = 0;
    current_pos = 0;
    errors = [];
    prog_percent = 0;
    $('#generated-text').html(text);
    $('#prog-bar').css('width', '3%');
    $('#prog-bar').text('0%');
    $('#type-input').prop('disabled', false);
    $('#finished-alert').hide();
    $('#type-input').val('');
    clearInterval(intId);
}