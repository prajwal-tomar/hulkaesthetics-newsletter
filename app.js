const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { static } = require("express");
const { STATUS_CODES } = require("http");

const app = express();

//we use static to make our server differentiate between static and dynamic files!!
app.use(static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  //data is a javascript object
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  //converting js object, data to JSON using stringify method

  let jsonData = JSON.stringify(data);

  //this is how we provide authorization to any API whether it is Mailchimp's or some other API
  let options = {
    url: "https://us7.api.mailchimp.com/3.0/lists/67e9f35aa6",
    method: "POST",
    headers: {
      Authorization: "prajwal1 012acc539fae0df4dce9ff4e9055cd5f-us7",
    },
    body: jsonData,
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
      console.log(statusCode);
    } else {
      res.sendFile(__dirname + "/success.html");
      console.log("successfully added!");
    }
  });
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => console.log("Listening at port 3000"));

//API key
//012acc539fae0df4dce9ff4e9055cd5f-us7

//list audience
// 67e9f35aa6
