// PantherIQ - KAFD Riyadh Skyline Night Scene
// 3D animated background featuring King Abdullah Financial District

(function() {
    const container = document.getElementById('three-bg');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020510, 0.0012);
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 120, 250);
    camera.lookAt(0, 80, -80);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020510, 1);
    container.appendChild(renderer.domElement);

    const CYAN = 0x00F5FF, BLUE = 0x1A7CFF, PURPLE = 0x8B5CF6, WARM = 0xFFE4B5;

    // Ground
    const groundGeo = new THREE.PlaneGeometry(2000, 2000, 60, 60);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x030812, wireframe: true, transparent: true, opacity: 0.12 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -5;
    scene.add(ground);

    const solidGround = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshBasicMaterial({ color: 0x020510 }));
    solidGround.rotation.x = -Math.PI / 2;
    solidGround.position.y = -6;
    scene.add(solidGround);

    function createBuilding(w, h, d, x, z, style) {
        const g = new THREE.Group();
        
        if (style === 'pif') {
            // PIF Tower - 385m hexagonal diamond
            const geo = new THREE.CylinderGeometry(w * 0.35, w * 0.55, h, 6);
            const mat = new THREE.MeshPhongMaterial({ color: 0x1a3050, emissive: 0x0a2040, specular: BLUE, shininess: 80, transparent: true, opacity: 0.9 });
            const m = new THREE.Mesh(geo, mat);
            m.position.y = h / 2;
            g.add(m);
            // Wireframe outline for visibility
            const wireM = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.12 }));
            wireM.position.y = h / 2;
            g.add(wireM);
            for (let i = 0; i < 25; i++) {
                const band = new THREE.Mesh(
                    new THREE.RingGeometry(w * 0.34, w * 0.37, 6),
                    new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.15 + Math.random() * 0.25, side: THREE.DoubleSide })
                );
                band.position.y = (i / 25) * h + 8;
                band.rotation.x = Math.PI / 2;
                g.add(band);
            }
            const crown = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.08, w * 0.25, 12, 6), new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.5 }));
            crown.position.y = h + 4;
            g.add(crown);

        } else if (style === 'wtc') {
            // KAFD WTC - organic spherical
            const geo = new THREE.SphereGeometry(w * 0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
            const mat = new THREE.MeshPhongMaterial({ color: 0x1a2a45, emissive: 0x0a1a35, specular: PURPLE, shininess: 60, transparent: true, opacity: 0.85 });
            const m = new THREE.Mesh(geo, mat);
            m.position.y = h * 0.55;
            m.scale.y = 1.8;
            g.add(m);
            const wire = new THREE.Mesh(
                new THREE.SphereGeometry(w * 0.72, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.7),
                new THREE.MeshBasicMaterial({ color: PURPLE, wireframe: true, transparent: true, opacity: 0.25 })
            );
            wire.position.y = h * 0.55;
            wire.scale.y = 1.8;
            g.add(wire);

        } else if (style === 'twisted') {
            const segs = 25;
            for (let i = 0; i < segs; i++) {
                const t = i / segs;
                const sw = w * (1 - t * 0.3);
                const seg = new THREE.Mesh(
                    new THREE.BoxGeometry(sw, h / segs, d * (1 - t * 0.3)),
                    new THREE.MeshPhongMaterial({ color: 0x152540, emissive: 0x0a1a30, transparent: true, opacity: 0.85 })
                );
                seg.position.y = i * (h / segs) + (h / segs) / 2;
                seg.rotation.y = t * 0.5;
                g.add(seg);
            }
            const pts = [];
            for (let i = 0; i <= segs; i++) {
                const t = i / segs;
                pts.push(new THREE.Vector3(w / 2 * Math.cos(t * 0.5) * (1 - t * 0.3), i * (h / segs), w / 2 * Math.sin(t * 0.5) * (1 - t * 0.3)));
            }
            const edgeGeo = new THREE.BufferGeometry().setFromPoints(pts);
            g.add(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.4 })));

        } else if (style === 'glass') {
            const m = new THREE.Mesh(
                new THREE.BoxGeometry(w, h, d),
                new THREE.MeshPhongMaterial({ color: 0x152a45, emissive: 0x0a1a30, specular: BLUE, shininess: 100, transparent: true, opacity: 0.85 })
            );
            m.position.y = h / 2;
            g.add(m);
            const rows = Math.floor(h / 7), cols = Math.floor(w / 4);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (Math.random() > 0.45) {
                        const ww = new THREE.Mesh(
                            new THREE.PlaneGeometry(2.5, 4.5),
                            new THREE.MeshBasicMaterial({ color: Math.random() > 0.7 ? CYAN : (Math.random() > 0.5 ? WARM : BLUE), transparent: true, opacity: 0.08 + Math.random() * 0.3 })
                        );
                        ww.position.set(-w / 2 + c * 4 + 2, r * 7 + 4, d / 2 + 0.1);
                        g.add(ww);
                    }
                }
            }

        } else {
            const m = new THREE.Mesh(
                new THREE.BoxGeometry(w, h, d),
                new THREE.MeshPhongMaterial({ color: 0x152540, emissive: 0x081525, specular: 0x3366FF, shininess: 50, transparent: true, opacity: 0.85 })
            );
            m.position.y = h / 2;
            g.add(m);
            const nw = Math.floor(h / 9) * 3;
            for (let i = 0; i < nw; i++) {
                const ww = new THREE.Mesh(
                    new THREE.PlaneGeometry(1.8, 2.8),
                    new THREE.MeshBasicMaterial({ color: Math.random() > 0.6 ? WARM : CYAN, transparent: true, opacity: 0.1 + Math.random() * 0.3 })
                );
                ww.position.set((Math.random() - 0.5) * w * 0.8, Math.random() * h, d / 2 + 0.1);
                g.add(ww);
            }
        }
        g.position.set(x, -5, z);
        return g;
    }

    // KAFD skyline composition
    const bldgs = [];
    // PIF Tower (tallest)
    bldgs.push(createBuilding(30, 280, 30, 50, -100, 'pif'));
    // KAFD WTC
    bldgs.push(createBuilding(38, 170, 38, -90, -80, 'wtc'));
    // Twisted towers
    bldgs.push(createBuilding(22, 220, 22, -25, -120, 'twisted'));
    bldgs.push(createBuilding(18, 185, 18, 125, -95, 'twisted'));
    // Glass towers
    bldgs.push(createBuilding(28, 200, 24, -145, -110, 'glass'));
    bldgs.push(createBuilding(24, 165, 22, -5, -60, 'glass'));
    bldgs.push(createBuilding(20, 145, 20, 95, -70, 'glass'));
    bldgs.push(createBuilding(26, 180, 24, 170, -115, 'glass'));
    // Standard fill
    bldgs.push(createBuilding(18, 135, 18, -200, -130, 'std'));
    bldgs.push(createBuilding(15, 115, 15, -165, -90, 'std'));
    bldgs.push(createBuilding(20, 155, 20, 200, -105, 'std'));
    bldgs.push(createBuilding(16, 125, 16, 230, -90, 'std'));
    bldgs.push(createBuilding(14, 95, 14, -245, -110, 'std'));
    bldgs.push(createBuilding(12, 85, 12, 260, -85, 'std'));
    bldgs.push(createBuilding(22, 105, 22, -55, -155, 'std'));
    bldgs.push(createBuilding(18, 90, 18, 35, -160, 'std'));
    // Far background
    for (let i = 0; i < 30; i++) {
        bldgs.push(createBuilding(6 + Math.random() * 12, 30 + Math.random() * 70, 6 + Math.random() * 12, (Math.random() - 0.5) * 650, -200 - Math.random() * 150, 'std'));
    }
    bldgs.forEach(b => scene.add(b));

    // Road
    const road = new THREE.Mesh(new THREE.PlaneGeometry(900, 22), new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.85 }));
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, -4, 55);
    scene.add(road);

    // Car lights
    const cars = [];
    for (let i = 0; i < 18; i++) {
        const c = new THREE.Mesh(
            new THREE.SphereGeometry(0.8, 6, 6),
            new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xFF4444 : 0xFFFFFF, transparent: true, opacity: 0.7 })
        );
        c.position.set((Math.random() - 0.5) * 800, -3, 50 + (Math.random() > 0.5 ? 5 : -5));
        c.userData = { spd: 0.4 + Math.random() * 1.2, dir: Math.random() > 0.5 ? 1 : -1 };
        scene.add(c);
        cars.push(c);
    }

    // Stars/particles
    const pCount = 2500;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(pCount * 3), col = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 900;
        pos[i * 3 + 1] = Math.random() * 450 + 15;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 700 - 80;
        const cc = Math.random();
        if (cc > 0.85) { col[i * 3] = 0; col[i * 3 + 1] = 0.96; col[i * 3 + 2] = 1; }
        else if (cc > 0.7) { col[i * 3] = 0.1; col[i * 3 + 1] = 0.49; col[i * 3 + 2] = 1; }
        else { col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1; }
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 1, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
    scene.add(particles);

    // Lighting - bright enough to see the skyline
    scene.add(new THREE.AmbientLight(0x1a2a50, 1.2));
    const moon = new THREE.DirectionalLight(0x6688CC, 0.8);
    moon.position.set(100, 300, 200);
    scene.add(moon);
    const accentCyan = new THREE.PointLight(CYAN, 1.5, 500);
    accentCyan.position.set(0, 50, 150);
    scene.add(accentCyan);
    const accentPurple = new THREE.PointLight(PURPLE, 1.0, 400);
    accentPurple.position.set(-200, 100, 50);
    scene.add(accentPurple);
    const accentBlue = new THREE.PointLight(BLUE, 1.0, 400);
    accentBlue.position.set(200, 100, 50);
    scene.add(accentBlue);

    // Searchlight beams
    const beamGeo = new THREE.CylinderGeometry(0.4, 7, 280, 8, 1, true);
    const beam1 = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.035, side: THREE.DoubleSide }));
    beam1.position.set(50, 280, -100);
    scene.add(beam1);
    const beam2 = new THREE.Mesh(beamGeo.clone(), new THREE.MeshBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.025, side: THREE.DoubleSide }));
    beam2.position.set(-90, 170, -80);
    scene.add(beam2);

    // Animation loop
    let t = 0;
    const mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', e => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; });

    function animate() {
        requestAnimationFrame(animate);
        t += 0.004;

        // Camera drift + mouse influence
        camera.position.x = Math.sin(t * 0.25) * 20 + mouse.x * 10;
        camera.position.y = 120 + Math.sin(t * 0.15) * 8 + mouse.y * 8;
        camera.lookAt(0, 80, -80);

        // Cars
        cars.forEach(c => {
            c.position.x += c.userData.spd * c.userData.dir;
            if (c.position.x > 450) c.position.x = -450;
            if (c.position.x < -450) c.position.x = 450;
        });

        // Particles drift
        const pa = particles.geometry.attributes.position.array;
        for (let i = 0; i < pCount; i++) pa[i * 3 + 1] += Math.sin(t + i * 0.05) * 0.015;
        particles.geometry.attributes.position.needsUpdate = true;

        // Beams
        beam1.rotation.z = Math.sin(t * 0.4) * 0.12;
        beam2.rotation.z = Math.cos(t * 0.35) * 0.1;

        // Pulse lights
        accentCyan.intensity = 0.35 + Math.sin(t * 1.5) * 0.08;
        accentPurple.intensity = 0.2 + Math.cos(t * 1.2) * 0.04;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();
