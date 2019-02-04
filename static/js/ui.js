var i = 0;
var intId;

function toggleButton()
{
    i = 0;
    $('#prog-bar').css('width', '3%');

    button = document.getElementById('type-button');
    buttonClasses = [].slice.apply(button.classList);
    button.classList.toggle('btn-success');
    button.classList.toggle('btn-danger');

    if (buttonClasses.includes('btn-success'))
    {
        $('#test-active').css('display', 'block');
        $('#type-button').text('Stop');
        intId = setInterval(prog, 50, 0.05);
    }
    else
    {
        $('#test-active').css('display', 'none');
        $('#type-button').text('Start');
        clearInterval(intId);
    }
}

function prog(int)
{
    if (i >= 100)
    {
        $('#prog-bar').text('Done!');
        clearInterval(intId);
        return;
    }

    if (i > 3)
    {
        $('#prog-bar').css('width', (i + '%'));
    }
    $('#prog-bar').text(i.toFixed(0) + '%');
    i += (10 / 6) * int;
}