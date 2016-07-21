function affixScrollHandler(e){
    var elem=document.getElementsByClassName("banner");
    if(document.body.scrollTop >= elem[0].offsetHeight){
        document.getElementsByClassName("affix")[0].style.backgroundColor="rgba(255,255,255,1)";
    }else{
        document.getElementsByClassName("affix")[0].style.backgroundColor="rgba(255,255,255,0.1)";
    }
}

function carouselClickHandler(e){
    $(jQuery(e.target).attr('data-target') + " .carousel-indicators").children().removeClass("active");
    $(e.target).addClass("active");
    var elem=$(jQuery(e.target).attr('data-target') + " .carousel-inner").children();
    elem.removeClass("active");
    elem.eq(jQuery(e.target).attr('data-slide-to')).addClass("active");
    e.data.reset();
}

function tabClickHandler(e){
    var currentAttrValue=jQuery(e.target).attr('href');
    jQuery('.nav-tabs ' + currentAttrValue).show().siblings().hide();
    jQuery(e.target).addClass('active').parent("li").siblings().children().removeClass('active');
    e.preventDefault();
}

function AnimateCarousel(c){
    var timer;
    this.start = function(){
        timer=setInterval(function(){
        var elem=$("#"+$(c).attr("id")+" .carousel-inner .item");
        for(var i=0; i<2; i++){
            $.each(elem, function(i,v){
                if($(v).hasClass("active")){
                    $(v).removeClass("active");
                    if(i<elem.length-1){
                        $(v).next().addClass("active");
                    }else{
                        $(elem).eq(0).addClass("active");
                    }
                    return false;
                }
            });
            elem=$("#"+$(c).attr("id")+" .carousel-indicators li");
        }
    }, 5000);
    }; 
    this.stop = function(){
        if(timer)
            clearInterval(timer);
    }; 
    this.reset = function(){
        this.stop();
        this.start();
        return this;
    }    
}