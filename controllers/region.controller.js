const pool = require("../config/db")

const createRegion = async(req,res)=>{
    try{
        const {name} = req.body
        const creatData = await pool.query(`insert into region (name) values ($1) returning *`, [name])
        res.status(201).json({
            statusCode: 201,
            message: "Data added",
            data: creatData.rows[0]
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const getRegion = async(req,res)=>{
    try{
        const getData = await pool.query(`select * from region`)
        res.status(200).json({
            statusCode: 200,
            message: "geting Succsessfully",
            data: getData.rows
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const getById = async(req,res)=>{
    try{
        const id = req.params.id
        const GetOne = await pool.query(`select * from region where id = $1`, [id])
        res.status(200).json({
            statusCode: 200,
            message: "geting Succsessfully",
            data: GetOne.rows[0]
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const filtrOneR = async (req,res)=>{
    try{
        const {name} = req.query
        let dbQuery = "select * from region where true "
        let values = []

        if(name) {
            dbQuery+=`and name = $1`
            values.push(name)
        }
       
        if(values.length==0) return res.status(400).json({message: "So'rov kriting"})

        const getFiltr = await pool.query(dbQuery, [...values])
        res.status(200).json({
            statusCode: 200,
            message: getFiltr.rows
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const updateRegion = async (req,res)=>{
    try{
        const id = req.params.id
        const {name} = req.body 
        const updateData = await pool.query(`update region set name = $1 where id = $2 returning *`, [name,id])
        res.status(200).json({
            statusCode: 200,
            message: "update Succsessfully",
            data: updateData.rows
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }

}

const delREgion = async (req,res)=>{
    try{
        const id = req.params.id
        const delDAta = await pool.query(`delete from region where id = $1`, [id])
        res.status(200).json({
            statusCode: 200,
            message: "Region deleted",
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

module.exports = {
    createRegion,
    getRegion,
    getById,
    filtrOneR,
    updateRegion,
    delREgion
}