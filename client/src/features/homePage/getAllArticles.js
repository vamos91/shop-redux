export const getAllArticle = async () => {
        const products = await fetch('https://fakestoreapi.com/products')
        const productsJson = await products.json()
        return productsJson
}