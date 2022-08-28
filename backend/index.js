const mongoose=require("mongoose");
const express=require("express");
const app=express();
const cors=require("cors");
const path=require('path');

const userRoutes= require("./routes/user");
// "mongodb://localhost:27017/exitexam"

// DB 
mongoose
  .connect("mongodb+srv://jenika:universe1111@cluster0.bbzxi.mongodb.net/exitexam?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
  
  app.use(express.static('./dist/frontend'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  
  app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/frontend/index.html'))
  });
  
  app.use('/api',userRoutes);

  const port=8080;

  app.listen(port, () => {
    console.log(`app is running at ${port}`);
  });