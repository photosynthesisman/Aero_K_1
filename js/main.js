$(document).ready(function () {

  let myPopup = document.querySelector('.popup'),
  closeBtn = myPopup.querySelector('button'),
  oneDayCheck = document.querySelector('#nomore');

  function checkcookie(name){
      var cookies = document.cookie.split(';');
      var visited = false;

      for(ck of cookies){
          if(ck.indexOf(name) > -1){
              visited = true;
          }                
      }
      if(visited == true){
          myPopup.style.display = 'none';            
      }else{
          myPopup.style.display = 'block';        
      }
  }
  checkcookie('aeroK1');

  function setCookie(name,value,day){           
      var date = new Date();
      date.setDate(date.getDate()+day);

      var myCookie = '';
      myCookie = `${name}=${value};Expires=${date.toUTCString()}`;            
      document.cookie = myCookie;
  }//setcookie

  function deleteCookie(name,value){                
      var date = new Date();            
      date.setDate(date.getDate()-1);

      var myCookie = '';
      myCookie = `${name}=${value};Expires=${date.toUTCString()}`;   
      document.cookie = myCookie;
  }

  closeBtn.addEventListener('click',()=>{
      if(!oneDayCheck.checked){ 
          deleteCookie('aeroK1','home');
      }else{
          setCookie('aeroK1','home',1);
      }
  myPopup.style.display = 'none';
  });

  function observer() {
    const bannerElems = document.querySelectorAll('.banner');
    const sectionElems = document.querySelectorAll('section');
    const patternElems = document.querySelectorAll('.pattern > div');
    const imgboxElems = document.querySelectorAll('.img_box > div');

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    });
    patternElems.forEach((el) => {
      io.observe(el);
    });
    bannerElems.forEach((el) => {
      io.observe(el);
    });
    sectionElems.forEach((el) => {
      io.observe(el);
    });
    imgboxElems.forEach((el) => {
      io.observe(el);
    });
  }

  $(window).scroll(function () {
    var scrollAmt = $(window).scrollTop();
    if (scrollAmt > 0) {
      $('.bottom_nav').css({ opacity: '1' });
    } else {
      $('.bottom_nav').css({ opacity: '0' });
    }
  });

  function dateSelection(){
    $('.calendar_box input').on('input',function () {
      $(this).removeClass('hideDate')
    })
  }

  function selection() {
    // $('select[name=departure]').change(function () {
    // $('select[name=departure]').on('input', function () {
    // 인풋박스 바로 반영

    $('select[name=departure]').change(function () {
      const val = $(this).val();
      const option = $(this).find($('option[value=' + val + ']'));
      const dtOption = $('select[name=destination]').find($('option[value=' + val + ']'));
      const selecteded = $(this).find($('option:selected'));
      const dataAirport = option.data('airport');
      const siblingValue = $(this).parent().siblings('.select_box').find('select').val();
      
      dtOption.siblings().removeClass('delete')      
      dtOption.addClass('delete')
    });

    $('select[name=destination]').change(function () {
      const val = $(this).val();
      const option = $(this).find($('option[value=' + val + ']'));
      const dpOption = $('select[name=departure]').find($('option[value=' + val + ']'));
      const selecteded = $(this).find($('option:selected'));
      const dataAirport = option.data('airport');
      const siblingValue = $(this).parent().siblings('.select_box').find('select').val();

      dpOption.siblings().removeClass('delete')      
      dpOption.addClass('delete')
   
    });

    $('.switch_btn').click(function (e) {
      e.preventDefault;
      $('.departure').toggleClass('orderTo');
      $('.destination').toggleClass('orderTo');
    });
  }

  function popupEvent() {
    let scrollPosition = 0;        
    const body = document.querySelector('body');

    function enable() {
      scrollPosition = window.pageYOffset;
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollPosition}px`;
      body.style.width = '100%';
    }
    
    function disable() {
      body.style.removeProperty('overflow');
      body.style.removeProperty('position');
      body.style.removeProperty('top');
      body.style.removeProperty('width');
      window.scrollTo(0, scrollPosition);
    }
    
    $('.popup_open').click(function (e) {
      e.preventDefault;
      enable();
      $('.popup_num').addClass('slide');
    });
    $('.close').click(function (e) {
      e.preventDefault;
      disable();
      $('.popup_num').removeClass('slide');
    });
    $('.popfooter .prev').click(function (e) {
      e.preventDefault;
      disable();
      $('.popup_num').removeClass('slide');
    });
    $('.popfooter .finish').click(function (e) {
      e.preventDefault;
      const calculated = document.querySelector('.calculated').innerText;
      disable();
      $('.popup_num').removeClass('slide');
      $('.input_wrap .number_box').text(calculated);
      if (calculated == '') {
        $('.input_wrap .number_box').html('<span class=' + 'classify' + '>' + '성인</span>' + '<span class=' + '"num"' + '>1</span>');
      }
      $('.input_wrap .number_box').append('<a href=' + '#none ' + 'class=' + '"popup"' + '></a>');
      $('.popup').click(function (e) {
        e.preventDefault;
        $('.popup_num').addClass('slide');
        enable();
      });
    });
  }

  const plusBtn = $('.spin_box').find('.plus');
  const minusBtn = $('.spin_box').find('.minus');

  plusBtn.click(function () {
    let amount = $(this).siblings('.data_num');
    let currentAmount = amount.text();
    currentAmount++;
    amount.text(currentAmount);
    if (currentAmount > 0) {
      $(this).siblings('.minus').removeClass('disabled');
      let classes = $(this).parent().siblings().parent().attr('class');
      $('.calculated')
        .children('.' + classes)
        .addClass('show');

      let numberOfadult = $('.adult').find('.data_num').text();
      let numberOfchild = $('.child').find('.data_num').text();
      let numberOfbabe = $('.babe').find('.data_num').text();

      if (
        $('.calculated')
          .children('.' + classes)
          .is('.adult') == true
      ) {
        $('.calculated').find('.adult .num').text(numberOfadult);

        $('.calculated').find('.babe .num').text(numberOfbabe);
      } else if (
        $('.calculated')
          .children('.' + classes)
          .is('.child') == true
      ) {
        $('.calculated').find('.child .num').text(numberOfchild);
      } else if (
        $('.calculated')
          .children('.' + classes)
          .is('.babe') == true
      ) {
        $('.calculated').find('.babe .num').text(numberOfbabe);
      }
    }
  });

  minusBtn.click(function (e) {
    let amount = $(this).siblings('.data_num');
    var currentAmount = amount.text();
    console.log(currentAmount);
    let classes = $(this).parent().siblings().parent().attr('class');
    if (currentAmount == 1) {
      $(this).addClass('disabled');
      amount.text(0);
      $('.calculated')
        .children('.' + classes)
        .removeClass('show');
    } else if (currentAmount > 1) {
      amount.text(--currentAmount);
      let classes = $(this).parent().siblings().parent().attr('class');
      $('.calculated')
        .children('.' + classes)
        .addClass('show');

      let numberOfadult = $('.adult').find('.data_num').text();
      let numberOfchild = $('.child').find('.data_num').text();
      let numberOfbabe = $('.babe').find('.data_num').text();

      if (
        $('.calculated')
          .children('.' + classes)
          .is('.adult') == true
      ) {
        $('.calculated').find('.adult .num').text(numberOfadult);
      } else if (
        $('.calculated')
          .children('.' + classes)
          .is('.child') == true
      ) {
        $('.calculated').find('.child .num').text(numberOfchild);
      } else if (
        $('.calculated')
          .children('.' + classes)
          .is('.babe') == true
      ) {
        $('.calculated').find('.babe .num').text(numberOfbabe);
      }
    }
  });

  function tab1() {
    $('.tab a').click(function (e) {
      e.preventDefault();
      const tabMenu = $(this);
      const tabIndex = tabMenu.parent().index();
      const tabPanel = $('.tab_panel');

      $(this).parent().addClass('active').siblings().removeClass('active');
      tabPanel.removeClass('active');
      tabPanel.eq(tabIndex).addClass('active');
    });
  }
  function swiper() {
    const swiper = new Swiper('.main_slide .swiper', {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    });
    swiper.on('transitionEnd', function () {
      let num1 = swiper.realIndex + 1;
      $('.scroll_bar').find($('.bar').css('width', 25 * num1 + '%'));
    });
    $('.slide_control')
      .find($('.pause'))
      .click(function (e) {
        swiper.autoplay.stop();
        $(this).css('display', 'none');
        $(this).siblings($('.play')).css('display', 'inline-block');
      });
    $('.slide_control')
      .find($('.play'))
      .click(function (e) {
        swiper.autoplay.start();
        $(this).css('display', 'none');
        $(this).siblings($('.pause')).css('display', 'inline-block');
      });
  }
  function swiper1() {
    const swiper = new Swiper('.accommodation .swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerView: 'auto',
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24
    });
    const swiper1 = new Swiper('.activity .swiper', {
      slidesPerView: 1,
      spaceBetween: 28,
      slidesPerView: 'auto',
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24
    });
    const swiper2 = new Swiper('.intro .swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerView: 'auto',
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24

    });
    // const swiper2 = new Swiper(".intro .swiper", {
    //   slidesPerView: 'auto',      
    //   grabCursor: true,      
    //   effect: "creative",
    //   creativeEffect: {
    //     prev: {
    //       shadow: true,
    //       translate: ["-100%", 0, -1],
    //     },
    //     next: {
    //       translate: ["100%", 0, 0],
    //     },
    //   },
    // });
  }
  // const swiper2 = new Swiper('.swiper', {
    // slidesPerView: 1,
    // spaceBetween: 20,
    // slidesPerView: 'auto',
    // slidesOffsetBefore: 24,
    // slidesOffsetAfter: 24
    // swiper2를 배열로 불러오기 때문에
    // swiper2[0].slideTo(swiper Options)
    // swiper2[1].slideTo(swiper Options)
    // 이런 식으로 각각 컨트롤 가능
    //
    // $('').data('taran') //불러올 때
    // $('').data('taran', 'lalala') //입력할 때
    // $('').data('taran') //
  // });
  selection();
  popupEvent();
  swiper();
  swiper1();
  tab1();
  observer();
  dateSelection()
});
