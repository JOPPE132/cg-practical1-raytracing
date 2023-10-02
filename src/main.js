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

    const lowerLeftCorner = new Vec3(-2.0, -1.0, -1.0);
    const horizontal = new Vec3(4.0, 0.0, 0.0);
    const vertical = new Vec3(0.0, 2.0, 0.0);
    const origin = new Vec3(0.0, 0.0, 0.0);



        function rayColor(ray) {
            const unitDirection = ray.getDirection().unitVector();
            const t = 0.5 * (unitDirection.getY() + 1.0);

            const white = new Vec3(1.0, 1.0, 1.0);
            const blue = new Vec3(0.5, 0.7, 1.0);

             const pixelColor = white.multiply(1.0 - t).add(blue.multiply(t));

             return pixelColor;
        }


    for (let j = imageHeight - 1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            const u = i / (imageWidth - 1);
            const v = j / (imageHeight - 1);

            // Create a ray from the camera
            const direction = lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)).subtract(origin);
            const ray = new Ray(origin, direction);

            // Calculate the pixel color using ray tracing
            const pixelColor = rayColor(ray);

            const pixel = [];
            pixel.push(pixelColor.x);
            pixel.push(pixelColor.y);
            pixel.push(pixelColor.z);

            image.push(pixel);
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