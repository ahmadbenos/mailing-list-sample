const express = require("express");
const app = express();
const Mailchimp = require("mailchimp-api-v3");
const mail_client = new Mailchimp(process.env.API_KEY);

/*
THE MAILCHIMP API HAS A LOT OF FEATURES BUT I'LL JUST SHOW HOW TO
DO THE 2 BASIC THINGS. 
1- ADDING A NEW USER TO A MAILING LIST
2- GET ALL MEMBERS IN A MAILING LIST
*/

// get all the members in the list
app.get("/getLists", (req, res) => {
  mail_client
    .get(`/lists/${process.env.LIST_ID}`)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// add a new user to the mailing list
app.post("/lists", (req, res) => {
  const members = [
    {
      email_address: "ahmad@gmail.com",
      email_type: "text",
      status: "subscribed",
    },
  ];

  mail_client
    .post({
      path: `/lists/${process.env.LIST_ID}`,
      body: {
        members,
      },
    })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
