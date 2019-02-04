var i = 0;
var intId;

function progress(int) {
    if (i >= 100) {
        $('#prog-bar').text('Done!');
        $('#prog-bar').css('background-color', '#28a745');
        $('#test-active').css('display', 'none');
        $('#finished-alert').show();
        clearInterval(intId);
        return;
    }
    else if (i > 3) {
        $('#prog-bar').css('width', (i + '%'));
    }
    $('#prog-bar').text(i.toFixed(0) + '%');
    i += (10 / 6) * int;
}