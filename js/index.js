/**
 * Created by Administrator on 2016/4/10.
 */
(function(){
    var max=5;
    var now = { row:1, col:1 }, last = { row:1, col:1};
    const towards = { up:1, right:2, down:3, left:4};
    var isAnimating = false;

    document.body.onmousewheel = function(event) {
        event = event || window.event;
        if(event.wheelDelta==-120){
           Up();

        }else {
            Down();
        }

    };
    document.addEventListener('touchmove',function(event){
        event.preventDefault(); },false);

    $(document).swipeUp(function(){
        Up();
    })

    $(document).swipeDown(function(){
        Down();
    })

    function Up(){
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row != max) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
    }
    function Down(){
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}
    }
    $(document).swipeLeft(function(){
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row>1 && last.row<5 && last.col<4) { now.row = last.row; now.col = last.col+1; pageMove(towards.left);}
    })

    $(document).swipeRight(function(){
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row>1 && last.row<5 && last.col>1) { now.row = last.row; now.col = last.col-1; pageMove(towards.right);}
    })

    function pageMove(tw){
        var lastPage = ".page-"+last.row+"-"+last.col,
            nowPage = ".page-"+now.row+"-"+now.col;

        switch(tw) {
            case towards.up:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case towards.right:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case towards.down:
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case towards.left:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
        }
        isAnimating = true;
        $(nowPage).removeClass("hide");

        $(lastPage).addClass(outClass);
        $(nowPage).addClass(inClass);

        setTimeout(function(){
            $(lastPage).removeClass('page-current');
            $(lastPage).removeClass(outClass);
            $(lastPage).addClass("hide");
            $(lastPage).find("img").addClass("hide");
            $(lastPage).find("p").addClass("hide");
            $(lastPage).find("div").addClass("hide");
            $(nowPage).addClass('page-current');
            $(nowPage).removeClass(inClass);
            $(nowPage).find("img").removeClass("hide");
            $(nowPage).find("p").removeClass("hide");
            $(nowPage).find("div").removeClass("hide");
            isAnimating = false;
        },600);
    }


    var canvas=document.getElementById('canvas');
    var width=window.innerWidth;
    var height=window.innerHeight;
    var w=10;
    var ctx=canvas.getContext('2d');
    var arr=[5,6,7,8,9,10,11,10,9,8,7,6,5,5,6,7,8,9,10,11,10,9,8,7,6,5];
    var q=0;
    var run=setInterval(function(){
       ctx.clearRect(0,0,width,height);
        ctx.fillStyle = '#ff0000';
        for(var i=0;i<arr.length;i++){
            ctx.fillRect(i*15,0,w,arr[(i+q)%arr.length]*5);
        }
        q++;
        if(q==arr.length){q=0;}
    },100);
})();
