/* ============================================================
   The summit cake — 3D, twenty candles, blown out one at a time.
   Strawberry-and-cream styling for the birthday reveal.
   ============================================================ */
const Cake3D = (() => {

  function supported() {
    try {
      const c = document.createElement("canvas");
      return !!(window.THREE && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }

  function shadowTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(42,38,32,.42)");
    g.addColorStop(.45, "rgba(42,38,32,.16)");
    g.addColorStop(1, "rgba(42,38,32,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }

  function candyStripeTexture() {
    const c = document.createElement("canvas");
    c.width = 64; c.height = 128;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff3ef"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "#ec7991"; ctx.lineWidth = 13;
    for (let x = -128; x < 128; x += 31) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 95, 128); ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(c);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(2, 1);
    return texture;
  }

  function create(container, candleCount = 20) {
    if (!supported()) return null;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) { return null; }

    const W0 = container.clientWidth || 800, H0 = container.clientHeight || 400;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(W0, H0, false);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.NoToneMapping;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, W0 / H0, .1, 100);
    camera.position.set(0, 3.05, 7.25);
    camera.lookAt(0, 1.08, 0);

    scene.add(new THREE.HemisphereLight(0xF4EEDC, 0x5B6353, .8));
    const key = new THREE.DirectionalLight(0xFFF3DC, .9); key.position.set(4, 7, 6); scene.add(key);
    const fill = new THREE.DirectionalLight(0xB7CBCC, .4); fill.position.set(-6, 2, 3); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xE8C9A6, .7); rim.position.set(0, 3, -7); scene.add(rim);

    const root = new THREE.Group();
    root.scale.setScalar(1.06);
    scene.add(root);

    const mat = c => new THREE.MeshLambertMaterial({ color: c });
    const flames = [], smoke = [];
    const cake = new THREE.Group();
    root.add(cake);

    // Cool porcelain plate and a soft, single-layer strawberry shortcake.
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(1.72, 1.58, .12, 64), mat(0xcbd9e7));
    plate.position.y = -.08; cake.add(plate);
    const plateLip = new THREE.Mesh(new THREE.TorusGeometry(1.58, .06, 10, 64), mat(0xe8f0f7));
    plateLip.rotation.x = Math.PI / 2; plateLip.position.y = .0; cake.add(plateLip);

    const spongeBottom = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, .3, 56), mat(0xe5a36d));
    spongeBottom.position.y = .19; cake.add(spongeBottom);
    const creamMiddle = new THREE.Mesh(new THREE.CylinderGeometry(1.225, 1.225, .17, 56), mat(0xfff7ed));
    creamMiddle.position.y = .425; cake.add(creamMiddle);
    const strawberryLayer = new THREE.Mesh(new THREE.CylinderGeometry(1.21, 1.21, .22, 56), mat(0xe9788a));
    strawberryLayer.position.y = .62; cake.add(strawberryLayer);
    const spongeTop = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, .34, 56), mat(0xf0b27d));
    spongeTop.position.y = .90; cake.add(spongeTop);
    const creamTop = new THREE.Mesh(new THREE.CylinderGeometry(1.26, 1.26, .18, 56), mat(0xfff8ef));
    creamTop.position.y = 1.16; cake.add(creamTop);
    const frostingTop = new THREE.Mesh(new THREE.CylinderGeometry(1.29, 1.26, .1, 56), mat(0xfffcf7));
    frostingTop.position.y = 1.30; cake.add(frostingTop);

    // Hand-piped white frosting drips around the top edge.
    const dripMat = mat(0xfffaf3);
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2;
      const d = new THREE.Mesh(new THREE.SphereGeometry(.095, 12, 10), dripMat);
      d.position.set(Math.cos(a) * 1.25, 1.19 - (i % 4) * .035, Math.sin(a) * 1.25);
      d.scale.y = 1.9 + (i % 3) * .3; cake.add(d);
    }

    const blueberryMat = mat(0x303d75), strawberryMat = mat(0xe64f5d), leafMat = mat(0x519451);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + .2;
      const b = new THREE.Mesh(new THREE.SphereGeometry(.125, 14, 12), blueberryMat);
      b.position.set(Math.cos(a) * .88, 1.39 + (i % 2) * .015, Math.sin(a) * .88);
      b.scale.y = .86; cake.add(b);
    }
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + .55;
      const berry = new THREE.Mesh(new THREE.SphereGeometry(.16, 16, 12), strawberryMat);
      berry.position.set(Math.cos(a) * .48, 1.42, Math.sin(a) * .48); berry.scale.set(.85, 1.05, .85); cake.add(berry);
      const leaves = new THREE.Mesh(new THREE.ConeGeometry(.13, .12, 5), leafMat);
      leaves.position.set(Math.cos(a) * .48, 1.56, Math.sin(a) * .48); leaves.rotation.x = Math.PI; cake.add(leaves);
    }

    const waxA = new THREE.MeshLambertMaterial({ map: candyStripeTexture() });
    const waxB = new THREE.MeshLambertMaterial({ map: candyStripeTexture() });
    const wickMat = mat(0x34272b);
    for (let i = 0; i < candleCount; i++) {
      // Two neatly spaced rings keep all twenty candles legible from the fixed camera.
      const outerRing = i < Math.ceil(candleCount / 2);
      const countInRing = outerRing ? Math.ceil(candleCount / 2) : Math.floor(candleCount / 2);
      const indexInRing = outerRing ? i : i - Math.ceil(candleCount / 2);
      const a = (indexInRing / countInRing) * Math.PI * 2 + (outerRing ? .22 : .52);
      const r = outerRing ? .65 : .36;
      const px = Math.cos(a) * r, pz = Math.sin(a) * r;

      const c = new THREE.Mesh(new THREE.CylinderGeometry(.052, .052, .5, 14), i % 2 ? waxB : waxA);
      c.position.set(px, 1.70, pz); cake.add(c);
      const w = new THREE.Mesh(new THREE.CylinderGeometry(.013, .013, .08, 6), wickMat);
      w.position.set(px, 1.97, pz); cake.add(w);

      // unlit teardrop — emissive + tone mapping washes out on a light background
      const f = new THREE.Group();
      const outer = new THREE.Mesh(new THREE.ConeGeometry(.075, .26, 16),
        new THREE.MeshBasicMaterial({ color: 0xF2952A }));
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(.075, 14, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0xF2952A }));
      cap.position.y = -.13;
      const inner = new THREE.Mesh(new THREE.ConeGeometry(.036, .15, 12),
        new THREE.MeshBasicMaterial({ color: 0xFFE9A8 }));
      inner.position.y = -.04;
      f.add(outer); f.add(cap); f.add(inner);
      f.position.set(px, 2.14, pz);
      f.userData = { base: 2.14, out: false, x: px, z: pz };
      flames.push(f); cake.add(f);
    }

    const flameLight = new THREE.PointLight(0xF2952A, 2, 6, 2);
    flameLight.position.set(0, 2.18, 0);
    cake.add(flameLight);

    const sh = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 7.5),
      new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
    sh.rotation.x = -Math.PI / 2; sh.position.y = -.62; root.add(sh);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = e => {
      const r = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - .5) * 2;
      mouse.ty = ((e.clientY - r.top) / r.height - .5) * 2;
    };
    addEventListener("pointermove", onMove, { passive: true });

    const ro = new ResizeObserver(() => {
      const W = container.clientWidth, H = container.clientHeight;
      if (!W || !H) return;
      camera.aspect = W / H; camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
    });
    ro.observe(container);

    const clock = new THREE.Clock();
    let raf, alive = true;

    const tick = () => {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * .06;
      mouse.y += (mouse.ty - mouse.y) * .06;
      root.rotation.y = mouse.x * .3;
      root.rotation.x = -mouse.y * .1;
      root.position.y = Math.sin(t * .8) * .04;

      let live = 0;
      flames.forEach((f, i) => {
        if (f.userData.out) return;
        live++;
        const s = 1 + Math.sin(t * 9 + i * 1.7) * .15;
        f.scale.set(s, 2 - s, s);
        f.position.y = f.userData.base + Math.sin(t * 7 + i) * .014;
        f.rotation.y = t * .6 + i;
      });
      flameLight.intensity = (1.35 + Math.sin(t * 8.5) * .3) * (live / candleCount);

      for (let i = smoke.length - 1; i >= 0; i--) {
        const p = smoke[i];
        p.position.y += .012;
        p.scale.multiplyScalar(1.012);
        p.material.opacity -= .006;
        if (p.material.opacity <= 0) { cake.remove(p); p.geometry.dispose(); p.material.dispose(); smoke.splice(i, 1); }
      }
      renderer.render(scene, camera);
    };
    tick();

    return {
      blowOut() {
        const f = flames.find(x => !x.userData.out);
        if (!f) return 0;
        f.userData.out = true;
        f.visible = false;
        for (let i = 0; i < 5; i++) {
          const p = new THREE.Mesh(new THREE.SphereGeometry(.05, 8, 6),
            new THREE.MeshBasicMaterial({ color: 0xB9B4A4, transparent: true, opacity: .5, depthWrite: false }));
          p.position.set(f.userData.x + (Math.random() - .5) * .08, 2.10 + i * .05,
                         f.userData.z + (Math.random() - .5) * .08);
          smoke.push(p); cake.add(p);
        }
        return flames.filter(x => !x.userData.out).length;
      },
      litCount: () => flames.filter(x => !x.userData.out).length,
      candles: candleCount,
      dispose() {
        alive = false;
        cancelAnimationFrame(raf);
        removeEventListener("pointermove", onMove);
        ro.disconnect();
        scene.traverse(o => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) [].concat(o.material).forEach(m => { m.map && m.map.dispose(); m.dispose(); });
        });
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }

  return { create, supported };
})();
