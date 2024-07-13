import axios from "axios";

const fetchProductInfo = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/products/${id}`,
            {
                params: {
                    organization_id: process.env.REACT_APP_ORGANIZATION_ID,
                    Appid: process.env.REACT_APP_APP_ID,
                    Apikey: process.env.REACT_APP_API_KEY,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching product info:", error);
    }
}

export default fetchProductInfo;
