const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { type } = require('os');

const app = express();

app.use(bodyParser.json());

const mongoURI = "mongodb://localhost:27017/FormData";
mongoose.connect(mongoURI)
.then(() => {
    console.log("Connected to MongoDB");
    
}).catch((error) => console.log(error));

const port = process.env.PORT || 3001;

const formSchema = new mongoose.Schema(
    {
        Mobile:
        {
            type:String,
            require:true,
            unique:true
        },
        Name:
        {
            type:String,
            require:true
        },
        Traning:
        {
            type:String,
            require:true
        },
        Technology:
        {
            type:String,
            require:true
        },
        Education:
        {
           type:String, 
           require:true
        },
        Year:
        {
            type:String,
            require:true
        },
        FatherName:
        {
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true,
            unique:true
        },
        AlternateMobile:
        {
            type:Number,
            require:true,
            unique:true
        },
        ClgName:
        {
            type:String,
            require:true
        },
        RegFee:
        {
            type:Number,
            require:true
        },
        AmtToPay:
        {
            type:Number,
            require:true
        }
    }
)

const Form = mongoose.model("Form",formSchema);

// post Api :-
app.post('/api/signup',async(req,res)=>
{
try{
    const {Mobile,Name,Traning,Technology,Education,Year,FatherName,Email,AlternateMobile,ClgName,RegFee,AmtToPay} = req.body;

    if(!Mobile ||!Name || !Traning || !Technology || !Education || !Year || !FatherName ||!Email ||!AlternateMobile ||!ClgName || !RegFee || !AmtToPay)
    {
        return res.status(400).json({message:"All Fields are Required ."});
    }

    // Creating new Instance

    const  form = new Form({
        Mobile,
        Name,
        Traning,
        Technology,
        Education,
        Year,
        FatherName,
        Email,
        AlternateMobile,
        ClgName,
        RegFee,
        AmtToPay
    });

    // Save the Data to the Database

    await form.save();
    res.status(200).json({message:"Form Submit Succefully.",Form:form});

}
catch(error){
    console.error(error);
    res.status(500).json({message:"Error Submitting Form."})
}
});


// Api Get :-

app.get('/api/signup',async (req,res)=>
{
    try{
        const form = await  Form.find();
        res.status(200).json(form);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error  Fetching Data."})

    }
});


// Delete the data form database 

app.delete('/api/delete/:id',async(req,res) =>
{
    try{
        const {id}= req.params;

        // Find the User
        const  deletedform = await Form.findByIdAndDelete(id);
        if(!deletedform)
        {
            res.status(400).json({message : "User not Found"})
        }
        res.status(200).json({message:"Data Deleted Succefully.",form:deletedform});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error deleting user"})
    }
});

app.listen(port,()=>{
    console.log(`server is running on localhost:${port}`);
});
