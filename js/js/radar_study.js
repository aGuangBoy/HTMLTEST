var canvas = $("#myCanvas")[0];
var ctx = canvas.getContext('2d');
var color_gold = "185,147,98";
var windowWidth, windowHeight;
var center = {x: 0, y: 0};

function getWindowSize() {
    windowWidth = $(window).outerWidth();
    windowHeight = $(window).outerHeight();
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    center = {x: windowWidth / 2, y: windowHeight / 2};
    ctx.restore();
    ctx.translate(center.x, center.y); // 焦点移动到中心点
}

getWindowSize();
$(window).resize(getWindowSize);

var enemies = Array(10).fill({}).map(function(obj) {
    return {
        r: Math.random() * 200,
        deg: Math.random() * 360,
        opacity: 0
    }
});

setInterval(draw, 10);
var time = 0;
var deg_to_pi = Math.PI / 180;

function Point(r, deg){
    return {
        x: r * Math.cos(deg_to_pi * deg),
        y: r * Math.sin(deg_to_pi * deg),
    };
};
function Color(opac){
    return "rgba(" + color_gold + "," + opac + ")";
};

function draw() {
    time += 1;
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.rect(-2000, -2000, 4000, 4000);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.moveTo(-windowWidth / 2, 0);
    ctx.lineTo(windowWidth / 2, 0);
    ctx.moveTo(0, -windowHeight / 2);
    ctx.lineTo(0, windowHeight / 2);
    ctx.stroke();

    ctx.strokeStyle=Color(1);
    var deg = time; // 角度
    var rad = 200;
    var point = Point(rad, deg);
    var line_deg = (deg / 2) % 360; // 扫描线角度
    var line_deg_len = 100; // 扫描区域由多条线组成

    for(let i = 0; i < line_deg_len; i ++) {
        let deg1 = line_deg - i - 1;
        let deg2 = line_deg - i;
        let point1 = Point(rad, deg1);
        let point2 = Point(rad, deg2);
        let opacity = 1 - ( i / line_deg_len) - 0.3;
        if (i == 0) opacity = 1;
        ctx.beginPath();
        ctx.fillStyle = Color(opacity);
        ctx.moveTo(0, 0);
        ctx.lineTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.fill();
    }

    enemies.forEach(function(obj) {
        ctx.fillStyle = Color(obj.opacity);
        let obj_point = Point(obj.r, obj.deg);
        ctx.beginPath();
        ctx.arc(obj_point.x, obj_point.y, 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = Color(obj.opacity);
        let x_size = 6;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(obj_point.x - x_size, obj_point.y + x_size);
        ctx.lineTo(obj_point.x + x_size, obj_point.y - x_size);
        ctx.moveTo(obj_point.x + x_size, obj_point.y + x_size);
        ctx.lineTo(obj_point.x - x_size, obj_point.y - x_size);
        ctx.stroke();

        if(Math.abs(obj.deg - line_deg) <= 1) {
            obj.opacity = 1;
            $(".message").text("Detected: "+ obj.r.toFixed(3) + " at " +obj.deg.toFixed(3));
        }
        obj.opacity *= 0.99;

        ctx.strokeStyle = Color(obj.opacity);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(obj_point.x, obj_point.y, 10 * ( 1 / (obj.opacity + 0.0001)), 0, 2 * Math.PI);
        ctx.stroke();
    });

    ctx.strokeStyle = Color(1);
    let split = 120;
    let len = 5;
    let feauter = 15;
    let split_rad = 230;
    for(let i = 0;i < split; i ++) {
        ctx.beginPath();
        let deg = (i / 120) * 360;
        if(i % feauter == 0) {
            len = 10;
            ctx.lineWidth = 3;
        } else {
            len = 5;
            ctx.lineWidth = 1;
        }
        let point1 = Point(split_rad, deg);
        let point2 = Point(split_rad + len, deg);
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.stroke();
    }

    function CondCircle(r, lineWidth, func) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = Color(1);
        ctx.beginPath();
        for(let i = 0; i <= 360; i ++){
            let point = Point(r, i);
            if (func(i)){
                ctx.lineTo(point.x, point.y);
            } else {
                ctx.moveTo(point.x, point.y);
            }
        }
        ctx.stroke();
    }

    CondCircle(300, 3, function(deg) {
        return ((deg + time / 10) % 180) < 90;
    });
    CondCircle(100, 1, function(deg){
        return (deg % 3) < 1;
    });
    CondCircle(190, 1, function(deg){
        return true;
    });

}

