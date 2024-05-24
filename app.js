const express = require('express')
const https = require('https')
const bodyParser = require("body-parser")
const request = require('request')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.post('/', (req, res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
  
    const data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var josnData = JSON.stringify(data);

    const url = 'https://us7.api.mailchimp.com/3.0/lists/a4061a9f61'

    const options = {
        method: 'POST',
        auth: 'abdo:ed255e9f71ec7c2d3517627d5aba4a60-us7'

    }

    const request = https.request(url,options, (response)=>{

           if(response.statusCode === 200){
              res.sendFile(__dirname + '/success.html')
           }else{
              res.sendFile(__dirname + '/failure.html')
           }
          response.on("data", (data)=>{
                console.log(JSON.parse(data));

          })

    })

    request.write(josnData);
    request.end();
});

app.post("/failure", (req, res)=>{
    res.redirect("/");
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html");

})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
})