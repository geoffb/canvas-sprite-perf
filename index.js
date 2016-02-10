var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");

const FPS_SMOOTHING = 0.975;

var lastTime = 0;
var avgFPS = 0;

ctx.font = "16px sans-serif";

var ragaImage = new Image();
var ragas = [];

var addRagas = function () {
	for (var i = 0; i < 100; ++i) {
		ragas.push({
			x: Math.round(Math.random() * (800 - 48)),
			y: Math.round(Math.random() * (600 - 68) + 20)
		});
	}
};

var update = function (time) {
	var elapsed = time - lastTime;
	lastTime = time;
	avgFPS = (avgFPS * FPS_SMOOTHING) + ((1000 / elapsed) * (1 - FPS_SMOOTHING));

	ctx.fillStyle = "cornflowerblue";
	ctx.fillRect(0, 0, 800, 600);

	for (var i = 0, j = ragas.length; i < j; ++i) {
		var raga = ragas[i];
		ctx.drawImage(ragaImage, 0, 0, 48, 48, raga.x, raga.y, 48, 48);
	}

	ctx.fillStyle = "black";
	ctx.fillText(ragas.length + " / " + Math.round(avgFPS * 10) / 10, 5, 20);

	requestAnimationFrame(update);
};

ragaImage.src = "raga.png";
ragaImage.onload = function () {
	addRagas();
	requestAnimationFrame(update);
};

stage.addEventListener("mousedown", addRagas, false);
