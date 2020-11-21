AOS.init({
    offset: 120,
    delay: 50,
    duration: 1000,
    mirror: true,
    once: false,
});

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 8,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.3,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 5,
            "direction": "none",
            "random": true,
            "straight": true,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 600
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "bubble"
            },
            "onclick": {
                "enable": false,
                "mode": "repulse"
            },
            "resize": false
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 250,
                "size": 0,
                "duration": 2,
                "opacity": 0,
                "speed": 3
            },
            "repulse": {
                "distance": 400,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});



window.onload = function () {
    let paths = document.querySelectorAll('#start-page-svg path');
    let svg_fully_drawn_time = 0;
    let anim_time = 0.1;

    document.querySelector('#start-page-svg').style.visibility = 'visible';
    for (let i = 0; i < paths.length; ++i) {
        let path = paths[i]
        let length = path.getTotalLength();

        path.style.transition = path.style.WebkitTransition = 'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;

        let ori_width = path.style.strokeWidth;
        path.style.strokeWidth = '0';

        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();

        // Define our transition
        path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset ' + anim_time + 's ease-in-out ' + (anim_time * i) + 's, stroke-width ' + anim_time + 's ease ' + (anim_time * i) + 's';

        // Go!
        path.style.strokeDashoffset = '0';
        path.style.strokeWidth = ori_width;

        svg_fully_drawn_time = anim_time * i;
    }

    let en_msg = document.querySelector("#start-msg-en")
    en_msg.style.transitionDelay = svg_fully_drawn_time + 's';
    en_msg.style.transform = 'translateZ(0)';
    en_msg.style.opacity = 1;

    let scroll_hint = document.querySelector('#scroll-arrow-hint');
    let scroll_hint_show_time = svg_fully_drawn_time + 1;
    scroll_hint.style.transition = scroll_hint.style.WebkitTransition = 'opacity 1s linear ' + scroll_hint_show_time + 's';
    scroll_hint.style.opacity = 1;
};
