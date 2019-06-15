const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode =require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
 

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.get('', (req, res)=>{

    res.render('index', {

        title:'Weather app',
        author:'Chand Padaliya'
    })
    
})

app.get('/about', (req, res)=>{

    res.render('about', {
        title:'About me',
        author:'Chand Padaliya'
    })
})

app.get('/help', (req, res)=>{

    res.render('help', {
        title:'Help Page',
        author:'Chand Padaliya'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:'You must send the address !'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {})=>{

        if(error)
        {
            return res.send({error})
            
        }
           
        forecast(latitude, longitude, (error, {summary,temprature,precipitation,windSpeed}) => {
    
                if(error)
                {
                    return res.send({
                        error: 'error is affected'
                    })
                }
                
    
                // console.log(location)
                // console.log(summary)
                // console.log(temprature)
                // console.log(precipitation)
                res.send({

                    location,
                    summary,
                    temprature,
                    precipitation,
                    windSpeed,
                    address:req.query.address
            
                })
    
                
        })
    
    })

})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
        
    }
    console.log(req.query.search)
    
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res)=>{

        res.render('pageerror', {

            title:'Help Page',
            author:'Chand Patel',
            message:'Help Page not found'
        })

})


app.get('*', (req, res)=>{

    res.render('404', {

            title:'404 Page',
            author:'Chand Patel',
            message:'Page not found'
    })
})

app.listen(port, ()=>{

    console.log('My Node is working on port '+port)
})
