const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get("/api/users", (req, res) => {
    res.send(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        res.send(user);
    })
    .patch((req, res) => {
        // UPDATING AN EXISTING ENTRY
        const id = Number(req.params)
        console.log(id);
        res.send({ status: "pending" });
    })
    .delete((req, res) => {
        // DELETING AN ENTRY
        res.send({ status: "pending" });
    });

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        if (err) {
            return res.send({ status: "Error" }); // Sending error response if write fails
        }
        res.send({ status: "Success", id: users.length}); // Sending success response after writing file
    });
});

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});
