// Expose libphonenumber library methods to use it in standalone JS file
// Underlying JS methods documentation located at URL:
// https://javadoc.io/doc/com.googlecode.libphonenumber/libphonenumber/latest/index.html

goog.provide('i18n.phonenumbers.demo');
goog.require('i18n.phonenumbers.NumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');

goog.exportSymbol('Libphonenumber.getUtil', getUtil);
goog.exportSymbol('Libphonenumber.newNumberFormat', newNumberFormat);
goog.exportSymbol('Libphonenumber.newAsYouTypeFormatter', newAsYouTypeFormatter);
goog.exportSymbol('Libphonenumber.getPhoneNumberFormat', getPhoneNumberFormat);
goog.exportSymbol('Libphonenumber.getNumberType', getNumberType);
goog.exportSymbol('Libphonenumber.snakeToCamel', snakeToCamel);
goog.exportSymbol('Libphonenumber.extractPropertyObject', extractPropertyObject);

/**
 * JS file PhoneNumberUtil getter
 */
function getUtil() {
  return phoneUtil
}

/**
 * Instantiate new NumberFormat
 */
function newNumberFormat() {
  return new i18n.phonenumbers.NumberFormat()
}

/**
 * Instantiate new AsYouTypeFormatter.
 */
function newAsYouTypeFormatter(code) {
  return  new i18n.phonenumbers.AsYouTypeFormatter(code)
}

/**
 * Converts String to PhoneNumberFormat
 */
function getPhoneNumberFormat(value) {
  switch (value) {
    case 'E164':
      return i18n.phonenumbers.PhoneNumberFormat.E164
    case 'INTERNATIONAL':
      return i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL
    case 'NATIONAL':
      return i18n.phonenumbers.PhoneNumberFormat.NATIONAL
    case 'RFC3966':
      return i18n.phonenumbers.PhoneNumberFormat.RFC3966
  }
}

/**
 * Converts String to PhoneNumberType
 */
function getNumberType(value) {
  switch (value) {
    case 'FIXED_LINE':
      return i18n.phonenumbers.PhoneNumberType.FIXED_LINE;
    case 'MOBILE':
      return i18n.phonenumbers.PhoneNumberType.MOBILE;
    case 'FIXED_LINE_OR_MOBILE':
      return i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE;
    case 'TOLL_FREE':
      return i18n.phonenumbers.PhoneNumberType.TOLL_FREE;
    case 'PREMIUM_RATE':
      return i18n.phonenumbers.PhoneNumberType.PREMIUM_RATE;
    case 'SHARED_COST':
      return i18n.phonenumbers.PhoneNumberType.SHARED_COST;
    case 'VOIP':
      return i18n.phonenumbers.PhoneNumberType.VOIP;
    case 'PERSONAL_NUMBER':
      return i18n.phonenumbers.PhoneNumberType.PERSONAL_NUMBER;
    case 'PAGER':
      return i18n.phonenumbers.PhoneNumberType.PAGER;
    case 'UAN':
      return i18n.phonenumbers.PhoneNumberType.UAN;
    case 'UNKNOWN':
      return i18n.phonenumbers.PhoneNumberType.UNKNOWN;
  }
}

/**
 * Converts snake case string to camel case 
 */
function snakeToCamel(s) {
  return s.replace(/(_\w)/g, k => k[1].toUpperCase())
}

/**
 * Converts libphonenumber.Object to output object by mapping 
 * libphonenumber.Object.fields_ and values_ properties together.
 * Property names converted to camel case. 
 */
function extractPropertyObject(object) {
  var out = {}
  for (let key in object.values_) {
    let name = snakeToCamel(object.fields_[key].name_)
    out[name] = object.values_[key]
  }

  return out
}

// private

var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();