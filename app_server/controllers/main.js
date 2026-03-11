const index = (req, res) => {
  res.render("index", {
    title: "Travlr Getaways",
    description: "Welcome to the homepage of Travlr Getaways.",
  });
};

module.exports = {
  index,
};