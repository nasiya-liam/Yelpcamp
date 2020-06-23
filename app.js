const express = require("express");
let app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

// var campgrounds = [
//     { name: "Pog Lake", image: "https://pixabay.com/get/55e9d043485baa14f1dc84609620367d1c3ed9e04e507440772973dd904ecd_340.jpg" },
//     { name: "Granite Hill", image: "https://photosforclass.com/download/px_1687845" },
//     { name: "Mountain Goat's Rest", image: "https://photosforclass.com/download/pb_1149402" }
// ]

app.set("view engine", "ejs");

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//     { name: "Pog Lake", image: "https://photosforclass.com/download/px_1687845", description: "beautiful granite" },
//     (err, Campground) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log(Campground);
//         }
//     });

app.get('/', (req, res) => {

    res.render("landing");

});

//index
app.get('/campgrounds', (req, res) => {

    //res.render("campgrounds", { campgrounds: campgrounds });
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            res.redirect("/");
        }
        else {
            res.render("campgrounds", { campgrounds: campgrounds });
        }
    });
});

//create
app.post("/campgrounds", (req, res) => {
    let newCampground = { name: req.body.name, image: req.body.image, description: req.body.description };
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
    //campgrounds.push(newCampground);


});
//new 
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

//show
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { campground: foundCampground });
        }
    });

});

app.listen(process.env.PORT || 9000, () => {
    console.log("Yelpcamp started");
});
