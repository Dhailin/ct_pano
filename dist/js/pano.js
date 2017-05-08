function init(){var e,n;e=document.getElementById("container"),camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1100),scene=new THREE.Scene,canvas_placeholder=document.createElement("canvas"),canvas_placeholder.width=128,canvas_placeholder.height=128;var t=canvas_placeholder.getContext("2d");t.fillStyle="rgb( 200, 200, 200 )",t.fillRect(0,0,canvas_placeholder.width,canvas_placeholder.height);var o=[loadTexture(imgSrc+"/right.jpg"),loadTexture(imgSrc+"/left.jpg"),loadTexture(imgSrc+"/top.jpg"),loadTexture(imgSrc+"/bottom.jpg"),loadTexture(imgSrc+"/front.jpg"),loadTexture(imgSrc+"/back.jpg")];n=new THREE.Mesh(new THREE.BoxGeometry(300,300,300,7,7,7),new THREE.MultiMaterial(o)),n.scale.x=-1,scene.add(n),renderer=new THREE.CanvasRenderer,renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),e.appendChild(renderer.domElement),document.addEventListener("mousedown",mouseDown,!1),document.addEventListener("mousemove",mouseMove,!1),document.addEventListener("mouseup",mouseUp,!1),document.addEventListener("wheel",mouseWheel,!1),document.addEventListener("touchstart",touchStart,!1),document.addEventListener("touchmove",touchMove,!1),window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function loadTexture(e){var n=new THREE.Texture(canvas_placeholder),t=new THREE.MeshBasicMaterial({map:n,overdraw:.5}),o=new Image;return o.onload=function(){n.image=this,n.needsUpdate=!0},o.src=e,t}function mouseDown(e){e.preventDefault(),isUserInteracting=!0,onPointerDownPointerX=e.clientX,onPointerDownPointerY=e.clientY,onPointerDownLon=lon,onPointerDownLat=lat}function mouseMove(e){!0===isUserInteracting&&(lon=.1*(onPointerDownPointerX-e.clientX)+onPointerDownLon,lat=.1*(e.clientY-onPointerDownPointerY)+onPointerDownLat)}function mouseUp(e){isUserInteracting=!1}function mouseWheel(e){camera.fov+=.05*e.deltaY,(camera.fov<40||camera.fov>80)&&(camera.fov=cameraFov),camera.updateProjectionMatrix(),console.log(camera.fov),cameraFov=camera.fov}function touchStart(e){1==e.touches.length&&(e.preventDefault(),onPointerDownPointerX=e.touches[0].pageX,onPointerDownPointerY=e.touches[0].pageY,onPointerDownLon=lon,onPointerDownLat=lat)}function touchMove(e){1==e.touches.length&&(e.preventDefault(),lon=.1*(onPointerDownPointerX-e.touches[0].pageX)+onPointerDownLon,lat=.1*(e.touches[0].pageY-onPointerDownPointerY)+onPointerDownLat)}function animate(){requestAnimationFrame(animate),update()}function update(){!1===isUserInteracting&&(lon+=0),lat=Math.max(-85,Math.min(85,lat)),phi=THREE.Math.degToRad(90-lat),theta=THREE.Math.degToRad(lon),target.x=500*Math.sin(phi)*Math.cos(theta),target.y=500*Math.cos(phi),target.z=500*Math.sin(phi)*Math.sin(theta),camera.lookAt(target),renderer.render(scene,camera)}var imgSrc="./dist/img/"+location.hash.slice(1),camera,scene,renderer,cameraFov,canvas_placeholder,isUserInteracting=!1,onMouseDownMouseX=0,onMouseDownMouseY=0,lon=90,onMouseDownLon=0,lat=0,onMouseDownLat=0,phi=0,theta=0,target=new THREE.Vector3;init(),animate();