const express = require('express');
const fs = require('fs');
const date = require('date-and-time')

const app = express();
const port = 3000;

// Set the view engine to use Pug
app.set('view engine', 'pug');

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Homepage route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Create Ticket
app.post('/rest/ticket', (req, res) => {
    const userId = req.body.userId;
    const type = req.body.type;
    const subject = req.body.subject;
    const description = req.body.description;
    const priority = req.body.priority;
    const status = req.body.status;
    const recipient = req.body.recipient;
    const submitter = req.body.submitter;
    const create = new Date();
    const updated = new Date();
    const created_at = date.format(create,'YYYY/MM/DD HH:mm:ss');
    const updated_at = date.format(updated,'YYYY/MM/DD HH:mm:ss');
    const user = {
        userId: userId,
        type: type,
        subject: subject,
        description: description,
        priority: priority,
        status: status,
        recipient: recipient,
        submitter: submitter,
        created_at: created_at,
        updated_at: updated_at
    };
    fs.readFile('mydata.txt', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        users.push(user);
        fs.writeFile('mydata.txt', JSON.stringify(users), err => {
            if (err) {
                console.error(err);
                return;
            }
            res.redirect('/');
        });
    });
});

// Search for ticket by ID
app.post('/rest/ticket/id', (req, res) => {
    const userId = req.body.userId;
    fs.readFile('mydata.txt', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let users = JSON.parse(data);
        let user = users.find(user => user.userId === userId);
        if (user) {
            res.render('user', { title: 'user', user: user });
        } else {
            res.render('user', { title: 'user', error: 'user ID not found' });
        }
    });
});

//Get all Tickets
app.get('/rest/list', (req, res) => {
    fs.readFile('mydata.txt', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let users = JSON.parse(data);
        res.json(users);
        console.log(users)
    });
});

// Create mydata.txt file if it doesn't exist
if (!fs.existsSync('mydata.txt')) {
    fs.writeFileSync('mydata.txt', '[]');
}

app.listen(port, () => {
});