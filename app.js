const express = require("express");
let app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var campgrounds = [
    { name: "Pog Lake", image: "https://pixabay.com/get/55e9d043485baa14f1dc84609620367d1c3ed9e04e507440772973dd904ecd_340.jpg" },
    { name: "Granite Hill", image: "https://photosforclass.com/download/px_1687845" },
    { name: "Mountain Goat's Rest", image: "https://photosforclass.com/download/pb_1149402" }
]

app.set("view engine", "ejs");

app.get('/', (req, res) => {

    res.render("landing");

});

app.get('/campgrounds', (req, res) => {

    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
    let newCampground = { name: req.body.name, image: req.body.image };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(process.env.PORT || 9000, () => {
    console.log("Yelpcamp started");
});
