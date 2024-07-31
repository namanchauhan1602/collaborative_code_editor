import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        transports: ['websocket'],
        reconnection: 'infinity',
        timeout: 10000,
    }
    return io('collaborative-code-editor-hzc5bngvz-namans-projects-092efb07.vercel.app', options);
}
