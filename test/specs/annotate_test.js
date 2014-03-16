'use strict';

var should = require('should');

var fnassert = require('../coverage/src/main');

describe('#fnassert', function () {
	describe('#assertArg', function () {
		it('should return provided argument param.', function () {
			var arg = {},
				name = 'obj',
				reason = 'a test object';
			fnassert.assertArg(arg, name, reason).should.be.equal(arg);
		});
		it('should throw error when argument param is missing.', function () {
			var arg,
				name = 'obj',
				reason = 'a test object';
			(function () {
				fnassert.assertArg(arg, name, reason);
			}).should.throw('Argument \'' + name + '\' is ' + reason);
		});
		it('should put a "?" when name is missing', function () {
			var arg,
				name,
				reason = 'a test object';
			(function () {
				fnassert.assertArg(arg, name, reason);
			}).should.throw('Argument \'?\' is ' + reason);
		});
		it('should put a "required" when reason is missing', function () {
			var arg,
				name,
				reason;
			(function () {
				fnassert.assertArg(arg, name, reason);
			}).should.throw('Argument \'?\' is required');
		});
	});

	describe('#assertArgFn', function () {
		it('should throw an error if argument is an array an acceptArrayAnnotation is false or undefined', function () {
			var arg = [1, 1],
				name = 'argName';
			(function () {
				fnassert.assertArgFn(arg, name, false).should.equal(arg);
			}).should.throw('Argument \'' + name + '\' is not a function, got Array');
			(function () {
				fnassert.assertArgFn(arg, name, undefined).should.equal(arg);
			}).should.throw('Argument \'' + name + '\' is not a function, got Array');
		});
		it('should throw an error when argument is a array with last element is not a fuction', function () {
			var arg = [1, 1],
				name = 'argName',
				acceptArrayAnnotation = true;
			
			(function () {
				fnassert.assertArgFn(arg, name, acceptArrayAnnotation);
			}).should.throw('Argument \'' + name + '\' is not a function, got number');
		});
		describe('when argument is not a function should throw an error', function () {
			it('should not depend on acceptArrayAnnotation = undefined.', function () {
				var arg = 25,
					arg2 = {constructor: {name: 'someType'}},
					arg3 = {constructor: {name: undefined}},
					name = 'argName',
					acceptArrayAnnotation;
				(function () {
					fnassert.assertArgFn(arg, name, acceptArrayAnnotation);
				}).should.throw('Argument \'' + name + '\' is not a function, got number');
				(function () {
					fnassert.assertArgFn(arg2, name, acceptArrayAnnotation);
				}).should.throw('Argument \'' + name + '\' is not a function, got someType');
				(function () {
					fnassert.assertArgFn(arg3, name, acceptArrayAnnotation);
				}).should.throw('Argument \'' + name + '\' is not a function, got Object');
			});

			it('should not depend on acceptArrayAnnotation = false.', function () {
				var arg = 25,
					name = 'argName',
					acceptArrayAnnotation = false;
				(function () {
					fnassert.assertArgFn(arg, name, acceptArrayAnnotation);
				}).should.throw('Argument \'' + name + '\' is not a function, got number');
			});

			it('should not depend on acceptArrayAnnotation = true.', function () {
				var arg = 25,
					name = 'argName',
					acceptArrayAnnotation = true;
				(function () {
					fnassert.assertArgFn(arg, name, acceptArrayAnnotation);
				}).should.throw('Argument \'' + name + '\' is not a function, got number');
			});
		});
		describe('when argument is a function', function () {
			it('should return argument if acceptArrayAnnotation = undefined', function () {
				var arg = function () {},
					name = 'argName',
					acceptArrayAnnotation;
				
				fnassert.assertArgFn(arg, name, acceptArrayAnnotation).should.equal(arg);
			});
			it('should return argument if acceptArrayAnnotation = false', function () {
				var arg = function () {},
					name = 'argName',
					acceptArrayAnnotation = false;
				
				fnassert.assertArgFn(arg, name, acceptArrayAnnotation).should.equal(arg);
			});
			it('should return argument if acceptArrayAnnotation = true', function () {
				var arg = function () {},
					name = 'argName',
					acceptArrayAnnotation = true;
				
				fnassert.assertArgFn(arg, name, acceptArrayAnnotation).should.equal(arg);
			});
		});
	});
});