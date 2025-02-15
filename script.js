const url ="https://www.themealdb.com/api/json/v1/1/search.php?s="
let searchBtn=document.querySelector('form .btn')
let cards=document.querySelector('.cards')
let searchBar=document.querySelector('form .search-bar')
let msg=document.querySelector('.msg')


    msg.innerHTML='Search your recipe first....'

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const fragment = document.createDocumentFragment()
    let searchValue = searchBar.value.trim();
    msg.innerHTML=''
    cards.innerHTML=''
    if(searchBar.value==""){
        msg.innerHTML='Search your recipe first....'
        return
    }
        

    
    const fetchData=async (query)=>{
        let response = await fetch(`${url}${query}`)
        let data=await response.json();
        console.log(data)   
        if(data.meals){
            data.meals.forEach(meal => {
                let card =document.createElement('div')
                card.classList.add('card')
                
                let imgDiv =document.createElement('div')
                imgDiv.classList.add('img')
                
                let img =document.createElement('img')
                img.src =meal.strMealThumb
                
                let titleDiv =document.createElement('div')
                titleDiv.classList.add('title')

                let title =document.createElement('h4')
                let shortTitle =meal.strMeal.substring(0,50)+"...."
                title.innerHTML=shortTitle
                
                let descDiv =document.createElement('div')
                descDiv.classList.add('desc')

                let desc =document.createElement('p')
                let shortDesc = meal.strInstructions.substring(0, 100) + "...";
                desc.innerHTML = shortDesc;

                let readMoreDiv =document.createElement('div')
                readMoreDiv.classList.add('readMoreDiv')

                let readMore =document.createElement('button')
                readMore.classList.add('read-more')
                readMore.innerHTML = "Read More";
                

                imgDiv.appendChild(img)
                titleDiv.appendChild(title)
                descDiv.appendChild(desc)
                readMoreDiv.appendChild(readMore)
                card.appendChild(imgDiv)
                card.appendChild(titleDiv)
                card.appendChild(descDiv)
                card.appendChild(readMoreDiv)
                fragment.appendChild(card)

                let modal = document.querySelector('.modal')
                let modalCardImg = document.querySelector('.modal-card-img img')
                let modalTitle = document.querySelector('.modal-card-title h3')
                let modalDesc = document.querySelector('.modal-body p')
                
                readMore.addEventListener("click", () => {
                    modal.style.display = "flex";
                    modalCardImg.src = meal.strMealThumb;
                    modalTitle.innerHTML=meal.strMeal
                    modalDesc.innerHTML=meal.strInstructions
                    
                    let closeBtn = document.querySelector('.close-btn')
                    
                    closeBtn.addEventListener('click',()=>{
                        
                        modal.style.display = "none";
                        document.body.style.overflow = "auto";                   
                    })
                    document.body.style.overflow = "hidden";                   
                  });
                
            });
        }
     
        else{
            msg.innerHTML='No Result Found....'
        }
         
        cards.appendChild(fragment)
    }
    
    fetchData(searchValue)
    
   
    
})
