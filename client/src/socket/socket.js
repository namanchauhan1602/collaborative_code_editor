import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        transports: ['websocket'],
        reconnection: 'infinity',
        timeout: 10000,
    }
    return io('https://collaborative-code-editor-server.vercel.app/', options);
}
