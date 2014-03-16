'use strict';

module.exports.assertArg = function assertArg(arg, name, reason) {
	if (!arg) {
		throw new Error('Argument \'' + (name || '?') + '\' is ' + (reason || 'required'));
	}
	return arg;
};

module.exports.assertArgFn = function assertArgFn(arg, name, acceptArrayAnnotation) {
	if (acceptArrayAnnotation === undefined) {
		acceptArrayAnnotation = false;
	}
	if (acceptArrayAnnotation && Array.isArray(arg)) {
		arg = arg[arg.length - 1];
	}
	this.assertArg(typeof arg === 'function', name, 'not a function, got ' + (arg && typeof arg === 'object' ? arg.constructor.name || 'Object' : typeof arg));

	return arg;
};
