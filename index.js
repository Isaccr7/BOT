import { sendToTelegram } from "./services/telegram";

export default {
    async fetch(request) {
        if (request.method !== "POST") {
            return new Response("Este metodo no funciona", { status: 405 })
        }
        /*creamos un try catch*/
        try {
            const data = await request.json();
            let platform, message, chatId;
            /*verificando de donde viene la peticion*/
            /* if (data.message) {
                platform = "telegram";
                chatId = data.message.chat.id;
                message = data.message.text || "";
                 
            }
            else { */
                platform = data.platform;
                chatId = data.chatId;
                message = data.message;
            /* } */

            /*verificar a que plataforma corresponde*/

            if (platform === "telegram") {
                await sendToTelegram(chatId, message);
            }
            else {
                return new Response("Esta plataforma no esta disponible", { status: 400 });
            }
            /*responder*/
            return new Response(`Mensaje Enviado ${message}`, { status: 200 });

        } catch (error) {
            return new Response(`algo sucedio ${error.message}`, { status: 500 });
        }
    }
};
/* {
    name="ruiz",
    edad="25",
    dir="no se sabe"
} */