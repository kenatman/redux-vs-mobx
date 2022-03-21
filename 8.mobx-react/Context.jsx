import React from 'react';
import {userStore, postStore} from './store';

export const storeContext = React.createContext({
    userStore,
    postStore,
});

export const storeProvider = ({children}) => {
    return (
        <storeContext.provider>
            {children}
        </storeContext.provider>
    )
};

export default storeProvider;