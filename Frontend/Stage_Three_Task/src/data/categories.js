import axios from "axios";

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories`,
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

const initCategories = async () => {
  try {
    const categoryData = await fetchCategories();
    const categories = await Promise.all(
      categoryData.items.map(async (item) => {
        return {
          id: item.id,
          name: item.name,
        };
      })
    );
    return categories;
  } catch (error) {
    console.error("Error processing categories:", error);
    return [];
  }
};

const categories = await initCategories();

export default categories;
