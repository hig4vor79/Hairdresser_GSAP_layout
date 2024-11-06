/**
 * Header scrolling animation
 */
var header = document.querySelector("header");
var navbarHeight = header.offsetHeight;
var lastScrollTop = 0;

window.onscroll = function () {
  if (!burgerBtn.classList.contains("opened")) {
    scrollHide();
  }
};
function scrollHide() {
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    header.classList.add("nav-up");
  } else {
    header.classList.remove("nav-up");
  }
  lastScrollTop = st <= 0 ? 0 : st;
}

/**
 * Burger Animation.
 * Visible only on devices with internal width > 1024
 */
const burger = document.querySelector(".burger");
const burgerBtn = document.querySelector(".menu");
burgerBtn.addEventListener("click", () => {
  burger.classList.toggle("active");
  burgerBtn.classList.toggle("opened");
});
document.querySelectorAll(".nav__link").forEach((btn) => {
  btn.addEventListener("click", () => {
    burger.classList.remove("active");
    burgerBtn.classList.remove("opened");
  });
});

/**
 * Modal open
 */
const overlay = document.querySelector(".overlay");
const openModal = document.querySelectorAll(".openModal");
openModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    overlay.classList.add("active");
    document.querySelector("body").classList.add("lock");
  });
});
overlay.addEventListener("click", (event) => {
  if (!document.querySelector(".modal").contains(event.target)) {
    overlay.classList.remove("active");
    document.querySelector("body").classList.remove("lock");
  }
});

/**
 * Scroling animation first gallery(".hero") block.
 * If the inner width of the device < 1044, the gallery is disabled
 */
if (window.innerWidth > 1044 && document.querySelector(".hero")) {
  gsap.set(".first__col", {
    y:
      -window.innerHeight +
      2 * document.querySelector(".first__col").clientHeight, // Переместить элемент за верхнюю границу окна
  });

  gsap.set(".last__col", {
    y: `${
      window.innerHeight + 2 * document.querySelector(".last__col").clientHeight
    }px`,
  });

  gsap.set(".hero__foto", {
    scale: 1.1,
  });
  gsap.set(".hero__foto > img", {
    y: -250,
    // y: 0,
    x: "-7.5%",
    width: "115%",
  });

  gsap.to(".hero__foto", {
    scale: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".hero__foto",
      start: "top 30%",
      end: "top -90%",
      scrub: 1,
    },
  });
  gsap.to(".hero__foto > img", {
    y: "-50%",
    top: "50%",
    x: 0,
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero__foto",
      start: "top 50%",
      end: "top -50%",
      scrub: 1,
    },
  });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom -2000px",
    pin: ".hero",
    ease: "none",
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to(".first__col", {
        y:
          -(1 - progress) *
          (window.innerHeight +
            document.querySelector(".first__col").clientHeight), // Плавное появление first__col при прокрутке вниз
        duration: 0,
        ease: "power2.in",
      });

      gsap.to(".last__col", {
        y:
          (1 - progress / 0.8) *
          (window.innerHeight +
            document.querySelector(".first__col").clientHeight), // Плавное появление first__col при прокрутке вниз
        duration: 0,
        ease: "power2.in",
      });
    },
  });
}

/**
 * Horizontal scroll animation for ".scroll" block
 */
const scrollSection = document.querySelector(".scroll");
if (scrollSection) {
  gsap.to(scrollSection, {
    x: () => -(scrollSection.offsetWidth - innerWidth),
    scrollTrigger: {
      trigger: scrollSection,
      start: "top top",
      end: () => "+=" + (scrollSection.offsetWidth - innerWidth),
      scrub: 1,
      pin: true,
    },
  });
}
/**
 * Image animation for block ".services"
 */
const servicesImg = document.querySelectorAll(".services__img");
servicesImg.forEach((elem) => {
  elemBg = elem.querySelector(".black-bg");
  gsap.to(elemBg, {
    y: "100%",
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 50% center",
      end: () => "+=" + elem.offsetHeight,
      scrub: 1,
    },
  });
});

/**
 *  Animation for horizontal image gallery in block ".gallery".
 *  If the inner width of the device < 1044, horizontal scrolling changes into a standard slider
 */
if (window.innerWidth > 800) {
  const scrollHorizontalInit = () => {
    const container = document.querySelector(".gallery__wrap");
    const imageContainers = container.querySelectorAll(".gallery__item");

    const allImage = document.querySelector(".sidebar__bottom-counter > .all");
    const currentImage = document.querySelector(
      ".sidebar__bottom-counter > .current"
    );

    allImage.innerHTML = `0${imageContainers.length}`;

    const stIds_ = {
      pin: "gallery-pin",
      scroll: "gallery-scroll",
    };

    const horizontalTween = gsap.to(container, {
      x: () => -(container.scrollWidth - imageContainers[0].clientWidth),
      ease: "none",
      scrollTrigger: {
        id: stIds_.scroll,
        trigger: container.parentElement,
        start: "top top",
        end: () =>
          `+=${container.scrollWidth - imageContainers[0].clientWidth}`,
        scrub: true,
        invalidateOnRefresh: true,
        pin: true,
      },
    });

    imageContainers.forEach((container, i) => {
      gsap.to(container.querySelector("img"), {
        scale: 0.7,
        ease: "none",
        scrollTrigger: {
          id: `test-${i}`,
          trigger: container.querySelector("img"),
          start: "center center",
          end: "right center",
          scrub: true,

          invalidateOnRefresh: true,
          containerAnimation: horizontalTween,
          onEnter: () => {
            currentImage.innerHTML = `0${i + 2}`;
          },
          onLeaveBack: () => {
            currentImage.innerHTML = `0${i + 1}`;
          },
        },
      });
    });

    ScrollTrigger.refresh();

    gsap.to(".sidebar h2", {
      scale: 0.8, // Set your desired background color
      duration: 1,
      x: -80,
      y: 0,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300", // Adjust the end value based on when you want the header to turn black
        scrub: true,
      },
    });

    gsap.to(".sidebar__bottom-counter", {
      x: -150,
      opacity: 1,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=450", // Adjust the end value based on when you want the header to turn black
        scrub: true,
      },
    });
  };
  scrollHorizontalInit();
} else {
  var swiper = new Swiper(".gallery", {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

/**
 *  Pin animation for contact block (".formBlock"")
 */
if (window.innerWidth > 800) {
  ScrollTrigger.create({
    trigger: ".formBlock",
    start: "top top",
    end: "bottom bottom",
    pin: ".formBlock__left > div",
  });
}
