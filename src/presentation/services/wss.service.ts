import { Server } from 'http';
import  { WebSocket, WebSocketServer} from 'ws';

interface Options {
    server:Server;
    path?:string;
}



export class WssService {
    private  static _instance : WssService ;
    private wss : WebSocketServer;



    private constructor(options : Options){

        const  {server, path = '/ws'} = options;


        this.wss =  new WebSocketServer({server, path});

    }

    static get instance(): WssService{
        if(!WssService._instance){
            throw 'WeeService is not initialized'
        }

        return WssService._instance;
    }

    static initWss(options:Options){
   WssService._instance =  new WssService(options);
    }

    public sendMesage(type:string, payload:Object) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({type, payload}));
            }
        });
    }

    public start() {

        this.wss.on('connectoin', (ws :WebSocket) => {

            console.log('Cloietn connectes')
            console.log('close', () => console.log('clienf'));

        });
    } 
}