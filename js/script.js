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
      
      if (window.scrollY > 10) {  // 스크롤 10px 이상 내리면
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
                swiper.loopFix(); // 🔥 loop 모드에서 정상 동작하도록 설정
            });
        });
    }, 500);

    // 🎥 슬라이드 변경 시 비디오 컨트롤
    swiper.on("slideChange", function () {
        document.querySelectorAll("video").forEach((video) => {
            video.pause(); // 모든 비디오 정지
        });

        setTimeout(() => {
            const activeVideo = document.querySelector(".swiper-slide-active video");
            if (activeVideo) {
                activeVideo.muted = true; // 🔥 muted 속성 적용
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
  const texts  = section.querySelectorAll('.animate-item');

  images.forEach(img => img.classList.remove('animate'));
  texts.forEach(t => t.classList.remove('show'));

  const play = () => {
    
    setTimeout(() => images.forEach(img => img.classList.add('animate')), 200);
    texts.forEach((t, i) => setTimeout(() => t.classList.add('show'), i * 200));
  };

  let armed = false; 
  let done  = false; 

 
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
  window.addEventListener('scroll', arm,     { once: true, passive: true });
  window.addEventListener('wheel', arm,      { once: true, passive: true });
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
                // 일정 시간(예: 500ms) 후 애니메이션 실행
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
    const animatedSet = new Set(); // 이미 실행된 요소 저장용

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (!animatedSet.has(el)) {
            const target = parseInt(el.textContent);
            el.textContent = "0";
            animateNumber(el, target, 1500);
            animatedSet.add(el); // 한 번만 실행되도록 저장
          }
        }
      });
    }, {
      threshold: 0.5 // 요소가 화면의 50% 이상 보이면 실행
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
            }, index * 100); // 순차 효과 (선택)
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
  
    observer.observe(target);
  });
  


