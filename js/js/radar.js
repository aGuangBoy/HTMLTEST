// let canvas = $("#myCanvas")[0];
// let ctx = canvas.getContext('2d');

var c = $("#myCanvas")[0];
var ctx = c.getContext("2d");
var color_gold="185,147,98";
var ww,wh;
var center={x: 0,y: 0};

function getWindowSize(){
    ww=$(window).outerWidth();
    wh=$(window).outerHeight();
    c.width=ww;
    c.height=wh;
    center={x: ww/2,y: wh/2};

    ctx.restore();
    ctx.translate(center.x,center.y);
}
getWindowSize();

$(window).resize(getWindowSize);

var enemies=Array(10).fill({}).map(
    function(obj){
        return {
            r: Math.random()*200,
            deg: Math.random()*360,
            opacity: 0
        }
    }
);

setInterval(draw,10);
var time=0;

var deg_to_pi = Math.PI/180; // 1度 = PI / 180

function Point(r,deg){
    return {
        x: r*Math.cos(deg_to_pi * deg),
        y: r*Math.sin(deg_to_pi * deg),
    };
}

function Color(op){
    return "rgba("+color_gold+","+op+")";
}

function draw(){
    time+=1;

    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.rect(-2000,-2000,4000,4000);
    ctx.fill();

    ctx.strokeStyle="rgba(255,255,255,1)";
    ctx.moveTo(-ww/2,0);
    ctx.lineTo(ww/2,0);
    ctx.moveTo(0,-wh/2);
    ctx.lineTo(0,wh/2);
    ctx.stroke();

    ctx.strokeStyle=Color(1);
    var r=200;
    var deg=time; // 角度
    var newpoint=Point(r,deg);
    time = time > 719 ? 0 : time;
    var line_deg = (time / 2) % 360; // 设置每次扫描角度  每0.1秒转动0.5度，防止每次扫描角度过大
    console.log(line_deg + "-----" + time);

    var line_deg_len=100;

    for(var i=0;i<line_deg_len;i++){
        // var deg = (time-i);
        var deg1 = (line_deg - i - 1) ;
        var deg2 = (line_deg - i) ;

        var point1=Point(r,deg1);
        var point2=Point(r,deg2);
        var opacity = 1 - ( i / line_deg_len) - 0.3;
        if (i==0) opacity=1;
        ctx.beginPath();
        // ctx.fillStyle="white";
        ctx.fillStyle=Color(opacity);
        ctx.moveTo(0,0);
        ctx.lineTo(point1.x,point1.y);
        ctx.lineTo(point2.x,point2.y);
        // ctx.stroke();
        ctx.fill();
    }

    enemies.forEach(function(obj){
        ctx.fillStyle=Color(obj.opacity);
        var obj_point=Point(obj.r,obj.deg);
        ctx.beginPath();
        ctx.arc(
            obj_point.x,obj_point.y,
            4,0,2*Math.PI
        );
        ctx.fill();

        ctx.strokeStyle= Color(obj.opacity);
        var x_size=6;
        ctx.lineWidth=4;
        ctx.beginPath();
        ctx.moveTo(obj_point.x-x_size,obj_point.y+x_size);
        ctx.lineTo(obj_point.x+x_size,obj_point.y-x_size);
        ctx.moveTo(obj_point.x+x_size,obj_point.y+x_size);
        ctx.lineTo(obj_point.x-x_size,obj_point.y-x_size);
        ctx.stroke();

        if (Math.abs(obj.deg - line_deg)<=1){
            obj.opacity=1;
            $(".message").text("Detected: "+ obj.r.toFixed(3) + " at " +obj.deg.toFixed(3));
        }
        obj.opacity *= 0.99;

        ctx.strokeStyle= Color(obj.opacity);
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.arc(
            obj_point.x,obj_point.y,
            10 * ( 1 / (obj.opacity + 0.0001)),0,2*Math.PI
        ); // 根据透明度不断扩散
        ctx.stroke();
    });

    ctx.strokeStyle=Color(1);
    var split = 120;
    var feature = 15;
    var start_r = 230;
    var len = 5;

    for(var i=0;i<split;i++){
        ctx.beginPath();
        var deg = (i/120) * 360;

        if (i % feature == 0){
            len=10;
            ctx.lineWidth=3;
        }else{
            len=5;
            ctx.lineWidth=1;
        }
        var point1 =Point(start_r,deg);
        var point2 =Point(start_r+len,deg);
        ctx.moveTo(point1.x,point1.y);
        ctx.lineTo(point2.x,point2.y);
        ctx.stroke();
    }

    function CondCircle(r,lineWidth,func_cond){
        ctx.lineWidth=lineWidth;
        ctx.strokeStyle=Color(1);
        ctx.beginPath();
        for(var i=0;i<=360;i++){
            var point =Point(r,i);
            if (func_cond(i)){
                ctx.lineTo(point.x,point.y);
            }else{
                ctx.moveTo(point.x,point.y);
            }
        }
        ctx.stroke();
    }

    CondCircle(300,2,function(deg){
        return ((deg + time / 10) % 180) < 90;
    });
    CondCircle(100,1,function(deg){
        return (deg % 3)<1;
    });
    CondCircle(190,1,function(deg){
        return true;
    });
}
