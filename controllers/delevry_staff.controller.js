const pool = require("../config/db")


const addDelevry_staff = async (req,res)=>{
    try{
        const {name, phone, vehise_number, dictrict_id} = req.body
        const filtr = await pool.query(`select * from dictric where id = $1`, [dictrict_id])
        if(filtr.rows.length == 0){
            return res.status(400).json({
                statusCode: 400,
                message: "Dictrict id not found"
            })
        }
        const filtr2 = await pool.query(`select * from delevry_staff where phone = $1`, [phone])
        if(filtr2.rows.length != 0){
            return res.status(400).json({
                statusCode: 500,
                message: "Phone number alredy exists"
            })
        }
        const newDelevry = await pool.query(
            `insert into delevry_staff (name, phone, vehicle_number, dictric_id) values ($1, $2, $3, $4) returning *`,
            [name, phone, vehise_number, dictrict_id]
        )
        console.log(newDelevry.rows);
        res.status(201).json({
            message: "New added",
            data: newDelevry.rows[0]
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}

const getDelevry_staff = async (req,res)=>{
    try{
        const getData = await pool.query(`select * from delevry_staff`)
        res.status(200).json({
            statusCode: 200,
            message: "Data geted",
            data: getData.rows
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneDelevry = async (req,res)=>{
    try{
        const {id} = req.params
        const getOne = await pool.query(`select * from delevry_staff where id = $1`, [id])
        if(getOne.rows.length == 0){
            return res.status(400).json({
                statusCode: 400,
                message: "Data not found"
            })
        }
        res.status(200).json({
            statusCode: 200,
            message: "Geting successfully",
            data: getOne.rows[0]
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const updateDelevryS = async (req, res) => {
    try {
      const id = req.params.id;
      const {name, phone, vehise_number, dictrict_id} = req.body;
      const filtr = await pool.query(`select * from delevry_staff where phone = $1`, [phone])
      if(filtr.rows[0].id != id){
        return res.status(400).json({
            statusCode: 400,
            message: "This user alredy exists"
        })
      }
      const filtr2 = await pool.query(`select * from dictric where id = $1`, [dictrict_id])
      console.log(filtr2.rows.length);
      
      if(filtr2.rows.length == 0){
        return res.status(400).json({
            statusCode: 400,
            message: "Dictrict id not found"
        })
      } 
      const updateData = await pool.query(
        `update delevry_staff set name = $1, phone = $2, vehicle_number = $3, dictric_id = $4 where id = $5 returning *`,
        [name, phone, vehise_number, dictrict_id, id]
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
  
const delDelivrS = async (req, res) => {
    try {
      const id = req.params.id;
      const filtr = await pool.query(`select * from delevry_staff where id = $1`, [id])
      if(filtr.rows.length == 0){
        return res.status(400).json({
            statusCode: 400,
            message: "Data not found"
        })
      }
      const delDAta = await pool.query(`delete from delevry_staff where id = $1`, [id]);
      res.status(200).json({
        statusCode: 200,
        message: "Delevry_staff deleted",
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
    addDelevry_staff,
    getDelevry_staff,
    getOneDelevry,
    updateDelevryS,
    delDelivrS
}