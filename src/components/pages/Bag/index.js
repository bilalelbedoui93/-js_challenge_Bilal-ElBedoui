import React from 'react'


import iconRemoveFromBag from '../../../common/images/remove_item_from_bag.png'

import logic from '../../../logic'

import './index.scss'


const Bag = ({ productsInBag, totalPrice, funTotalPrice, funNumberItemsBag }) => {

    const handleRemoveFromBag = (id) => {
        const { message, suma, numberItems } = logic.removeFromCard(id)
        if (message === 'removed from cart') {
            
            funTotalPrice(suma)
            funNumberItemsBag(numberItems)
        }
        }

    return (
        <main>


            <section className="bag__container">

                <ul>
                    {productsInBag && productsInBag.map(item => {
                        return (

                            <li key={item.uuid} className="bag__item">
                                <article className="bag__product">
                                    <img className="bag__image" src={item.cover_image_url} alt="Product" itemProp="image" />
                                    <section className="bag__information">
                                        <h1 className="bag__title" itemProp="brand">{item.title}</h1>

                                        <div className="bag__price" itemScope itemType="http://schema.org/Offer">
                                            {item.discount > 0 ?
                                                <div><span class="bag__price--strike">{item.original_retail_price.formatted_value}</span> <span class="bag__price--discounted" itemProp="price">{item.retail_price.formatted_value} x 1</span></div>
                                                :
                                                <span className="bag__price" itemProp="price">{item.original_retail_price.formatted_value} x 1</span>
                                            }
                                        </div>
                                    </section>
                                    <img className="bag__removeItem" src={iconRemoveFromBag} 
                                        onClick={(event) => {
                                            event.preventDefault()
                                            handleRemoveFromBag(item.uuid)
                                        }}
                                    />
                                </article>
                            </li>
                        )
                    })

                    }

                    <li className="bag__payment">
                        <article className="bag__subtotal--subtotal">
                            <h3>cart subtotal: </h3>
                        </article>

                        <article className="bag__subtotal--price">
                            {totalPrice} €
                        </article>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default Bag