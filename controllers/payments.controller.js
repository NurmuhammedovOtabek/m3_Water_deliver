const pool = require("../config/db");

const addPayment = async (req, res) => {
  try {
    const { order_id, amount, payment_date, method } = req.body;
    const filtr = await pool.query(`select * from orders where id = $1`, [
      order_id,
    ]);
    if (filtr.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Order id not found",
      });
    }

    const newPeyment = await pool.query(
      `insert into payments (order_id, amount, peyment_date, method) values ($1, $2, $3, $4) returning *`,
      [order_id, amount, payment_date, method]
    );
    res.status(201).json({
      message: "New added",
      data: newPeyment.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const getData = await pool.query(`select * from payments`);
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

const getOnePeyment = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await pool.query(
      `select * from payments where id = $1`,
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

const updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const {order_id, amount, payment_date, method} = req.body;
    const filtr = await pool.query(`select * from orders where id = $1`, [
        order_id,
      ]);
      if (filtr.rows.length == 0) {
        return res.status(400).json({
          statusCode: 400,
          message: "Order id not found",
        });
      }
    const updateData = await pool.query(
      `update payments set order_id = $1, amount = $2, peyment_date = $3, method = $4 where id = $5 returning *`,
      [order_id, amount, payment_date, method, id]
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

const delPayment= async (req, res) => {
  try {
    const id = req.params.id;
    const filtr = await pool.query(
      `select * from payments where id = $1`,
      [id]
    );
    
    if (filtr.rows.length == 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Data not found",
      });
    }
    const delDAta = await pool.query(
      `delete from payments where id = $1`,
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
   addPayment,
   getPayments,
   getOnePeyment,
   updatePayment,
   delPayment
};
