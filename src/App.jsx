import { useState, useEffect } from 'react'
import './App.css'

import SetterButton from './SetterButton'
import Presets from './Presets'

import ParticleBlastr from './js/particle-blastr'
import pbExamples from './js/pbExamples'
import PBLooper from './js/PBLooper'

import { useStoreState, useStoreActions } from 'easy-peasy'

function App() {
  const configName = useStoreState((state) => state.configName)
  const setConfigName = useStoreActions((actions) => actions.setConfigName)

  const [startX, setStartX] = useState(250)
  const [startY, setStartY] = useState(250)
  const [particleCount, setParticleCount] = useState(100)
  const [blastLengthMs, setBlastLengthMs] = useState(3000)
  const [particleColorHex, setParticleColorHex] = useState('#ff00ff')
  const [particleMulticolorToggle, setParticleMulticolorToggle] = useState(false)
  const [particleColorsHex1, setParticleColorsHex1] = useState('#ff0000')
  const [particleColorsHex2, setParticleColorsHex2] = useState('#00ff00')
  const [particleColorsHex3, setParticleColorsHex3] = useState('#0000ff')

  const [particleStrokeColorHex, setParticleStrokeColorHex] = useState('#000000')
  const [particleStrokeColorToggle, setParticleStrokeColorToggle] = useState(false)
  const [quadrantNE, setQuadrantNE] = useState(true)
  const [quadrantSE, setQuadrantSE] = useState(true)
  const [quadrantSW, setQuadrantSW] = useState(true)
  const [quadrantNW, setQuadrantNW] = useState(true)
  const [particleShape, setParticleShape] = useState(ParticleBlastr.SHAPE.CIRCLE)
  const [particleImgName, setParticleImgName] = useState('star')
  const [particleRadius, setParticleRadius] = useState(3)
  const [particleSize, setParticleSize] = useState(10)
  const [particleWidth, setParticleWidth] = useState(10)
  const [particleHeight, setParticleHeight] = useState(10)
  const [particleBorderRadius, setParticleBorderRadius] = useState(10)
  const [particleSizeVariance, setParticleSizeVariance] = useState(0)
  const [particleEndScale, setParticleEndScale] = useState(1)
  const [particleOpacity, setParticleOpacity] = useState(1)
  const [particleEndOpacity, setParticleEndOpacity] = useState(0)
  const [particleMinDistance, setParticleMinDistance] = useState(0)
  const [particleMaxDistance, setParticleMaxDistance] = useState(1000)
  const [gravity, setGravity] = useState(5000)
  const [gravityVariance, setGravityVariance] = useState(0)

  const [pbl, setPbl] = useState( new PBLooper(pbExamples['defBlast']) )

  // temp
  window.pbl = pbl;

  const configNames = Object.keys(pbExamples);

  useEffect(() => {
    console.log('do once after mount')
    pbl.setCanvas(document.getElementById('demo-canvas'))
    updateBlastr()
  }, [])

  useEffect(() => {
    console.log('new config name', configName )
    updateBlastr();
  }, [configName])

  useEffect(() => {
    setConfigName('custom');
    updateBlastr();
  }, [
    startX,
    startY,
    particleCount,
    blastLengthMs,
    particleColorHex,
    particleMulticolorToggle,
    particleColorsHex1,
    particleColorsHex2,
    particleColorsHex3,
    particleStrokeColorHex,
    particleStrokeColorToggle,
    quadrantNE,
    quadrantSE,
    quadrantSW,
    quadrantNW,
    particleShape,
    particleImgName,
    particleRadius,
    particleSize,
    particleWidth,
    particleHeight,
    particleBorderRadius,
    particleSizeVariance,
    particleEndScale,
    particleOpacity,
    particleEndOpacity,
    particleMinDistance,
    particleMaxDistance,
    gravity,
    gravityVariance,
  ])


  const isDef = (thing) => {
    return typeof thing !== 'undefined';
  }

  const colorArrToHex = (colorArr) => {
    const hexArray = [
      colorArr[0].toString(16),
      colorArr[1].toString(16),
      colorArr[2].toString(16),
    ]
    
    // add preceding 0 if needed
    const hexCode = hexArray.map((c) => (c.length === 1) ? '0'+c : c)
    return '#'+hexCode.join('')
  }

  const updateBlastr = () => {
    console.log('updateBlastr');
    if (configName !== 'custom') {
      const namedConfig = pbExamples[configName];

      isDef(namedConfig.startX) && setStartX(namedConfig.startX)
      isDef(namedConfig.startY) && setStartY(namedConfig.startY)
      isDef(namedConfig.particleCount) && setParticleCount(namedConfig.particleCount)
      isDef(namedConfig.blastLengthMs) && setBlastLengthMs(namedConfig.blastLengthMs)
      
      // preference given to multicolor
      if (isDef(namedConfig.particleColors)) {
        setParticleMulticolorToggle( true )
        setParticleColorsHex1( colorArrToHex(namedConfig.particleColors[0]) )
        setParticleColorsHex2( colorArrToHex(namedConfig.particleColors[1]) )
        setParticleColorsHex3( colorArrToHex(namedConfig.particleColors[2]) )

      } else if (isDef(namedConfig.particleColor)) {
        setParticleMulticolorToggle( false )
        setParticleColorHex( colorArrToHex(namedConfig.particleColor) )
      }

      if (isDef(namedConfig.particleStrokeColor)) {
        setParticleStrokeColorToggle( true )
        setParticleStrokeColorHex( colorArrToHex(namedConfig.particleStrokeColor) )
      } else {
        setParticleStrokeColorToggle( false );
      }

      if (isDef(namedConfig.quadrants)) {
        setQuadrantNE(namedConfig.quadrants[0])
        setQuadrantSE(namedConfig.quadrants[1])
        setQuadrantSW(namedConfig.quadrants[2])
        setQuadrantNW(namedConfig.quadrants[3])
      }

      isDef(namedConfig.particleShape) && setParticleShape(namedConfig.particleShape)
      isDef(namedConfig.particleImgName) && setParticleImgName(namedConfig.particleImgName)
      isDef(namedConfig.particleRadius) && setParticleRadius(namedConfig.particleRadius)
      isDef(namedConfig.particleSize) && setParticleSize(namedConfig.particleSize)
      isDef(namedConfig.particleWidth) && setParticleWidth(namedConfig.particleWidth)
      isDef(namedConfig.particleHeight) && setParticleHeight(namedConfig.particleHeight)
      isDef(namedConfig.particleBorderRadius) && setParticleBorderRadius(namedConfig.particleBorderRadius)
      isDef(namedConfig.particleSizeVariance) && setParticleSizeVariance(namedConfig.particleSizeVariance)
      isDef(namedConfig.particleEndScale) && setParticleEndScale(namedConfig.particleEndScale)


      isDef(namedConfig.particleOpacity) && setParticleOpacity(namedConfig.particleOpacity)
      isDef(namedConfig.particleEndOpacity) && setParticleEndOpacity(namedConfig.particleEndOpacity)
      
      isDef(namedConfig.particleMinDistance) && setParticleMinDistance(namedConfig.particleMinDistance)
      isDef(namedConfig.particleMaxDistance) && setParticleMaxDistance(namedConfig.particleMaxDistance)
      
      isDef(namedConfig.gravity) && setGravity(namedConfig.gravity)
      isDef(namedConfig.gravityVariance) && setGravityVariance(namedConfig.gravityVariance)
    } else {
      console.log('current config is custom')
    }

    pbl.setConfig({
      startX: startX,
      startY: startY,
      particleCount: particleCount,
      blastLengthMs: blastLengthMs,

      particleColorHex: particleColorHex,
      particleMulticolorToggle: particleMulticolorToggle,
      particleColorsHex1: particleColorsHex1,
      particleColorsHex2: particleColorsHex2,
      particleColorsHex3: particleColorsHex3,

      particleStrokeColorHex: particleStrokeColorHex,
      particleStrokeColorToggle: particleStrokeColorToggle,

      quadrantNE: quadrantNE,
      quadrantSE: quadrantSE,
      quadrantSW: quadrantSW,
      quadrantNW: quadrantNW,

      particleShape: particleShape,
      particleImgName: particleImgName,
      particleRadius: particleRadius,
      particleSize: particleSize,
      particleWidth: particleWidth,
      particleHeight: particleHeight,
      particleBorderRadius: particleBorderRadius,
      particleSizeVariance: particleSizeVariance,
      particleEndScale: particleEndScale,

      particleOpacity: particleOpacity,
      particleEndOpacity: particleEndOpacity,

      particleMinDistance: particleMinDistance,
      particleMaxDistance: particleMaxDistance,
      gravity: gravity,
      gravityVariance: gravityVariance,
    })
    
    pbl.start()
  }

  //hacky checkboxes fix
  useEffect(() => {
    document.querySelector('input[name="quadrantNE"]').checked = quadrantNE;
    document.querySelector('input[name="quadrantSE"]').checked = quadrantSE;
    document.querySelector('input[name="quadrantSW"]').checked = quadrantSW;
    document.querySelector('input[name="quadrantNW"]').checked = quadrantNW;
    document.querySelector('input[name="particleMulticolorToggle"]').checked = particleMulticolorToggle;
    document.querySelector('input[name="particleStrokeColorToggle"]').checked = particleStrokeColorToggle;
  }, [
    quadrantNE,
    quadrantSE,
    quadrantSW,
    quadrantNW,
    particleMulticolorToggle,
    particleStrokeColorToggle,
  ])

  return (
    <>
      <div id="wrapper">
        <section id="controls">
          <div id="controls-content">
            <header>
                <h1>particle-blastr.js</h1>
            </header>
            <main>
              <h2>Try one of the presets:</h2>
              
              <Presets configNames={configNames} />
                
              <hr/>
              
              <h2>Then fiddle with the controls!</h2>

              <label htmlFor="startX" className="">
                Blast center X
                <input 
                  type="number"
                  id="startX"
                  name="startX"
                  value={startX}
                  onChange={(e) => { setStartX(e.target.value) }}
                />
              </label>
              <label htmlFor="startY">
                Blast center Y
                <input
                  type="number"
                  id="startY"
                  name="startY"
                  value={startY}
                  onChange={(e) => { setStartY(e.target.value) }}
                />
              </label>
              <label htmlFor="particleCount">
                Particle Count
                <input
                  type="number"
                  id="particleCount"
                  name="particleCount"
                  value={particleCount}
                  onChange={(e) => { setParticleCount(e.target.value) }}
                />
              </label>
              <label htmlFor="blastLengthMs">
                Blast Length (ms)
                <input
                  type="number"
                  id="blastLengthMs"
                  name="blastLengthMs"
                  value={blastLengthMs}
                  onChange={(e) => { setBlastLengthMs(e.target.value) }}
                />
              </label>
              <hr/>
              <label htmlFor="particleShape">
                Particle Shape
                <select
                  id="particleShape"
                  name="particleShape"
                  value={particleShape}
                  onChange={(e) => { setParticleShape(e.target.value) }}
                >
                  <option value={ParticleBlastr.SHAPE.IMAGE}>{ParticleBlastr.SHAPE.IMAGE}</option>
                  <option value={ParticleBlastr.SHAPE.CIRCLE}>{ParticleBlastr.SHAPE.CIRCLE}</option>
                  <option value={ParticleBlastr.SHAPE.SQUARE}>{ParticleBlastr.SHAPE.SQUARE}</option>
                  <option value={ParticleBlastr.SHAPE.RECT}>{ParticleBlastr.SHAPE.RECT}</option>
                  <option value={ParticleBlastr.SHAPE.ROUND_RECT}>{ParticleBlastr.SHAPE.ROUND_RECT}</option>
                </select>
              </label>

              <label
                className={`${particleShape === ParticleBlastr.SHAPE.IMAGE ? '' : 'hidden'}`} 
                htmlFor="particleImgName"
              >
                Particle Image Choice
                <select
                  id="particleImgName"
                  name="particleImgName"
                  value={particleImgName}
                  onChange={(e) => { setParticleImgName(e.target.value) }}
                >
                  <option value="starParticle">starParticle</option>
                  <option value="smokeParticle">smokeParticle</option>
                </select>
              </label>
              
              <em>(you can use your own image)</em>
              <br/>

              <label
                className={`${particleShape === ParticleBlastr.SHAPE.CIRCLE ? '' : 'hidden'}`} 
                htmlFor="particleRadius"
              >
                Particle Radius
                <input
                  type="number"
                  id="particleRadius"
                  name="particleRadius"
                  value={particleRadius}
                  onChange={(e) => { setParticleRadius(e.target.value) }}
                />
              </label>
              <label 
                className={`${particleShape === ParticleBlastr.SHAPE.SQUARE ? '' : 'hidden'}`} 
                htmlFor="particleSize"
              >
                Particle Size (px)
                <input
                  type="number"
                  id="particleSize"
                  name="particleSize"
                  value={particleSize}
                  onChange={(e) => { setParticleSize(e.target.value) }}
                />
              </label>
              <label
                className={`${(particleShape === ParticleBlastr.SHAPE.RECT || particleShape === ParticleBlastr.SHAPE.ROUND_RECT || particleShape === ParticleBlastr.SHAPE.IMAGE) ? '' : 'hidden'}`} 
                htmlFor="particleWidth"
              >
                Particle Width (px)
                <input
                  type="number"
                  id="particleWidth"
                  name="particleWidth"
                  value={particleWidth}
                  onChange={(e) => { setParticleWidth(e.target.value) }}
                />
              </label>
              <label
                className={`${(particleShape === ParticleBlastr.SHAPE.RECT || particleShape === ParticleBlastr.SHAPE.ROUND_RECT || particleShape === ParticleBlastr.SHAPE.IMAGE) ? '' : 'hidden'}`} 
                htmlFor="particleHeight"
              >
                Particle Height (px)
                <input
                  type="number"
                  id="particleHeight"
                  name="particleHeight"
                  value={particleHeight}
                  onChange={(e) => { setParticleHeight(e.target.value) }}
                />
              </label>
              <label
                className={`${(particleShape === ParticleBlastr.SHAPE.ROUND_RECT) ? '' : 'hidden'}`} 
                htmlFor="particleBorderRadius"
              >
                Particle Border Radius
                <input
                  type="number"
                  id="particleBorderRadius"
                  name="particleBorderRadius"
                  value={particleBorderRadius}
                  onChange={(e) => { setParticleBorderRadius(e.target.value) }}
                />
              </label>

              <label htmlFor="particleSizeVariance" className="">
                Particle Size Variance
                <input 
                  type="number"
                  id="particleSizeVariance"
                  name="particleSizeVariance"
                  value={particleSizeVariance}
                  onChange={(e) => { setParticleSizeVariance(e.target.value) }}
                />
              </label>
              <label htmlFor="particleEndScale">
                Particle End Scale
                <input
                  type="number"
                  id="particleEndScale"
                  name="particleEndScale"
                  value={particleEndScale}
                  onChange={(e) => { setParticleEndScale(e.target.value) }}
                />
              </label>

              <hr/>
              <section id="color-selection"
                className={`${particleShape === ParticleBlastr.SHAPE.IMAGE ? 'hidden' : ''}`}
              >

                <label htmlFor="particleMulticolorToggle">
                  Use multicolor?
                    <input
                      type="checkbox"
                      name="particleMulticolorToggle"
                      value={particleMulticolorToggle}
                      defaultChecked={particleMulticolorToggle}
                      onChange={(e) => setParticleMulticolorToggle(e.target.checked)}
                    />
                </label>

                { particleMulticolorToggle ?
                  <>
                    <span><em>(actually supports <u>n</u> colors)</em></span>
                    <br/>
                    <label htmlFor="particleColorsHex1">
                      Particle Color 1
                      <input
                        type="color"
                        name="particleColorsHex1"
                        value={particleColorsHex1}
                        onChange={(e) => setParticleColorsHex1(e.target.value) }
                      />
                    </label>
                    <label htmlFor="particleColorsHex2">
                      Particle Color 2
                      <input
                        type="color"
                        name="particleColorsHex2"
                        value={particleColorsHex2}
                        onChange={(e) => setParticleColorsHex2(e.target.value) }
                      />
                    </label>
                    <label htmlFor="particleColorsHex3">
                      Particle Color 3
                      <input
                        type="color"
                        name="particleColorsHex3"
                        value={particleColorsHex3}
                        onChange={(e) => setParticleColorsHex3(e.target.value) }
                      />
                    </label>
                  </>
                  :
                  <>
                    <label htmlFor="particleColorHex">
                      Particle Color
                      <input
                        type="color"
                        name="particleColorHex"
                        value={particleColorHex}
                        onChange={(e) => setParticleColorHex(e.target.value) }
                      />
                    </label>
                  </>
                }
                <br/>
                <label htmlFor="particleStrokeColorToggle">
                    Use stroke color?
                    <input
                      type="checkbox"
                      name="particleStrokeColorToggle"
                      value={particleStrokeColorToggle}
                      defaultChecked={particleStrokeColorToggle}
                      onChange={(e) => setParticleStrokeColorToggle(e.target.checked)}
                    />
                </label>
                <label htmlFor="particleStrokeColorHex" >
                  Particle Stroke Color
                  <input
                    type="color"
                    name="particleStrokeColorHex"
                    value={particleStrokeColorHex}
                    onChange={(e) => setParticleStrokeColorHex(e.target.value) }
                  />
                </label>
                <hr/>
              </section>

              Emitter quadrants
              <br/>
              <section id="quadrant-selectors">
                <label htmlFor="quadrantNW" className="quadrant quadrant-west quadrant-north">
                  NW
                  <input
                    type="checkbox"
                    name="quadrantNW"
                    value={quadrantNW}
                    defaultChecked={quadrantNW}
                    onChange={(e) => setQuadrantNW(e.target.checked) }
                  />
                </label>
                <label htmlFor="quadrantNE" className="quadrant quadrant-east quadrant-north">
                  <input
                    type="checkbox"
                    name="quadrantNE"
                    value={quadrantNE}
                    defaultChecked={quadrantNE}
                    onChange={(e) => setQuadrantNE(e.target.checked)}
                  />
                  NE
                </label>
                <br/>
                <label htmlFor="quadrantSW" className="quadrant quadrant-west">
                  SW
                  <input
                    type="checkbox"
                    name="quadrantSW"
                    value={quadrantSW}
                    defaultChecked={quadrantSW}
                    onChange={(e) => setQuadrantSW(e.target.checked)}
                  />
                </label>
                <label htmlFor="quadrantSE" className="quadrant quadrant-east">
                  <input
                    type="checkbox"
                    name="quadrantSE"
                    value={quadrantSE}
                    defaultChecked={quadrantSE}
                    onChange={(e) => setQuadrantSE(e.target.checked)}
                  />
                  SE
                </label>
              </section>
              
              <hr/>
              
              <label htmlFor="particleOpacity">
                Particle Start Opacity
                <input
                  type="number"
                  id="particleOpacity"
                  name="particleOpacity"
                  value={particleOpacity}
                  onChange={(e) => { setParticleOpacity(e.target.value) }}
                />
              </label>
              <label htmlFor="particleEndOpacity">
                Particle End Opacity
                <input
                  type="number"
                  id="particleEndOpacity"
                  name="particleEndOpacity"
                  value={particleEndOpacity}
                  onChange={(e) => { setParticleEndOpacity(e.target.value) }}
                />
              </label>
              <hr/>
              <label htmlFor="particleMinDistance" className="">
                Particle Min. Distance (px)
                <input 
                  type="number"
                  id="particleMinDistance"
                  name="particleMinDistance"
                  value={particleMinDistance}
                  onChange={(e) => { setParticleMinDistance(e.target.value) }}
                />
              </label>
              <label htmlFor="particleMaxDistance">
                Particle Max. Distance (px)
                <input
                  type="number"
                  id="particleMaxDistance"
                  name="particleMaxDistance"
                  value={particleMaxDistance}
                  onChange={(e) => { setParticleMaxDistance(e.target.value) }}
                />
              </label>
              
              <hr/>
              <label htmlFor="gravity">
                Gravity
                <input
                  type="number"
                  id="gravity"
                  name="gravity"
                  value={gravity}
                  onChange={(e) => { setGravity(e.target.value) }}
                />
              </label>
              <label htmlFor="gravityVariance" className="">
                Gravity Variance
                <input 
                  type="number"
                  id="gravityVariance"
                  name="gravityVariance"
                  value={gravityVariance}
                  onChange={(e) => { setGravityVariance(e.target.value) }}
                />
              </label>
            </main>
          </div>
        </section>

        <section id="demo">
            <div id="demo-canvas-container">
                <canvas id="demo-canvas" width="500" height="500"></canvas>
            </div>
        </section>
      </div>
    </>
  )
}

export default App
