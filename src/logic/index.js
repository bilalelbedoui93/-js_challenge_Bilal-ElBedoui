import api from '../API'

const logic = {

    retrieveAllProducts(){
        
        return (async () => {
            try {
                const response = await api.retrieveAllEntries()

                if (!response) throw Error('No_products_found')

                
                return response

            } catch (error) {
                throw Error(error)
            }
        })()

    }

}

export default logic