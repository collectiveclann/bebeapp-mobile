import React from 'react';

import {Intro1, Intro2, Intro3} from '../assets/icons';

import {SCREEN_WIDTH} from '../assets/constants';

const list = [
  {
    image: <Intro1 size={SCREEN_WIDTH - 100} />,
    title: 'Bebeğinizin Doğum Tarihini Öğrenin',
    description:
      'Anne olduğunuzu öğrendiğiniz ilk anda hiç süphesiz en çok doğum yapacağınız tarihi merak edersiniz.',
  },
  {
    image: <Intro2 size={SCREEN_WIDTH - 100} />,
    title: 'Bebeğinizin Burcunu Öğrenin',
    description:
      'Duygusal mı? Lider Ruhlu mu? Neşeli mi? Kırılgan mı? doğum tarihine göre burç yorumlarına öğrenebilirsiniz.',
  },
  {
    image: <Intro3 size={SCREEN_WIDTH - 100} />,
    title: 'Bebeğinize Kusursuz İsmi Bulun',
    description: 'İşe ona kusursuz bir isim bularak başlayabilirsiniz!',
  },
];

export default list;
