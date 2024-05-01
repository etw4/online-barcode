const express=require('express');
const {Canvas}=require('canvas');
const jsBarcode=require('jsbarcode');
const ejs=require('ejs');


const app=express();

app.set('views', __dirname+'/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.render('index', {data:''});
})

app.post('/', (req, res)=>{
    const canvas=new Canvas();
    jsBarcode(canvas,req.body.qrcodee, {
        lineColor: '#0aa',
        width:1,
        height:20,
        displayValue:true,
        fontSize: 10,
    });


    canvas.toDataURL('image/png', (err,png)=>{
        res.render('index', {data:png});
    })
})
const port=process.env.PORT||3000;

app.listen(port, console.log('server run at port', port));