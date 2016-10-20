// To run physics with a variable framerate, but
// without ever running more than 100ms per frame:
//
// everyFrame(i => {
//     /* simulate i milliseconds of physics */
// }, 100);
function everyFrame(callback, maxInterval, logFramerate) {
	var lastTime = 0,
		update = function everyFrameUpdate(time) {
			var interval = time - lastTime;
			if (logFramerate)
				console.log((1000 / interval) + ' FPS');
			lastTime = time;
			requestAnimationFrame(update);
			callback(Math.min(interval, maxInterval));
		};
	requestAnimationFrame(update);
}

if (typeof module !== 'undefined')
	module.exports = {
		everyFrame: everyFrame
	};
