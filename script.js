document.addEventListener("DOMContentLoaded", function (event) {
    var fieldWidth = 500;
    var fieldHeight = 500;
    var fieldOne = 25;
    var score = 0;
    var count = 0;

    window.addEventListener('resize',orientFun,false);
    function orientFun(EO){
        EO=EO||window.event;
        var boxContent=document.getElementById('box-content');
        var canvas = document.getElementById('canvas1');
        var screenHeight=window.innerHeight;
        boxContent.style.width=screenHeight-20+'px';
        boxContent.style.height=canvas.offsetWidth+'px';
        boxContent.style.margin=10+'px'; 
    }


    var canvas = document.getElementById('canvas1');
    canvas.setAttribute('width', fieldWidth);
    canvas.setAttribute('height', fieldHeight);
    var context = canvas.getContext('2d');

    var snakeHead = new Image();
    snakeHead.src = 'snakeHead.svg';

    var snakeTail = new Image();
    snakeTail.src = 'snakeTail.svg';

    var smallerTail = new Image();
    smallerTail.src = 'smallerTail.svg';

    var smallTail = new Image();
    smallTail.src = 'smallTail.svg';

    var smallxTail = new Image();
    smallxTail.src = 'smallxTail.svg';

    var heart = new Image();
    heart.src = 'heart.png';

    var emptyheart = new Image();
    emptyheart.src = 'emptyheart.png';

    var redHeartImg = new Image();
    redHeartImg.src = 'redheart.png';

    var redheart = {
        posX: fieldOne * 10,//out of field
        posY: fieldOne
    };

    var foodImg = new Image();
    function randomDiap(n, m) {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    }

    var eatAudio = new Audio();
    eatAudio.src = "eatAudio.mp3";

    var eatTailAudio = new Audio();
    eatTailAudio.src = "eatTailAudio.mp3";

    var slowHeart = new Audio();
    slowHeart.src = 'slowheart.wav';

    function foodSrc() {
        var links = ['', 'pizza.png', 'burger.png', 'hot-dog.png', 'frees.png', 'bigPizza.png'];
        n = randomDiap(1, 5);
        src = links[n];
        return src;
    }
    foodImg.src = foodSrc();
    var food = {
        posX: Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne,
        posY: Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne

    };

    var snake = [];
    snake[0] = {
        posX: fieldWidth / 2,
        posY: fieldHeight / 2,
    };

    

    document.addEventListener('keydown', snakeMove, false);

    var move;
    function snakeMove(EO) {
        EO = EO || window.event;

        if (EO.keyCode == 37 && move != 'right') {
            move = 'left';
            snakeHead.src = 'snakeHeadLeft.svg';
        }
        else if (EO.keyCode == 38 && move != 'down') {
            move = 'up';
            snakeHead.src = 'snakeHead.svg';
        }
        else if (EO.keyCode == 39 && move != 'left') {
            move = 'right';
            snakeHead.src = 'snakeHeadRight.svg';
        }
        else if (EO.keyCode == 40 && move != 'up') {
            move = 'down';
            snakeHead.src = 'snakeHeadDown.svg';
        }

    }

    // swipe--------------------------------

    var box=document.getElementById('box');
    box.addEventListener('touchstart', funTouchStart, false);

    function funTouchStart(EO) {
        EO = EO || window.event;
        EO.preventDefault();
        var touchInfoStart = EO.targetTouches[0];
        var touchXs = touchInfoStart.pageX;
        var touchYs = touchInfoStart.pageY;

        box.addEventListener('touchmove', funTouchMove, false);

        function funTouchMove(EO) {
            EO = EO || window.event;
            EO.preventDefault();
            box.addEventListener('touchend', funTouchEnd, false);
            var touchInfoMove = EO.targetTouches[0];
            var touchX1 = touchInfoMove.pageX;
            var touchY1 = touchInfoMove.pageY;
            function funTouchEnd(EO) {
                EO = EO || window.event;
                EO.preventDefault();
               var touchXm=touchX1;
               var touchYm=touchY1;

                var minSwipe=50;

                if (touchXs > touchXm && touchXs-touchXm>=minSwipe) {
                    if(Math.abs(touchXs-touchXm) > Math.abs(touchYs-touchYm)  && 
                    move != 'right'){
                        move = 'left';
                        snakeHead.src = 'snakeHeadLeft.svg';
                    }
                }
                else if (touchYs > touchYm && touchYs-touchYm>=minSwipe) {
                    if(Math.abs(touchYs-touchYm)>Math.abs(touchXs-touchXm)  && 
                    move != 'down'){
                        move = 'up';
                        snakeHead.src = 'snakeHead.svg';
                    }
                }
                else if (touchXs < touchXm && touchXm-touchXs>=minSwipe) {
                    if(Math.abs(touchXs-touchXm)>Math.abs(touchYs-touchYm)  && 
                        move != 'left'){
                        move = 'right';
                        snakeHead.src = 'snakeHeadRight.svg';
                    }
                }
                else if (touchYs < touchYm && touchYm-touchYs>=minSwipe) {
                    if(Math.abs(touchYm-touchYs)>Math.abs(touchXm-touchXs) && 
                        move != 'up'){
                        move = 'down';
                        snakeHead.src = 'snakeHeadDown.svg';
                    }  
                }
                box.removeEventListener('touchmove', funTouchMove, false);
                box.removeEventListener('touchend', funTouchEnd, false);

            }

        }

    }




    var stopGame = setInterval(draw, 150);

    var milsec = 50;
    locCount = 0;
    draw();
    function draw() {


        orientFun();

        for (let i = 0; i < fieldWidth; i = i + fieldOne) {
            for (let k = 0; k < fieldHeight; k = k + fieldOne) {
                context.fillStyle = 'rgb(37, 109, 37)';
                context.fillRect(i, k, fieldOne, fieldOne);
            }
        }
        for (let i = fieldOne; i < fieldWidth; i = i + fieldOne * 2) {
            for (let k = fieldOne; k < fieldHeight; k = k + fieldOne * 2) {
                context.fillStyle = 'rgb(15, 97, 15)';
                context.fillRect(i, k, fieldOne, fieldOne);
            }
        }
        for (let i = 0; i < fieldWidth; i = i + fieldOne * 2) {
            for (let k = 0; k < fieldHeight; k = k + fieldOne * 2) {
                context.fillStyle = 'rgb(15, 97, 15)';
                context.fillRect(i, k, fieldOne, fieldOne);
            }
        }

        context.fillStyle = 'rgb(37, 109, 37)';
        context.fillRect(0, 0, fieldWidth, fieldOne * 3);

        context.beginPath();
        context.moveTo(2, fieldOne * 3);
        context.lineTo(fieldWidth-2, fieldOne * 3);
        context.lineTo(fieldWidth-2, fieldHeight-2);
        context.lineTo(2, fieldHeight-2);
        context.closePath();
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = 'black';
        context.font = 'italic bold 40px Arial';
        context.fillText('Score: ' + score, 25, fieldOne + fieldOne / 2);
        context.textAlign = 'left';
        context.textBaseline = 'middle';

        if (count == 3) {
            clearInterval(stopGame);
        }

        context.drawImage(foodImg, food.posX, food.posY);

        if ((score > 10 && count == 1) || (score > 20 && count == 2)) {
            locCount++;
            if (locCount == 1) {
                redheart = {
                    posX: Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne,
                    posY: Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne
                };
            }
            if (milsec > 0) {
                milsec--;
                context.fillStyle = 'black';
                context.font = 'italic bold 40px Arial';
                context.fillText(milsec, fieldOne * 10, fieldOne + fieldOne / 2);
                context.textAlign = 'left';
                context.textBaseline = 'middle';
            } else {
                redheart.posX = fieldOne * 10;
                redheart.posY = fieldOne;
                locCount = 0;
            }
        }
        context.drawImage(redHeartImg, redheart.posX, redheart.posY);





        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                context.drawImage(snakeHead, snake[i].posX, snake[i].posY);
            } else if (i == snake.length - 1) {
                context.drawImage(smallxTail, snake[i].posX + 7.5, snake[i].posY + 7.5);
            } else if (i == snake.length - 2) {
                context.drawImage(smallTail, snake[i].posX + 5, snake[i].posY + 5);
            } else if (i == snake.length - 3) {
                context.drawImage(smallerTail, snake[i].posX + 2.5, snake[i].posY + 2.5);
            }
            else if (i > 0 && i < snake.length - 1) {
                context.drawImage(snakeTail, snake[i].posX + 1.5, snake[i].posY + 1.5);
            }

        }

        var snakeX = snake[0].posX;
        var snakeY = snake[0].posY;




        snake.pop();

        if (move == 'left') {
            snakeX -= fieldOne;
        }
        if (move == 'right') {
            snakeX += fieldOne;
        }
        if (move == 'up') {
            snakeY -= fieldOne;
        }
        if (move == 'down') {
            snakeY += fieldOne;
        }

        if (snakeX < 0) {
            snakeX = (fieldWidth - fieldOne);
        }
        if (snakeX > (fieldWidth - fieldOne)) {
            snakeX = 0;
        }
        if (snakeY < fieldOne * 3) {
            snakeY = fieldHeight - fieldOne;
        }
        if (snakeY > fieldHeight - fieldOne) {
            snakeY = fieldOne * 3;
        }

        var newHead = {
            posX: snakeX,
            posY: snakeY
        };

        count = eatTail(newHead, snake);
        if (count == 0) {
            context.drawImage(heart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(heart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(heart, fieldWidth - fieldOne * 3, fieldOne);
           
        } else if (count == 1) {
            context.drawImage(heart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(heart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);

        } else if (count == 2) {
            context.drawImage(heart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);
            context.strokeStyle='red';
            context.beginPath();
            context.moveTo(2, fieldOne * 3);
            context.lineTo(fieldWidth-2, fieldOne * 3);
            context.lineTo(fieldWidth-2, fieldHeight-2);
            context.lineTo(2, fieldHeight-2);
            context.closePath();
            context.lineWidth = 2;
            context.stroke();
        } else if (count == 3) {
            context.drawImage(emptyheart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);
        }else if(count>3){
            context.drawImage(emptyheart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);
        }
        snake.unshift(newHead);

        if (snakeX == food.posX && snakeY == food.posY) {
            score++;
            eatAudio.play();
            foodImg.src = foodSrc();
            food = {
                posX: Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne,
                posY: Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne
            };
            snake.unshift(newHead);
        }
        if (snakeX == redheart.posX && snakeY == redheart.posY) {
            slowHeart.play();
            locCount = 0;
            milsec = 50;
            score = score + 5;
            redheart = {
                posX: fieldOne * 10,
                posY: fieldOne
            };
            count--;
        }
        function eatTail(head, mas) {
            for (var i = 0; i < mas.length; i++) {
                if (head.posX == mas[i].posX && head.posY == mas[i].posY) {
                    count++;
                    eatTailAudio.play();
                    if (count < 3) {
                        snake.splice(mas.length - 5, 5);
                    }

                    score = score - 5;
                    if (score < 0)
                        score = 0;
                }
            }
            return count;
        }
    }

});

