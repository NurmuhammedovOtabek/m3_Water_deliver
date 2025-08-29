const pool = require("../config/db");

const addOrders_I = async (req, res) => {
  try {
    const {order_id, product_id, quantity, total_price} = req.body;
    const filtr = await pool.query(`select * from orders where id = $1`, [
      order_id,
    ]);
    if (filtr.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Order id not found",
      });
    }
    const filtr2 = await pool.query(
      `select * from water_products where id = $1`,
      [product_id]
    );
    if (filtr2.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Product id not found",
      });
    }

    const newOrder = await pool.query(
      `insert into order_items (order_id, product_id, quantity, total_price) values ($1, $2, $3, $4) returning *`,
      [order_id, product_id, quantity, total_price]
    );
    res.status(201).json({
      message: "New added",
      data: newOrder.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

const getOrders_I = async (req, res) => {
  try {
    const getData = await pool.query(`select * from order_items`);
    res.status(200).json({
      statusCode: 200,
      message: "Data geted",
      data: getData.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneOrders_I = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await pool.query(
      `select * from order_items where id = $1`,
      [id]
    );
    if (getOne.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Data not found",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Geting successfully",
      data: getOne.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateOrders_I = async (req, res) => {
  try {
    const id = req.params.id;
    const {order_id, product_id, quantity, total_price } = req.body;
    const filtr = await pool.query(`select * from orders where id = $1`, [
        order_id,
      ]);
      if (filtr.rows.length == 0) {
        return res.status(400).json({
          statusCode: 400,
          message: "Order id not found",
        });
      }
      const filtr2 = await pool.query(
        `select * from water_products where id = $1`,
        [product_id]
      );
      if (filtr2.rows.length == 0) {
        return res.status(400).json({
          statusCode: 400,
          message: "Product id not found",
        });
      }
    const updateData = await pool.query(
      `update order_items set order_id = $1, product_id = $2, quantity = $3, total_price = $4 where id = $5 returning *`,
      [order_id, product_id, quantity, total_price, id]
    );
    res.status(200).json({
      statusCode: 200,
      message: "update Succsessfully",
      data: updateData.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const delOrders_I = async (req, res) => {
  try {
    const id = req.params.id;
    const filtr = await pool.query(
      `select * from order_items where id = $1`,
      [id]
    );
    console.log(filtr.rows);
    
    if (filtr.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Data not found",
      });
    }
    const delDAta = await pool.query(
      `delete from order_items where id = $1`,
      [id]
    );
    res.status(200).json({
      statusCode: 200,
      message: "Data deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = {
    addOrders_I,
    getOrders_I,
    getOneOrders_I,
    updateOrders_I,
    delOrders_I
};
