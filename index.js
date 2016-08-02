$(function(){
	//换扑克的内容
	var poker=[];
	var colors=['h','s','c','d']  //红桃  黑桃  梅花  方片
	// var numbers=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	var biao={};
	
	while(poker.length<52) {
		var huases=colors[Math.floor(Math.random()*4)]
		var num=Math.ceil(Math.random()*13)
		var item={huase:huases,number:num}
		if (!biao[huases+'-'+num]) {
			poker.push(item);
			biao[huases+'-'+num]=true;
		};
	};
    // console.table(poker);
    // console.log(poker.length)
    // console.log(biao)


	//先将扑克添加到桌子上
	  //新建一个表
	var  dict={
		1:'A',
		2:'2',
		3:'3',
		4:'4',
		5:'5',
		6:'6',
		7:'7',
		8:'8',
		9:'9',
		10:'T',
		11:'J',
		12:'Q',
		13:'K',
	}
	var  d=0;
	var  index=0;
	for (var i = 0; i <7; i++) {
		for (var j = 0; j <i+1; j++) {
			index+=1;
		  	d +=90;
			$('<div>')
			.data('number',poker[index].number)
			.addClass('pai shang')
			.attr('id',i+'-'+j)
			.css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].huase+'.png)',
		          backgroundSize:'90px 120px',
		          backgroundPosition:'center center'})
			.appendTo('.zhuozi')
			.delay(d)
			.animate({
				top:i*60,left:(6-i)*50+j*100
			})
		};
	};
	for (; index < poker.length; index++) {
		    
			$('<div>')
			.data('number',poker[index].number)
			.addClass('zuo pai')
			.css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].huase+'.png)',
		          backgroundSize:'90px 120px',
		          backgroundPosition:'center center'})
			.appendTo('.zhuozi')
			.delay(index*100)
			.animate({     //动画前后的top,left值要不同这样才会有动画的效果，否则看不见效果
				top:500,
				left:160,
			})
			// console.log(index)
	};

    //给每一张被点击的扑克一个点击效果
       //声明一个压着的函数

    var youmeiyoubeiyazhu=function(e){
    	var tmp=$(e).attr('id').split('-');
          var x=Number(tmp[0]);
          var y=Number(tmp[1]);
          return $('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length; //返回一个盒子的长度如果有这个长度则说明有这个盒子
          
    }
    var shangyizhang=null;
    $('.zhuozi .pai').on('click',function(){
            if ($(this).hasClass('shang')&&youmeiyoubeiyazhu(this)) {
          	   return;
            }
    
        //第一种情况

            //本身是13的牌
            if ($(this).data('number')===13) {
                $(this).animate({
                    top:0,
                    left:600,
                    opacitiy:0
                }).queue(function(){
                    $(this).remove()
                })
                return;
            };
        //第二种情况    
            //给一个  出列的类名  以做标记  没有就添加，有就删除
            $(this).toggleClass('chulie');
            //判断有没有这个类名
            if ($(this).hasClass('chulie')) {

          	 $(this).animate({top:'-=30'})

          	}else{
          	 $(this).animate({top:'+=30'})
             // return;
          	}
            //第一次点击
          	if (!shangyizhang) {
                
                //点击第一张时
          	 	shangyizhang=$(this);
          	}else{
        
            //第二次点击
                // 点击第二张时          
                if (shangyizhang.data('number')+$(this).data('number')===13) {
                     $('.zhuozi .chulie') 
                	// shangyizhang
                    .delay(400)
                    .animate({
                        top:0,
                        left:600,
                        opacitiy:0}).queue(function(){
                	$(this).remove();	
                	})
                	
                	/*$(this).animate({
                        top:0,
                        left:600,
                        opacitiy:0}).queue(function(){
                		$(this).remove();
                	})*/
                }else{
                	/*shangyizhang
                    .delay(400)
                	.animate({
                		top:'+=30'
                	     }).removeClass('chulie')*/

                	/*$(this)*/
                    $('.zhuozi .chulie')
                    .removeClass('chulie')
                    .animate({
                		top:'+=30'
                	     })

                	
                };
                shangyizhang=null;
          	 }
          
    })

    //左键
    var zIndex=1;
    $('.zhuozi .right').on('click',function(){
    	zIndex+=1;
    	$('.zhuozi .pai.zuo')
    	.eq(-1)
    	.removeClass('zuo')
    	.addClass('you')
    	.animate({
    		top:500,
    		left:450,
    	})
    	.css({
    		zIndex:zIndex,
    	})
    })

    //右键
    var cishu=0;
    $('.zhuozi .left').on('click',function(){
        if ($('.zhuozi .zuo').length) {
            return;
        }
        cishu+=1;
        if (cishu>3) {

            return;
        }
    	$('.zhuozi .you').each(function(i,el){
    		$(this)
    		.delay(i*50)
    		.animate({
    			top:500,
    			left:160,
    		})
    		.css({zIndex:zIndex})
            .removeClass('you')
            .addClass('zuo')

    	})
    })



})