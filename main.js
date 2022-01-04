let boton = document.getElementById("pagar")
let botonMostrar = document.getElementById("mostrar")
let text = document.getElementById("text")

boton.addEventListener("click", (e) => {
    pagar()
    // pagarConFe()
})

botonMostrar.addEventListener("click", (e) => {
traerDatos(text.value)
traerProductos(text.value)
})


const carrito = [
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 1, cantidad: 2, precio: 100},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 1, precio: 1400},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 3, precio: 100},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 4, precio: 100}]


function traerDatos (tipo){
    $.get(`https://api.mercadolibre.com/sites/MLA/search?q=${tipo}`, 
    function(resultado, status){
        console.log(resultado.results)
    })
}
async function traerProductos (tipo) {
    let aux = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${tipo}`)
    let data = await aux.json()
    console.log(aux)
    console.log(data)
}

function pagar(){
    const productosToMp = carrito.map(Element => {
        let nuevoElemento = {
            title: Element.nombre,
            description: Element.descripcion,
            picture_url: Element.img,
            category_id: Element.id,
            quantity: Element.cantidad,
            currency_id: "ARS",
            unit_price: Element.precio
        }
        return nuevoElemento
    })

    console.log(productosToMp)

    $.ajax({
        method: "POST",
        url: "https://api.mercadopago.com/checkout/preferences",
        headers: { 
            Authorization: "Bearer TEST-680675151110839-052307-64069089337ab3707ea2f547622a1b6a-60191006"
        },
        data: JSON.stringify({
            items: productosToMp
        }),
        success: function (response, status){
            const data = response

            console.log(data)
        }

    })
}


async function pagarConFe (){
    const productosToMp = carrito.map(Element => {
        let nuevoElemento = {
            title: Element.nombre,
            description: Element.descripcion,
            picture_url: Element.img,
            category_id: Element.id,
            quantity: Element.cantidad,
            currency_id: "ARS",
            unit_price: Element.precio
        }
        return nuevoElemento
    })

    let response = await fetch("https://api.mercadopago.com/checkout/preferences",
    {
        method: "POST",
        headers: {
            Authorization: "Bearer TEST-680675151110839-052307-64069089337ab3707ea2f547622a1b6a-60191006"
        },
        body: JSON.stringify({
            items: productosToMp,
        })
    })

    const data = await response.json()
    window.open(data.init_point, "_blank")
}


