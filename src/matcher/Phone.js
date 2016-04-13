/*global Autolinker */
/**
 * @class Autolinker.matcher.Phone
 * @extends Autolinker.matcher.Matcher
 *
 * Matcher to find Phone number matches in an input string.
 *
 * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more
 * details.
 */
Autolinker.matcher.Phone = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

	/**
	 * The regular expression to match Phone numbers.
	 * 
	 * Example match:
	 *
	 *     (123) 456-7890
	 *     123 456 7890
	 *     123-456-7890
	 *
	 * Also UK numbers:
	 *
	 *     020 1234 5678
	 *     0201 234 5678
	 *     +4420 1234 5678
	 *     +44 7777 123456
	 *     
	 *
	 * This regular expression has the following capturing groups:
	 *
	 * 1. The prefixed '+' sign, if there is one.
	 *
	 * @private
	 * @property {RegExp} matcherRegex
	 */
	matcherRegex: /(?:(\+)?\d{1,4}[-\040.])?\(?\d{1,4}\)?[-\040.]?\d{3,5}[-\040.]\d{4,6}/g,

	/**
	 * @inheritdoc
	 */
	parseMatches : function( text ) {
		var matcherRegex = this.matcherRegex,
		    tagBuilder = this.tagBuilder,
		    matches = [],
		    match;

		while( ( match = matcherRegex.exec( text ) ) !== null ) {
			// Remove non-numeric values from phone number string
			var matchedText = match[ 0 ],
			    cleanNumber = matchedText.replace( /\D/g, '' ),  // strip out non-digit characters
			    plusSign = !!match[ 1 ];  // match[ 1 ] is the prefixed plus sign, if there is one

			matches.push( new Autolinker.match.Phone( {
				tagBuilder  : tagBuilder,
				matchedText : matchedText,
				offset      : match.index,
				number      : cleanNumber,
				plusSign    : plusSign
			} ) );
		}

		return matches;
	}

} );