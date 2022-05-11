jQuery(function() {
    init();
});

const nick = $('#nick');
const nickLabel = $('#nickLabel');
const play = $('#play');
const btnPlay = $('#btnPlay');
const btnReset = $('#btnReset');
const btnHelp = $('#btnHelp');
const modal = $('#modal');
const cards = $('.cards-card');
const imgs = $('.cards-card img');
const score = $('#score');
const progress = $("#progress");
const info = $("#info");
const scoreLabel = $("#scoreLabel");
const errors = $("#errors");
const errorLabel = $("#errorLabel");
const langLabel = $("#langLabel");
const langEs = $("#lang-es");
const langEn = $("#lang-en");
const topNick = $("#topNick");
const topErrors = $("#topErrors");
const topLabel = $("#topLabel");
const topErrorsLabel = $("#topErrorsLabel");
const description = $("#description");
const blockInteractions = $('#blockInteractions');
let lastCard = null;
let lastImg = null;
let scoreCounter = 0;
let errorCounter = 0;
let showHelp = true;
let winTreshold = 7;
let diff = null;
let json = null;
let lang = null;
let mode = null;
let duration = 0;
let sources = [
    { "src": "assets/img/apu.webp", "alt": "Image of Apu Nahasapeemapetilon" },
    { "src": "assets/img/bart.webp", "alt": "Image of Bart Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/lisa.webp", "alt": "Image of Lisa Simpson" },
    { "src": "assets/img/maggie.webp", "alt": "Image of Maggie Simpson" },
    { "src": "assets/img/marge.webp", "alt": "Image of Marge Simpson" },
    { "src": "assets/img/milhouse.webp", "alt": "Image of Milhouse Van Houten" },

    { "src": "assets/img/bomb.webp", "alt": "Image of a bomb" },

    { "src": "assets/img/apu.webp", "alt": "Image of Apu Nahasapeemapetilon" },
    { "src": "assets/img/bart.webp", "alt": "Image of Bart Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/lisa.webp", "alt": "Image of Lisa Simpson" },
    { "src": "assets/img/maggie.webp", "alt": "Image of Maggie Simpson" },
    { "src": "assets/img/marge.webp", "alt": "Image of Marge Simpson" },
    { "src": "assets/img/milhouse.webp", "alt": "Image of Milhouse Van Houten" },
]
let amongusSources = [
    { "src": "assets/img/homero.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homero.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homero.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
    { "src": "assets/img/homer.webp", "alt": "Image of Homer Simpson" },
]
let ranking = [
    { "nick": "Lisa", "errors": 10 },
    { "nick": "Maggie", "errors": 20 },
    { "nick": "Marge", "errors": 40 },
    { "nick": "Bart", "errors": 60 },
    { "nick": "Homer", "errors": 80 }
];

function init() {
    preload(sources);
    loadLang();

    nick.on('keypress', function(e) {
        if (e.key == 'Enter') {
            startGame();
        }
    });
    $("form").on('submit', function(e) {
        e.preventDefault();
    });
    btnPlay.on('click', function() {
        modal.modal('show');
        $('.modal').on('shown.bs.modal', function() {
            $(this).find('[autofocus]').focus();
        });
    });
    btnReset.on('click', function() {
        showHelp = true;
        reset();
    });
    btnHelp.on('click', function() {
        show(false, 2000);
        btnHelp.hide();
    });
    play.on('click', startGame);

    $('#mode1').on('click', function() {
        $('#diff').show();
    });
    $('#mode2').on('click', function() {
        $('#diff').hide();
    });

    imgs.attr('draggable', false);

    langEs.on('click', function() {
        localStorage.setItem("lang", "es");
        changeLanguage();
    });

    langEn.on('click', function() {
        localStorage.setItem("lang", "en");
        changeLanguage();
    });
    updateTop();
}

function startGame() {
    if (nick.val() != "") {
        blockInteractions.css('display', 'block');
        mode = $('input[name=mode]:checked').val();
        if (mode == "amongus") {
            winTreshold = 3;
            duration = 2000;
            cards.off('click').on('click', amongusFlip);
            randomize(true);
            show(false, 2000);
        } else if (mode == "normal") {
            randomize();
            diff = $('input[name=btnradio]:checked').val();
            switch (diff) {
                case 'easy':
                    if (showHelp) {
                        btnHelp.show();
                    }
                    duration = 0;
                    break;
                case 'normal':
                    duration = 2000;
                    show(true, duration);
                    break;
                case 'hard':
                    duration = 0;
                    winTreshold = 6;
                    break;
                case 'legend':
                    duration = 1000;
                    show(true, duration);
                    winTreshold = 4;
                    break;
            }
            cards.off('click').on('click', flip);
        }
        localStorage.setItem("nick", nick.val());
        nickLabel.text(nick.val());
        btnPlay.hide();
        btnReset.show();
        modal.modal('hide');
        $('.cards').effect('slide');
        setTimeout(() => {
            blockInteractions.css('display', 'none');
        }, duration);
    }
}

function show(onlyBomb = false, time = 2000) {
    blockInteractions.css('display', 'block');
    cards.each(function() {
        if ($(this).hasClass('down')) {
            if (onlyBomb) {
                if ($(this).find('img').data('src') == 'assets/img/bomb.webp') {
                    $(this).removeClass('down').addClass('up').addClass('show');
                }
            } else {
                $(this).removeClass('down').addClass('up').addClass('show');
            }
        }
    })
    imgs.each(function() {
        if ($(this).hasClass('hidden')) {
            if (onlyBomb) {
                if ($(this).data('src') == 'assets/img/bomb.webp') {
                    $(this).attr('src', $(this).data('src')).attr('alt', $(this).data('alt'));
                    $(this).removeClass('hidden').addClass('show');
                }
            } else {
                $(this).stop().fadeIn(500);
                $(this).attr('src', $(this).data('src')).attr('alt', $(this).data('alt'));
                $(this).removeClass('hidden').addClass('show');
            }
        }
    })
    setTimeout(() => {
        cards.each(function() {
            if ($(this).hasClass('show')) {
                $(this).removeClass('show').removeClass('up').addClass('down');
            }
        })
        imgs.each(function() {
            if ($(this).hasClass('show')) {
                $(this).removeClass('show').removeAttr('src').removeAttr('alt').removeAttr('style').addClass('hidden');
            }
        })
        blockInteractions.css('display', 'none');
    }, time);
}

function flip() {
    currentCard = $(this);
    currentImg = $(this).find('img');
    currentImg.attr('src', currentImg.data('src')).attr('alt', currentImg.data('alt'));
    currentImg.fadeIn(300);
    if (isBomb()) {
        explode();
    } else {
        if (lastImg == null) {
            currentCard.removeClass('down').addClass('up');
            currentImg.removeClass('hidden').addClass('selected');
            lastImg = currentImg;
            lastCard = currentCard;
            audio('#flip');
        } else {
            if (!lastImg.is(currentImg)) {
                if (lastImg.data('src') == currentImg.data('src')) {
                    blockInteractions.css('display', 'block');
                    lastCard.off("click");
                    currentCard.off("click");
                    currentCard.removeClass('down').addClass('up');
                    currentImg.removeClass('hidden').addClass('match');
                    lastImg.removeClass('selected').addClass('match');
                    scoreCounter++;
                    score.val(scoreCounter);
                    audio('#match');
                    updateProgress();
                    inform("match");
                    let height = lastCard.height();
                    lastCard.stop().animate({
                        'height': '50px'
                    }, 300, function() {
                        lastCard.stop().animate({
                            'height': height
                        });
                    });
                    currentCard.stop().animate({
                        'height': '50px'
                    }, 300, function() {
                        currentCard.stop().animate({
                            'height': height
                        }, 300, function() {
                            lastCard = null;
                            lastImg = null;
                            blockInteractions.css('display', 'none');
                        });
                    });
                    if (scoreCounter == winTreshold) {
                        $('.cards').stop().effect('highlight');
                        inform("win");
                        updateTop();
                        setTimeout(() => {
                            reset(true);
                            blockInteractions.css('display', 'none');
                        }, 2000);
                    }
                } else {
                    blockInteractions.css('display', 'block');
                    lastCard.stop().effect('shake');
                    currentCard.stop().effect('shake');
                    currentCard.removeClass('down').addClass('up');
                    currentImg.removeClass('hidden').addClass('error');
                    lastImg.removeClass('selected').addClass('error');
                    audio('#fail');
                    inform("fail");
                    setTimeout(() => {
                        errorCounter++;
                        errors.val(errorCounter);
                        if (diff == "legend" && errorCounter > 2) {
                            audio('#boom');
                            inform('lose');
                            reset();
                        } else {
                            currentImg.stop().fadeOut(250, function() {
                                currentImg.removeAttr('src').removeAttr('alt').removeAttr('style');
                                currentImg.removeClass('error').addClass('hidden');
                            });
                            lastImg.stop().fadeOut(250, function() {
                                lastImg.removeAttr('src').removeAttr('alt').removeAttr('style');
                                lastImg.removeClass('error').addClass('hidden');
                                currentCard.removeClass('up').addClass('down');
                                lastCard.removeClass('up').addClass('down');
                                lastImg = null;
                                lastCard = null;
                                info.removeClass('alert-success').removeClass('alert-danger');
                                blockInteractions.css('display', 'none');
                            });
                        }
                    }, 1000);
                }
            }
        }
    }
}

function amongusFlip() {
    currentCard = $(this);
    currentImg = $(this).find('img');
    currentImg.attr('src', currentImg.data('src')).attr('alt', currentImg.data('alt'));
    currentImg.fadeIn(300);
    if (currentImg.data('src') != "assets/img/homero.webp") {
        blockInteractions.css('display', 'block');
        inform('lose');
        currentCard.stop().effect('pulsate');
        showHelp = false;
        currentCard.removeClass('down').addClass('up');
        currentImg.removeClass('hidden').addClass('error');
        audio('#boom');
        setTimeout(() => {
            blockInteractions.css('display', 'none');
            reset(false);
        }, 2000);
    } else {
        blockInteractions.css('display', 'block');
        currentCard.off('click');
        scoreCounter++;
        score.val(scoreCounter);
        updateProgress();
        audio('#match');
        inform("match");
        currentCard.removeClass('down').addClass('up');
        currentImg.removeClass('hidden').addClass('match');
        lastImg = currentImg;
        lastCard = currentCard;
        let height = lastCard.height();
        currentCard.stop().animate({
            'height': '50px'
        }, 300, function() {
            currentCard.stop().animate({
                'height': height
            }, 300, function() {
                blockInteractions.css('display', 'none');
            });
        });
        if (scoreCounter == winTreshold) {
            cards.off('click');
            $('.cards').stop().effect('highlight');
            inform("amongusWin");
            setTimeout(() => {
                blockInteractions.css('display', 'none');
                reset();
            }, 2000);
        }
    }
}

function isBomb() {
    if (currentImg.attr('src') == "assets/img/bomb.webp") {
        return true;
    } else {
        return false;
    }
}

function explode() {
    blockInteractions.css('display', 'block');
    currentCard.stop().effect('pulsate');
    showHelp = false;
    if (lastImg != null) {
        errorCounter++;
        errors.val(errorCounter);
        lastCard.stop().effect('pulsate');
        lastImg.removeClass('selected').addClass('error');
    }
    currentCard.removeClass('down').addClass('up');
    currentImg.removeClass('hidden').addClass('bomb');
    audio('#boom');
    inform('bomb');
    setTimeout(() => {
        blockInteractions.css('display', 'none');
        reset(false);
    }, 2000);
}

function reset(resetErrors = true) {
    if (resetErrors || diff == "legend") {
        errorCounter = 0;
        errors.val(errorCounter);
    }
    lastCard = null;
    lastImg = null;
    scoreCounter = 0;
    score.val(scoreCounter);
    cards.off('click');
    cards.on('click', flip);
    cards.removeClass('up').addClass('down');
    imgs.removeClass('match').removeClass('selected').removeClass('bomb').removeClass('error');
    imgs.addClass('hidden');
    imgs.removeAttr('src').removeAttr('alt').removeAttr('style');
    info.removeClass('alert-success').removeClass('alert-danger');
    progress.css('width', '0%').attr('aria-valuenow', 0).text('0%');
    startGame();
}

function randomize(amongusMode = false) {
    let i = 0;
    if (amongusMode) {
        shuffle(amongusSources);
        imgs.each(function() {
            $(this).data('src', amongusSources[i].src);
            $(this).data('alt', amongusSources[i].alt);
            i++;
        });
    } else {
        shuffle(sources);
        imgs.each(function() {
            $(this).data('src', sources[i].src);
            $(this).data('alt', sources[i].alt);
            i++;
        });
    }
}

function loadLang() {
    $.getJSON("js/lang/lang.json", function(data) {
        json = data;
        changeLanguage();
    });
}

function changeLanguage() {
    lang = (localStorage.getItem("lang") != null) ? localStorage.getItem("lang") : "en";
    langLabel.html(json[lang]['LangLabel']);
    scoreLabel.html(json[lang]['Score']);
    errorLabel.html(json[lang]['ErrorLabel']);
    topErrorsLabel.html(json[lang]['TopError']);
    info.html(json[lang]['Info']);
    description.html(json[lang]['Description']);
    document.title = json[lang]['Title'];
}

function inform(msg) {
    let text;
    switch (msg) {
        case "win":
            text = json[lang]['Win'];
            info.removeClass('alert-danger');
            info.addClass('alert-success');
            break;
        case "amongusWin":
            text = json[lang]['WinAmongus'];
            info.removeClass('alert-danger');
            info.addClass('alert-success');
            break;
        case "fail":
            text = json[lang]['Fail'];
            info.removeClass('alert-success');
            info.addClass('alert-danger');
            break;
        case "match":
            text = json[lang]['Match'];
            info.removeClass('alert-danger');
            info.addClass('alert-success');
            break;
        case "record":
            text = json[lang]['Record'];
            info.removeClass('alert-danger');
            info.addClass('alert-success');
            break;
        case "bomb":
            text = json[lang]['Bomb'];
            info.removeClass('alert-success');
            info.addClass('alert-danger');
            break;
        case "lose":
            text = json[lang]['Lose'];
            info.removeClass('alert-success');
            info.addClass('alert-danger');
            break;
    }
    text = text.replace('X', errorCounter);
    info.text(text);
}

function updateProgress() {
    let num = (scoreCounter / winTreshold) * 100;
    let percentage = Math.round((num + Number.EPSILON) * 100) / 100;
    progress.css('width', percentage + '%');
    progress.attr('aria-valuenow', percentage);
    progress.text(percentage + '%');
}

function updateTop() {
    let i = 1;
    let updatedTop = false;
    let prevNick = null;
    let prevErrors = null;
    let currentNick = null;
    let currentErrors = null;
    if (localStorage.getItem('ranking') == null) {
        localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
        ranking = JSON.parse(localStorage.getItem("ranking"));
        if (scoreCounter == winTreshold) {
            ranking.forEach(element => {
                if (errorCounter <= element.errors && updatedTop == false) {
                    prevNick = element.nick;
                    prevErrors = element.errors;
                    element.nick = nick.val();
                    element.errors = errorCounter;
                    updatedTop = true;
                    inform('record');
                } else if (updatedTop) {
                    currentNick = element.nick;
                    currentErrors = element.errors;
                    element.nick = prevNick;
                    element.errors = prevErrors;
                    prevNick = currentNick;
                    prevErrors = currentErrors;
                }
            });
        }
        localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    ranking.forEach(element => {
        $('#topNick' + i).val(element.nick);
        $('#topErrors' + i).val(element.errors);
        i++;
    });
}

function audio(source) {
    $(source)[0].play();
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function() {
        (new Image()).src = this.src;
    });
}