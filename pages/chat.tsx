import {Box, Button, TextField} from '@mui/material';
import {useRouter} from 'next/router';
import {userActions} from '@/app/reducers/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {io, Socket} from 'socket.io-client';

export default function Chat() {
    const username = useSelector((state) => state.name);
    const socket : MutableRefObject<Socket | null> = useRef(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();

    // Conectar con el socket en el puerto 3002
    useEffect(() => {
        socket.current = io('http://localhost:3002');

        // Escuchar mensajes desde el servidor
        socket.current.on('message', (newMessages) => {
            setMessages(newMessages);
        });

        // Limpiar la conexión cuando el componente se desmonte
        return () => {
            if (socket) {
                socket.current.disconnect();
            }
        };
    }, []);

    const sendMessage = (e: any) => {
        e.preventDefault()
        if (newMessage.trim() && socket.current !== null) {
            // Emitir un nuevo mensaje al servidor
            socket.current.emit('sendMessage', {username: username, message: newMessage});
            setNewMessage('');
        }
    };

    const handleLogout = () => {
        console.log("logout")
        dispatch(userActions.removeName());
        router.push('/');
    }

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>

            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={sendMessage}
            >
                <TextField className="name-input" id="name-input" label="Ingrese su nombre" variant="outlined" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <Button variant="contained" onClick={sendMessage}>Enviar</Button>
            </Box>
            <Button variant="contained" onClick={handleLogout}>Salir</Button>
        </div>
    );
}