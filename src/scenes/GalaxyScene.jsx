import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function GalaxyScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const W = () => window.innerWidth
    const H = () => window.innerHeight

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(W(), H())
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    const manager = new THREE.LoadingManager()
    const scene  = new THREE.Scene()
    const loader = new GLTFLoader(manager)
    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 1000)
    camera.position.set(0, 28, 0)
    camera.lookAt(0, 0, 0)
    const clock = new THREE.Clock()

    const C = {
      navyDark: 0x050d1f, navy: 0x0e1f48, navyMid: 0x1a3270,
      navyLight: 0x2d4d9e, navyPale: 0x8899cc,
      violet: 0x8e31a4, violetDark: 0x3d1047, violetMid: 0x5e1f70,
      violetLight: 0xb85fca, violetPale: 0xdba8e6,
      coral: 0xff5757, coralDark: 0x8a1f1f, coralMid: 0xc43737,
      coralLight: 0xff8080, coralPale: 0xffc2c2, white: 0xffffff,
    }

    manager.onLoad = () => {
      console.log("Everything loaded ✅")
      onLoaded && onLoaded()
    }

    /* ── Helpers ── */
    function mkStars(n, spread, pal, op) {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(n * 3), col = new Float32Array(n * 3)
      const c3 = pal.map(h => new THREE.Color(h))
      for (let i = 0; i < n; i++) {
        const θ = Math.random() * Math.PI * 2
        const φ = Math.acos(2 * Math.random() - 1)
        const r = spread * (.3 + Math.random() * .7)
        pos[i*3]   = r * Math.sin(φ) * Math.cos(θ)
        pos[i*3+1] = r * Math.sin(φ) * Math.sin(θ)
        pos[i*3+2] = r * Math.cos(φ)
        const ci = c3[Math.floor(Math.random() * c3.length)]
        col[i*3] = ci.r; col[i*3+1] = ci.g; col[i*3+2] = ci.b
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
      return new THREE.Points(geo, new THREE.PointsMaterial({
        size: .13, vertexColors: true, transparent: true,
        opacity: op, sizeAttenuation: true, depthWrite: false,
      }))
    }

    scene.add(mkStars(7000, 400, [C.white, C.navyPale, C.violetPale, C.white], .6))
    scene.add(mkStars(2500, 180, [C.white, C.coralPale, C.violetLight, C.navyPale], .5))
    scene.add(mkStars(350, 75, [C.white, C.coralLight, C.violetLight], .85))

    // /* ── Galaxy ── */
    const GALAXY = new THREE.Group()
    scene.add(GALAXY)

    // function mkArm(armIdx, total, n, spread, twist, pal) {
    //   const geo = new THREE.BufferGeometry()
    //   const pos = new Float32Array(n * 3), col = new Float32Array(n * 3)
    //   const base = (armIdx / total) * Math.PI * 2
    //   const c3 = pal.map(h => new THREE.Color(h))
    //   for (let i = 0; i < n; i++) {
    //     const t = i / n, dist = Math.pow(t, .55) * spread
    //     const a = base + t * twist, sa = (Math.random() - .5) * dist * .28 * (1 + t)
    //     const saA = a + Math.PI / 2
    //     pos[i*3]   = Math.cos(a) * dist + Math.cos(saA) * sa
    //     pos[i*3+1] = (Math.random() - .5) * dist * .04
    //     pos[i*3+2] = Math.sin(a) * dist + Math.sin(saA) * sa
    //     const ci = c3[Math.floor(t * (c3.length - 1) + Math.random() * .5)]
    //     col[i*3] = ci.r; col[i*3+1] = ci.g; col[i*3+2] = ci.b
    //   }
    //   geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    //   geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    //   return new THREE.Points(geo, new THREE.PointsMaterial({
    //     size: .16, vertexColors: true, transparent: true,
    //     opacity: .8, sizeAttenuation: true, depthWrite: false,
    //   }))
    // }

    // const PA = [C.violetLight, C.violet, C.navyLight, C.navyMid, C.navyPale, C.white]
    // const PB = [C.coralLight, C.coral, C.violetLight, C.navyLight, C.navyPale, C.white]
    // const PC = [C.navyLight, C.navyMid, C.navyPale, C.violetMid]
    // GALAXY.add(mkArm(0, 2, 20000, 18, Math.PI * 3.2, PA))
    // GALAXY.add(mkArm(1, 2, 20000, 18, Math.PI * 3.2, PB))
    // GALAXY.add(mkArm(0, 4, 7000, 14, Math.PI * 2.8, PC))
    // GALAXY.add(mkArm(2, 4, 7000, 14, Math.PI * 2.8, PC))

    /* Core */
    ;(() => {
      const n = 5500, geo = new THREE.BufferGeometry()
      const pos = new Float32Array(n * 3), col = new Float32Array(n * 3)
      const cp = [C.navyDark].map(h => new THREE.Color(h))
      for (let i = 0; i < n; i++) {
        const r = Math.pow(Math.random(), 2) * 2.5
        const θ = Math.random() * Math.PI * 2, φ = (Math.random() - .5) * .22
        pos[i*3] = Math.cos(θ) * r; pos[i*3+1] = Math.tan(φ) * r; pos[i*3+2] = Math.sin(θ) * r
        const ci = cp[Math.floor(Math.random() * cp.length)]
        col[i*3] = ci.r; col[i*3+1] = ci.g; col[i*3+2] = ci.b
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
      GALAXY.add(new THREE.Points(geo, new THREE.PointsMaterial({
        size: .22, vertexColors: true, transparent: true,
        opacity: .05, sizeAttenuation: true, depthWrite: false,
      })))
    })()

    const cdm  = new THREE.MeshBasicMaterial({ color: 0xdba8e6, transparent: true, opacity: .11, side: THREE.DoubleSide, depthWrite: false })
    const cdm2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .055, side: THREE.DoubleSide, depthWrite: false })
    const cdisc  = new THREE.Mesh(new THREE.CircleGeometry(1.7, 64), cdm);  cdisc.rotation.x  = Math.PI / 2; GALAXY.add(cdisc)
    const cdisc2 = new THREE.Mesh(new THREE.CircleGeometry(.85, 64), cdm2); cdisc2.rotation.x = Math.PI / 2; GALAXY.add(cdisc2)

    /* Nebulae */
    // ;[[600,-8,5,7,C.violetMid,.11],[400,-10,8,5,C.violet,.07],[500,9,-6,6,C.coralDark,.09],
    //   [300,7,-9,4,C.coralMid,.06],[800,3,12,8,C.navyMid,.08],[350,-13,-3,5,C.violetDark,.09]]
    // .forEach(([n, x, z, sp, color, op]) => {
    //   const geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 3)
    //   for (let i = 0; i < n; i++) {
    //     pos[i*3] = x + (Math.random() - .5) * sp
    //     pos[i*3+1] = (Math.random() - .5) * sp * .12
    //     pos[i*3+2] = z + (Math.random() - .5) * sp
    //   }
    //   geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    //   GALAXY.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: .75, color, transparent: true, opacity: op, sizeAttenuation: true, depthWrite: false })))
    // })

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
    dirLight.position.set(5,10,5)
    scene.add(dirLight)

    /* ── Load GLB Model ── */
    loader.load('/models/galaxy.glb', (gltf) => {
      const model = gltf.scene
      // scale the model
      model.scale.set(4,4,4)
      // place it in the center
      model.position.set(6,6,6)
      // rotate if needed
      model.rotation.y = Math.PI / 2
      // add to galaxy so it rotates with it
      GALAXY.add(model)
      }, undefined, (error) => {
        console.error("Model loading error:", error)
      }
    )

    /* ── Interactive stars ── */
    const IC = 1500, AR = 5.5, LIFT = 5, PULL = .4, ALRP = .09, RLRP = .038
    const iOrig = new Float32Array(IC * 3), iCur = new Float32Array(IC * 3)
    const iCol  = new Float32Array(IC * 3), iSzO = new Float32Array(IC)
    const iPal = [0xffffff,0xdba8e6,0xb85fca,0xff8080,0xffc2c2,0x8899cc].map(h => new THREE.Color(h))

    for (let i = 0; i < IC; i++) {
      const θ = Math.random() * Math.PI * 2, r = Math.pow(Math.random(), .55) * 22
      const x = Math.cos(θ) * r, y = (Math.random() - .5) * 1.1, z = Math.sin(θ) * r
      iOrig[i*3] = x; iOrig[i*3+1] = y; iOrig[i*3+2] = z
      iCur[i*3]  = x; iCur[i*3+1]  = y; iCur[i*3+2]  = z
      const ci = iPal[Math.floor(Math.random() * iPal.length)]
      iCol[i*3] = ci.r; iCol[i*3+1] = ci.g; iCol[i*3+2] = ci.b
      iSzO[i] = .06 + Math.random() * .13
    }

    const iGeo = new THREE.BufferGeometry()
    const iPA = new THREE.BufferAttribute(new Float32Array(iCur), 3)
    const iSA = new THREE.BufferAttribute(new Float32Array(iSzO), 1)
    iPA.setUsage(THREE.DynamicDrawUsage)
    iSA.setUsage(THREE.DynamicDrawUsage)
    iGeo.setAttribute('position', iPA)
    iGeo.setAttribute('color',    new THREE.BufferAttribute(iCol, 3))
    iGeo.setAttribute('aSize',    iSA)

    const iMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, vertexColors: true,
      uniforms: { uAtt: { value: 1 } },
      vertexShader: `
        attribute float aSize;
        uniform float uAtt;
        varying vec3 vC;
        void main() {
          vC = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (270.0 / -mv.z) * uAtt;
          gl_Position  = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vC;
        void main() {
          float d = length(gl_PointCoord - vec2(.5));
          if (d > .5) discard;
          float a = 1.0 - smoothstep(.15, .5, d);
          gl_FragColor = vec4(vC, a * .85);
        }`,
    })
    scene.add(new THREE.Points(iGeo, iMat))

    /* Cursor ring */
    const rPts = []
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2
      rPts.push(Math.cos(a) * AR, 0, Math.sin(a) * AR)
    }
    const ringGeo = new THREE.BufferGeometry()
    ringGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(rPts), 3))
    const ringMat = new THREE.LineBasicMaterial({ color: 0x8e31a4, transparent: true, opacity: 0, depthWrite: false })
    const ring = new THREE.LineLoop(ringGeo, ringMat)
    ring.visible = false
    scene.add(ring)

    /* Raycaster */
    const rayc = new THREE.Raycaster()
    const mNDC = new THREE.Vector2(-9, -9)
    const gPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const cWorld = new THREE.Vector3()
    let pActive = false, rOp = 0

    const onMove = e => {
      mNDC.x =  (e.clientX / W()) * 2 - 1
      mNDC.y = -(e.clientY / H()) * 2 + 1
      pActive = true
    }
    const onLeave = () => { pActive = false }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    /* Camera state */
    const CAM = { baseY: 28, targetY: 22, driftAmp: 1.1, driftSpd: .025 }
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMouseMove = e => {
      mouse.tx = (e.clientX / W() - .5) * 2
      mouse.ty = (e.clientY / H() - .5) * 2
    }
    document.addEventListener('mousemove', onMouseMove)

       // Track scroll progress to subtly shift camera
    let scrollRatio=0
    const onScroll=()=>{scrollRatio=window.scrollY/(document.body.scrollHeight-window.innerHeight||1)}
    window.addEventListener('scroll',onScroll,{passive:true})


    /* Resize */
    const onResize = () => {
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
      renderer.setSize(W(), H())
    }
    window.addEventListener('resize', onResize)

    /* ── Animate ── */
    let rafId
    function animate() {
      rafId=requestAnimationFrame(animate)
      const t=clock.getElapsedTime()
      mouse.x+=(mouse.tx-mouse.x)*.04;mouse.y+=(mouse.ty-mouse.y)*.04

      GALAXY.rotation.y=t*0.018
      // Tilt galaxy slightly as user scrolls down the page
      GALAXY.rotation.x=mouse.y*0.04+scrollRatio*0.15
      GALAXY.rotation.z=-mouse.x*0.03

      // Camera zooms out slowly as user scrolls down
      CAM.targetY=22+scrollRatio*12
      CAM.baseY+=(CAM.targetY-CAM.baseY)*.003
      camera.position.x=Math.sin(t*CAM.driftSpd)*CAM.driftAmp+mouse.x*1.2
      camera.position.y=CAM.baseY+Math.sin(t*CAM.driftSpd*.7)*.45
      camera.position.z=Math.cos(t*CAM.driftSpd)*CAM.driftAmp+mouse.y*.9
      camera.lookAt(mouse.x*.4,0,mouse.y*.25)

      const br=1+Math.sin(t*1.1)*.08
      cdisc.scale.setScalar(br);cdm.opacity=.09+Math.sin(t*1.1)*.02
      cdisc2.scale.setScalar(br*1.05)

      let cx3=0,cz3=0,hasHit=false
      if(pActive){rayc.setFromCamera(mNDC,camera);if(rayc.ray.intersectPlane(gPlane,cWorld)){cx3=cWorld.x;cz3=cWorld.z;hasHit=true}}
      const rTgt=(hasHit&&pActive)?.2:0;rOp+=(rTgt-rOp)*.1
      if(rOp>.005){ring.visible=true;ringMat.opacity=rOp;ring.position.set(cx3,.05,cz3);ring.scale.setScalar(1+Math.sin(t*3.5)*.04)}
      else ring.visible=false

      const pa=iPA.array,sa=iSA.array;let atCnt=0
      for(let i=0;i<IC;i++){
        const i3=i*3,ox=iOrig[i3],oy=iOrig[i3+1],oz=iOrig[i3+2],px=pa[i3],py=pa[i3+1],pz=pa[i3+2]
        if(hasHit){
          const dx=ox-cx3,dz=oz-cz3,d=Math.sqrt(dx*dx+dz*dz)
          if(d<AR){atCnt++;const t01=1-(d/AR),s=t01*t01*(3-2*t01)
            pa[i3]+=(ox+(cx3-ox)*PULL*s-px)*ALRP;pa[i3+1]+=(oy+LIFT*s-py)*ALRP;pa[i3+2]+=(oz+(cz3-oz)*PULL*s-pz)*ALRP
            sa[i]+=(iSzO[i]*(1+s*3.5)-sa[i])*.12
          }else{pa[i3]+=(ox-px)*RLRP;pa[i3+1]+=(oy-py)*RLRP;pa[i3+2]+=(oz-pz)*RLRP;sa[i]+=(iSzO[i]-sa[i])*.06}
        }else{pa[i3]+=(ox-px)*RLRP;pa[i3+1]+=(oy-py)*RLRP;pa[i3+2]+=(oz-pz)*RLRP;sa[i]+=(iSzO[i]-sa[i])*.06}
      }
      iPA.needsUpdate=true;iSA.needsUpdate=true
      iMat.uniforms.uAtt.value=1+(atCnt/IC)*5
      renderer.render(scene,camera)
    }
    animate()

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll',onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, []) // runs once on mount

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full"
    />
  )
}
