module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry' });
  },
};