var door = document.querySelector("#door");
door.addEventListener("click", function() {
    door.classList.add('open');
    door.onclick = null;

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
});

function init() {
    AOS.init({
        offset: 120,
        delay: 50,
        duration: 1000,
        mirror: true,
        once: false,
    });

    new GreenAudioPlayer('#cover-audio-container');

    let gallery = new SimpleLightbox('#artbook-gallery a');
    gallery.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
}