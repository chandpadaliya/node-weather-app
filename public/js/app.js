




    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    weatherForm,addEventListener('submit', (e)=>{
        e.preventDefault();

        const location = search.value;
        messageOne.textContent="searching..."
        messageTwo.textContent=''
        
        if(!location)
        {
            
            messageOne.textContent='You must enter a location'
        }

        fetch('http://localhost:3000/weather?address='+location).then((response)=>{

        response.json().then((data)=>{
        if(data.error)
        {
            
            messageOne.textContent=data.error
        }
        else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.summary +' Temprature is '+ data.temprature +'. Precipitation chances is '+ data.precipitation +'. Address :' +data.address
        }
    })
  })
    

})