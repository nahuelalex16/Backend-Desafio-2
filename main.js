const fs = require("fs")

class ProductManager {
    constructor() {
        this.path = ("data.json")
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title, 
            description,
            price, 
            thumbnail, 
            code,
            stock
            } 
        if(!this.products.some(p => p.code === product.code)) {
            this.products.push({...product, id: this.products.length + 1})
            let productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString)
        }else{
            console.log("Product is already added")
        }
     }
    
     getProducts() {
        let data = fs.readFileSync(this.path, "UTF-8")
        console.log(JSON.parse(data))
        return JSON.parse(data)   
    }
    
    getProductById(id) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data)
        let productFound = dataParse.find(product => product.id === id)
        if(productFound) {
            return console.log(productFound)
        }else {
            return console.log("Not Found")
        }
    }
    
    updateProduct(id, title, description, price, thumbnail, code, stock) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data)
        let productFound = dataParse.findIndex(product => product.id === id)
        const updatedProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code, 
            stock
        }
        dataParse[productFound] = updatedProduct
        fs.writeFileSync(this.path, JSON.stringify(dataParse))
        console.log(dataParse)
          
    }

    deleteProduct(id) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data)
        let index = dataParse.findIndex(product => product.id === id)
        if(index === -1) {
            console.log("product not found")
        }else{
            dataParse.splice(index, 1)
            fs.writeFileSync(this.path, JSON.stringify(dataParse))
             console.log("Product was deleted")
        }     
    }
}

const product = new ProductManager()
product.getProducts()
product.addProduct("Producto 1", "Este es un producto prueba", 200, "Sin imagen", "abc456", 25)
product.getProducts()
product.getProductById()
product.updateProduct(1, "Producto 1", "Este es un producto prueba", 300, "Sin imagen", "abc456", 110)
product.deleteProduct(4)















