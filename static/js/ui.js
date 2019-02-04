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
    clearInterval(intId);
    $('#type-input').prop('disabled', false);
    $('#finished-alert').hide();
    prog_percent = 0;
    $('#type-input').val('');
}