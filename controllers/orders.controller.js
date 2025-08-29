const pool = require("../config/db");

const addOrders = async (req, res) => {
  try {
    const { customer_id, delivery_staff_id, order_date, status } = req.body;
    const filtr = await pool.query(`select * from customers where id = $1`, [
      customer_id,
    ]);
    if (filtr.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Customer id not found",
      });
    }
    const filtr2 = await pool.query(
      `select * from delevry_staff where id = $1`,
      [delivery_staff_id]
    );
    if (filtr2.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Delicer_staff id not found",
      });
    }

    const newOrder = await pool.query(
      `insert into orders (customer_id, delivery_staff_id, order_date, status) values ($1, $2, $3, $4) returning *`,
      [customer_id, delivery_staff_id, order_date, status]
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

const getOrders = async (req, res) => {
  try {
    const getData = await pool.query(`select * from orders`);
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

const getOneOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await pool.query(
      `select * from orders where id = $1`,
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

const updateOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const {customer_id, delivery_staff_id, order_date, status } = req.body;
    const updateData = await pool.query(
      `update orders set customer_id = $1, delivery_staff_id = $2, order_date = $3, status = $4 where id = $5 returning *`,
      [customer_id, delivery_staff_id, order_date, status, id]
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

const delOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const filtr = await pool.query(
      `select * from orders where id = $1`,
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
      `delete from orders where id = $1`,
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
    addOrders,
    getOrders,
    getOneOrders,
    updateOrders,
    delOrders
};
