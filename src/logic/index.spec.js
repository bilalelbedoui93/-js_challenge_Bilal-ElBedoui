import { expect } from 'chai'
import api from '../API'
import logic from '.'
global.window = {}
import 'mock-local-storage'
window.localStorage = global.localStorage


describe('LOGIC', () => {

    let allEntries = []

    describe('BAG', () => {
        
        beforeEach(async () => {
            localStorage.clear()
    
            allEntries = await api.retrieveAllEntries()
        })
        
        it('Should add an item to the bag', () => {
            const item = allEntries[Math.floor(allEntries.length * Math.random())]

            const { message, suma, numberItems } = logic.addToCart(item)

            expect(message).to.equal('added to cart')
            expect(suma).to.equal(item.original_retail_price.value)
            expect(numberItems).to.equal(1)
            expect(item).to.be.an('object')
            expect(JSON.parse(localStorage.getItem('bag'))).to.have.lengthOf(1)

        })

        it('Should add several items to the bag', () => {

            const items = new Array

            items.push(allEntries[Math.floor(allEntries.length * Math.random())])
            items.push(allEntries[Math.floor(allEntries.length * Math.random())])
            items.push(allEntries[Math.floor(allEntries.length * Math.random())])

            items.forEach(item => logic.addToCart(item))

            const itemsInBag = JSON.parse(localStorage.getItem('bag'))

            expect(itemsInBag).to.exist
            expect(itemsInBag).to.have.lengthOf(3)
            expect(itemsInBag).to.be.an('array')

            const { suma, numberItems } = logic.totalPriceAndElementsQuantity(itemsInBag)

            expect(numberItems).to.equal(itemsInBag.length)
            expect(suma).to.equal(itemsInBag[0].original_retail_price.value + itemsInBag[1].original_retail_price.value + itemsInBag[2].original_retail_price.value)

        })

        it('Sould remove an item from bag', () => {

            const items = new Array

            items.push(allEntries[Math.floor(allEntries.length * Math.random())])
            items.push(allEntries[Math.floor(allEntries.length * Math.random())])

            items.forEach(item => logic.addToCart(item))

            const { message, suma, numberItems } = logic.removeFromCard(items[0].uuid)

            expect(message).to.equal('removed from cart')
            expect(suma).to.equal(items[1].original_retail_price.value)
            expect(numberItems).to.equal(1)

        })

    })

    describe('WISHLIST', () =>{

        beforeEach(async () => {
            localStorage.clear()
    
            allEntries = await api.retrieveAllEntries()
        })

        it('Should add an item to the wishlist', () => {
            const item = allEntries[Math.floor(allEntries.length * Math.random())]

            const { message, numberItemsWishlist } = logic.addToWishlist(item.uuid)

            expect(message).to.equal('added to wishlist')
            expect(numberItemsWishlist).to.equal(1)
            expect(item).to.be.an('object')
            expect(JSON.parse(localStorage.getItem('wishlist'))).to.have.lengthOf(1)
        })

        it('Should add several items to the wishlist', () => {

            const items = new Array

            items.push(allEntries[Math.floor(allEntries.length * Math.random())])
            items.push(allEntries[Math.floor(allEntries.length * Math.random())])
            items.push(allEntries[Math.floor(allEntries.length * Math.random())])

            items.forEach(item => logic.addToWishlist(item.uuid))

            const itemsInWishlist = JSON.parse(localStorage.getItem('wishlist'))

            expect(itemsInWishlist).to.exist
            expect(itemsInWishlist).to.have.lengthOf(3)
            expect(itemsInWishlist).to.be.an('array')

        })

        it('Sould remove an item from wishlist', () => {

            const items = new Array

            items.push(allEntries[Math.floor(allEntries.length * Math.random())])
            items.push(allEntries[Math.floor(allEntries.length * Math.random())])

            items.forEach(item => logic.addToWishlist(item.uuid))

            const { message, numberItemsWishlist } = logic.removeFromWishlist(items[0].uuid)
            
            expect(message).to.equal('removed from wishlist')
            expect(numberItemsWishlist).to.equal(1)

        })

    })

})