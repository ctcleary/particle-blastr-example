import ParticleBlastr from "./particle-blastr";

const blastLength = 3000;

const pbExamples = {
    defBlast : {
      startX: 250,
      startY: 250,
      // canvas: document.getElementById('demo-canvas'),
      quadrants: [true, true, true, true],
      particleCount: 100,

      particleColor: [255, 0, 255],
      particleColors: [
        [255, 40, 0],
        [250, 190, 50],
        [240, 25, 150],
      ],

      particleShape: ParticleBlastr.SHAPE.CIRCLE,
      particleRadius: 3,
      particleSize: 10,
      particleWidth: 10,
      particleHeight: 10,
      particleEndScale: 1,
      particleSizeVariance: 0,

      particleOpacity: 1,
      particleEndOpacity: 0,

      particleMaxDistance: 1000,
      particleMinDistance: 100,

      gravity: 5000,
      gravityVariance: 0,

      blastLengthMs: blastLength,
    },

    megaBlast : {
        startX: 100,
        startY: 250,
        
        particleCount: 300,
        quadrants: [true, true, true, true],
  
        //temp
        particleColor: [160, 235, 255],
        particleColors: [
          [  0, 120, 225],
          [  0, 180, 225],
          [  5, 100, 240],
          [160, 235, 255],
          [200, 235, 255],
        ],
  
        particleShape: ParticleBlastr.SHAPE.SQUARE,
        particleSize: 35,
        particleSizeVariance: 12,
  
        particleEndScale: 0.15,
  
        particleStrokeColor: [235, 235, 255],

        particleOpacity: 1,
        particleEndOpacity: 1,
  
        particleMinDistance: 80,
        particleMaxDistance: 260,
  
        blastLengthMs: 800,
        
        gravity: 0,
        gravityVariance: 0,
    },
    pinkPillBlast : {
        startX: 25,
        startY: 250,
        
        quadrants: [true, true, false, false],
  
        particleCount: 300,
  
        particleColor: [255, 180, 225],
        particleColors: [
          [255, 120, 225],
          [255, 180, 225],
          [255, 100, 240],
          [255, 235, 255],
        ],
        particleStrokeColor: [100, 100, 100],
  
        particleShape: ParticleBlastr.SHAPE.ROUND_RECT,
        particleWidth: 32,
        particleHeight: 16,
        particleBorderRadius: 25,
        particleSizeVariance: 3,

        particleOpacity: 1,
        particleEndOpacity: 1,
  
        particleEndScale: 0.25,
        particleEndOpacity: 1,
  
        particleMaxDistance: 660,
        particleMinDistance: 660,
  
        gravity: 0,
        gravityVariance: 0,

        blastLengthMs: 2500,
    },
    redBallBlast: {
        startX: 250,
        startY: 375,
        quadrants: [false, true, false, true],
  
        particleCount: 10,
  
        particleColor: [255, 0, 0],
        particleStrokeColor: [205, 60, 60],
  
        particleShape: ParticleBlastr.SHAPE.CIRCLE,
        particleRadius: 2,
        particleSizeVariance: 2,
  
        particleOpacity: 1,
        particleEndOpacity: 0,

        particleEndScale: 10,
  
        particleMaxDistance: 750,
        particleMinDistance: 50,
  
        blastLengthMs: 1800,
        
        gravity: -525,
        gravityVariance: 50,

      },
      blockFallBlast : {
        startX: 250,
        startY: -150,
        
        quadrants: [false, true, true, false],
  
        particleCount: 100,
  
        particleColor: [0, 255, 255],
        particleColors: [
          [255, 255, 0],
          [0, 255, 255],
          [255, 0, 255],
        ],
  
        particleStrokeColor: [255, 255, 255],
  
        particleShape: ParticleBlastr.SHAPE.RECT,
        particleWidth: 25,
        particleHeight: 12,
  
        particleSizeVariance: 30,
  
        particleEndScale: 15,
  
        particleOpacity: 0.1,
        particleEndOpacity: 0.5,
  
        particleMaxDistance: 1600,
  
        blastLengthMs: 2000,
        
        gravity: 8000,
        gravityVariance: 4000
    },
    starBlast : {   
        startX: 250,
        startY: 250, 
        quadrants: [true, false, false, true],
        
        particleCount: 75,
    
        particleShape: ParticleBlastr.SHAPE.IMAGE,
        // particleImg: document.getElementById('starParticle'),
        particleImgName: 'starParticle',
        particleWidth:  25,
        particleHeight: 25,
        particleSizeVariance: 25,
        particleProportionalSizeVariance: true,
    
        particleOpacity: 1,
        particleEndOpacity: 1,
        particleEndScale: 0,
    
        particleMaxDistance: 580,
        particleMinDistance: 40,

        gravity: 1500,
        gravityVariance: 500,
    
        blastLengthMs: 2000,
    },
    smokeBlast : {
        startX: 250,
        startY: 400,
        quadrants: [true, true, true, true],
        
        particleCount: 450,
        particleColor: [80, 80, 83],
  
        particleOpacity: 0.2,
        particleEndOpacity: 0,

  
        particleShape: ParticleBlastr.SHAPE.IMAGE,
        // particleImg: document.getElementById('smokeParticle'),
        particleImgName: 'smokeParticle',
        particleWidth: 12,
        particleHeight: 12,
        particleSizeVariance: 5,
  
        particleEndScale: 10,
  
        particleMaxDistance: 340,
        particleMinDistance: 40,
  
        gravity: -2600,
        gravityVariance: 1200,

        blastLengthMs: 2500,
    },
};

export default pbExamples;
