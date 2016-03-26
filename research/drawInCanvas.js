    $(document).ready(function () {
        var drawCircleTest = function () {
            var date = new Date();
            var milliseconds = date.getMilliseconds();
            var secondsInMls = (date.getSeconds() * 1000) + milliseconds;
            var secondsInDegrees = secondsInMls *(358.3 / 60000);

            // Properties of arc
            var outerRadius = 200;
            var arcWidth = 25;
            var innerRadius = outerRadius - arcWidth;
            var arcStartInDegree = 0;
            var arcEndInDegree = secondsInDegrees;
            //var arcEndInDegree = 360;
            //Properties of rounded corners
            var cornerSize = 3;
            var outerCornerX = (outerRadius - cornerSize) * (Math.cos((arcEndInDegree) * (Math.PI / 180)));
            var outerCornerY = (outerRadius - cornerSize) * (Math.sin((arcEndInDegree) * (Math.PI / 180)));
            var innerCornerX = (innerRadius + cornerSize) * (Math.cos((arcEndInDegree) * (Math.PI / 180)));
            var innerCornerY = (innerRadius + cornerSize) * (Math.sin((arcEndInDegree) * (Math.PI / 180)));
            var outerCornerArcStart = (0 + arcEndInDegree) * (Math.PI / 180);
            var outerCornerArcEnd = (90 + arcEndInDegree) * (Math.PI / 180);
            var innerCornerArcStart = (90 + arcEndInDegree) * (Math.PI / 180);
            var innerCornerArcEnd = (180 + arcEndInDegree) * (Math.PI / 180);

            //Start drawing
            var ctx = $('#canvas')[0].getContext('2d');
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, 500, 500);
            ctx.translate(250, 250);
            ctx.rotate(-90 * Math.PI / 180);

            ctx.beginPath();
            //Start inner rounded corner
            ctx.arc(innerRadius + cornerSize, 0, cornerSize, 180 * (Math.PI / 180), 270 * (Math.PI / 180), false);
            //Start outer rounded corner
            ctx.arc(outerRadius - cornerSize, 0, cornerSize, 270 * (Math.PI / 180), 0 * (Math.PI / 180), false);
            //Outer arc
            ctx.arc(0, 0, outerRadius, (arcStartInDegree * (Math.PI / 180)), (arcEndInDegree * (Math.PI / 180)), false);
            //Extrimity outer rounded corner
            ctx.arc(outerCornerX, outerCornerY, cornerSize, outerCornerArcStart, outerCornerArcEnd, false);
            //Extrimity inner rounded corner
            ctx.arc(innerCornerX, innerCornerY, cornerSize, innerCornerArcStart, innerCornerArcEnd, false);
            //Inner arc
            ctx.arc(0, 0, innerRadius, (arcEndInDegree * (Math.PI / 180)), (arcStartInDegree * (Math.PI / 180)), true);

            ctx.closePath();
            ctx.fillStyle = 'orange';
            ctx.fill();


        };
        setInterval(drawCircleTest,'1000/60');
    });
