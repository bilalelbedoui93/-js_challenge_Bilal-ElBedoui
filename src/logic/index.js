import api from '../API'

const logic = {
    /**
     * Returns all the entries provided by the API
     * 
     * 
     * @returns {Array} posts 
     */
    retrieveAllProducts() {

        return (async () => {
            try {
                const response = await api.retrieveAllEntries()

                if (!response) throw Error('No_products_found')

                return response

            } catch (error) {
                throw Error(error)
            }
        })()

    },

    /**
     * It adds the item to the cart, it stores it in localStorage memory
     * 
     * 
     * @param {Object} item 
     * 
     * @returns {Object} contains 3 variables, the confirmation that the item has been added, the bag total of the price a number of item in the bag
     * 
     */
    addToCart(item) {
        let bag_deserialized = JSON.parse(localStorage.getItem('bag'))

        if (bag_deserialized == null) bag_deserialized = [];

        bag_deserialized.push(item)

        localStorage.setItem("bag", JSON.stringify(bag_deserialized));

        const { suma, numberItems } = this.totalPriceAndElementsQuantity(bag_deserialized)

        return { message: 'added to cart', suma, numberItems }
    },

    /**
    * It removes the item from the cart
    * 
    * 
    * @param {String} id 
    * 
    * @returns {Object} contains 3 variables, the confirmation that the item has been removed, the bag total of the price a number of item in the bag
    * 
    */

    removeFromCard(id) {

        let bag_deserialized = JSON.parse(localStorage.getItem('bag'))

        if (bag_deserialized == null) bag_deserialized = [];

        const indexItem = bag_deserialized.findIndex(x => x.uuid === id);

        bag_deserialized.splice(indexItem, 1)

        localStorage.setItem('bag', JSON.stringify(bag_deserialized))

        const { suma, numberItems } = this.totalPriceAndElementsQuantity(bag_deserialized)

        return { message: 'removed from cart', suma, numberItems }
    },

    /**
    * It returns the bag total price and the amount of items in the bag
    * 
    * 
    * @param {Array} products 
    * 
    * @returns {Object} total price and amount of items in the bag
    * 
    */

    totalPriceAndElementsQuantity(products) {
        let priceProduct = 0
        let suma = 0

        if (products == null) products = [];

        products.forEach(item => {

            if (item.discount > 0) priceProduct = item.retail_price.value
            if (item.discount === 0) priceProduct = item.original_retail_price.value

            suma = suma + priceProduct
        });

        return { suma, numberItems: products.length }
    },

    /**
    * It adds the item to the wishlist
    * 
    * 
    * @param {String} id 
    * 
    * @returns {Object} the confirmation that the object has been added to the wishlist and amount of item in the wishlist
    * 
    */

    addToWishlist(id) {
        let wishlist_deserialized = JSON.parse(localStorage.getItem('wishlist'))

        if (wishlist_deserialized == null) wishlist_deserialized = [];

        wishlist_deserialized.push(id)

        localStorage.setItem("wishlist", JSON.stringify(wishlist_deserialized));

        return { message: 'added to wishlist', numberItemsWishlist: wishlist_deserialized.length }
    },

    /**
    * It removed the item from the wishlist
    * 
    * 
    * @param {String} id 
    * 
    * @returns {Object} the confirmation that the object has been removed from the wishlist and amount of item in the wishlist
    * 
    */
    removeFromWishlist(id) {
        let wishlist_deserialized = JSON.parse(localStorage.getItem('wishlist'))

        if (wishlist_deserialized == null) wishlist_deserialized = [];

        const indexItem = wishlist_deserialized.indexOf(id);

        wishlist_deserialized.splice(indexItem, 1)

        localStorage.setItem('wishlist', JSON.stringify(wishlist_deserialized))

        return { message: 'removed from wishlist', numberItemsWishlist: wishlist_deserialized.length }
    }

}

export default logic