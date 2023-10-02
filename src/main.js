firstImage();
blueWhiteGradient();
//redSphere();
//normalsSphere();
//sphereAndGround();
//antialiasing();
//diffuseSphere();
//metalSpheres();

function firstImage() {
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    for (let j = imageHeight-1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            const pixel = [];
            pixel.push(i / (imageWidth-1));
            pixel.push(j / (imageHeight-1));
            pixel.push(0.25);

            image.push(pixel);
        }
    }
    displayImage(imageWidth, imageHeight, image);
}


function blueWhiteGradient() {

    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    const u = new Vec3(1,1,1);
    const v = new Vec3(-2,8,-9);
    const ray = new Ray(u,v);

    const camera = new Camera();


    function rayColor(ray) {
        const unit_direction = ray.getDirection.unitVector;
        const t = 0.5 * (unit_direction.y + 1.0);

        const white = new Vec3(1.0, 1.0, 1.0);
        const blue = new Vec3(0.5, 0.7, 1.0);

        return white.multiply(1.0 - t).add(blue.multiply(t));
    }


    const pixelColor = rayColor(ray);

    for (let j = imageHeight - 1; j >= 0; --j) {
        for (let i = 0; i < imageWidth; ++i) {
            const uRatio = i / (imageWidth - 1);
            const vRatio = j / (imageHeight - 1);
            const ray = camera.getRay(uRatio, vRatio);
            const pixelColor = rayColor(ray);

            image.push(pixelColor);
        }
    }
    displayImage(imageWidth, imageHeight, image);
}

function redSphere() {
    //TODO
}

function normalsSphere() {
    //TODO
}

function sphereAndGround() {
    //TODO
}

function antialiasing() {
    //TODO
}

function diffuseSphere() {
    //TODO
}

function metalSpheres() {
    //TODO
}