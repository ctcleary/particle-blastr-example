import ParticleBlastr from './particle-blastr';
import { createStore, action } from 'easy-peasy';

export default createStore({
    configName: 'defBlast',
    setConfigName: action((state, payload) => {
        state.configName = payload;
    }),
    startX: 250,
    setStartX: action((state, payload) => {
        state.startX = payload;
    }),
    startY: 250,
    setStartY: action((state, payload) => {
        state.startY = payload;
    }),
    particleShape: ParticleBlastr.SHAPE.CIRCLE,
    setParticleShape: action((state, payload) => {
        state.particleShape = payload;
    }),
    particleCount: 50,
    setParticleCount: action((state, payload) => {
        state.particleCount = payload;
    }),

    particleRadius: 3,
    setParticleRadius: action((state, payload) => {
        state.particleRadius = payload;
    }),
    particleSize: 10,
    setParticleSize: action((state, payload) => {
        state.particleSize = payload;
    }),
    particleWidth: 10,
    setParticleWidth: action((state, payload) => {
        state.particleWidth = payload;
    }),
    particleHeight: 10,
    setParticleHeight: action((state, payload) => {
        state.particleHeight = payload;
    }),
    particleSizeVariance: 20,
    setParticleSizeVariance: action((state, payload) => {
        state.particleSizeVariance = payload;
    }),
    particleEndScale: 1,
    setParticleEndScale: action((state, payload) => {
        state.particleEndScale = payload;
    }),

    particleColorHex: '#ff00ff',
    setParticleColorHex: action((state, payload) => {
        state.particleColorHex = payload;
    }),

    quadrantNE: true,
    setQuadrantNE: action((state, payload) => {
        state.quadrantNE = payload;
    }),
    quadrantSE: false,
    setQuadrantSE: action((state, payload) => {
        state.quadrantSE = payload;
    }),
    quadrantSW: true,
    setQuadrantSW: action((state, payload) => {
        state.quadrantSW = payload;
    }),
    quadrantNW: false,
    setQuadrantNW: action((state, payload) => {
        state.quadrantNW = payload;
    }),


    particleOpacity: 1,
    setParticleOpacity: action((state, payload) => {
        state.particleOpacity = payload;
    }),
    particleEndOpacity: 0,
    setParticleEndOpacity: action((state, payload) => {
        state.particleEndOpacity = payload;
    }),

    particleMinDistance: 0,
    setParticleMinDistance: action((state, payload) => {
        state.particleMinDistance = payload;
    }),
    particleMaxDistance: 1200,
    setParticleMaxDistance: action((state, payload) => {
        state.particleMaxDistance = payload;
    }),

    blastLengthMs: 3000,
    setBlastLengthMs: action((state, payload) => {
        state.blastLengthMs = payload;
    }),
    gravity: 0,
    setGravity: action((state, payload) => {
        state.gravity = payload;
    }),
    gravityVariance: 0,
    setGravityVariance: action((state, payload) => {
        state.gravityVariance = payload;
    }),
})