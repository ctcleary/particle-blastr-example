import ParticleBlastr from './particle-blastr';
import { createStore, action } from 'easy-peasy';

export default createStore({
    configName: 'defBlast',
    setConfigName: action((state, payload) => {
        state.configName = payload;
    })
})