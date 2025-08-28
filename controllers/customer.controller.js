const pool = require("../config/db")
const DeviceDetector = require('node-device-detector');
const DeviceHelper = require('node-device-detector/helper');

const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    osIndexes: true,
    deviceAliasCode: false,
    deviceTrusted: false,
    deviceInfo: false,
    maxUserAgentSize: 500,
});


const addCustomer = async (req,res)=>{
    try{
        const {name, phone, email} = req.body

        const newCustomer = await pool.query(
            `insert into customers (name, phone, email) values ($1, $2, $3) returning *`,
            [name,phone,email]
        )
        console.log(newCustomer.rows);
        res.status(201).json({
            message: "New added",
            data: newCustomer.rows[0]
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}

const getCustomer = async (req,res)=>{
    try{
        const userAgent = req.headers["user-agent"]
        const result = detector.detect(userAgent);
        console.log(result);
        
        console.log(DeviceHelper.isAndroid(result));
        console.log(DeviceHelper.isBrowser(result));
        console.log(DeviceHelper.isTablet(result));
        console.log(DeviceHelper.isMobile(result));
        
        const getData = await pool.query(`select * from customers`)
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

const getOneCustomer = async (req,res)=>{
    try{
        const {id} = req.params
        const getOne = await pool.query(`select * from customers where id = $1`, [id])
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

const filtrOne = async (req,res)=>{
    try{
        const {name, phone, email} = req.query
        
        let dbQuery = "select * from customers where true "
        let index = 1
        let values = []

        if(name) {
            dbQuery+=`and name = $${index++}`
            values.push(name)
        }
        if(phone) {
            dbQuery+= `and phone = $${index++}`
            values.push(phone)
        }
        if(email) {
            dbQuery+= `and email = $${index++}`
            values.push(email)
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

const updateCustomer = async (req,res)=>{
    try{
        const {id} = req.params
        const {name, phone, email} = req.body
        
        let d = []  
        let index = 1
        let values = []

        if(name) {
            d.push(`name = $${index++}`)
            values.push(name)
        }
        if(phone) {
            d.push(`phone = $${index++}`)
            values.push(phone)
        }
        if(email) {
            d.push(`email = $${index++}`)
            values.push(email)
        }
        if(index===1) return res.status(400).json({message: "So'rov kriting"})
        values.push(id)
        const updateC = await pool.query(`update customers set ${d.join(",")} where id = $${index}`, [...values])
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

const delCustomer = async (req,res)=>{
    try{
        const id = req.params.id
        const del = await pool.query(`delete from customers where id=$1`,[id])
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
    addCustomer,
    getCustomer,
    getOneCustomer,
    filtrOne,
    updateCustomer,
    delCustomer
}