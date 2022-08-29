const express = require('express')
const app = express()
const fs = require('fs')
const {IfArticleExist, IfCategorieExist} = require('../middleware/Article')
const {body,validationResult} = require('express-validator')



app.get('/', (req,res)=>{
    fs.readFile('./Articles.json', (err,data) =>{
        if(err){
            console.log(err);
        }else{
            const response= JSON.parse(data.toString())
            
            res.json(response)
        }
    })
})

app.get('/:slug',IfCategorieExist, (req,res)=>{
        const {slug} = req.params
        fs.readFile('./Articles.json',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                const response= JSON.parse(data.toString())
                const articles= response.filter(article=>article.Categorie=== slug)
                res.json(articles)
            }
        })
    })

app.post('/:slug',
body("Auteur").exists().withMessage('missing Author'),
body('Titre').isLength({min:6, max:20}).withMessage("Incorrect length, min 6 and max 20"),
body('Description').exists().withMessage("Missing description"),
IfCategorieExist,IfArticleExist,
 (req,res)=>{
    const {errors} = validationResult(req)

    if (errors.length > 0) {
        res.status(400).json(errors)
      } else {
        req.articles.push(req.article)
        fs.writeFile('./Articles.json',JSON.stringify(req.articles),err=>{
                    console.log(err);
        })
         res.json('ok')
      }

   
    })


module.exports= app