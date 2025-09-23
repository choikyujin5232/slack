document.addEventListener("DOMContentLoaded", function () {
  // Swiper 초기화
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: false,
    effect: "fade",
    centeredSlides: true,
    autoplay: false,
    fadeEffect: { crossFade: true },
    speed: 100
  });

  //nav 스크롤
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.c-nav--primary--expanded');

    if (window.scrollY > 10) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  });

  // 버튼 클릭 이벤트 추가
  setTimeout(() => {
    document.querySelectorAll(".video-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const slideIndex = parseInt(this.getAttribute("data-slide"), 10);
        console.log(`🔄 버튼 클릭됨: 비디오 ${slideIndex + 1}로 이동`);
        swiper.slideToLoop(slideIndex, 500, false);
        swiper.loopFix();
      });
    });
  }, 500);

  //  슬라이드 변경 시 비디오 컨트롤
  swiper.on("slideChange", function () {
    document.querySelectorAll("video").forEach((video) => {
      video.pause();
    });

    setTimeout(() => {
      const activeVideo = document.querySelector(".swiper-slide-active video");
      if (activeVideo) {
        activeVideo.muted = true;
        activeVideo.play().catch(error => console.error("비디오 자동 재생 실패:", error));
      }
    }, 100);
  });

  // 초기 로드 시 첫 번째 비디오 재생
  setTimeout(() => {
    const firstVideo = document.querySelector(".swiper-slide-active video");
    if (firstVideo) {
      firstVideo.play();
    }
  }, 500);
});

// 버튼 효과
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('.btn.video-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {

      buttons.forEach(b => b.classList.remove('active'));

      btn.classList.add('active');
    })
  })
})

// section-3 애니메이션
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.section-3');
  if (!section) return;

  const images = section.querySelectorAll('.section-3_illustration img');
  const texts = section.querySelectorAll('.animate-item');

  images.forEach(img => img.classList.remove('animate'));
  texts.forEach(t => t.classList.remove('show'));

  const play = () => {

    setTimeout(() => images.forEach(img => img.classList.add('animate')), 200);
    texts.forEach((t, i) => setTimeout(() => t.classList.add('show'), i * 200));
  };

  let armed = false;
  let done = false;


  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (done || !armed) return;
      if (e.isIntersecting && e.intersectionRatio >= 0.35) {
        done = true;
        play();
        io.disconnect();
      }
    });
  }, {

    rootMargin: '-10% 0px -10% 0px',
    threshold: [0, 0.2, 0.35, 0.6]
  });

  io.observe(section);


  const arm = () => { armed = true; };
  window.addEventListener('scroll', arm, { once: true, passive: true });
  window.addEventListener('wheel', arm, { once: true, passive: true });
  window.addEventListener('touchstart', arm, { once: true });


  setTimeout(() => { if (!armed) armed = true; }, 800);
});


// section-4 애니메이션
document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.section-4_line');
  const target = document.querySelector('.section-4_header_headline');
  const texts = document.querySelectorAll(".animate-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          lines.forEach((line) => {
            line.classList.add('animate-2');
          });
        }, 300);
        texts.forEach((text, index) => {
          setTimeout(() => {
            text.classList.add('show');
          }, index * 100);
          observer.unobserve(entry.target);
        });
      }
    });
  }, {
    threshold: 1
  });

  observer.observe(target);
});

//숫자
function animateNumber(el, target, duration) {
  const frameRate = 60;
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let currentFrame = 0;

  const counter = () => {
    currentFrame++;
    const progress = currentFrame / totalFrames;
    const currentNumber = Math.round(target * progress);
    el.textContent = currentNumber;

    if (currentFrame < totalFrames) {
      requestAnimationFrame(counter);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(counter);
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".section-6_card-number");
  const animatedSet = new Set();

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!animatedSet.has(el)) {
          const target = parseInt(el.textContent);
          el.textContent = "0";
          animateNumber(el, target, 1500);
          animatedSet.add(el);
        }
      }
    });
  }, {
    threshold: 0.5
  });

  elements.forEach(el => observer.observe(el));
});

// section-5 애니메이션
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate');
  const target = document.querySelector('.section-5_header_headline');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('show');
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(target);
});

// 클릭 시 메뉴 토굴
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".c-nav--primary--expanded");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
  });
});

// footer 클릭 시 메뉴 토글
document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".footer-menu-list-item .toggleicon");

  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".footer-menu-list-item");

      // 현재 상태 확인
      const expanded = button.getAttribute("aria-expanded") === "true";

      // 상태 업데이트
      button.setAttribute("aria-expanded", !expanded);
      parent.classList.toggle("active");
    });
  });
});



