import call from '../common/call'

const api = {

    __url__: 'https://api.musement.com/api/v3/venues/164/activities',

    retrieveAllEntries (){

        return (async () => {
            try {
                
                const response = await call(`${this.__url__}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-musement-version': '3.4.0',
                        'accept-language': 'it',
                        'x-musement-currency': 'EUR'
                    },
                })
                
                return response.data


            } catch (error) {
                return error.response
            }
        })()

    }

}

export default api