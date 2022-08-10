const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x35363a)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const maxRad = Math.PI * 2

function RandomColor()
{
    return Math.floor(Math.random()*16777216)
}

// Center
const antGeo = new THREE.BoxGeometry(.5, .1, .1)
const antMaterial = new THREE.MeshBasicMaterial({ color: RandomColor() });
const centerMesh = new THREE.Mesh(antGeo, antMaterial)
scene.add(centerMesh)

function Line(p1, p2)
{
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    const points = [];
    points.push(p1);
    points.push(p2);

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    scene.add(line)
}

const antCount = 100
const ants = []

for (var i = 0; i < antCount; i++)
{
    const antGeo = new THREE.BoxGeometry(.1, .1, .4)
    const antMaterial = new THREE.MeshBasicMaterial({ color: RandomColor() });
    const antMesh = new THREE.Mesh(antGeo, antMaterial)

    antMesh.position.y = Math.random()*2

    scene.add(antMesh)

    const ant = [
        antMesh,
        antGeo,
        Math.random() * maxRad,
        5 + Math.random()*2,
        1 +  Math.random()
    ]

    ants.push(ant)
}

camera.position.y = 7
camera.position.z = 7

camera.rotation.x = -Math.PI/4

function updateAnt(ant, dt)
{
    ant[2] = (ant[2] + dt* .001 * ant[4] )%maxRad
    ant[0].position.x = Math.cos(ant[2])*ant[3]
    ant[0].position.z = Math.sin(ant[2])*ant[3]
    ant[0].lookAt(centerMesh.position)
    ant[0].rotateY(Math.PI/2)

    // ant[0].quaternion.
    // ant[0].position = new THREE.Vector3(Math.cos(ant[2])*ant[3], 0, Math.sin(ant[2])*ant[3])
}

var lastTick = Date.now()
function animate()
{
    const deltaTime = Date.now() - lastTick
    lastTick = Date.now()

    for (var i = 0; i < antCount; i++)
    {
        updateAnt(ants[i], deltaTime)
    }

    requestAnimationFrame(animate)
    renderer.render( scene, camera );
}

animate();