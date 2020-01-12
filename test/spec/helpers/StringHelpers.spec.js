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

    describe('method textToSqlIdentifier', function () {
        it('should return correct SQL identifier for given string', function () {
            expect(stringHelpers.textToSqlIdentifier('foo')).toBe('foo');
            expect(stringHelpers.textToSqlIdentifier(' foo ')).toBe('foo');
            expect(stringHelpers.textToSqlIdentifier('foo ')).toBe('foo');
            expect(stringHelpers.textToSqlIdentifier(' foo')).toBe('foo');
            expect(stringHelpers.textToSqlIdentifier('  foo  ')).toBe('foo');
            expect(stringHelpers.textToSqlIdentifier('foo  ')).toBe('foo');
            expect(stringHelpers.textToSqlIdentifier('  foo')).toBe('foo');

            expect(stringHelpers.textToSqlIdentifier('FooBar')).toBe('foobar');
            expect(stringHelpers.textToSqlIdentifier('ABBR')).toBe('abbr');

            expect(stringHelpers.textToSqlIdentifier('foo bar')).toBe('foo_bar');
            expect(stringHelpers.textToSqlIdentifier('foo  bar')).toBe('foo_bar');
            expect(stringHelpers.textToSqlIdentifier(' foo bar ')).toBe('foo_bar');
            expect(stringHelpers.textToSqlIdentifier(' foo bar')).toBe('foo_bar');
            expect(stringHelpers.textToSqlIdentifier('foo bar ')).toBe('foo_bar');

            expect(stringHelpers.textToSqlIdentifier('123')).toBe('i_123');
            expect(stringHelpers.textToSqlIdentifier('123a')).toBe('i_123a');

            expect(/^i_.+/.test(stringHelpers.textToSqlIdentifier(''))).toBeTruthy();
            expect(/^i_.+/.test(stringHelpers.textToSqlIdentifier('   '))).toBeTruthy();

            expect(stringHelpers.textToSqlIdentifier('a(b)c')).toBe('a_b_c');
            expect(stringHelpers.textToSqlIdentifier('(ab)c')).toBe('ab_c');
            expect(stringHelpers.textToSqlIdentifier('a(bc)')).toBe('a_bc');
            expect(stringHelpers.textToSqlIdentifier('(abc)')).toBe('abc');
            expect(stringHelpers.textToSqlIdentifier('`~!@#$%^&*()_-+={[}]\\|/\';:?><,.a')).toBe('a');
            expect(/^i_.+/.test(stringHelpers.textToSqlIdentifier('`~!@#$%^&*()_-+={[}]\\|/\';:?><,.'))).toBeTruthy();

            expect(stringHelpers.textToSqlIdentifier('abv')).toBe('abv');
            expect(stringHelpers.textToSqlIdentifier('абв')).toBe('abv');
            expect(stringHelpers.textToSqlIdentifier('Виктор is Lucky!')).toBe('viktor_is_lucky');
        });
    });
});
