import axios from "axios";
axios.defaults.timeout = 3000;
const baseUrl = 'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0';

const getAll = async () => {
    let response = await axios.get(baseUrl)
    return response
}

const ShipmentService = {
    getAll: getAll
}

export default ShipmentService;