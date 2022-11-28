var codeList=[];
var colors =["green","red","yellow","blue"];
var playing = false;
var count;

$("body").keypress( function(event){

  if (!playing){
    count=0;
    $("h1#level-title").text("Level "+ (count+1));
    playing = true;
    codeList=[];

    codeList[codeList.length]=colors[Math.floor(Math.random()*4)] ;

    makeAnimation( false, codeList[codeList.length-1] );
    makeSound(  codeList[codeList.length-1] );
  }

});

$(".btn").click( function(event){

  if (playing){

    if ( $(this).attr('id') === codeList[count]){

      makeAnimation(true, codeList[count]);
      makeSound( codeList[count]  );

      count++;
    }else{
      gameOver( $(this).attr('id') ) ;
    }

    if(count === codeList.length){
      codeList[codeList.length]= colors[Math.floor(Math.random()*4)] ;

      setTimeout( function(){
        makeAnimation( false, codeList[codeList.length-1] );
        makeSound( codeList[codeList.length-1] );
      }, 750);

      $("h1#level-title").text("Level "+ (count+1));
      count=0;
    }
  }else{
    gameOver( $(this).attr('id') ) ;
  }

});

function makeSound(color){
    var audio=new Audio('sounds/'+color+'.mp3');
    audio.play();
}

function makeAnimation(press,color){

  if(press){
    $("#"+color).addClass("pressed");
    setTimeout( function(){
      $("#"+color).removeClass("pressed");
    }, 100);
  }else{
    // $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+color).animate({opacity: 0}, 100);
    setTimeout( function(){
      $("#"+color).animate({opacity: 1}, 100);
    }, 100);
  }

}

function gameOver( id ){
  count=0;
  playing=false;
  $("body").addClass("game-over");
  $("h1#level-title").text("Game Over, Press Any to Restart");
  setTimeout( function(){
    $("body").removeClass("game-over");
  }, 500);
  makeAnimation( true, id );
  makeSound(  id  );
  makeSound("wrong");
}
