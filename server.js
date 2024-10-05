const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'credosure@gmail.com', 
        pass: 'emzq zpbi xizp adfe' 
    }
    // secure: false, 
    // port: 587 
});

app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;
    const mailOptions = {
        from: 'credosure@gmail.com',
        to: 'credosure@gmail.com',
        subject: `New message from ${name}`, 
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        // res.status(200).send('Email sent: ' + info.response);
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
