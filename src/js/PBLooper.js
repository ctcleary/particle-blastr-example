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
            this.pb.startBlast();
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

    colorHexToArr(colorHex) {
        const colorPieces = [
            colorHex.substr(1).substr(0,2),
            colorHex.substr(1).substr(2,2),
            colorHex.substr(1).substr(4,2),
        ]
        return [
            parseInt(colorPieces[0], 16),
            parseInt(colorPieces[1], 16),
            parseInt(colorPieces[2], 16),
        ]
    }

    setConfig(cfg) {
        this.stop();
        this.config = cfg;
        
        // this.startX = cfg.startX || 250;
        // this.startY = cfg.startY || 250;
        
        let computedConfig = {
            canvas: this.canvas,
            quadrants: [cfg.quadrantNE, cfg.quadrantSE, cfg.quadrantSW, cfg.quadrantNW],
            particleStrokeColor: cfg.particleStrokeColorToggle ? this.colorHexToArr(cfg.particleStrokeColorHex) : null,
            ...cfg,
        }

        if (cfg.particleMulticolorToggle) {
            let result = [];
            result[0] = this.colorHexToArr(cfg.particleColorsHex1)
            result[1] = this.colorHexToArr(cfg.particleColorsHex2)
            result[2] = this.colorHexToArr(cfg.particleColorsHex3)
            computedConfig.particleColors = result;
        } else {
            computedConfig.particleColor = this.colorHexToArr(cfg.particleColorHex)
        }

        if (cfg.particleShape = ParticleBlastr.SHAPE.IMAGE) {
            let result = document.createElement('img');
            switch (cfg.particleImgName) {
                case 'smokeParticle':
                    result.src = './assets/smokeParticle_100x100.png';
                    break;
                case 'starParticle':
                default:
                    result.src = './assets/starParticle_20x20.png';
                    break;
            }

            computedConfig.particleImg = result;
        }

        this.pb = new ParticleBlastr(computedConfig)
    }

    setCanvas(canvas) {
        this.stop();
        this.canvas = canvas;
    }

    // setXY(x, y) {
    //     this.startX = x;
    //     this.startY = y;
    // }
}

export default PBLooper