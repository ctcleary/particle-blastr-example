import ParticleBlastr from "./particle-blastr"

class PBLooper {
    id = Math.round(Math.random()*999999);
    pb;
    config;
    isRunning = false;

    startX = 250;
    startY = 250;

    timeout;

    constructor(cfg, canvas) {
        this.config = cfg;
        this.canvas = canvas;
        this.pb = new ParticleBlastr({
            canvas: this.canvas,
            ...cfg
        });

        if (!cfg) throw new Error('no cfg');
        this.startX = cfg.startX || 250;
        this.startY = cfg.startY || 250;
    }

    runLoop() {
        clearTimeout(this.timeout);

        if (this.isRunning) {
            this.timeout = setTimeout(this.runLoop.bind(this), this.config.blastLengthMs)
            this.pb.startBlast(this.startX, this.startY);
        }
    }

    start() {
        this.isRunning = true;
        this.runLoop();
    }

    stop() {
        this.isRunning = false;
        clearTimeout(this.timeout);
    }

    setConfig(cfg) {
        this.stop();
        this.config = cfg;
        
        this.startX = cfg.startX || 250;
        this.startY = cfg.startY || 250;

        console.log('quadrants', [cfg.quadrantNE, cfg.quadrantSE, cfg.quadrantSW, cfg.quadrantNW]);

        const colorPieces = [
            cfg.particleColorHex.substr(1).substr(0,2),
            cfg.particleColorHex.substr(1).substr(2,2),
            cfg.particleColorHex.substr(1).substr(4,2),
        ]
        const colorArr = [
            parseInt(colorPieces[0], 16),
            parseInt(colorPieces[1], 16),
            parseInt(colorPieces[2], 16),
        ]
        console.log(colorPieces);
        console.log(colorArr);
        this.pb = new ParticleBlastr({
            canvas: this.canvas,
            quadrants: [cfg.quadrantNE, cfg.quadrantSE, cfg.quadrantSW, cfg.quadrantNW],
            particleColor: colorArr,
            ...cfg
        })
    }

    setCanvas(canvas) {
        this.stop();
        this.canvas = canvas;
    }

    setXY(x, y) {
        this.startX = x;
        this.startY = y;
    }
}

export default PBLooper