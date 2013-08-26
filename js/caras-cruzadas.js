var carasDisponibles = ['cara1', 'cara2', 'cara3', 'cara4'];
const VELOCIDAD_TRANSICION = 300;

function initCarasCruzadas() {

    init("top");
    init("middle");
    init("bottom");


    $(".btn-back").click(function() {
        var $currentRow = $(this).closest(".row").find(".cara:visible");
        var currentIndex = $currentRow.data("imageIndex");
        var nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
            nextIndex = carasDisponibles.length - 1;
        }
        $currentRow.hide('slide',{direction:'left'},VELOCIDAD_TRANSICION, function() {
            $(this).closest(".row").find("." + carasDisponibles[nextIndex]).show('slide',{direction:'right'}, VELOCIDAD_TRANSICION, function() {
                checkJackpot();
            });
        });
    });

    $(".btn-forward").click(function() {
        var $currentRow = $(this).closest(".row").find(".cara:visible");
        var currentIndex = $currentRow.data("imageIndex");
        var nextIndex = currentIndex + 1;
        if (nextIndex == carasDisponibles.length) {
            nextIndex = 0;
        }
        $currentRow.hide('slide',{direction:'right'},VELOCIDAD_TRANSICION, function() {
            $(this).closest(".row").find("." + carasDisponibles[nextIndex]).show('slide',{direction:'left'},VELOCIDAD_TRANSICION, function() {
                checkJackpot();
            });
        });
    });
}


function init(position) {
    //creamos todos los div de todas las caras
    for (var i = 0; i < carasDisponibles.length; i++) {
        var $faceRow = $("<div class='span3 cara cara-"+ position + " " + carasDisponibles[i] + "' > </div>");
        $faceRow.data("imageIndex", i);
        $("#row-" + position).find(".span1").first().after($faceRow);
    }
    //escondemos todos
    $("#retrato .row-" + position).find(".cara-" + position).each(function() {
        $(this).hide();
    });
    //mostramos solo el del index
    var index = Math.floor(Math.random() * carasDisponibles.length);
    $("#retrato .row-" + position).find("." + carasDisponibles[index]).show();
}


//en cada cambio, chequea si se formó una cara, en ese caso,  cambia un color
function checkJackpot() {
    var distinto = false;
    var indexes = [];
    var $currentRow = $("#retrato").find(".row").each(function() {
        var $currentRow = $(this).find(".cara:visible");
        var currentIndex = $currentRow.data("imageIndex");
        indexes.push(currentIndex);
    });
    for (var i = 0; i < indexes.length - 1; i++) {
        if (indexes[i] != indexes[i+1]) {
            undoJackpot();
            return false;
        }
    }
    doJackpot();
}

function doJackpot() {
    $("#retrato").addClass("jackpot");
}

function undoJackpot() {
    $("#retrato").removeClass("jackpot");
}