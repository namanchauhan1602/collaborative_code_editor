import { io } from 'socket.io-client';

export const initSocket = async () => {
    return io('collaborative-code-editor-server.vercel.app/');
}
