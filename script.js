let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")
 
// opentag 
cartIcon.addEventListener("click",()=>{
    cart.classList.add("active")
})

// closetag 
closeCart.addEventListener("click",()=>{
    cart.classList.remove("active")
})

// cart working
if (document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",ready)
}else{
    ready()
}

function ready(){
    // remove items form cart 
    let removeCart=document.getElementsByClassName("cart-remove")
    console.log(removeCart);
    for(let i=0;i<removeCart.length;i++){
        let button = removeCart[i]
        console.log(button);
        button.addEventListener("click",removeItem)
    }

    // quantity change 

    let cartQty=document.getElementsByClassName("cart-qty")
    for (let i=0;i<cartQty.length;i++){
        let input=cartQty[i]
        input.addEventListener("change",qtyChange)

    }

    // add to cart 
    let addCart=document.getElementsByClassName("add-cart")
    for (let i=0;i<addCart.length;i++){
        let btns=addCart[i]
        btns.addEventListener("click",addToCart)
    }
    // buy button work 
    document.getElementsByClassName("btn-buy")[0].addEventListener("click",()=>{
        alert("your order is placed")
        let cartCon=document.getElementsByClassName("cart-content")[0]
        while(cartCon.hasChildNodes()){
            cartCon.removeChild(cartCon.firstChild)
        }
        total()
    })
}
// remove items form cart
function removeItem(e){
    let buttonclick = e.target;
    console.log(buttonclick);
    buttonclick.parentElement.remove()
    total()
}

// cart quentity changes

function qtyChange(e){
    console.log("changes");
    let input=e.target
    if(isNaN(input.value) || input.value<=0){
        input.value=1
    }
    total()
}

// add to cart making 

function addToCart(e){
    let btn=e.target
    let shop=btn.parentElement
    let productTitle=shop.getElementsByClassName("product-title")[0].innerText
    
    let productPrice=shop.getElementsByClassName("product-price")[0].innerText
    let productImg=shop.getElementsByClassName("product-img")[0].src

    addProduct(productTitle,productPrice,productImg);
    total()
}

function addProduct(title,price,img){
    let shopBox=document.createElement("div")
    shopBox.classList.add("cart-box")
    let cartItem=document.getElementsByClassName("cart-content")[0]
    let cartItemNames=cartItem.getElementsByClassName("cart-product-title")

    for(let i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerHTML==title){
            alert("you already add this item")
            return;
        }
    }
    let cartBoxContent= `
        <img src="${img}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-qty">
        </div>
        <!--  -->
        <i class='bx bxs-trash-alt cart-remove' ></i>

`
shopBox.innerHTML=cartBoxContent
cartItem.append(shopBox)
shopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeItem)
shopBox.getElementsByClassName("cart-qty")[0].addEventListener("change",qtyChange)
}


// updating toal 
function total(){
let cartContent=document.getElementsByClassName("cart-content")[0]
let cartBoxes=cartContent.getElementsByClassName("cart-box")
let total=0;
for (let i=0;i<cartBoxes.length;i++){
    let box=cartBoxes[i]
    let cartPrice=box.getElementsByClassName("cart-price")[0]
    let cartQty=box.getElementsByClassName("cart-qty")[0]

    let price=parseFloat(cartPrice.innerText.replace("$", ""))
    let qty=cartQty.value
    total+=price * qty
}

    // price value in some cents
    total=Math.round(total *100)/100
 document.getElementsByClassName("total-price")[0].innerText="$" + total

}