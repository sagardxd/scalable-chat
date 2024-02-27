import {Server} from "socket.io"
import Redis from 'ioredis'

const pub = new Redis({
    host: "redis-768c9ab-sagardxd.a.aivencloud.com",
    port: 13951,
    username: "default",
    password: "AVNS_KPsmmZ8rOHZKCR267_n"
});
const sub = new Redis({
    host: "redis-768c9ab-sagardxd.a.aivencloud.com",
    port: 13951,
    username: "default",
    password: "AVNS_KPsmmZ8rOHZKCR267_n"
});

class SocketService {
    private _io: Server;

    constructor() {
        console.log('Init Socket Service...')
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin: '*'
            }
        });
    }

    public initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners....")
        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message', async ({message}: {message: string}) => {
                console.log(`New message: ${message}`)
                await pub.publish('MESSAGES', JSON.stringify({message}));
            })
        })
    }

    get io() {
        return this._io;
    }
}

export default SocketService;