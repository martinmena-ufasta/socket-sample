import MainLayout from '@/app/components/MainLayout';
import "../app/globals.css"
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/app/reducers/userReducer';

const store = configureStore({
    reducer: userReducer
})

export default function App({ Component, pageProps}) {
    return (
        <Provider store={store}>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </Provider>
    )
}