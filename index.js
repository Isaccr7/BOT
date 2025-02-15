import { sendToTelegram } from "./services/telegram";

export default{
    async fetch(request){
        if(request.method!=="POST"){
            return new Response("Este metodo no funciona",{status:405})
        }


        /*creamo un try cath */
        try{
            const data=await request.json();
            let platform,message,chatId;

            // verifica,ps de donde viene la peticion

         /*   if(data.messages){
                platform="telegram";
                chatId=data.message.chat.id;
                messages=data.message.text||"";
            } */

            // si es de la api
       /*     else{ */
                platform=data.platform;
                chatId=data.chatId;
                message=data.message;

            /* } */

            // verificamos a que platafoma corresponde 

            if(platform==="telegram"){
                await sendToTelegram(chatId,message);
            }
            else{
                return new Response("Esta plataforma no esta disponible",{status:400});
            }
            /*responder*/

            return new Response(`Mensaje Enviado ${message}`,{status:200});

        }catch(error){
            return new Response(`Algo sucedio ${error.message}`,{status:500});
        }
    }
};
