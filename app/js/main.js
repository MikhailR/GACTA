$(function(){

  // Burger-menu
	$('#header-burger').on('click', function(e) {
		e.preventDefault();
    let navigation = $('#header-navigation'),
        menu = $('#header-menu');
    if($(this).hasClass('active')) {
      $(this).removeClass('active');
      navigation.fadeOut(400).removeClass('open');
      $('body').css('overflow','auto'); 
    } else {
        $(this).addClass('active');         
        navigation.fadeIn(400).addClass('open');
        $('body').css('overflow','hidden');

        navigation.on('mouseup', function (e){
          if (!menu.is(e.target) && menu.has(e.target).length === 0) {
            $('#header-burger').removeClass('active');
            navigation.fadeOut(400).removeClass('open');
            $('body').css('overflow','auto');
          }
        });
      }
	});

  // Remove action block to mobile menu
  let removeMenuElements = function() {
    if($(document).width() < 401) {
      $('#header-bottom').prepend($('#header-actions .header__contact-link'));
      $('#header-bottom').prepend($('#header-bottom .header__signin-link'));
    }
    else if($(document).width() < 577) {
      $('#header-actions').prepend($('#header-bottom .header__contact-link'));
			$('#header-bottom').prepend($('#header-actions .header__signin-link'));
		} else {
      $('#header-actions').prepend($('#header-bottom .header__contact-link'));
      $('#header-actions').prepend($('#header-bottom .header__signin-link'));
    }
	};
  removeMenuElements();

  $(window).on('resize', function(){
		removeMenuElements();

    // Reset actions in header during window-resize
    if($(window).width() > 992) {
      // Main HEADER menu with burger
      $('#header-burger').removeClass('active');
      $('#header-navigation').fadeOut(400).removeClass('open');
      $('.header__menu-arrow').removeClass('active').siblings('.submenu').slideUp(400).removeClass('open')
      $('body').css('overflow','auto');
    }
  });

  // Submenu on mobile
  $('.header__menu-arrow').on('click', function(){
    if($(window).width() < 993) {
      $(this).toggleClass('active').siblings('.submenu').slideToggle(400).toggleClass('open');
    }
  });

  // Slider with Events, Home page
  if($('.events__slider').length != 0) {
    let eventsSlider = new Swiper('.events__slider', {
      slidesPerView: 1,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      autoHeight: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: '.events__slider-arrow.swiper-button-next',
        prevEl: '.events__slider-arrow.swiper-button-prev',
      },
      pagination: {
        el: '.events__slider-pagination',
        type: 'bullets',
        clickable: true
      },
    });
  } 

  // Slider with Learning, Home page
  if($('.learning__slider').length != 0) {
    let eventsSlider = new Swiper('.learning__slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      autoHeight: true,
      navigation: {
        nextEl: '.learning__slider-arrow.swiper-button-next',
        prevEl: '.learning__slider-arrow.swiper-button-prev',
      },
      pagination: {
        el: '.learning__slider-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        769: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        993: {
              slidesPerView: 3,
            },
        }
    });
  } 

  // $('.header__submenu-back').on('click', function(e){
  //   e.preventDefault();
  //   $(this).removeClass('active');
  //   $('.submenu.open').removeClass('open');
  // });

  // $('.submenu__overlay').on('click', function(){
  //   if($(window).width() > 992) {
  //     $(this).parent('.submenu').removeClass('open');
  //   }
  // });

  // // Modal window
  // $('.modal-open').on('click', function(e){
  //   e.preventDefault();
  //   let id = $(this).data('modal');
  //   $('#' + id).fadeIn(300);
  //   $('body').css('overflow','hidden');
  // }); 
  
  // $('.modal__overlay, .modal__close').on('click', function(){
  //   let _this = $(this)
  //   _this.closest('.modal').fadeOut(300);
  //   // сброс формы, если будет нужен
  //   // _this.closest('.modal').find('form').trigger('reset');
  //   $('body').css('overflow','auto');
  // });

  // // Open\Close menu in footer on mobile
  // $('.footer__navigation-title button').on('click', function(e){
  //   e.preventDefault();
  //   if($(window).width() < 577) {
  //     $(this).toggleClass('active').parent().siblings('.footer__menu').slideToggle(300);
  //   }
  // });

  // // Custom Select 
	// $('.select').each(function() {
  //   const _this = $(this),
  //       mainForm = _this.closest('form'),
  //       selectOption = _this.find('option'),
  //       selectOptionLength = selectOption.length,
  //       selectedOption = selectOption.filter(':selected'),
  //       duration = 300;

  //   _this.hide();
  //   _this.wrap('<div class="select"></div>');
  //   $('<div>', {
  //       class: 'new-select',
  //       text: _this.data('placeholder')
  //   }).insertAfter(_this);

  //   const selectHead = _this.next('.new-select');
  //   selectHead.addClass('empty');
  //   $('<div>', {
  //       class: 'new-select__list'
  //   }).insertAfter(selectHead);

  //   const selectList = selectHead.next('.new-select__list');
  //   for (let i = 0; i < selectOptionLength; i++) {
  //       $('<div>', {
  //           class: 'new-select__item',
  //           html: $('<span>', {
  //               text: selectOption.eq(i).text()
  //           })
  //       })
  //       .attr('data-value', selectOption.eq(i).val())
  //       .appendTo(selectList);
  //   }

  //   const selectItem = selectList.find('.new-select__item');
  //   selectList.slideUp(0);
  //   selectHead.on('click', function() {  
  //       if ( !$(this).hasClass('on') ) {
  //         if($(this).hasClass('empty')) {
  //           $(this).css({'color':'transparent'});
  //         }
  //         if(mainForm.hasClass('dark-theme')) {
  //           $('.new-select.on').removeClass('on').css({'color':'#484848'}).next('.new-select__list').slideUp();
  //         } else {
  //           $('.new-select.on').removeClass('on').css({'color':'#6E6E73'}).next('.new-select__list').slideUp();
  //         }
					
  //           $(this).addClass('on');
  //           selectList.slideDown(duration);

  //           selectItem.on('click', function() {
  //             if(mainForm.hasClass('dark-theme')) {
  //               selectHead.removeClass('empty').css({'color':'#ffffff'});
  //             } else {
  //               selectHead.removeClass('empty').css({'color':'#000000'});
  //             }
  //             $(this).siblings('.selected').removeClass('selected');
  //             $(this).addClass('selected');
  //               let chooseItem = $(this).data('value');

  //               $('select').val(chooseItem).attr('selected', 'selected');
  //               selectHead.text( $(this).find('span').text() );

  //               selectList.slideUp(duration);
  //               selectHead.removeClass('on');
  //           });

  //       } else {
  //           $(this).removeClass('on');
  //           selectList.slideUp(duration);
  //           if($(this).hasClass('empty')) {
  //             if(mainForm.hasClass('dark-theme')) {
  //               $(this).css({'color':'#484848'});
  //             } else {
  //                 $(this).css({'color':'#6E6E73'});
  //             }
  //           }
  //       }
  //   });
  // });

  // // Mask for input[type="tel"]
  // // $('.request-form input[type="tel"]').each(function(){
  // //   $(this).mask("+380-99-999-99-99",{placeholder:"x"},{autoclear: false});
  // // }); 

  // // Date-input
  // $('.date-input').on('focus', function(){
  //   $(this).attr('type','date');
  // });

  // $('.date-input').on('blur', function(){
  //   if($(this).val() == '') {
  //     $(this).attr('type','text');
  //   }
  // });

  // // Drag'n'drop functional
  // let dropZone = $('.dragover');

  // dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function(){
  //   return false;
  // });
  
  // dropZone.on('dragover dragenter', function() {
  //   dropZone.addClass('dragg');
  // });
      
  // dropZone.on('dragleave', function(e) {
  //   let dx = e.pageX - dropZone.offset().left;
  //   let dy = e.pageY - dropZone.offset().top;
  //   if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
  //     dropZone.removeClass('dragg');
  //   };
  // });
  
  // dropZone.on('drop', function(e) {
  //   dropZone.removeClass('dragg');
  //   let files = e.originalEvent.dataTransfer.files;
  //   // В files находится массив с загруженным файлом
  //   // sendFiles(files);
  //   $(this).find('.dragover__upload-file').html(files[0].name);
  // });
  
  // $('#uploadFormFile').on('change', function() {
  //   let files = this.files[0];
  //   //  В files находится имя файла, который загрузили
  //   // sendFiles(files);
  //   $(this).closest('.dragover__text').siblings('.dragover__upload-file').html(files.name);
  // });

  // // Removed ERROR-class on focus
  // $('.contact-form input.required, .contact-form textarea.required').on('focus', function(){
  //   $(this).removeClass('error').siblings('.contact-form__error').slideUp(200).html('');
  // }); 

  // $('.new-select').on('click', function(){
  //   $(this).removeClass('error').siblings('select').removeClass('error').parent().siblings('.contact-form__error').slideUp(200).html('');
  // }); 

  // let validateInputs = function(input) {
	// 	let inputField = $(input),
  //       type = inputField.attr('type'),
  //       value = inputField.val(),
  //       letterNumber = 0;      
	// 	switch(type)
	// 	{
	// 		case 'text':	
  //       for(let i=0; i<value.length; i++) {
  //         if(value[i] != ' ') {
  //           letterNumber++;
  //         }
  //       }			
	// 			if(value == '') {
	// 				inputField.addClass('error').siblings('.contact-form__error').slideDown(200).html('Required field!');
	// 			} else
	// 				if(letterNumber == 0) {
	// 					inputField.addClass('error').siblings('.contact-form__error').slideDown(200).html('Required field!');
	// 				} else { 
	// 						inputField.removeClass('error').siblings('.contact-form__error').slideUp(200).html('');
	// 					}
	// 		break;
  //     case 'email':
	// 			let rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	// 			if(value == '') {
	// 				inputField.addClass('error').siblings('.contact-form__error').slideDown(200).html('Required field!');;
	// 			} else
	// 				if(rv_email.test(value)) {
	// 					inputField.removeClass('error').siblings('.contact-form__error').slideUp(200).html('');;
	// 				}	else {
  //           inputField.addClass('error').siblings('.contact-form__error').slideDown(200).html('Required field!');;
	// 					}
	// 		break;
  //     // case 'tel':
  //     //   for(let i=0; i<value.length; i++) {
  //     //     if(value[i] == 'x') {
  //     //       letterNumber++;
  //     //     }
  //     //   }
	// 		// 	if(value == '') {
	// 		// 		inputField.addClass('error').parent().addClass('error');
	// 		// 	} else
	// 		// 		if(letterNumber > 0) {
  //     //       inputField.addClass('error').parent().addClass('error');					
	// 		// 		}	else {
  //     //       inputField.removeClass('error').parent().removeClass('error');
	// 		// 			}
	// 		// break;
	// 		} 
	// };

  // $('.contact-form').on('submit',function(e){
  //   e.preventDefault();
  //   let currentForm = $(this),
  //       inputs = currentForm.find('input.required'),
  //       selects = currentForm.find('select.required');
  //       // messages = currentForm.find('textarea.required');

  //   inputs.each(function(){
  //     validateInputs($(this));
  //   });

  //   selects.each(function(){
  //     if($(this).siblings('.new-select').hasClass('empty')) {
  //       $(this).addClass('error').siblings('.new-select').addClass('error').parent().siblings('.contact-form__error').slideDown(200).html('Required field!');
  //     }
  //   });

  //   // if(messages.length != 0) {
  //   //   messages.each(function(){
  //   //     if($(this).val() === '') {
  //   //       $(this).addClass('error').siblings('.contact-form__error').slideDown(200).html('Required field!')
  //   //     }
  //   //   });
  //   // }

  //   let errorInputs = currentForm.find('input.required.error'),
  //       errorSelects = currentForm.find('select.required.error');
  //       // errorMessages = currentForm.find('textarea.required.error');
  //   if(errorInputs.length === 0 && errorSelects.length === 0) {
  //     // Обаботка и отправка запроса

  //     // если форма в модальном окне - закрываем его
  //     if(currentForm.hasClass('modal__form')) {        
  //       currentForm.closest('.modal').fadeOut(300);
  //       $('body').css('overflow','auto');
  //     }

  //     // если нужно модальное окно с ответом - показываем его
  //     if(currentForm.hasClass('thanks-modal')) { 
  //       $('#thanks-modal').fadeIn(300);
  //       $('body').css('overflow','hidden');
  //     }

  //     // сброс формы, если будет нужен
  //     // currentForm.trigger('reset');  
  //     } else {
  //       return false;
  //       }   
  // });


  // // Burger for Inner-pages navigation
	// $('#navi-button').on('click', function(e) {
  //   if($(this).hasClass('active')) {
  //     $(this).removeClass('active');
  //     $('#pages-menu-wrap').removeClass('open');
  //     $('body').css('overflow','auto'); 
  //   } else {
  //       $(this).addClass('active');         
  //       $('#pages-menu-wrap').addClass('open');
  //       $('body').css('overflow','hidden');
  //     }
	// });

  // $('.pages-navi__overlay').on('click', function(){
  //   if($(window).width() < 993) {
  //     $('#pages-menu-wrap').removeClass('open');
  //     $('#navi-button').removeClass('active');
  //   }
  // });

  // // Animated counters
  // if($('.animated-block').length != 0) {
  //   $('.animated-block').each(function(){
  //     let topOffset = $(this).offset().top;
  //     $(window).on("scroll", function () {
  //       if (($(this).scrollTop() + $(this).height() - 100) > topOffset) {
  //         let i = 0;
  //         if(i === 0) {
  //           $('.animated-counter span').each(function() {
  //             $(this).prop('Counter',0).animate({
  //               Counter:$(this).data('counter')
  //             },{
  //               duration: 3000,
  //               easing: 'swing',
  //               step:function(now) {
  //                 $(this).text(Math.ceil(now));
  //               }
  //             });
  //           });
  //           i++;
  //         }; 
  //       };
  //     });
  //   });
  // } 



  // // Slider on page "Services Umbraco"
  // if($('.umbraco-slider').length != 0) {
  //   let stagessSlider = new Swiper('.umbraco-slider', {
  //     slidesPerView: 'auto',
  //     watchOverflow: true,
  //     observer: true,
  //     observeParents: true,
  //     observeSlideChildren: true,
  //     navigation: {
  //       nextEl: '.umbraco-slider__arrow.next',
  //       prevEl: '.umbraco-slider__arrow.prev',
  //     },
  //     breakpoints: {
  //       993: {
  //         spaceBetween: 22,
  //         slidesPerView: 3,
  //       },
  //     }
  //   });
  // } 

