let globalFoodData = [];
foodorders = document.getElementById("foodinfo");

const addMenu = () => {
    const newMenuDetails = {
        id: `${Date.now()}`,
        Type: document.getElementById("FOODType").value,
        Name: document.getElementById("Foodname").value,
        quintity: document.getElementById("quintity").value,
        colddrinks: document.getElementById("colddrinks").value,
        
    };

    foodorders.insertAdjacentHTML('beforeend', generateorder(newMenuDetails));

    globalFoodData.push(newMenuDetails);
    saveToLocalStorage();
}

const generateorder=({id,Type,Name,quintity,colddrinks})=>{
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id} >
    <div class="card" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; "  >
        <div class="card-header" style="background-color:#FCB6B0;">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-primary" name=${id} onclick="editOrder(this)" >
                    <i class="fas fa-pencil-alt name=${id} onclick="editOrder(this)" ></i>
                </button>
                <button type="button" class="btn btn-danger"  name=${id} onclick="DeleteOrder(this)">
                    <i class="far fa-trash-alt name=${id} onclick="DeleteOrder(this) "></i>
                </button>
            </div>
        </div>
        
        <div class="card-body" style="background-color:#00DCD6; ">
            <h5 class="card-title">${Type}</h5>
            <h5 class="card-title">${Name}</h5>
            <h5 class="card-title">${quintity}</h5>
            <h5 class="card-title">${colddrinks}</h5>
            
            <span class="badge bg-primary"></span>
        </div>
        <div class="card-footer" style="background-color:#e3f2fd;">
            <button class="btn btn-outline-primary float-end"  > we will be back with your food. thank you!!</button>
        </div>
    </div>
</div>`);
}
const saveToLocalStorage = () => { 
    localStorage.setItem("vikramsfoodorder", JSON.stringify({vikramorder: globalFoodData}));
}

const reloadFoodOrder = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("vikramsfoodorder"));
    console.log(localStorageCopy)
    if(localStorageCopy) {
        globalFoodData = localStorageCopy["vikramorder"];
    }
    globalFoodData.map((FoodOrder) => {
        foodorders.insertAdjacentHTML('beforeend', generateorder(FoodOrder));
    })
}

const DeleteOrder=(e) =>{
    
    const targetID=e.getAttribute("name");
    // console.log(targetID);
    globalFoodData = globalFoodData.filter((FoodOrder) => FoodOrder.id!==targetID);
    // console.log(globalFoodData);
    saveToLocalStorage();
    window.location.reload();
}

const editOrder = (e) => {
    const targetID = e.getAttribute("name");
     
     console.log(e.parentNode.parentNode.parentNode)
     console.log(e.parentNode.parentNode.parentNode.childNodes[3])
     console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[1])
     console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[3])
     console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[5])
     console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[7])

     e.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].setAttribute("contenteditable", "true")
     e.parentNode.parentNode.parentNode.childNodes[3].childNodes[3].setAttribute("contenteditable", "true")
     e.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].setAttribute("contenteditable", "true")
     e.parentNode.parentNode.parentNode.childNodes[3].childNodes[7].setAttribute("contenteditable", "true")


     console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])

     //e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].style.setProperty("background", "green")
     e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("onclick", "saveEditOrder(this)")
     e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML = "SAVE CHANGES"


}

const saveEditOrder=(e) => {
    const targetID = e.getAttribute("name");
    const newMenuDetails = {
        id: e.parentNode.parentNode.parentNode.getAttribute("id"),
        
        Type:e.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML ,
        Name:e.parentNode.parentNode.childNodes[3].childNodes[3].innerHTML ,
        quintity:e.parentNode.parentNode.childNodes[3].childNodes[5].innerHTML ,
        colddrinks:e.parentNode.parentNode.childNodes[3].childNodes[7].innerHTML 

        
    }
    const refid = e.parentNode.parentNode.parentNode.getAttribute("id")
    console.log(refid)
    objIndex = globalFoodData.findIndex((obj => obj.id == refid ));
    console.log(objIndex)
    globalFoodData[objIndex] = newMenuDetails
    
    saveToLocalStorage()
    window.location.reload();
}
