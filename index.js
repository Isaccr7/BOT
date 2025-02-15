import { sendToTelegram } from "./services/telegram";

export default{
    async fetch(request){
        if(request.method!=="POST"){
            return new Response("Este metodo no funciona",{status:405})
        }


        /*creamo un try cath */
        try{
            const data=await request.json();
            let platform,messages,chatId;

            // verifica,ps de donde viene la peticion

            if(data.messages){
                platform="telegram";
                chatId=data.messages.chat.id;
                messages=data.messages.text||"";
            }

            // si es de la api
            else{
                platform=data.platform;
                chatId=data.chatId;
                messages=data.messages;

            }

            // verificamos a que platafoma corresponde 

            if(platform==="telegram"){
                await sendToTelegram(chatId,messages);
            }
            else{
                return new Response("Esta plataforma no esta disponible",{status:400});
            }
            /*responder*/

            return new Response(`Mensaje Enviado ${messages}`,{status:200});

        }catch(error){
            return new Response(`Algo sucedio ${error.messages}`,{status:500});
        }
    }
};
