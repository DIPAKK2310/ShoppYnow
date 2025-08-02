const bcrypt = require('bcryptjs');

const plainPassword = 'admin123';
const hashedPassword = '$2a$10$OlfFj34Fpo2b.WdEvMT2bFhzO1UzXmB1znCBK.Ewgyt/Nbe8rsm5C';

bcrypt.compare(plainPassword, hashedPassword)
  .then(match => {
    console.log('Match:', match);
  })
  .catch(err => {
    console.error('Error:', err);
  });
