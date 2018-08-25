const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/hola', (req, res) => {
/* Assume user input birthday month is from one element of months array in abbreviation format.
  The date of birth is day month year format.
  For calculation convenience, currMonth increase by 1.
  bDayDay is user's birthday day.
  bDayMonth is user's birthday month.
  Assume user always inputs valid date of birth and valid name.
*/
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currDate = new Date();
  const currMonth = currDate.getMonth() + 1;
  const currDay = currDate.getDate();
  const dateOfBirth = req.body.dob.split(' ');
  const bDayDay = parseInt(dateOfBirth[0], 10);
  const bDayMonth = months.indexOf(dateOfBirth[1]);
  let leftMonth;
  let leftDay;
  if (currMonth < bDayMonth) {
    if (currDay <= bDayDay) {
      leftMonth = bDayMonth - currMonth;
      leftDay = bDayDay - currDay;
    } else {
      leftMonth = bDayMonth - currMonth - 1;
      leftDay = bDayDay - currDay + 30;
    }
    res.send(`Hello ${req.body.name}, your birthday is in ${leftMonth} months and ${leftDay} days.`);
  } else if (currMonth === bDayMonth) {
    if (currDay > bDayDay) {
      leftDay = 30 - currDay + bDayDay;
      res.send(`Hello ${req.body.name}, your birthday is in 11 months and ${leftDay} days.`);
    } else {
      leftDay = bDayDay - currDay;
      res.send(`Hello ${req.body.name}, your birthday is in 0 month and ${leftDay} days.`);
    }
  } else {
    if (currDay <= bDayDay) {
      leftMonth = 12 + bDayMonth - currMonth;
      leftDay = bDayDay - currDay;
    } else {
      leftMonth = 11 + bDayMonth - currMonth;
      leftDay = 30 + bDayDay - currDay;
    }
    res.send(`Hello ${req.body.name}, your birthday is in ${leftMonth} months and ${leftDay} days.`);
  }
});

// please change the port to 3000 in the local environment if it is needed.
// eslint-disable-next-line no-console
app.listen(8080, () => console.log('Listening to port: 8080!'));
