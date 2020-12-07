import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import 'moment/min/locales.min';

const ConvertDateTime = (value, short) => {
  const userCounty = RNLocalize.getCountry().toLowerCase();

  if (userCounty === 'tr' && short) {
    moment.locale('tr');

    moment.updateLocale('tr', {
      relativeTime: {
        future: 'içinde %s',
        past: '%s',
        s(number, withoutSuffix) {
          return withoutSuffix ? 'şimdi' : 'az önce';
        },
        m: '1d',
        mm: '%dm',
        h: '1sa',
        hh: '%dsa',
        d: '1gü',
        dd: '%dgün',
        M: '1mtay',
        MM: '%dmtay',
        y: '1yı',
        yy: '%dyı',
      },
    });
  }

  return moment(value, 'YYYY-MM-DD HH:mm:ss').fromNow();
};

export default ConvertDateTime;
