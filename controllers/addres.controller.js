const pool = require("../config/db");

const createAddres = async (req, res) => {
  try {
    const { name, addres, location, customer_id, dictrict_id } = req.body;
    const chek1 = await pool.query(`select * from dictric where id = $1`, [dictrict_id])
    if(chek1.rows.length == 0){
        return res.status(404).json({
            statusCode: 404,
            message: "Dictrict_id not found"
        })
    }
    const chek2 = await pool.query(`select * from customers where id = $1`, [customer_id])
    if(chek2.rows.length == 0){
        return res.status(404).json({
            statusCode: 404,
            message: "customer_id not found"
        })
    }
    const creatData = await pool.query(
      `insert into addres (name, addres, location, custumer_id, dictrict_id) values ($1, $2, $3, $4, $5) returning *`,
      [name, addres, location, customer_id, dictrict_id]
    );
    res.status(201).json({
      statusCode: 201,
      message: "Data added",
      data: creatData.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getAddres = async (req, res) => {
  try {
    const getData = await pool.query(`select * from addres`);
    res.status(200).json({
      statusCode: 200,
      message: "geting Succsessfully",
      data: getData.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getByIdA = async (req, res) => {
  try {
    const id = req.params.id;
    const GetOne = await pool.query(`select * from addres where id = $1`, [id]);
    if(GetOne.rows.length == 0){
        return res.status(404).json({
            statusCode: 404,
            message: "Data not found"
        })
    }
    res.status(200).json({
      statusCode: 200,
      message: "geting Succsessfully",
      data: GetOne.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};


const updateAddres = async (req, res) => {
  try {
    const id = req.params.id;
    const {name, addres, location, customer_id, dictrict_id} = req.body;
    const updateData = await pool.query(
      `update addres set name = $1, addres=$2, location=$3, custumer_id=$4, dictrict_id=$5 where id = $6 returning *`,
      [name, addres, location, customer_id, dictrict_id, id]
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

const delAddres = async (req, res) => {
  try {
    const id = req.params.id;
    const delDAta = await pool.query(`delete from addres where id = $1`, [id]);
    res.status(200).json({
      statusCode: 200,
      message: "Region deleted",
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
  createAddres,
  getAddres,
  getByIdA,
  updateAddres,
  delAddres
};
