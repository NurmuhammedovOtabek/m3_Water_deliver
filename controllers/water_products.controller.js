const pool = require("../config/db")

const addWater_product = async (req,res)=>{
    try{
        const {name, valume_liters, price} = req.body

        const newWater_P = await pool.query(
            `insert into water_products (name, valume_liters, price) values ($1, $2, $3) returning *`,
            [name, valume_liters, price]
        )
        res.status(201).json({
            message: "New added",
            data: newWater_P.rows[0]
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}

const getWater_P = async (req,res)=>{
    try{
        const getData = await pool.query(`select * from water_products`)
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

const getOneWater_P = async (req,res)=>{
    try{
        const {id} = req.params
        const getOne = await pool.query(`select * from water_products where id = $1`, [id])
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

const filtrOneWP = async (req,res)=>{
    try{
        const {name, valume_liters, price} = req.query
        
        let dbQuery = "select * from water_products where true "
        let index = 1
        let values = []

        if(name) {
            dbQuery+=`and name = $${index++}`
            values.push(name)
        }
        if(valume_liters) {
            dbQuery+= `and valume_liters = $${index++}`
            values.push(valume_liters)
        }
        if(price) {
            dbQuery+= `and price = $${index++}`
            values.push(price)
        }
        if(index===1) return res.status(400).json({message: "So'rov kriting"})

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

const updateWater_P = async (req,res)=>{
    try{
        const {id} = req.params
        const {name, valume_liters, price} = req.body
        
        let d = []  
        let index = 1
        let values = []

        if(name) {
            d.push(`name = $${index++}`)
            values.push(name)
        }
        if(price) {
            d.push(`price = $${index++}`)
            values.push(price)
        }
        if(valume_liters) {
            d.push(`valume_liters = $${index++}`)
            values.push(valume_liters)
        }
        if(index===1) return res.status(400).json({message: "So'rov kriting"})
        values.push(id)
        const updateC = await pool.query(`update water_products set ${d.join(",")} where id = $${index}`, [...values])
        res.status(200).json({
            statusCode: 200,
            message: updateC.rows[0]
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const delWater_P = async (req,res)=>{
    try{
        const id = req.params.id
        await pool.query(`delete from water_products where id=$1`,[id])
        res.status(200).json({
            message: "Data deletd"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    addWater_product,
    getWater_P,
    getOneWater_P,
    filtrOneWP,
    updateWater_P,
    delWater_P
}