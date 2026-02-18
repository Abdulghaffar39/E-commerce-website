const productSchema = require("../DB/DB_Product")



async function postProduct(req, res) {

    try {

        const { ProductName, BrandName, Category, Description, Price, StockQuantity, BatteryCapacity, DisplayType, StrapMaterial, WaterResistance, Warranty } = req.body

        const AllProducts = { ProductName, BrandName, Category, Description, Price, StockQuantity, BatteryCapacity, DisplayType, StrapMaterial, WaterResistance, Warranty }

        if (!AllProducts) {
            return res.send({
                status: 201,
                message: "Product empty"
            })
        }

        const Products = await new productSchema(AllProducts).save()

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


module.exports = { postProduct }