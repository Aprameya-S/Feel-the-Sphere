import React, { useEffect } from 'react'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

function Sphere() {
    useEffect(() => {
        document.title = 'Feel the Sphere | Three.js Project';
        //Load texture from normal map
        const textureLoader = new THREE.TextureLoader()

        const normalTexture = textureLoader.load('/textures/NormalMap.png')

        // Debug
        const gui = new dat.GUI()

        // Canvas
        const canvas = document.querySelector('canvas.webgl')

        // Scene
        const scene = new THREE.Scene()

        // Objects
        const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

        // Materials

        const material = new THREE.MeshStandardMaterial()
        material.metalness = 0.7
        material.roughness = 0.2
        material.normalMap = normalTexture

        material.color = new THREE.Color(0x292929)

        // Mesh
        const sphere = new THREE.Mesh(geometry,material)
        scene.add(sphere)

        // --------->Lights
        // Light 1

        const pointLight1 = new THREE.PointLight(0xff0000, 2)
        pointLight1.position.set(-1.86,1,-1.65)
        pointLight1.intensity = 10

        scene.add(pointLight1)

        const light1 = gui.addFolder('Light 1')

        light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
        light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
        light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
        light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)

        const light1Color = {
            color: 0xff0000
        }
        light1.addColor(light1Color, 'color')
            .onChange(() => {
                pointLight1.color.set(light1Color.color)
        })

        // const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1)
        // scene.add(pointLightHelper1)

        // Light 2

        const pointLight2 = new THREE.PointLight(0xe1ff, 2)
        pointLight2.position.set(2.13,-3,-1.98)
        pointLight2.intensity = 6.8

        scene.add(pointLight2)

        const light2 = gui.addFolder('Light 2')


        light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
        light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
        light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
        light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

        const light2Color = {
            color: 0xff0000
        }
        light2.addColor(light2Color, 'color')
            .onChange(() => {
                pointLight2.color.set(light2Color.color)
            })

        // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
        // scene.add(pointLightHelper2)


        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () =>
        {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 2
        scene.add(camera)

        // Controls
        // const controls = new OrbitControls(camera, canvas)
        // controls.enableDamping = true

        /**
        * Renderer
        */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha : true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
        * Animate
        */

        document.addEventListener('mousemove', onDocumentMouseMove)

        let mouseX = 0
        let mouseY = 0

        let targetX = 0
        let targetY = 0

        const windowX = window.innerWidth / 2
        const windowY = window.innerHeight / 2

        function onDocumentMouseMove(event){
            mouseX = (event.clientX - windowX)
            mouseY = (event.clientY - windowY)
        }

        // Adding parallax to sphere

        const updateSphere = (event) => {
            sphere.position.y = window.scrollY * .001
        }
        window.addEventListener('scroll', updateSphere)

        // Animate the rotation and mouse position based rotation

        const clock = new THREE.Clock()

        const tick = () =>
        {

            targetX = mouseX * .001
            targetY = mouseY * .001

            const elapsedTime = clock.getElapsedTime()

            // Update objects
            sphere.rotation.y = .5 * elapsedTime

            sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
            sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
            sphere.position.z += -.05 * (targetY - sphere.rotation.x)


            // Update Orbital Controls
            // controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    })

  return (
    <>
        <div class="container">
            <h1>Feel the Sphere</h1>
        </div>
        <canvas class="webgl"></canvas>
        <section class=""></section>
    </>
  )
}

export default Sphere