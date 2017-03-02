// To run physics with a variable framerate, but
// without ever running more than 100ms per frame:
//
// everyFrame(i => {
//     /* simulate i milliseconds of physics */
// }, 100);

if (typeof require !== 'undefined') {
	eventise = require('./events');
}

class Timestream {
	constructor() {
		this.t = 0;
		this.timeouts = [];
		this.intervals = [];

		this.maxInterval = 250;
		this.warnOnMaxInterval = true;

		let lastTime = 0,
			cancelled = false;
		const update = time => {
				if (this.destroyed) return;
				let interval = time - lastTime;
				if (this.logFramerate)
					console.log((1000 / interval) + ' FPS');
				if (interval > this.maxInterval) {
					if (this.warnOnMaxInterval)
						console.warn('Framerate limiting: ' +
							interval + 'ms');
					interval = this.maxInterval;
				}
				this.advance(interval);
				lastTime = time;
				requestAnimationFrame(update);
				this._triggerEvent('frame', interval);
			};
		requestAnimationFrame(update);
	}

	advance(dt) {
		this.t += dt;
		this.timeouts = this.timeouts.filter(timeout => {
			timeout.timeToGo -= dt;
			if (timeout.timeToGo <= 0) {
				timeout.callback();
				return false;
			} else
				return true;
		});
	}

	setTimeout(callback, timeToGo) {
		const timeout = { callback, timeToGo };
		this.timeouts.push(timeout);
		return timeout;
	}

	cancelTimeout(timeout) {
		this.timeouts = this.timeouts.splice(
			this.timeouts.indexOf(timeout), 1);
	}

	destroy() {
		this.destroyed = true;
	}
}

eventise(Timestream);

if (typeof module !== 'undefined')
	module.exports = Timestream;