//   // Tooltip in Tariff slider
//   $('.tooltip__icon').on('click', function(e){
//     e.preventDefault();
//     let infoBlock = $(this).siblings('.tooltip__info');
//     if(infoBlock.hasClass('open')) {
//       infoBlock.fadeOut(300).removeClass('open');
//     } else {
//         $('.tooltip__info.open').fadeOut(300).removeClass('open');
//         infoBlock.fadeIn(300).addClass('open');
//       }
    
//   });

//   // Loader in articles/blog
//   $('.load-block__button').on('click', function(e){
//     e.preventDefault();
//     let _this = $(this);
//     _this.addClass('hidden').siblings('.load-block__animation').addClass('active');
//     // исчезновение лоадера и появление кнопки сделал просто отложенно.
//     // Отключение классов нужно будет выполнять после подгрузки новых данных
//     setTimeout(function(){
//       _this.removeClass('hidden').siblings('.load-block__animation').removeClass('active');
//     }, 5000);
//   });

//   // Slider with Reviews
//   if($('.reviews__slider').length != 0) {
//     let reviewsSlider = new Swiper('.reviews__slider', {
//       slidesPerView: 1,
//       spaceBetween: 22,
//       watchOverflow: true,
//       observer: true,
//       observeParents: true,
//       observeSlideChildren: true,
//       navigation: {
//         nextEl: '.reviews__arrow.next',
//         prevEl: '.reviews__arrow.prev',
//       },
//       breakpoints: {
//         576: {
//           slidesPerView: 2,
//           spaceBetween: 26,
//         },
//         850: {
//           slidesPerView: 3,
//           spaceBetween: 26,
//         },
//       }
//     });
//   } 

