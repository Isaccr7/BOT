import { telegram_api} from "../utils/config";

export async function sendToTelegram(chatId,messages) {
    return fetch(`${telegram_api}/sendMessage`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({chat_id:chatId,text:messages}),
    });
}