var door = document.querySelector("#door");
var door_back = document.querySelector("#door_back");
door.addEventListener("click", function() {
    open_door();
});
door_back.addEventListener("click", function() {
    open_door();
});

var door_opened = false;

function open_door() {
    var door = document.querySelector("#door");
    door.classList.add('open');

    if (door_opened) {
        return;
    }
    door_opened = true;

    var white_full = document.querySelector("#white-full");
    var init_page = document.querySelector('#init-page');
    var content = document.querySelector('#content');
    
    white_full.style.opacity = 1;
    setTimeout(function(){
        init_page.style.display = 'none';
        content.style.display = "";
        white_full.style.opacity = 0;
        init();
    }, 1000);
}

function init() {
    AOS.init({
        delay: 50,
        duration: 1000,
        mirror: true,
        once: false,
    });
    
    let credits = document.querySelector('#credits');
    let credits_msnry = new Masonry(credits, {
        itemSelector: '.credits-section',
        columnWidth: 300
    });

    // new GreenAudioPlayer('#cover-audio-container');

    let gallery_a = new SimpleLightbox('#artbook-gallery a');
    gallery_a.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });

    credits_msnry.on('layoutComplete', function(){
        AOS.refresh();
    });
}