
	for(var i=3; i < $('.item').length; i++){
		$('.item').eq(i).addClass('move-right');
	}
	$(".item").hover(function(){
		$(this).removeClass('unhover');
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
		$(this).addClass('unhover');
	})


	 var block=false;

	$('.right-button').click(function(){

		if(block == false) {		
			moveRight();
		}
	});

	$('.left-button').click(function(){

		if(block == false) {		
			moveLeft();
		}
	});



function moveRight(){
			block = true;
			$('.visible').first().animate({
				left: '-' + ($('.slider-wrap').width()/2) + 'px',
				opacity: 0,
				height: 200 + 'px',
				width: 200 + 'px'
			}, 1000, function(){
				$(this).removeClass('visible first second third')
						.removeAttr('style')
						.addClass('move-right')
						.appendTo($('.slider-content'))
						.removeClass('move-left');
				$('.item').eq(2).removeClass('move-left').addClass('move-right').animate({
					right: '-180px',
					top: 0,
					opacity: 1,
					height: 150,
					width: 150			
				},1000, function(){
					 var first = $('.item').eq(0),
					 	second = $('.item').eq(1),
					 	third = $('.item').eq(2);
					 	third.removeClass('move-right move-left');
					first.animate({
						left:0
					},300, function(){
						$(this).removeClass('second').addClass('first').removeAttr('style');
					});
					second.animate({
						left: $('.slider-content').width()/2 - 75
					},300, function(){
						$(this).removeClass('third').addClass('second').removeAttr('style');
					});
					third.animate({
						right:0
					},300, function(){
						$(this).removeClass('move-right').addClass('visible third').removeAttr('style');
						block=false;
					});
				});
			});			
		}

function moveLeft(){
			block = true;

			$('.visible').last().animate({
				left:($('.slider-wrap').width()/2) + 150,
				opacity: 0,
				height: 200 + 'px',
				width: 200 + 'px'
			}, 1000, function(){
				$(this).removeClass('visible first second third')
						.removeAttr('style')
						.addClass('move-left');
				$('.item').last().prependTo($('.slider-content')).addClass('move-left');
				$('.item').eq(0).animate({
					left: '-180px',
					top: 0,
					opacity: 1,
					height: 150,
					width: 150			
				},1000, function(){
					 var first = $('.item').eq(0),
					 	second = $('.item').eq(1),
					 	third = $('.item').eq(2);
					 	first.removeClass('move-right move-left');
					first.animate({
						left:0
					},300, function(){
						$(this).removeClass('move-right').addClass('visible first').removeAttr('style');
					});
					second.animate({
						left: $('.slider-content').width()/2 - 75
					},300, function(){
						$(this).removeClass('first').addClass('second').removeAttr('style');
					});
					third.animate({
						right:0,
						left: $('.slider-content').width() - 150
					},300, function(){
						$(this).removeClass('second').addClass('third').removeAttr('style');
						block=false;
					});
				});
			});			
		}