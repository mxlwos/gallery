gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// Прогрузка страницы плавная
gsap.to('body', {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
});

// Кастомный курсор
function customCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
    }
}

// Анимация галереи в баннере
function initBannerGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    const gallery = document.querySelector('.scrolling-gallery');

    if (!gallery) return;

    const artworks = gallery.querySelectorAll('.artwork');
    const totalWidth = gallery.scrollWidth;

    artworks.forEach(artwork => {
        const clone = artwork.cloneNode(true);
        gallery.appendChild(clone);
    });

    gsap.to(gallery, {
        x: `-=${totalWidth}`,
        duration: 80,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
    });

    gsap.to('.artwork', {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".gallery-container",
            start: "top 80%"
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initBannerGallery();
    customCursor();
});

// Анимация карточек галереи
gsap.utils.toArray('.art-card').forEach((card, i) => {
    gsap.fromTo(card, {
        opacity: 0,
        y: 100,
        rotationY: 15
    }, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        delay: i * 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Параллакс эффект
gsap.utils.toArray('.parallax-img').forEach(img => {
    gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Анимация для картинки в красной рамке
gsap.from('.transform-3d', {
    opacity: 0,
    scale: 0.8,
    rotationY: 30,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".transform-3d",
        start: "top 75%"
    }
});

// Анимация появления элементов в блоке "обо мне"
gsap.utils.toArray('.main-image, .artist-info, .small-image, .text-content, .quote-block, .red-image').forEach((element, i) => {
    gsap.fromTo(element, {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Анимация временной шкалы
const timelineProgress = document.querySelector('.timeline-progress');
const projectCards = gsap.utils.toArray('.project-card');

gsap.to(timelineProgress, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 20%",
        end: "bottom 80%",
        scrub: true
    }
});

// Анимация проектов
projectCards.forEach((card, index) => {
    const delay = parseFloat(card.dataset.delay) || index * 0.2;

    gsap.fromTo(card, {
        opacity: 0,
        y: 100,
        rotationY: index % 2 === 0 ? -15 : 15
    }, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        delay: delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Анимация маркеров годов
const yearMarkers = gsap.utils.toArray('.year-marker');
yearMarkers.forEach((marker, index) => {
    gsap.fromTo(marker, {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: marker,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
});

// Анимация контактов
gsap.from('.red-contacts-card', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contacts-section",
        start: "top 70%"
    }
});

gsap.from('.contact-image', {
    opacity: 0,
    x: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contacts-section",
        start: "top 70%"
    }
});

// Анимация скролл-стрелки
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: ".about-section",
                offsetY: 50
            },
            ease: "power2.inOut"
        });
    });
}
