import { useState, useEffect } from 'react'
import './App.css'

import SetterButton from './SetterButton'
import Presets from './Presets'

import ParticleBlastr from './js/particle-blastr'
import pbExamples from './js/pbExamples'
import PBLooper from './js/PBLooper'

import { useStoreState, useStoreActions } from 'easy-peasy'

function App() {
  const [count, setCount] = useState(0)

  // default values
  const configName = useStoreState((state) => state.configName)
  const startX = useStoreState((state) => state.startX)
  const startY = useStoreState((state) => state.startY)
  const particleCount = useStoreState((state) => state.particleCount)
  const blastLengthMs = useStoreState((state) => state.blastLengthMs)

  const particleColorHex = useStoreState((state) => state.particleColorHex)

  const quadrantNE = useStoreState((state) => state.quadrantNE)
  const quadrantSE = useStoreState((state) => state.quadrantSE)
  const quadrantSW = useStoreState((state) => state.quadrantSW)
  const quadrantNW = useStoreState((state) => state.quadrantNW)

  const particleShape = useStoreState((state) => state.particleShape)
  const particleRadius = useStoreState((state) => state.particleRadius)
  const particleSize = useStoreState((state) => state.particleSize)
  const particleWidth = useStoreState((state) => state.particleWidth)
  const particleHeight = useStoreState((state) => state.particleHeight)
  const particleSizeVariance = useStoreState((state) => state.particleSizeVariance)
  const particleEndScale = useStoreState((state) => state.particleEndScale)

  const particleOpacity = useStoreState((state) => state.particleOpacity)
  const particleEndOpacity = useStoreState((state) => state.particleEndOpacity)
  const particleMinDistance = useStoreState((state) => state.particleMinDistance)
  const particleMaxDistance = useStoreState((state) => state.particleMaxDistance)
  const gravity = useStoreState((state) => state.gravity)
  const gravityVariance = useStoreState((state) => state.gravityVariance)

  //setters
  const setConfigName = useStoreActions((actions) => actions.setConfigName)
  const setStartX = useStoreActions((actions) => actions.setStartX)
  const setStartY = useStoreActions((actions) => actions.setStartY)
  const setParticleCount = useStoreActions((actions) => actions.setParticleCount)
  const setBlastLengthMs = useStoreActions((actions) => actions.setBlastLengthMs)

  const setParticleColorHex = useStoreActions((actions) => actions.setParticleColorHex)

  const setQuadrantNE = useStoreActions((actions) => actions.setQuadrantNE)
  const setQuadrantSE = useStoreActions((actions) => actions.setQuadrantSE)
  const setQuadrantSW = useStoreActions((actions) => actions.setQuadrantSW)
  const setQuadrantNW = useStoreActions((actions) => actions.setQuadrantNW)

  const setParticleShape = useStoreActions((actions) => actions.setParticleShape)
  const setParticleRadius = useStoreActions((actions) => actions.setParticleRadius)
  const setParticleSize = useStoreActions((actions) => actions.setParticleSize)
  const setParticleWidth = useStoreActions((actions) => actions.setParticleWidth)
  const setParticleHeight = useStoreActions((actions) => actions.setParticleHeight)
  const setParticleSizeVariance = useStoreActions((actions) => actions.setParticleSizeVariance)
  const setParticleEndScale = useStoreActions((actions) => actions.setParticleEndScale)
  
  const setParticleOpacity = useStoreActions((actions) => actions.setParticleOpacity)
  const setParticleEndOpacity = useStoreActions((actions) => actions.setParticleEndOpacity)
  const setParticleMinDistance = useStoreActions((actions) => actions.setParticleMinDistance)
  const setParticleMaxDistance = useStoreActions((actions) => actions.setParticleMaxDistance)
  const setGravity = useStoreActions((actions) => actions.setGravity)
  const setGravityVariance = useStoreActions((actions) => actions.setGravityVariance)

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
  
  // useEffect(() => {
  //   if (pbl) {
  //     pbl.setConfig(pbCustomConfig)
  //     pbl.start();
  //   } else {
  //     console.warn('no pbl')
  //   }
  // }, [pbCustomConfig])


  useEffect(() => {
    setConfigName('custom');
    updateBlastr();
  }, [
    startX,
    startY,
    particleCount,
    blastLengthMs,
    particleColorHex,
    quadrantNE,
    quadrantSE,
    quadrantSW,
    quadrantNW,
    particleShape,
    particleRadius,
    particleSize,
    particleWidth,
    particleHeight,
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

  const updateBlastr = () => {
    console.log('updateBlastr');
    if (configName !== 'custom') {
      const namedConfig = pbExamples[configName];

      isDef(namedConfig.startX) && setStartX(namedConfig.startX)
      isDef(namedConfig.startY) && setStartY(namedConfig.startY)
      isDef(namedConfig.particleCount) && setParticleCount(namedConfig.particleCount)
      isDef(namedConfig.blastLengthMs) && setBlastLengthMs(namedConfig.blastLengthMs)
      
      if (isDef(namedConfig.particleColor)) {
        const pC = namedConfig.particleColor;
        let hC = [
          pC[0].toString(16),
          pC[1].toString(16),
          pC[2].toString(16),
        ]
        hC = hC.map((c) => (c.length === 1) ? '0'+c : c)
        setParticleColorHex('#'+hC.join(''))
      }

      if (isDef(namedConfig.quadrants)) {
        setQuadrantNE(namedConfig.quadrants[0])
        setQuadrantSE(namedConfig.quadrants[1])
        setQuadrantSW(namedConfig.quadrants[2])
        setQuadrantNW(namedConfig.quadrants[3])
      }

      isDef(namedConfig.particleShape) && setParticleShape(namedConfig.particleShape)
      isDef(namedConfig.particleRadius) && setParticleRadius(namedConfig.particleRadius)
      isDef(namedConfig.particleSize) && setParticleSize(namedConfig.particleSize)
      isDef(namedConfig.particleWidth) && setParticleWidth(namedConfig.particleWidth)
      isDef(namedConfig.particleHeight) && setParticleHeight(namedConfig.particleHeight)
      isDef(namedConfig.particleSizeVariance) && setParticleSizeVariance(namedConfig.particleSizeVariance)
      isDef(namedConfig.particleEndScale) && setParticleEndScale(namedConfig.particleEndScale)


      isDef(namedConfig.particleOpacity) && setParticleOpacity(namedConfig.particleOpacity)
      isDef(namedConfig.particleEndOpacity) && setParticleEndOpacity(namedConfig.particleEndOpacity)
      
      isDef(namedConfig.particleMinDistance) && setParticleMinDistance(namedConfig.particleMinDistance)
      isDef(namedConfig.particleMaxDistance) && setParticleMaxDistance(namedConfig.particleMaxDistance)
      
      isDef(namedConfig.gravity) && setGravity(namedConfig.gravity)
      isDef(namedConfig.gravityVariance) && setGravityVariance(namedConfig.gravityVariance)
    } else {
      console.log('custom temp temp rahh')
    }

    pbl.setConfig({
      startX: startX,
      startY: startY,
      particleCount: particleCount,
      blastLengthMs: blastLengthMs,

      particleColorHex: particleColorHex,

      quadrantNE: quadrantNE,
      quadrantSE: quadrantSE,
      quadrantSW: quadrantSW,
      quadrantNW: quadrantNW,

      particleShape: particleShape,
      particleRadius: particleRadius,
      particleSize: particleSize,
      particleWidth: particleWidth,
      particleHeight: particleHeight,
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

  useEffect(() => {
    document.querySelector('input[name="quadrantNE"]').checked = quadrantNE;
    document.querySelector('input[name="quadrantSE"]').checked = quadrantSE;
    document.querySelector('input[name="quadrantSW"]').checked = quadrantSW;
    document.querySelector('input[name="quadrantNW"]').checked = quadrantNW;
  }, [
    quadrantNE,
    quadrantSE,
    quadrantSW,
    quadrantNW,
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
              <p>Preset Examples:</p>
              <Presets configNames={configNames} />
                {/* {configNames.map(name => {
                    return <SetterButton
                      key={name} 
                      configName={name} 
                    /> 
                })} */}
                
                {/* <button className="setter-btn" id="starBlast">star</button>
                <button className="setter-btn" id="megaBlast">mega</button>
                <button className="setter-btn" id="smokeBlast">smoke</button>
                <button className="setter-btn" id="pinkPillBlast">pinkPill</button>
                <button className="setter-btn" id="redBallBlast">redBall</button>
                <button className="setter-btn" id="blockFallBlast">blockFall</button> */}
                
                <hr/>
                <label htmlFor="startX">startX
                <input
                  type="number"
                  id="startX"
                  name="startX"
                  value={startX}
                  onChange={(e) => { setStartX(e.target.value) }}
                />
                </label>
                <label htmlFor="startY">startY
                  <input
                    type="number"
                    id="startY"
                    name="startY"
                    value={startY}
                    onChange={(e) => { setStartY(e.target.value) }}
                  />
                </label>
                <label htmlFor="particleCount">particleCount
                  <input
                    type="number"
                    id="particleCount"
                    name="particleCount"
                    value={particleCount}
                    onChange={(e) => { setParticleCount(e.target.value) }}
                  />
                </label>
                <label htmlFor="blastLengthMs">
                  blastLengthMs
                  <input
                    type="number"
                    id="blastLengthMs"
                    name="blastLengthMs"
                    value={blastLengthMs}
                    onChange={(e) => { setBlastLengthMs(e.target.value) }}
                  />
                </label>

                <hr/>
                setParticleShape
                <select
                  name="particleShape"
                  value={particleShape}
                  onChange={(e) => {
                    console.log('e.target.value', e.target.value);
                     setParticleShape(e.target.value) }}
                >
                  <option value={ParticleBlastr.SHAPE.CIRCLE}>{ParticleBlastr.SHAPE.CIRCLE}</option>
                  <option value={ParticleBlastr.SHAPE.SQUARE}>{ParticleBlastr.SHAPE.SQUARE}</option>
                  <option value={ParticleBlastr.SHAPE.RECT}>{ParticleBlastr.SHAPE.RECT}</option>
                  <option value={ParticleBlastr.SHAPE.ROUND_RECT}>{ParticleBlastr.SHAPE.ROUND_RECT}</option>
                </select>
                <br/>

                <label
                  className={`${particleShape === ParticleBlastr.SHAPE.CIRCLE ? '' : 'hidden'}`} 
                  htmlFor="particleRadius"
                >
                  particleRadius
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
                  particleSize
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
                  particleWidth
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
                  particleHeight
                  <input
                    type="number"
                    id="particleHeight"
                    name="particleHeight"
                    value={particleHeight}
                    onChange={(e) => { setParticleHeight(e.target.value) }}
                  />
                </label>

                <label htmlFor="particleSizeVariance" className="bugged hidden">
                  particleSizeVariance - doesn't set
                  <input
                    type="number"
                    id="particleSizeVariance"
                    name="particleSizeVariance"
                    value={particleSizeVariance}
                    onChange={(e) => { setParticleSizeVariance(e.target.value) }}
                  />
                </label>
                <label htmlFor="particleEndScale">particleEndScale</label>
                <input
                  type="number"
                  id="particleEndScale"
                  name="particleEndScale"
                  value={particleEndScale}
                  onChange={(e) => { setParticleEndScale(e.target.value) }}
                />
                <hr/>

                <label
                  htmlFor="particleColorHex">
                    particleColorHex
                    <input
                      type="color"
                      name="particleColorHex"
                      value={particleColorHex}
                      onChange={(e) => setParticleColorHex(e.target.value) }
                    />
                  </label>
                <hr/>
                emit quadrants
                <br/>
                <label htmlFor="quadrantNW">
                  quadrantNW
                  <input
                    type="checkbox"
                    name="quadrantNW"
                    value={quadrantNW}
                    defaultChecked={quadrantNW}
                    onChange={(e) => setQuadrantNW(e.target.checked) }//setQuadrantNW(e.target.checked)}
                  />
                </label>
                <label htmlFor="quadrantNE">
                  quadrantNE
                  <input
                    type="checkbox"
                    name="quadrantNE"
                    value={quadrantNE}
                    defaultChecked={quadrantNE}
                    onChange={(e) => setQuadrantNE(e.target.checked)}
                  />
                </label>
                <br/>
                <label htmlFor="quadrantSW">
                  quadrantSW
                  <input
                    type="checkbox"
                    name="quadrantSW"
                    value={quadrantSW}
                    defaultChecked={quadrantSW}
                    onChange={(e) => setQuadrantSW(e.target.checked)}
                  />
                </label>
                <label htmlFor="quadrantSE">
                  quadrantSE
                  <input
                    type="checkbox"
                    name="quadrantSE"
                    value={quadrantSE}
                    defaultChecked={quadrantSE}
                    onChange={(e) => setQuadrantSE(e.target.checked)}
                  />
                </label>
                
                
                <hr/>
                
                <label htmlFor="particleOpacity">particleOpacity</label>
                <input
                  type="number"
                  id="particleOpacity"
                  name="particleOpacity"
                  value={particleOpacity}
                  onChange={(e) => { setParticleOpacity(e.target.value) }}
                  />
                <label htmlFor="particleEndOpacity">particleEndOpacity</label>
                <input
                  type="number"
                  id="particleEndOpacity"
                  name="particleEndOpacity"
                  value={particleEndOpacity}
                  onChange={(e) => { setParticleEndOpacity(e.target.value) }}
                />
                  
                <hr/>
                <label htmlFor="particleMinDistance" className="bugged hidden">
                  particleMinDistance - strange behavior?
                  <input
                    type="number"
                    id="particleMinDistance"
                    name="particleMinDistance"
                    value={particleMinDistance}
                    onChange={(e) => { setParticleMinDistance(e.target.value) }}
                  />
                </label>
                <label htmlFor="particleMaxDistance">particleMaxDistance
                  <input
                    type="number"
                    id="particleMaxDistance"
                    name="particleMaxDistance"
                    value={particleMaxDistance}
                    onChange={(e) => { setParticleMaxDistance(e.target.value) }}
                  />
                </label>
                
                <hr/>
                <label htmlFor="gravity">gravity</label>
                <input
                  type="number"
                  id="gravity"
                  name="gravity"
                  value={gravity}
                  onChange={(e) => { setGravity(e.target.value) }}
                />
                <label htmlFor="gravityVariance" className="bugged hidden">
                  gravityVariance - doesn't un-set
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
