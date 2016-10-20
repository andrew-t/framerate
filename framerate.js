module.exports = {

	// To run physics with a variable framerate, but
	// without ever running more than 100ms per frame:
	// 
	// everyFrame(i => {
	//     /* simulate i milliseconds of physics */
	// }, 100);
	everyFrame: (callback, maxInterval) => {
		let lastTime = 0,
			update = time => {
				let interval = time - lastTime;
				// console.log((1000/interval) + ' FPS');
				lastTime = time;
				requestAnimationFrame(update);
				callback(Math.min(interval, maxInterval));
			};
		requestAnimationFrame(update);
	}

};
