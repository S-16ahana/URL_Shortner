import express from 'express'
import generateCode from '../utils/generateCode.js';
import urlModel from '../models/url.model.js'
const router = express.Router();

// @POST api/url
router.post("/",async function (req,res) {
   const {url} = req.body

   if(!url){
    return res.status(400).json({error:"URL is required"})
   }

   if((!url.startsWith("http://")==false) &&( url.startsWith("https://")==false)){
    return res.status(400).json({error:"Please enter a valid URL starting with http:// or htttps:"})
   }

   if(url.length > 2048){
     return res.status(400).json({error:"URL is too long  "})
   }

   const code = generateCode()

   const newUrl = await urlModel.create({originalUrl:url,shortCode:code})

   return res.status(200).json({
    message:"URL Shortend successfully",
    data:{
      originalUrl:newUrl.originalUrl,
      shortCode:newUrl.shortCode,
    }
   })
})

// @GET api/url
router.get('/',async function (req,res) {
  const urls = await urlModel.find()

  return res.status(200).json({
    message:"URLs Fetched successfully",
    data:{
      urls
    }
  })
  
  
})

// @DELETE api/url/:id
router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  const url = await urlModel.findById(id);

  if (!url) {
    return res.status(404).json({
      message: "URL Not Found",
    });
  }

  await urlModel.findByIdAndDelete(id);

  return res.status(200).json({
    message: "URL Deleted Successfully",
  });
});

export default router;



//@POST  /api/url
//req.body = {url:"http://longurl"}
//It generates the shortcode for this longurl

//GET /api/url
//Fetches all url data

//GET /:code
//Redirects the user to the original url according to the short code

//Delete /api/url/:id
//Delete the URL according to the ID in the process