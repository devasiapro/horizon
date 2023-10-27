import axios from "axios";
import crypto from "crypto";
import "dotenv/config";

const SECRET_KEY = process.env.TORRO_SECRET_KEY;

const hash = crypto
    .createHash("md5")
    .update(
        "refund_balance" +
            "TW4xNjLS" +
            1 +
            "bfb" +
            "trx_id" +
            "token" +
            "session_id" +
            "game server error" + 
            SECRET_KEY
    ).digest('hex');

const call = async () => {
    try {
        const response = await axios.post(
            "https://torrodemo.horizon88.com/api/wallet/torrospin",
            {
                action: "refund_balance",
                user_id: "TW4xNjLS",
                refund: 1,
                game_name: "bfb",
                transaction_id: "trx_id",
                token: "token",
                session_id: "session_id",
                reason: "game server error",
                hash: hash,
            }
        );
        console.log('response', response.data);
    } catch (error) {console.log('err', error);}
};

call();
