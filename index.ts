import withStates from './data/countries-with-states.json';
import byAbbreviation from './data/country-by-abbreviation.json';
import byCurrency from './data/currency.json';
import byCurrencyName from './data/country-by-currency-name.json';
import byTimezone from './data/timezone.json';
import byCallingCode from './data/country-by-calling-code.json';
import byLanguages from './data/languages.json';

const newData = withStates.map((country) => {
    const data = { ...country, currency_code: '', currency_name: '', timezone: '', gmtOffset: '', calling_code: null };

    const findByAbbreviation = byAbbreviation.find(
        (country) => country.abbreviation === data.code
    );

    if (findByAbbreviation) {
        // Currency code
        const findCurrencyCountry = byCurrency.find(
            (country) => country.country === findByAbbreviation.country
        );
        if (!findCurrencyCountry) {
            if (data.code === 'TL') {
                data.currency_code = 'USD';
            }

        } else {
            data.currency_code = findCurrencyCountry.currency_code;
        }

        // Currency Name
        const findCurrencyName = byCurrencyName.find(
            (country) => country.country === findByAbbreviation.country
        );
        if (!findCurrencyName) {
            if (data.code === 'TL') {
                data.currency_name = 'US Dollar';
            }
        }
        else {
            data.currency_name = findCurrencyName.currency_name;
        }

        // Timezone
        const findTimezone = byTimezone.find(
            (country) => country.countryCode === data.code
        );

        if (findTimezone) {
            data.timezone = findTimezone.zoneName;
            data.gmtOffset = findTimezone.gmtOffset;
        } else {
            console.log('timezone not found', data.code);

        }

        // Calling code
        const findCallingCode = byCallingCode.find(
            (country) => country.country === findByAbbreviation.country
        );

        if (findCallingCode) {
            data.calling_code = findCallingCode.calling_code;
        }
        else {
            console.log('calling code not found', data.code);
        }

        // Languages
        const langEntries = Object.entries(byLanguages);

        const modLang = langEntries.find((lang) => {
            return lang[0].toUpperCase() === data.code;
        });

        if (!modLang) {
            console.log('lang not found', data.code);
        }



        // const findLanguages = modLang.find(
        //     (country) => country.code === data.code
        // );

        // if (findLanguages) {
        //     console.log('lang found');

        // } else {
        //     console.log('lang not found', data.code);
        // }


    }
    // else {
    //     console.log('country not found', data.code);
    // }

    return data;
});

// console.log(newData);
