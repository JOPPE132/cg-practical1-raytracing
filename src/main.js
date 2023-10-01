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

    function rayToColor(ray) {

    }
   const u = new Vec3(1,1,1);
   const v = new Vec3(-2,8-9);
   const ray = new Ray(u,v);
    console.log(rayToColor(ray));
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