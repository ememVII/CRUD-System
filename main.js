var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");

var tableBody = document.getElementById("tableBody");
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")

var productsContainer ;

if(localStorage.getItem("myProducts") != null) {
    productsContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProduct(productsContainer);
}
else {
    productsContainer = [];
}

function addProduct() {
    if(validateProductName() == true) {
            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category: productCategoryInput.value,
                description: productDescriptionInput.value
            }
        
            productsContainer.push(product);
            localStorage.setItem("myProducts", JSON.stringify(productsContainer))
        
            clearForm();
            displayProduct(productsContainer);
    }
    validateProductName()
}

function displayProduct(productList) {

    var cartoona = ``;
    for(var i=0; i < productList.length; i++) {
        cartoona += `<tr>
        <td>${i+1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td><button onclick="retrieveProduct(${i})" class="btn fw-bold btn-outline-success">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn fw-bold btn-outline-danger">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = cartoona;
}

function searchProduct(searchTerm) {
    var searchResult = [];
    for(var i=0; i < productsContainer.length; i++) {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            searchResult.push(productsContainer[i])
        }
    }
    displayProduct(searchResult)
}

function deleteProduct(deleteIndex) {
    productsContainer.splice(deleteIndex,1);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProduct(productsContainer)
}

function retrieveProduct(updatedIndex) {
    // validateProductName()
    productNameInput.value = productsContainer[updatedIndex].name;
    productPriceInput.value = productsContainer[updatedIndex].price;
    productCategoryInput.value = productsContainer[updatedIndex].category;
    productDescriptionInput.value = productsContainer[updatedIndex].description;
    
    // updateBtn.classList.replace("d-none", "d-inline-block");
    // addBtn.classList.add("d-none")
    document.getElementById("btnsContainer").innerHTML = `<button id="updateBtn" onclick="addProduct(updateProduct(${updatedIndex}))" class="btn btn-success">Update Product</button>`
    validateProductName()

}

function updateProduct(updatedIndex) {
    productsContainer[updatedIndex].name = productNameInput.value;
    productsContainer[updatedIndex].price = productPriceInput.value;
    productsContainer[updatedIndex].category = productCategoryInput.value;
    productsContainer[updatedIndex].description = productDescriptionInput.value;

    displayProduct(productsContainer);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    clearForm();

    document.getElementById("btnsContainer").innerHTML = `<button id="addBtn" onclick="addProduct()" class="btn btn-primary">Add Product</button>`
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value) == true) {
        productNameInput.classList.add("is-valid")

        if (productNameInput.classList.contains("is-invalid")) {
            productNameInput.classList.replace("is-invalid", "is-valid")
        }
        return true;
    }
    else {
        productNameInput.classList.add("is-invalid")
        
        if(productNameInput.classList.contains("is-valid")) {
            productNameInput.classList.replace("is-valid", "is-invalid")
        }
        return false;
    }
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = ""
}















// var bNameInput = document.getElementById("bName");
// var bLinkInput = document.getElementById("bLink");

// // var linkRegex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
// var linkRegex = /^(www.)?(?!.*(www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

// var cart;

// if (localStorage.getItem("hamada") == null) {
//     cart = [];
// } else {
//     cart = JSON.parse(localStorage.getItem("hamada"))
//     displayMarks()
// }

// function addLink() {

//     if (linkRegex.test(bLinkInput.value) ) {
//         var oneLink = 
//         {
//             bName : bNameInput.value ,
//             bLink : bLinkInput.value ,
//         }
    
//         cart.push(oneLink);
    
//         localStorage.setItem("hamada" , JSON.stringify(cart))
    
//         displayMarks()
    
//         clrMarks()
//     } else {
//         alert("Please Enter A Valid URL Without https://")
//     }
// }

// function displayMarks() {
//     var hasalah = ``;

//     for (var i=0; i < cart.length; i++) {
//         hasalah += `<tr>
//         <td>${cart[i].bName}</td>
//         <td>${cart[i].bLink}</td>

//         <td><button onclick="visitLink(${i})" class="btn btn-outline-success">Visit</button></td>
//         <td><button onclick="retrievebData(${i})" class="btn btn-outline-danger">Update</button></td>
//         <td><button onclick="deleteMarks(${i})" class="btn btn-outline-warning">Delete</button></td>

//         </tr>
//         `

//         document.getElementById("tbody").innerHTML = hasalah;
//     }
// }

// function clrMarks() {
//     bNameInput.value = "";
//     bLinkInput.value = "";
// }

// function deleteMarks(bIndex)
// {
//     cart.splice(bIndex, 1);
//     displayMarks();

//     localStorage.setItem("hamada" , JSON.stringify(cart))
// }

// function retrievebData(bIndex) {
//     bNameInput.value = cart[bIndex].bName ;
//     bLinkInput.value = cart[bIndex].bLink ;

//     document.getElementById("btnsContainer").innerHTML = `<button onclick="updateLink(${bIndex})" class="btn btn-outline-danger">Update Data</button>`
// }

// function updateLink(bIndex) {
//     cart[bIndex].bName = bNameInput.value ;
//     cart[bIndex].bLink = bLinkInput.value ;

//     displayMarks();
//     localStorage.setItem("hamada" , JSON.stringify(cart));
//     clrMarks();
//     document.getElementById("btnsContainer").innerHTML = `<button onclick="addLink()" class="btn btn-outline-primary">Submit</button>`

// }

// function searchBook(userWord) {
//     hasalah = ``;
//     for (var i=0; i < cart.length ; i++) {

//         if(cart[i].bName.toLowerCase().includes(userWord.toLowerCase())) {
//             hasalah += `<tr>
//         <td>${cart[i].bName}</td>
//         <td>${cart[i].bLink}</td>

//         <td><button onclick="visitLink(${i})" class="btn btn-outline-success">Visit</button></td>
//         <td><button onclick="retrievebData(${i})" class="btn btn-outline-danger">Update</button></td>
//         <td><button onclick="deleteMarks(${i})" class="btn btn-outline-warning">Delete</button></td>

//         </tr>
//         `

//         document.getElementById("tbody").innerHTML = hasalah;
//         }

//     }
// }

// function visitLink(bIndex) {
//     window.open(`https://${cart[bIndex].bLink}`, '_blank')
// }