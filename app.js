const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static('public'));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let items = [];

app.get("/", function (req, res) {
    res.render("list", { ejes: items });
});

app.get("/filter/:priority", function (req, res) {
    if (req.params.priority.toLowerCase() === "all") {
        res.render("list", { ejes: items });
    } else {
        const filtered = items.filter(t => t.priority.toLowerCase() === req.params.priority.toLowerCase());
        res.render("list", { ejes: filtered });
    }
});

app.post("/", function (req, res) {
    const item = {
        id: Date.now(),
        text: req.body.ele,
        priority: req.body.priority
    }
    items.push(item);
    res.redirect("/");
})

app.put("/:id", function (req, res) {
    const id = parseInt(req.params.id);
    const item = items.find(t => t.id === id);
    if (item) {
        item.text = req.body.newText || item.text;
        item.priority = req.body.newPriority || item.priority;
    }
    res.redirect("/");
})

app.delete("/:id", function (req, res) {
    const id = parseInt(req.params.id);
    items = items.filter(t => t.id != id);
    res.redirect("/");
})

app.listen(PORT, () => {
    console.log('Server started');

})