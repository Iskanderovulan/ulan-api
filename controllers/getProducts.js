import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 8;
  const searchQuery = req.query.search || ""; // Получаем строку поиска из параметров запроса

  try {
    // Создаем объект запроса для MongoDB, который будет искать товары по заданной строке поиска
    const query = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } } // Ищем товары, имя которых соответствует строке поиска
      : {};

    const total = await Product.countDocuments(query); // Считаем общее количество товаров, соответствующих запросу
    const products = await Product.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send({
      products,
      page,
      pages: Math.ceil(total / pageSize),
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

export { getProducts };