//   // Slider with Performans
//   if($('.performans__slider').length != 0) {
//     let reviewsSlider = new Swiper('.performans__slider', {
//       slidesPerView: 1,
//       spaceBetween: 19,
//       autoHeight: true,
//       watchOverflow: true,
//       observer: true,
//       observeParents: true,
//       observeSlideChildren: true,
//       navigation: {
//         nextEl: '.performans__arrow.next',
//         prevEl: '.performans__arrow.prev',
//       },
//       breakpoints: {
//         576: {
//           slidesPerView: 2,
//           spaceBetween: 26,
//           autoHeight: false,
//         },
//         850: {
//           slidesPerView: 3,
//           spaceBetween: 26,
//           autoHeight: false,
//         },
//       }
//     });
//   } 

//   // Raiting
//   if($('.raiting').length != 0) {
//     $('.raiting').each(function(){
//       let _this = $(this),
//           amount = _this.data('raiting'),
//           stars = _this.find('.raiting__stars svg');

//       for(let i=0; i < Math.trunc(amount); i++) {
//         stars.eq(i).addClass('fill');
//       }
//     });
//   }

//   // Choice slider
//   if($('.about-choice__slider').length != 0) {
//     let aboutSlider = new Swiper('.about-choice__slider', {
//       slidesPerView: 1,
//       autoHeight: true,
//       watchOverflow: true,
//       observer: true,
//       observeParents: true,
//       observeSlideChildren: true,
//       navigation: {
//         nextEl: '.about-choice__arrow.next',
//         prevEl: '.about-choice__arrow.prev',
//       },
//       breakpoints: {
//         576: {
//           slidesPerView: 2,
//           autoHeight: false,
//         },
//         850: {
//           slidesPerView: 3,
//           spaceBetween: 24,
//           autoHeight: false,
//         },
//       }
//     });
//   }

