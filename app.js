//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "./public/"));


/////////////////////////////////////////////////////////multer code here/////////////////////////////////////////////////////////

var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: Storage
}).single('image');

////////////////////////////////////////////////////////// mongoDB connection setup ///////////////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/profileDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

///////////////////////////////////////////////////// Mongoose Schema /////////////////////////////////////////////////////////////////

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  contact: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}\d{3}\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  email: {
    type: String,
    validate: {
      validator: function validateEmail(elementValue) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
      },
      message: 'Email validation failed'
    },
    unique: true,
  },
  address: String
});

const Profile = mongoose.model("Profile", profileSchema);

//TODO

///////////////////////// in find() we can give specific conditions to find a particular user in here we are fetching all .////////////////////////////

app.route("/profiles")

  .get(function(req, res) {
    Profile.find(function(err, foundProfiles) {
      if (!err) {
        // console.log(foundProfiles);
        res.send(foundProfiles);
      } else {
        res.send(err);
      }
    });
  })
////////////////////////////////////////////////////////// for saving data in database /////////////////////////////////////////////////////////////////
  .post(upload, function(req, res) {
    // console.log(req.file);
    const newProfile = new Profile({
      name: req.body.name,
      image: req.file.filename,
      contact: req.body.contact,
      email: req.body.email,
      address: req.body.address
    });

    newProfile.save(function(err) {
      if (!err) {
        res.send("Profile Added Successfully!")
      } else {
        res.send(err);
      }
    });
  })

  ////////////////////////////////////////////////// for deleting all profiles because no condition given. ////////////////////////////////////////////////////

  .delete(function(req, res) {
    Profile.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all profiles!!");
      } else {
        res.send(err);
      }
    });
  });

///////////////////////////////////////////////////////// request targetting a specific profile ////////////////////////////////////////////////////////////////

app.route("/profiles/:userProfile")

  .get(function(req, res) {

//req.params.userProfile = the email user enters in the url or we can say to read the value of the search condition

    Profile.findOne({
      email: req.params.userProfile
    }, function(err, foundProfile) {
      if (foundProfile) {
        res.send(foundProfile);
      } else {
        res.send("This profile is not registered.");
      }
    });
  })

  //////////////////////////////////////////////////////////update a specific profile. ////////////////////////////////////////////////////////////////////////////
  .patch(function(req, res) {

    console.log(req.body);

    Profile.update({
        email: req.params.userProfile
      }, {
        $set: req.body
      },
      function(err) {
        if (!err) {
          res.send("Profile updated Successfully!!");
        } else {
          res.send(err);
        }
      }
    );
  })

  //////////////////////////////////////////////////////////////////delete a specific profile////////////////////////////////////////////////////////////////////
  .delete(function(req, res) {
    Profile.deleteOne({
        email: req.params.userProfile
      },
      function(err) {
        if (!err) {
          res.send("Profile deleted successfully!")
        } else {
          res.send(err);
        }
      }
    );
  });

//SERVER
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("server is up and running...");
});
