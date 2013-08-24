var carasDisponibles = ['cara1', 'cara2', 'cara3', 'cara4'];

function initCarasCruzadas() {
    initImageIndex($('#retrato .cara-top'));
    initImageIndex($('#retrato .cara-middle'));
    initImageIndex($('#retrato .cara-bottom'));

    $('#retrato .btn-back').click(function (){
        //TODO: resolve the parent with a '.row' selector
        var imageretrato = $(this).parent().parent().find('.cara');
        moveImageBack(imageretrato);
    });
    $('#retrato .btn-forward').click(function (){
        //TODO: resolve the parent with a '.row' selector
        var imageretrato = $(this).parent().parent().find('.cara');
        moveImageForward(imageretrato);
    });
}

function switchImageClass(imageretrato, currentClass, nextClass) {
    imageretrato.removeClass(currentClass);
    imageretrato.addClass(nextClass);
}

function initImageIndex(imageretrato) {
    var index = Math.floor(Math.random() * carasDisponibles.length);
    imageretrato.data('imageIndex', index);
    imageretrato.addClass(carasDisponibles[index]);
}

function moveImage(imageretrato, indexDelta) {
    var currentIndex = imageretrato.data('imageIndex');
    var nextIndex = (currentIndex + indexDelta) % carasDisponibles.length;
    imageretrato.data('imageIndex', nextIndex);
    switchImageClass(imageretrato, carasDisponibles[currentIndex],carasDisponibles[nextIndex]);
}
function moveImageBack(imageretrato, indexDelta) {
    moveImage(imageretrato, -1);
}
function moveImageForward(imageretrato, indexDelta) {
    moveImage(imageretrato, +1);
}
