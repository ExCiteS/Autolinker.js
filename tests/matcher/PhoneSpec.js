/*global Autolinker, _, describe, beforeEach, afterEach, it, expect, jasmine */
describe( "Autolinker.matcher.Phone", function() {
	var MatchChecker = Autolinker.match.MatchChecker,
	    matcher;

	beforeEach( function() {
		matcher = new Autolinker.matcher.Phone();
	} );


	describe( 'parseMatches()', function() {

		it( 'should return an empty array if there are no matches for phone numbers', function() {
			expect( matcher.parseMatches( '' ) ).toEqual( [] );
			expect( matcher.parseMatches( 'asdf' ) ).toEqual( [] );
			expect( matcher.parseMatches( '123' ) ).toEqual( [] );
		} );


		it( 'should return an array of a single phone number match when the string is the phone number itself', function() {
			var matches = matcher.parseMatches( '(123) 456-7890' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 0 );
		} );


		it( 'should return an array of a single phone number match when the phone number is in the middle of the string', function() {
			var matches = matcher.parseMatches( 'Hello (123) 456-7890 my good friend' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 6 );
		} );


		it( 'should return an array of a single phone number match when the phone number is at the end of the string', function() {
			var matches = matcher.parseMatches( 'Hello (123) 456-7890' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 6 );
		} );


		it( 'should return an array of multiple phone numbers when there are more than one within the string', function() {
			var matches = matcher.parseMatches( 'Talk to (123) 456-7890 or (234) 567-8901' );

			expect( matches.length ).toBe( 2 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 8 );
			MatchChecker.expectPhoneMatch( matches[ 1 ], '2345678901', 26 );
		} );


		it( 'a match within parenthesis should be parsed correctly', function() {
			var matches = matcher.parseMatches( 'Hello ((123) 456-7890)' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 7 );
		} );

		it( 'should return an array of multiple UK phone numbers', function() {
			var matches = matcher.parseMatches( 'UK numbers might be 020 2345 4678 or 0202 345 6789 or +4420 1234 5678 or +44 7777 123456' );

			expect( matches.length ).toBe( 4 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '02023454678', 20 );
			MatchChecker.expectPhoneMatch( matches[ 1 ], '02023456789', 37 );
			MatchChecker.expectPhoneMatch( matches[ 2 ], '442012345678', 54 );
			MatchChecker.expectPhoneMatch( matches[ 3 ], '447777123456', 73 );
		} );

	} );


} );