//   // FAQ
//   $('.faq-item__question').on('click', function(e){
//     e.preventDefault();
//     $(this).toggleClass('active').siblings('.faq-item__answer').slideToggle(400);
//   });





//   // Show hidden block in section "Tarriffs" on page "Streaming"
//   $('.streaming-pricing__item-more').on('click', function(e){
//     e.preventDefault();
//     $(this).fadeOut(0).siblings('.streaming-pricing__hide-block').slideDown(300);
//   });

//   // Wropdown
//   $('.dropdown__main-button').on('click', function(e){
//     e.preventDefault();
//     $(this).toggleClass('active').siblings('.dropdown__list').slideToggle(300);
//   }); 

//   $('.dropdown__list-item').on('click', function(e){
//     e.preventDefault();
//     if(!$(this).hasClass('selected')) {
//       let parent = $(this).parent(),
//           mainButton = $(this).parent().siblings('.dropdown__main-button');

//       parent.slideUp(300).find('.selected').removeClass('selected');
//       $(this).addClass('selected');
//       mainButton.removeClass('active').html($(this).html());
//     }
//     let text = $(this).html();
//     $(this).siblings('.dropdown__list').slideToggle(300);
//   });

//   // Block with Flags select
//   $('.phone-block__flags-choice').on('click', function(e){
//     e.preventDefault();
//     if(!$(this).hasClass('active')) {
//       $(this).addClass('active').next().slideDown(300);
//     } else {
//         $(this).removeClass('active').next().slideUp(300);
//       }
//   });

