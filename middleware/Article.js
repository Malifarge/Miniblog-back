const fs = require('fs')
const moment = require('moment')
const slugify = require('slugify')

const IfArticleExist = (req, res, next) => {
    const { slug}  = req.params
    const Slug = slugify(req.body.Titre,{lower: true})
    fs.readFile('./Articles.json', (err,data) =>{
        if(err){
            res.status(500).json("Internal server error")
            ;
            return
        }else{
            const response= JSON.parse(data.toString())
            const articleExist= response.find(res=>res.Slug===Slug)

        if (articleExist){
            res.status(409).json('article already exist')
        }else{
            req.articles=response
            req.article={...req.body,
                Slug,
                Date: moment().format(),
                Categorie: slug}
            }
            
            next()
        }
        })
        
}

const IfCategorieExist = (req,res,next)=>{
    const {slug}= req.params
    fs.readFile('./Categories.json', (err,data) =>{
        if(err){
            res.status(500).json("Internal server error")
            ;
            return
        }else{
            const response= JSON.parse(data.toString())
            const categorieExist= response.find(res=>res.Slug===slug)
            if(categorieExist){
                
                next()

            }else{
                res.status(404).json('Categorie not found')
            }
        }
    })
}

module.exports = {
    IfArticleExist,
    IfCategorieExist
}