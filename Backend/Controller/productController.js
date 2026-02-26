// const productSchema = require("../DB/DB_Product")
// const { findOne } = require("../DB/DB_Schema")

const productSchema = require("../DB/DB_Product");

async function postProduct(req, res) {

    try {

        const { ProductName,BrandName, Category, Description, Price, StockQuantity, BatteryCapacity, DisplayType, StrapMaterial, WaterResistance, Warranty } = req.body

        const AllProducts = { ProductName,BrandName, Category, Description, Price, StockQuantity, BatteryCapacity, DisplayType, StrapMaterial, WaterResistance, Warranty}



        if (!AllProducts) {
            return res.send({
                status: 201,
                message: "Product empty"
            })
        }
        
        // console.log(AllProducts);
        const Product = await new productSchema(AllProducts).save();

        return res.send({

            status: 200,
            message: "Product Post Successfuly"
        })

    }
    catch (err) {
        res.send({
            status: 400,
            message: "product not post"
        })
    }
}


async function getProduct(req, res) {

    try {

        const get = await productSchema.find()

        return res.send({

            get,
            status: 200,
            message: "Product Get Successfuly"
        })

    }
    catch (err) {
        res.send({
            status: 400,
            message: "product not get"
        })
    }
}


async function updateProduct(req, res) {

    const { id } = req.params;

    console.log(id);

    const { ProductName, BrandName, Category, Description, Price, StockQuantity, BatteryCapacity, DisplayType, StrapMaterial, WaterResistance, Warranty } = req.body

    try {

        const updated = await productSchema.findByIdAndUpdate(id, { ProductName, BrandName, Category, Description, Price, StockQuantity, BatteryCapacity, DisplayType, StrapMaterial, WaterResistance, Warranty })
        console.log(updated);

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({

            success: true,
            message: 'Product updated successfully',
            data: updated,
        });

    }
    catch (err) {
        res.send({
            status: 400,
            message: "product not get"
        })
    }
}

async function deleteProduct(req, res) {

    try {
        const { id } = req.params;
        console.log(id);

        const productsDelete = await productSchema.findByIdAndDelete(id)

        if (!productsDelete){
            return res.status(400).send({
                message: "Product Not found"
            })
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });

    }
    catch (err) {
        return res.send({
            status: 500,
            message: `err ${err.message}`
        })
    }
}


module.exports = { postProduct, getProduct, updateProduct, deleteProduct }