//   $('.phone-block__input').mask("+ 1 (999) 999-99-99",{autoclear: false});

//   $('.phone-block__flag').on('click', function(){
//     let newSrc = $(this).find('img').attr('src'),
//         choiceImage = $(this).parent().siblings('.phone-block__flags-choice').find('img'),
//         country = $(this).data('country'),
//         code = $(this).data('code'),
//         phoneInput = $(this).closest('.phone-block__flags-wrap').siblings('input');
//     $(this).parent('.phone-block__flags').slideUp(200).siblings('.phone-block__flags-choice').removeClass('active');
//     phoneInput.attr('placeholder', code);
//     choiceImage.attr('src', newSrc);
//     switch(country){
//       case 'usa':
//         console.log('USA');
//         phoneInput.mask("(999) 999-999",{autoclear: false});
//       break;
//       case 'jamaica':
//         console.log('Jamaica');
//         phoneInput.mask("+9 (999) 999-9999",{autoclear: false});
//       break;
//     } 
//   });


  
  
//    // Smooth scroll to sections
//    $('.scroll-link').on('click', function (e) {
//     e.preventDefault();
//     let id = $(this).attr('href'),
//         top = $('#' + id).offset().top;
//     $('html, body').animate({scrollTop: top}, 700);
//   });

//   // Scrolled sidebar
//   let scrolledSidebar = function() {
//     if($(window).width() > 768) {
//       let scrollWrapper = $('#scrolled-section'),
//         scrollWrapperHeight = scrollWrapper.outerHeight(),
//         scrollWrapperOffsetTop = scrollWrapper.offset().top,
//         scrollWrapperOffsetBottom = scrollWrapperOffsetTop + scrollWrapperHeight,
//         scrollContent = $('#scrolled-sidebar'),
//         scrollContentHeight = scrollContent.outerHeight(),
//         scrollContentOffsetTop = scrollContent.offset().top,
//         scrollContentOffsetBottom = scrollContentOffsetTop + scrollContentHeight;
//       $(window).on('scroll', function(){
//         let scrolled = $(this).scrollTop();
//         if(scrolled >= scrollWrapperOffsetTop) {
//           scrollWrapper.addClass('fixed');
//         } else if(scrolled < scrollWrapperOffsetTop) {
//               scrollWrapper.removeClass('fixed');
//             }
//         let fixedBottomPoint = scrollWrapperOffsetBottom - scrollContentHeight;
//         if(scrolled >= fixedBottomPoint) {
//           scrollWrapper.removeClass('fixed').addClass('absolute');
//           scrollContent.css({top: fixedBottomPoint - scrollWrapperOffsetTop});
//         } else if(scrolled < fixedBottomPoint && scrollWrapper.hasClass('absolute')) {
//               scrollWrapper.removeClass('absolute').addClass('fixed');
//             }
//       });
//     } else {
//       $('#scrolled-section').removeClass('absolute fixed');
//       return false;      
//     }
//   };

//   if($('#scrolled-section').length != 0) {
//     scrolledSidebar();

//     // Scroll indication in menu, section "Terms" 
//     $(window).on("scroll", function () {
//       if ($(this).scrollTop() > 0) {
//         let scrollElements = $('[data-indicator="scroll-element"]');
//         scrollElements.each(function (index, element) {
//           let top = $(element).offset().top,
//             scroll = $(window).scrollTop(),
//             windowHeight = $(window).height(),
//             id = $(element).attr("id");
//           if (scroll > (top - windowHeight * 0.7)) {
//             $(".scroll-section__list-link.active").removeClass("active");
//             $('.scroll-section__list-link[href="' + id + '"]').addClass("active");
//           }
//         });
//       };
//     });
//   }

//   // Change active link in Sticky menu
//   $('.scroll-section__list-link').on('click', function(e){
//     $('.scroll-section__list-link.active').removeClass('active');
//     $(this).addClass('active');
//   });

});