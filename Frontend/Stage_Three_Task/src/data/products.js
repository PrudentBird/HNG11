import axios from "axios";

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products`,
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
    console.error("Error fetching products:", error);
  }
};

const initProducts = async () => {
  try {
    const productData = await fetchProducts();
    const products = await Promise.all(
      productData.items.map(async (item) => {
        const imgUrl = item.photos[1].url;
        return {
          img: `${process.env.REACT_APP_API_URL}/images/${imgUrl}`,
          desc: item.name,
          price: item.current_price[0].NGN[0] || "NaN",
          id: item.id
        };
      })
    );
    return products;
  } catch (error) {
    console.error("Error processing products:", error);
    return [];
  }
};

const products = await initProducts();

export default products;
