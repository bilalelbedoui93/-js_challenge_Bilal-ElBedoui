import api from '../API'

const logic = {

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

    addToCart(item) {
            let bag_deserialized = JSON.parse(localStorage.getItem('bag'))

            if(bag_deserialized == null) bag_deserialized = [];

            bag_deserialized.push(item)

            localStorage.setItem("bag", JSON.stringify(bag_deserialized));

            const {suma, numberItems} = this.totalPriceAndElementsQuantity(bag_deserialized)

            return {message:'added to card', suma, numberItems}
    },

    removeFromCard(id) {
        
        let bag_deserialized = JSON.parse(localStorage.getItem('bag'))

        if(bag_deserialized == null) bag_deserialized = [];

        const indexItem = bag_deserialized.findIndex(x => x.uuid === id);

        bag_deserialized.splice(indexItem, 1)

        localStorage.setItem('bag', JSON.stringify(bag_deserialized))

        const {suma, numberItems} = this.totalPriceAndElementsQuantity(bag_deserialized)

        return {message:'removed from card' ,suma, numberItems}
    },

    totalPriceAndElementsQuantity(products){
        let priceProduct, suma=0
    
        products.forEach(item => {
            
            if(item.discount > 0) priceProduct = item.retail_price.value
            if(item.discount === 0) priceProduct = item.original_retail_price.value

            suma = suma + priceProduct
        });

        return {suma, numberItems: products.length}
    
    }

}

export default logic