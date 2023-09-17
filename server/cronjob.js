const axios = require('axios');
const cron = require('node-cron');

const allBooksURL = 'https://kitapkurdu.onrender.com/api/books/allBooks?page=1';

const myCronJob = () => {
  // This function will run every 10 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const response = await axios.get(allBooksURL);
      console.log('cron job started');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = { myCronJob };
