// exports.createPayment = async (req, res) => {
//     const { totalPrice } = req.body;
//     const partnerCode = "MOMO";
//     const accessKey = "F8BBA842ECF85";
//     const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
//     const requestId = partnerCode + new Date().getTime() + "id";
//     const orderId = new Date().getTime() + ":0123456778";
//     const orderInfo = "Thanh toán qua ATM MoMo";
//     //nếu thanh toán thành công thì trả về
//     const redirectUrl = "https://momo.vn/";
//     const ipnUrl = "https://www.google.com/search?q=gg+d%E1%BB%8Bch&oq=GG&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIPCAEQRRg5GIMBGLEDGIAEMg4IAhBFGCcYOxiABBiKBTIMCAMQABhDGIAEGIoFMg0IBBAAGIMBGLEDGIAEMg0IBRAAGIMBGLEDGIAEMg0IBhAAGIMBGLEDGIAEMg0IBxAAGIMBGLEDGIAEMg0ICBAAGIMBGLEDGIAEMhIICRAAGEMYgwEYsQMYgAQYigXSAQgxNzMyajBqN6gCALACAA&sourceid=chrome&ie=UTF-8";
//     const amount = totalPrice;
//     const requestType = "payWithATM";  // Changed from "captureWallet" to "payWithATM"
//     const extraData = "";  // Pass empty value if your merchant does not have stores

//     const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

//     const crypto = require("crypto");
//     const signature = crypto.createHmac("sha256", secretKey)
//                             .update(rawSignature)
//                             .digest("hex");

//     const requestBody = JSON.stringify({
//       partnerCode: partnerCode,
//       accessKey: accessKey,
//       requestId: requestId,
//       amount: amount,
//       orderId: orderId,
//       orderInfo: orderInfo,
//       redirectUrl: redirectUrl,
//       ipnUrl: ipnUrl,
//       extraData: extraData,
//       requestType: requestType,
//       signature: signature,
//       lang: "en",
//     });

//     const https = require("https");
//     const options = {
//       hostname: "test-payment.momo.vn",
//       port: 443,
//       path: "/v2/gateway/api/create",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Content-Length": Buffer.byteLength(requestBody),
//       },
//     };

//     const reqq = https.request(options, (resMom) => {
//       console.log(`Status: ${resMom.statusCode}`);
//       resMom.setEncoding("utf8");
//       resMom.on('data', (body) => {
//         try {
//             let data = JSON.parse(body);
//             console.log("Data received:", data);
//             if (data && data.payUrl) {
//                 res.json({ payUrl: data.payUrl });
//             } else {
//                 console.error("No payUrl received:", data);
//                 res.status(500).json({ error: 'No payUrl received, check logs for details.' });
//             }
//         } catch (error) {
//             console.error("Error parsing response:", error);
//             res.status(500).json({ error: 'Error parsing response from MoMo.' });
//         }
//     });
//       resMom.on("end", () => {
//         console.log("No more data in response.");
//       });
//     });

//     reqq.on("error", (e) => {
//       console.log(`problem with request: ${e.message}`);
//     });

//     console.log("Sending....");
//     reqq.write(requestBody);
//     reqq.end();
//   };

const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const qs = require("qs");

exports.createPayment = async (req, res) => {
  const { totalPrice } = req.body;
  const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
  };

  const embed_data = { bankgroup: "ATM" };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: totalPrice,
    description: `Thanh toán lịch hẹn cho salon tóc`,
    bank_code: "",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  axios
    .post(config.endpoint, null, { params: order })
    .then((response) => {
      console.log(response.data);
      res.json({ order_url: response.data.order_url, transID: order.app_trans_id});
    })
    .catch((err) => console.log(err));
};

exports.checkPayment = async (req, res) => {
  const {transID} = req.body;
  const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/query",
  };

  let postData = {
    app_id: config.app_id,
    app_trans_id: transID, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: config.endpoint,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  axios(postConfig)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      res.json({ data: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.refundPayment = async (req, res) => {

  const {transID, totalPrice } = req.body;

  const config = {
    app_id: 2553,
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    refund_url: "https://sb-openapi.zalopay.vn/v2/refund"
  };
  
  const timestamp = Date.now();
  const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`; // unique id
  let params = {
    app_id: config.app_id,
    m_refund_id: `${moment().format('YYMMDD')}_${config.app_id}_${uid}`,
    zp_trans_id: transID,
    amount: 10000,
    refund_fee_amount: 0,
    timestamp, // miliseconds
    description: 'ZaloPay Refund Demo',
  };
  
  // app_id|zp_trans_id|amount|description|timestamp
  let data = params.app_id + "|" + params.zp_trans_id + "|" + params.amount + "|" + params.refund_fee_amount + "|" + params.description + "|" + params.timestamp;
  params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  
  // axios.post(config.refund_url, null, { params })
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err));

  let config1 = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sb-openapi.zalopay.vn/v2/refund',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
      data : JSON.stringify(params)
    };
    
    axios(config1)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      console.log("m_refund_id:", params.m_refund_id);
    })
    .catch((error) => {
      console.log(error);
    });


 
    // let params1 = {
    //   app_id: 2553,
    //   m_refund_id: `${moment().format('YYMMDD')}_${config.app_id}_${uid}`,
    //   zp_trans_id: transID,
    //   amount: 10000,
    //   refund_fee_amount: 0,
    //   timestamp: timestamp,
    //   description: "ZaloPay Refund Demo",      
    // }

    // let data1 = params1.app_id + "|" + params1.zp_trans_id + "|" + params1.amount + "|" + params1.refund_fee_amount + "|" + params1.description + "|" + params1.timestamp;
    // params1.mac = CryptoJS.HmacSHA256(data1, config.key1).toString();

    
    // let config1 = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://sb-openapi.zalopay.vn/v2/refund',
    //   headers: { 
    //     'Content-Type': 'application/json', 
    //     'Accept': 'application/json'
    //   },
    //   data : JSON.stringify(params1)
    // };
    
    // axios(config1)
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    //   console.log("m_refund_id:", params1.m_refund_id);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

}

exports.checkRefund = async (req, res ) => {
  const {transID} = req.body;
  const config = {
    app_id: 2553,
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/query_refund"
  };
  
  const params = {
    app_id: config.app_id,
    timestamp: Date.now(), // miliseconds
    m_refund_id: transID, 
  };
  
  const data = config.app_id + "|" + params.m_refund_id + "|" + params.timestamp; // app_id|m_refund_id|timestamp
  params.mac = CryptoJS.HmacSHA256(data, config.key1).toString()
  
  let config1 = {
    method: 'post',
    url: config.endpoint,
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    },
    data : JSON.stringify(params)
  };

  axios(config1)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.json({ data: response.data});
  })
}