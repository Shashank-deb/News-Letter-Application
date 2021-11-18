const express = require("express");
const bodyParser = require("body-parser");
const https=require("https");
const { response } = require("express");
const port = 3000;
const app = express();



//This is used for body parser url encoding which is true by default
app.use(bodyParser.urlencoded({ extended: true }));
//This is used for static file rendering in web browser
//This (getting all the css file and images using express.static())
//Public help to get all component in the browser
app.use(express.static("public"));
app.get("/", function (req, res)
{
  res.sendFile(__dirname + "/signup.html");
});


//This is post route using body Parser
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const secondName = req.body.sName;
  const email = req.body.Email;
// This data will be in the format of JSON file only having members in the form of array
//inside array email,status,merge_fields having object will acts as data
  const data={
  members: [
    {
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME:firstName,
      LNAME:secondName,
    }
    }
  ]
 }

 //This is route of failure page
app.post("/failure",function(req,res){
res.redirect("/");
});
//This is route of success page
app.post("/success",function(req,res){
res.redirect("/");
});
//  This is jsonData of the file transfer to the localhost:3000
const jsonData=JSON.stringify(data);
//  This is url of the mail chimp api
// This options format will be have  method:"POST",auth:"username:apikey" 
const url="https://us20.api.mailchimp.com/3.0/lists/b1ea361461";
const options={
  method:"POST",
  auth:"shashank:675963d7008a0f09e756cac14f946fe2-us20"
}


//This is https request send to localhost:3000
const request=https.request(url,options,function(response){
  if(response.statusCode==200)
{
  
 res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}
response.on("data",function(data){
console.log(JSON.parse(data));
});
});

request.write(jsonData);
request.end();

});


//This is listen port of the function
app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("Server is running at 3000!");
});


// API KEY
// 675963d7008a0f09e756cac14f946fe2-us20

//LIST ID 
// b1ea361461