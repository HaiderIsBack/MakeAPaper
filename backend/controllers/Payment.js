const axios = require("axios")
const Subscription = require("../models/Subscription")

/**
 * {
    "pp_Version": "1.1",
    "pp_TxnType": "MWALLET",
    "pp_Language": "EN",
    "pp_MerchantID": "MC104523",
    "pp_SubMerchantID": "",
    "pp_Password": "null",
    "pp_BankID": "",
    "pp_ProductID": "",
    "pp_TxnRefNo": "T20240620121638",
    "pp_Amount": "500",
    "pp_TxnCurrency": "PKR",
    "pp_TxnDateTime": "20240620121638",
    "pp_BillReference": "billref",
    "pp_Description": "Description of transaction",
    "pp_TxnExpiryDateTime": "20240620121638",
    "pp_ReturnURL": "",
    "pp_SecureHash": "6CD80A9C917AC9AFE12D083A231C98D3E8A7B852C3B38992EB84D77BC56C2DB1",
    "ppmpf_1": "03137338016",
    "ppmpf_2": "",
    "ppmpf_3": "",
    "ppmpf_4": "",
    "ppmpf_5": ""
}
 */

const pay = async (req, res) => {
    try {
        const { userId, amount, mobileNo } = req.body;

        if(!userId || !amount || !mobileNo){
            res.status(403).json({msg: "Bad request: 403"})
        }else{
            const payload = {
                "pp_Version": "1.1",
                "pp_TxnType": "MWALLET",
                "pp_Language": "EN",
                "pp_MerchantID": "MC104523",
                "pp_SubMerchantID": "",
                "pp_Password": "null",
                "pp_BankID": "",
                "pp_ProductID": "",
                "pp_TxnRefNo": "T" + new Date("yyyyMMddHHmmss"),
                "pp_Amount": amount,
                "pp_TxnCurrency": "PKR",
                "pp_TxnDateTime": new Date("yyyyMMddHHmmss"),
                "pp_BillReference": "billref",
                "pp_Description": "Description of transaction",
                "pp_TxnExpiryDateTime": new Date("yyyyMMddHHmmss"),
                "pp_ReturnURL": "http://localhost:5173/",
                "pp_SecureHash": "6CD80A9C917AC9AFE12D083A231C98D3E8A7B852C3B38992EB84D77BC56C2DB1",
                "ppmpf_1": mobileNo,
                "ppmpf_2": "",
                "ppmpf_3": "",
                "ppmpf_4": "",
                "ppmpf_5": ""
            }

            const response = await axios.post("https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction", payload);
            
            res.status(200).json(response.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Server Error: 500"})
    }
}

module.exports = pay;