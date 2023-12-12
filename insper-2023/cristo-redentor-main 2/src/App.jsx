import { MapContainer } from "./components/MapContainer";

import * as THREE from "three";
import { useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./components/Model";
import { Center, CameraControls } from "@react-three/drei";
import { Overlay } from "./components/Overlay";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function App() {
  const mapRef = useRef();
  const modelRef = useRef();
  const overlay = useRef();
  const cameraControlRef = useRef(null);

  const screenW = document.body.clientWidth;

  function modelInitPosition() {
    // let screenW = document.body.clientWidth;
    // let truckValue;

    // if (screenW < 700) { truckValue = 96 } else
    // if (700 < screenW < 900) { truckValue = 82 } else
    // if (screenW > 1200) { truckValue = 76 }
    // else { truckValue = 100 }

    // console.log(`truckValue is ${truckValue}`);

    cameraControlRef.current?.truck(80, 35);
    cameraControlRef.current?.rotateAzimuthTo(
      -12.6 * THREE.MathUtils.DEG2RAD,
      true
    );
    cameraControlRef.current?.saveState();
  }

  function mapZoom(goTo) {
    if (goTo === "end") {
      console.log(goTo);
      mapRef.current?.flyTo({
        center: [-43.210857, -22.951965],
        zoom: 18.6,
        duration: 3000,
        essential: true,
      });
    } else if (goTo === "start") {
      mapRef.current?.flyTo({
        center: [-43.210857, -22.951965],
        zoom: 11,
        duration: 3000,
        essential: true,
      });
    }
  }

  // 3D positioning functions
  function modelChristZoom(direction) {
    if (direction > 0) {
      cameraControlRef.current.rotatePolarTo(
        90 * THREE.MathUtils.DEG2RAD,
        true
      );

      if (screenW > 768) {
        cameraControlRef.current.rotateAzimuthTo(
          115 * THREE.MathUtils.DEG2RAD,
          true
        );

        cameraControlRef.current.setTarget(10, 15, 0, true);
        cameraControlRef.current.zoom(6.5, true);
      } else {
        cameraControlRef.current.rotateAzimuthTo(
          90 * THREE.MathUtils.DEG2RAD,
          true
        );
        cameraControlRef.current.setTarget(5, 15, 0, true);
        cameraControlRef.current.zoom(4, true);
      }
      // cameraControlRef.current.moveTo( 0,-300, 0, true);
    } else if (direction < 0) {
      cameraControlRef.current.reset({
        enableTransition: true,
      });
    }
    // cameraControlRef.current?.moveTo(-10,20,100);
    // document.getElementById("animation-section").opacity = 0;
  }

  function modelChristFeet(direction) {
    if (direction > 0) {
      cameraControlRef.current.setTarget(10, 5, 0, true);
      // cameraControlRef.current?.truck(5,0);
      cameraControlRef.current.zoom(2, true);
    } else if (direction < 0) {
      if (screenW > 768) {
        cameraControlRef.current.setTarget(10, 15, 0, true);
        cameraControlRef.current.zoom(-2, true);
      } else {
        cameraControlRef.current.setTarget(5, 15, 0, true);
        cameraControlRef.current.zoom(-2, true);
      }
    }
  }

  function modelChristTorso(direction) {
    if (direction > 0) {
      cameraControlRef.current.setTarget(10, 20, 0, true);

      // cameraControlRef.current.zoom(6, true);
    } else if (direction < 0) {
      cameraControlRef.current.setTarget(10, 5, 0, true);

      // cameraControlRef.current.zoom(-6, true);
    }
  }

  function modelChristHead(direction) {
    if (direction > 0) {
      cameraControlRef.current.setTarget(0, 30, 0, true);
      cameraControlRef.current.zoom(4, true);

      // cameraControlRef.current.zoom(6, true);
    } else if (direction < 0) {
      cameraControlRef.current.setTarget(10, 20, 0, true);
      cameraControlRef.current.zoom(-4, true);

      // cameraControlRef.current.zoom(-6, true);
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // position 3d map
    ScrollTrigger.create({
      trigger: overlay.current,
      onEnter: modelInitPosition,
    });

    // map opacity trigger
    gsap.to("#map-section", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#show-animation-map",
        start: "top",
        markers: false,
        scrub: true,
      },
    });
    // animation opacity trigger
    gsap.to("#animation-section", {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#show-animation-map",
        start: "top",
        end: "bottom",
        markers: false,
        scrub: true,
      },
    });

    gsap.to("#finish-wp", {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#last",
        start: "top",
        end: "bottom",
        markers: false,
        scrub: true,
      },
    });

    // map zoom in and out
    ScrollTrigger.create({
      trigger: "#map-trigger",
      onEnter: ({ progress, direction, isActive }) => {
        console.log(direction, isActive);
        mapZoom("end");
      },
      onLeaveBack: ({ progress, direction, isActive }) => {
        console.log(direction, isActive);
        mapZoom("start");
      },
      start: "top",
      markers: false,
    });

    // timelines
    const mapIntro = gsap.timeline({
      scrollTrigger: {
        trigger: "#map-presentation",
        start: "top 20%",
        end: "bottom 70%",
        markers: false,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    mapIntro
      .to("#map-presentation-1st", { opacity: 1, duration: 0.2 })
      .to("#map-presentation-1st", { opacity: 0, duration: 0.2 }, 0.8);

    const mapZoomContent = gsap.timeline({
      scrollTrigger: {
        trigger: "#map-presentation",
        start: "bottom",
        end: "bottom+=80%",
        markers: false,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    mapZoomContent
      .to("#map-zooming-to-christ", { opacity: 1, duration: 0.2 })
      .to("#map-zooming-to-christ", { opacity: 0, duration: 0.2 }, 0.8);

    const mapTurning3dContent = gsap.timeline({
      scrollTrigger: {
        trigger: "#from-above",
        start: "top",
        end: "bottom",
        markers: false,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    mapTurning3dContent
      .to("#map-turning-to-3d", { opacity: 1, duration: 0.1 })
      .to("#map-turning-to-3d", { opacity: 0, duration: 0.1 }, 0.8);

    const showingFull3DChristContent = gsap.timeline({
      scrollTrigger: {
        trigger: "#animation-showcase",
        start: "top",
        end: "bottom",
        markers: false,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    showingFull3DChristContent
      .to("#christ-3d", { opacity: 0.8, duration: 0.1 })
      .to("#christ-3d", { opacity: 0, duration: 0.1 }, 0.8);

    const showingChristFeetContent = gsap.timeline({
      scrollTrigger: {
        trigger: "#cristo-feet",
        start: "top",
        end: "bottom",
        markers: false,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    showingChristFeetContent
      .to("#feet-content", { opacity: 0.8, duration: 0.1 })
      .to("#feet-content", { opacity: 0, duration: 0.1 }, 0.8);

    const showingChristTorsoContent = gsap.timeline({
      scrollTrigger: {
        trigger: "#cristo-torso",
        start: "top",
        end: "bottom",
        markers: false,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    showingChristTorsoContent
      .to("#torso-content", { opacity: 0.8, duration: 0.1 })
      .to("#torso-content", { opacity: 0, duration: 0.1 }, 0.8);

    const showingChristHeadContent = gsap.timeline({
      scrollTrigger: {
        trigger: "#cristo-head",
        start: "top",
        end: "bottom",
        markers: false,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    showingChristHeadContent
      .to("#head-content", { opacity: 0.8, duration: 0.1 })
      .to("#head-content", { opacity: 0, duration: 0.1 }, 0.8);

    // 3d handle triggers
    ScrollTrigger.create({
      trigger: "#animation-showcase",
      start: "top",
      onEnter: ({ direction }) => {
        modelChristZoom(direction);
      },
      onLeaveBack: ({ direction }) => {
        modelChristZoom(direction);
      },
    });

    ScrollTrigger.create({
      trigger: "#cristo-feet",
      start: "top",
      onEnter: ({ direction }) => {
        modelChristFeet(direction);
      },
      onLeaveBack: ({ direction }) => {
        modelChristFeet(direction);
      },
    });

    ScrollTrigger.create({
      trigger: "#cristo-torso",
      start: "top",
      onEnter: ({ direction }) => {
        modelChristTorso(direction);
      },
      onLeaveBack: ({ direction }) => {
        modelChristTorso(direction);
      },
    });

    ScrollTrigger.create({
      trigger: "#cristo-head",
      start: "top",
      onEnter: ({ direction }) => {
        modelChristHead(direction);
      },
      onLeaveBack: ({ direction }) => {
        modelChristHead(direction);
      },
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <section id="map-section" className="w-full relative">
        <div className={scroll > 0.5 ? "opacity-70" : "opacity-1"}>
          <MapContainer mapRef={mapRef} />
        </div>
      </section>

      <section
        id="animation-section"
        className="flex w-full h-[100vh] items-center justify-center fixed top-0 left-0 -z-20 opacity-0"
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 700, 0], fov: 32, rotation: [0, 0, 0] }}
          className="touch-none bg-animation-wp bg-no-repeat bg-cover bg-center object-cover"
        >
          <CameraControls ref={cameraControlRef} />
          {/* <primitive object={new THREE.AxesHelper(10)} /> */}
          <Center>
          </Center>
        </Canvas>
      </section>

      <Overlay ref={overlay} />
      <div
        id="finish-wp"
        className="fixed top-0 left-0 w-full h-[100vh] bg-rio-wp bg-no-repeat bg-cover bg-center opacity-0 z-10"
      ></div>
    </div>
  );
}

export default App;
