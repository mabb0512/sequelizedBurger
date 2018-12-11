var express = require("express");
var router = express.Router();
var db = require('../models');

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {

  db.burgers.findAll({
    include: [db.devourers],
    order: [
      ['burger_name', 'ASC']
    ]
  }).then(function(data){
 
     // Pass the returned data into a Handlebars object and then render it
     var hbsObject = { burgers: data };
     // console.log(data);
     res.render('index', hbsObject);
 
   });
});

router.post("/burger/create", function(req, res) {

  // Sequelize Query to add new burger to database
  db.burgers.create(
    {
      burger_name: req.body.burger_name,
      devoured: false
    }
  ).then(function(){
    // After the burger is added to the database, refresh the page
    res.redirect('/');
  });
});

router.post("/burger/:id", function(req, res) {

  // If not name was added, make it "Anonymous"
  if(req.body.burgerEater == "" || req.body.burgerEater == null){
    req.body.burgerEater = "Anonymous";
  }

  // Create a new burger devourer (and associate it to the eaten burger's id)
  db.devourers.create({

    devourer_name: req.body.burgerEater,
    burgerId: req.params.id

  }).then(function(devourer){

    db.burgers.findOne({
      where: {
        id: req.params.id
      } 
    }).then(function(eatenBurger){

      //Update the burger's status
      eatenBurger.update({
        devoured: true,
      })

      // Then, the burger is devoured, so reload the page
      .then(function(){
        res.redirect('/');
      });

    });

  });
});

// Export routes for server.js to use.
module.exports = router;
