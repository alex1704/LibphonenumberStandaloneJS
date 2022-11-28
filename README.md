# Description

`libphonenumber.js` encapsulate Google's [libphonenumber](https://github.com/google/libphonenumber/tree/master/javascript) functionality in standalone javascript file. It exposes several libphonenumber's interfaces on which more functionality can be built up. Documentation for underlying libphonenumber's functionality can be found [here](https://javadoc.io/doc/com.googlecode.libphonenumber/libphonenumber/latest/index.html).  
Besides library itself, repository contains `generate.sh` bash scrirpt which allows to generate up to date `libphonenumber.js`.

# API
1. `libphonenumber`
    - `Libphonenumber.getUtil() -> i18n.phonenumbers.PhoneNumberUtil`
    - `Libphonenumber.newNumberFormat() -> i18n.phonenumbers.NumberFormat`
    - `Libphonenumber.newAsYouTypeFormatter() -> i18n.phonenumbers.AsYouTypeFormatter`
    - `Libphonenumber.getPhoneNumberFormat(String) -> i18n.phonenumbers.PhoneNumberFormat`
    - `Libphonenumber.getNumberType(String) -> i18n.phonenumbers.PhoneNumberType`
2. Helpers
    - `Libphonenumber.snakeToCamel(String) -> String` - converts snake case string to camel case
    - `Libphonenumber.extractPropertyObject(Object) -> Object` - converts `libphonenumber Object` to object with camel case properties. Functionality is added because `libphonenumber` objects has properties `fields_` and `values_` which should be combined in order to look like classic object output such as `{'propertyName': 12345}`

# Usage examples
### Parse phone number:
```
let number = Libphonenumber.getUtil().parseAndKeepRawInput("+380631112233");
let out = Libphonenumber.extractPropertyObject(number);
```
out => `{countryCode: 380, nationalNumber: 631112233, rawInput: '+380631112233', countryCodeSource: 1}`

### Get region code:
```
let partialPhone = '+38063111';
let number = Libphonenumber.getUtil().parseAndKeepRawInput(partialPhone);
let out = Libphonenumber.getUtil().getRegionCodeForNumber(number);
```
out => `'UA'`

### Example phone number:
```
let example = Libphonenumber.getUtil().getExampleNumber('UA');
let out = Libphonenumber.extractPropertyObject(example);
```
out => `{countryCode: 380, nationalNumber: 311234567}`

### Check phone validity:
```
let number = Libphonenumber.getUtil().parseAndKeepRawInput('+380631112233');
let out = Libphonenumber.getUtil().isValidNumber(number);
```
out => `true`

### Format phone number:
```
let number = Libphonenumber.getUtil().parseAndKeepRawInput('+380631112233');
let format = Libphonenumber.getPhoneNumberFormat('INTERNATIONAL');
let out = Libphonenumber.getUtil().format(number, format);
```
out => `'+380 63 111 2233'`

# Generate libphonenumber.js

Prerequisites: 
* git
* curl
* Apache ant

Run `generate.sh` script. If all goes well then it produces build/libphonenumber.js with latest Google libphonenumber library changes.  
*Script was tested for Linux and Mac OS X.*
