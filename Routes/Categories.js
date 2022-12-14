const express = require('express')
const app = express()
const fs = require('fs')
const {IfCategorieExist} = require('../middleware/Categoris')
const {body,validationResult} = require('express-validator')

app.get('/', (req,res)=>{
    fs.readFile('./Categories.json', (err,data) =>{
        if(err){
            res.status(500).json("Internal server error")
            ;
        }else{
            const response= JSON.parse(data.toString())
            res.json(response)
        }
    })
})

app.post('/',IfCategorieExist, 
    body('Name').isLength({min:6, max:20}).withMessage("Incorrect length, min 6 and max 20"),
    body('Description').exists().withMessage("Missing description"),
    (req,res)=>{
    const { errors } = validationResult(req)

    if (errors.length > 0) {
        res.status(400).json(errors)
      } else {
        req.categories.push(req.categorie)
        fs.writeFile('./Categories.json',JSON.stringify(req.categories),err=>{
            res.status(500).json("Internal server error")
            ;
        })
        res.json('ok')
      }
    
    })


module.exports= app