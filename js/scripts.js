(function ($) {
  'use strict';

  /* Preloader */
  $(window).on('load', function () {
    var preloaderFadeOutTime = 500;
    function hidePreloader() {
      var preloader = $('.spinner-wrapper');
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }
    hidePreloader();
  });

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on('scroll load', function () {
    if ($('.navbar').offset().top > 60) {
      $('.fixed-top').addClass('top-nav-collapse');
      $('.offcanvas-collapse').addClass('white-bg');
    } else {
      $('.fixed-top').removeClass('top-nav-collapse');
      $('.offcanvas-collapse').removeClass('white-bg');
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on('click', 'a.page-scroll', function (event) {
      var $anchor = $(this);
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr('href')).offset().top,
          },
          600,
          'easeInOutExpo'
        );
      event.preventDefault();
    });
  });

  // closes the responsive menu on menu item click
  $('.navbar-nav li a').on('click', function (event) {
    if (!$(this).parent().hasClass('dropdown'))
      $('.navbar-collapse').collapse('hide');
  });

  /* ----------------------------------------------------------- */
  /* DINAMISMO DO SITE - Contagem Regressiva e Botões
  /* Este código adapta o site com base na data atual
  /* ----------------------------------------------------------- */
  function inicializarConteudoDinamico() {
    // --- 1. DEFINA AS DATAS IMPORTANTES DO CURSO AQUI ---
    // Formato: ANO-MÊS-DIA. Use os dados corretos do seu edital.
    const dataFimPreInscricao = new Date('2025-07-31T23:59:59');
    const dataInicioInscricao = new Date('2025-08-01T00:00:00');
    const dataFimInscricao = new Date('2025-08-27T23:59:59');
    const dataInicioAulas = new Date('2025-09-22T00:00:00');
    const agora = new Date(); // Pega a data e hora atuais

    // --- 2. PEGUE OS ELEMENTOS DA PÁGINA QUE VAMOS MUDAR ---
    var countdownLabel = $('#countdown-label');
    var countdownClock = $('#clock');
    var botaoPrincipal = $('.btn-solid-lg');

    // --- 3. LÓGICA PARA ATUALIZAR O SITE CONFORME A FASE ---
    let dataAlvo;
    let labelTexto;
    let botaoTexto = 'INSCREVA-SE';
    let botaoLink = '#register'; // Link padrão

    // FASE 1: Período de Pré-Inscrição
    if (agora < dataFimPreInscricao) {
      dataAlvo = dataFimPreInscricao;
      labelTexto = 'A PRÉ-INSCRIÇÃO TERMINA EM:';
      botaoTexto = 'FAÇA SUA PRÉ-INSCRIÇÃO';
      botaoLink = '#register';
    }
    // FASE 2: Período de Inscrição
    else if (agora >= dataInicioInscricao && agora < dataFimInscricao) {
      dataAlvo = dataFimInscricao;
      labelTexto = 'AS INSCRIÇÕES TERMINAM EM:';
      botaoTexto = 'INSCREVA-SE AGORA';
      botaoLink = '#register';
    }
    // FASE 3: Após inscrições e antes das aulas
    else if (agora >= dataFimInscricao && agora < dataInicioAulas) {
      dataAlvo = dataInicioAulas;
      labelTexto = 'AS AULAS COMEÇAM EM:';
      botaoTexto = 'VAGAS ESGOTADAS';
      botaoLink = '#professores';
      countdownClock.show();
    }
    // FASE 4: Após o início das aulas
    else {
      countdownLabel.html('TURMA EM ANDAMENTO');
      botaoTexto = 'CONHEÇA A PÓS';
      botaoLink = '#description';
      countdownClock.hide(); // Esconde o relógio
    }

    // --- 4. APLIQUE AS MUDANÇAS NA PÁGINA ---

    // Atualiza o texto do título da contagem
    countdownLabel.html(labelTexto);

    // Atualiza o texto e o link do botão principal
    botaoPrincipal.html(botaoTexto).attr('href', botaoLink);

    // Inicia ou reinicia o plugin da contagem regressiva com a data e formato corretos
    if (dataAlvo && agora < dataAlvo) {
      countdownClock
        .countdown(dataAlvo)
        .on('update.countdown', function (event) {
          var format = `<span class="counter-number">%D<br><span class="timer-text">Dias</span></span>
            <span class="counter-number">%H<br><span class="timer-text">Horas</span></span>
            <span class="counter-number">%M<br><span class="timer-text">Minutos</span></span>
            <span id="sec-span" class="counter-number">%S<br><span class="timer-text">Segundos</span></span>`;
          $(this).html(event.strftime(format));
        })
        .on('finish.countdown', function (event) {
          // Quando a contagem terminar, ela re-executa a função para passar para a próxima fase automaticamente!
          setTimeout(function () {
            inicializarConteudoDinamico();
          }, 1000);
        });
    }
  }

  // Chama a função para que tudo seja configurado assim que a página carregar
  inicializarConteudoDinamico();

  /* Image Slider 2 - Swiper */
  var imageSliderOne = new Swiper('.image-slider-1', {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /* Image Slider - Swiper */
  var imageSliderTwo = new Swiper('.image-slider-2', {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    breakpoints: {
      // when window is <= 580px
      580: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window is <= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window is <= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window is <= 1200px
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  /* Text Slider - Swiper */
  var textSlider = new Swiper('.text-slider', {
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 70,
    slidesPerView: 2,
    breakpoints: {
      // when window is <= 1199px
      1199: {
        slidesPerView: 1,
      },
    },
  });

  /* Video Lightbox - Magnific Popup */
  $('.popup-youtube, .popup-vimeo').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: function (url) {
            var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
            if (!m || !m[1]) return null;
            return m[1];
          },
          src: 'https://www.youtube.com/embed/%id%?autoplay=1',
        },
        vimeo: {
          index: 'vimeo.com/',
          id: function (url) {
            var m = url.match(
              /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/
            );
            if (!m || !m[5]) return null;
            return m[5];
          },
          src: 'https://player.vimeo.com/video/%id%?autoplay=1',
        },
      },
    },
  });

  /* Details Lightbox - Magnific Popup */
  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false /* keep it false to avoid html tag shift with margin-right: 17px */,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom',
  });

  /* Move Form Fields Label When User Types */
  // for input and textarea fields
  $('input, textarea').keyup(function () {
    if ($(this).val() != '') {
      $(this).addClass('notEmpty');
    } else {
      $(this).removeClass('notEmpty');
    }
  });

  /* Registration Form */
  $('#registrationForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        rformError();
        rsubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        rsubmitForm();
      }
    });

  function rsubmitForm() {
    // initiate variables with form content
    var name = $('#rname').val();
    var email = $('#remail').val();
    var phone = $('#rphone').val();
    var terms = $('#rterms').val();

    $.ajax({
      type: 'POST',
      url: 'php/registrationform-process.php',
      data:
        'name=' +
        name +
        '&email=' +
        email +
        '&phone=' +
        phone +
        '&terms=' +
        terms,
      success: function (text) {
        if (text == 'success') {
          rformSuccess();
        } else {
          rformError();
          rsubmitMSG(false, text);
        }
      },
    });
  }

  function rformSuccess() {
    $('#registrationForm')[0].reset();
    rsubmitMSG(true, 'Request Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function rformError() {
    $('#registrationForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function rsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#rmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Newsletter Form */
  $('#newsletterForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        nformError();
        nsubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        nsubmitForm();
      }
    });

  function nsubmitForm() {
    // initiate variables with form content
    var email = $('#nemail').val();
    var terms = $('#nterms').val();
    $.ajax({
      type: 'POST',
      url: 'php/newsletterform-process.php',
      data: 'email=' + email + '&terms=' + terms,
      success: function (text) {
        if (text == 'success') {
          nformSuccess();
        } else {
          nformError();
          nsubmitMSG(false, text);
        }
      },
    });
  }

  function nformSuccess() {
    $('#newsletterForm')[0].reset();
    nsubmitMSG(true, 'Subscribed!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function nformError() {
    $('#newsletterForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function nsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#nmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Contact Form */
  $('#contactForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        cformError();
        csubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        csubmitForm();
      }
    });

  function csubmitForm() {
    // initiate variables with form content
    var name = $('#cname').val();
    var email = $('#cemail').val();
    var message = $('#cmessage').val();
    var terms = $('#cterms').val();
    $.ajax({
      type: 'POST',
      url: 'php/contactform-process.php',
      data:
        'name=' +
        name +
        '&email=' +
        email +
        '&message=' +
        message +
        '&terms=' +
        terms,
      success: function (text) {
        if (text == 'success') {
          cformSuccess();
        } else {
          cformError();
          csubmitMSG(false, text);
        }
      },
    });
  }

  function cformSuccess() {
    $('#contactForm')[0].reset();
    csubmitMSG(true, 'Message Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
    $('textarea').removeClass('notEmpty'); // resets the field label after submission
  }

  function cformError() {
    $('#contactForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function csubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#cmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Privacy Form */
  $('#privacyForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        pformError();
        psubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        psubmitForm();
      }
    });

  function psubmitForm() {
    // initiate variables with form content
    var name = $('#pname').val();
    var email = $('#pemail').val();
    var select = $('#pselect').val();
    var terms = $('#pterms').val();

    $.ajax({
      type: 'POST',
      url: 'php/privacyform-process.php',
      data:
        'name=' +
        name +
        '&email=' +
        email +
        '&select=' +
        select +
        '&terms=' +
        terms,
      success: function (text) {
        if (text == 'success') {
          pformSuccess();
        } else {
          pformError();
          psubmitMSG(false, text);
        }
      },
    });
  }

  function pformSuccess() {
    $('#privacyForm')[0].reset();
    psubmitMSG(true, 'Request Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function pformError() {
    $('#privacyForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function psubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#pmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Back To Top Button */
  // create the back to top button
  $('body').prepend(
    '<a href="body" class="back-to-top page-scroll">Back to Top</a>'
  );
  var amountScrolled = 700;
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $('a.back-to-top').fadeIn('500');
    } else {
      $('a.back-to-top').fadeOut('500');
    }
  });

  /* Removes Long Focus On Buttons */
  $('.button, a, button').mouseup(function () {
    $(this).blur();
  });

  document.querySelectorAll('.expand-btn').forEach((button) => {
    button.addEventListener('click', function () {
      const descContainer = this.parentElement;
      const desc =
        descContainer.querySelector('.course-desc') ||
        descContainer.querySelector('.professor-desc');
      const card = this.closest('.card');

      if (desc) {
        desc.classList.toggle('expanded');
        this.classList.toggle('expanded');
        if (card) {
          card.classList.toggle('expanded');
        }

        // Força recálculo da altura
        if (desc.classList.contains('expanded')) {
          const height = desc.scrollHeight;
          desc.style.height = height + 'px';
        } else {
          desc.style.height = desc.classList.contains('professor-desc')
            ? '80px'
            : '60px';
        }
      }
    });
  });
})(jQuery);
