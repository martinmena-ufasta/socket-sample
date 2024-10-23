import {Box, Button, TextField} from '@mui/material';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {userActions} from '@/app/reducers/userActions';

export default function Index() {
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = (event : any) => {
        event.preventDefault()
        if (name.length > 0)
            dispatch(userActions.setName(name));
            router.push('/chat')
    }

    return (
        <div className="home">
            <h1>Bienvenido al chat</h1>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className="login"
            >
                <TextField className="name-input" id="name-input" label="Ingrese su nombre" variant="outlined" onChange={handleInputChange} />
                <Button variant="contained" onClick={handleSubmit}>Entrar</Button>
            </Box>
        </div>
    )
}