function eventise(targetClass) {
	targetClass.prototype.addEventListener =
	targetClass.prototype.on =
		function on(event, callback) {
			if (!this._eventListeners)
				this._eventListeners = {};
			if (!this._eventListeners[event])
				this._eventListeners[event] = [];
			this._eventListeners[event]
				.push(callback);
			return this;
		};

	targetClass.prototype.removeEventListener =
	targetClass.prototype.off =
		function off(event, callback) {
			if (!this._eventListeners ||
				!this._eventListeners[event])
				return this;
			this._eventListeners[event].splice(
				this._eventListeners[event]
					.indexOf(callback),
				1);
			return this;
		};

	targetClass.prototype._triggerEvent =
		function _triggerEvent(event, ...args) {
			if (!this._eventListeners ||
				!this._eventListeners[event])
				return this;
			this._eventListeners[event].forEach(
				callback => callback(...args));
			return this;
		};
}

if (typeof module !== 'undefined') module.exports = eventise;
