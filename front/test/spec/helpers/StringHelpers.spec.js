import * as stringHelpers from 'helpers/StringHelpers';

describe('StringHelpers', function () {
    describe('method isNullLikeString', function () {
        it('should return true for null', function () {
            expect(stringHelpers.isNullLikeString(null)).toBeTruthy();
        });

        it('should return true for empty string', function () {
            expect(stringHelpers.isNullLikeString('')).toBeTruthy();
        });

        it('should return true for string with spaces only', function () {
            expect(stringHelpers.isNullLikeString('   ')).toBeTruthy();
        });

        it('should return false for string with any non-space character', function () {
            expect(stringHelpers.isNullLikeString('   qwerty')).toBeFalsy();
            expect(stringHelpers.isNullLikeString('qwerty   ')).toBeFalsy();
            expect(stringHelpers.isNullLikeString('   qwerty   ')).toBeFalsy();
        });
    });

    describe('method isIntegerString', function () {
        it('should return true for integer-like string', function () {
            expect(stringHelpers.isIntegerString('0')).toBeTruthy();
            expect(stringHelpers.isIntegerString('5')).toBeTruthy();
            expect(stringHelpers.isIntegerString('123')).toBeTruthy();
            expect(stringHelpers.isIntegerString('+0')).toBeTruthy();
            expect(stringHelpers.isIntegerString('+5')).toBeTruthy();
            expect(stringHelpers.isIntegerString('+123')).toBeTruthy();
            expect(stringHelpers.isIntegerString('-0')).toBeTruthy();
            expect(stringHelpers.isIntegerString('-12')).toBeTruthy();
        });

        it('should return false for non-integer-like string', function () {
            expect(stringHelpers.isIntegerString('')).toBeFalsy();
            expect(stringHelpers.isIntegerString('   ')).toBeFalsy();
            expect(stringHelpers.isIntegerString('0 ')).toBeFalsy();
            expect(stringHelpers.isIntegerString(' 0 ')).toBeFalsy();
            expect(stringHelpers.isIntegerString('0x')).toBeFalsy();
            expect(stringHelpers.isIntegerString('0x1234')).toBeFalsy();
            expect(stringHelpers.isIntegerString('abcd')).toBeFalsy();
            expect(stringHelpers.isIntegerString('ab123cd')).toBeFalsy();
        });
    });

    describe('method isFloatString', function () {
        it('should return true for float-like string', function () {
            // integers are floats as well
            expect(stringHelpers.isFloatString('0')).toBeTruthy();
            expect(stringHelpers.isFloatString('5')).toBeTruthy();
            expect(stringHelpers.isFloatString('123')).toBeTruthy();
            expect(stringHelpers.isFloatString('+0')).toBeTruthy();
            expect(stringHelpers.isFloatString('+5')).toBeTruthy();
            expect(stringHelpers.isFloatString('+123')).toBeTruthy();
            expect(stringHelpers.isFloatString('-0')).toBeTruthy();
            expect(stringHelpers.isFloatString('12')).toBeTruthy();

            expect(stringHelpers.isFloatString('1.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('0.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('0.')).toBeTruthy();
            expect(stringHelpers.isFloatString('1,27')).toBeTruthy();
            expect(stringHelpers.isFloatString('0,27')).toBeTruthy();
            expect(stringHelpers.isFloatString(',27')).toBeTruthy();
            expect(stringHelpers.isFloatString('0,')).toBeTruthy();

            expect(stringHelpers.isFloatString('-1.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('-0.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('-.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('-0.')).toBeTruthy();
            expect(stringHelpers.isFloatString('-1,27')).toBeTruthy();
            expect(stringHelpers.isFloatString('-0,27')).toBeTruthy();
            expect(stringHelpers.isFloatString('-,27')).toBeTruthy();
            expect(stringHelpers.isFloatString('-0,')).toBeTruthy();

            expect(stringHelpers.isFloatString('+1.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('+0.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('+.27')).toBeTruthy();
            expect(stringHelpers.isFloatString('+0.')).toBeTruthy();
            expect(stringHelpers.isFloatString('+1,27')).toBeTruthy();
            expect(stringHelpers.isFloatString('+0,27')).toBeTruthy();
            expect(stringHelpers.isFloatString('+,27')).toBeTruthy();
            expect(stringHelpers.isFloatString('+0,')).toBeTruthy();
        });

        it('should return false for non-float-like string', function () {
            // these aren't numbers at all
            expect(stringHelpers.isFloatString('')).toBeFalsy();
            expect(stringHelpers.isFloatString('   ')).toBeFalsy();
            expect(stringHelpers.isFloatString('0 ')).toBeFalsy();
            expect(stringHelpers.isFloatString(' 0 ')).toBeFalsy();
            expect(stringHelpers.isFloatString('0x')).toBeFalsy();
            expect(stringHelpers.isFloatString('0x1234')).toBeFalsy();
            expect(stringHelpers.isFloatString('abcd')).toBeFalsy();
            expect(stringHelpers.isFloatString('ab123cd')).toBeFalsy();

            expect(stringHelpers.isFloatString('.')).toBeFalsy();
            expect(stringHelpers.isFloatString(',')).toBeFalsy();

            expect(stringHelpers.isFloatString('aaaa.aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('1234.aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('aaaa.1234')).toBeFalsy();
            expect(stringHelpers.isFloatString('aaaa,aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('1234,aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('aaaa,1234')).toBeFalsy();

            expect(stringHelpers.isFloatString('+aaaa.aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('+1234.aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('+aaaa.1234')).toBeFalsy();
            expect(stringHelpers.isFloatString('+aaaa,aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('+1234,aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('+aaaa,1234')).toBeFalsy();

            expect(stringHelpers.isFloatString('-aaaa.aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('-1234.aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('-aaaa.1234')).toBeFalsy();
            expect(stringHelpers.isFloatString('-aaaa,aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('-1234,aaaa')).toBeFalsy();
            expect(stringHelpers.isFloatString('-aaaa,1234')).toBeFalsy();
        });
    });
});
