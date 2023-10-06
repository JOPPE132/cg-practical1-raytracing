//firstImage();
//blueWhiteGradient();
//redSphere(); //Something wrong with the aspect ratio of camera?
//normalsSphere();
sphereAndGround();
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

    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.horizontal;

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
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;
    const newOrigin = new Vec3(0,0.0,-1);

    function hitSphere(center, radius, ray) {
        const oc = ray.origin.subtract(center);
        const a = ray.direction.dot(ray.direction);
        const b = 2.0 * oc.dot(ray.direction);
        const c = oc.dot(oc) - radius * radius;
        const discriminant = b * b - 4 * a * c;
        return discriminant > 0;
    }

    function rayColor(ray) {
        if(hitSphere(newOrigin, 0.5, ray)){
            return new Vec3(1,0,0); //Return new color
        }

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













function normalsSphere() {
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;
    const newOrigin = new Vec3(0,0.0,-1);

    function hitSphere(center, radius, ray) {
        const oc = ray.origin.subtract(center);
        const a = ray.direction.dot(ray.direction);
        const b = 2.0 * oc.dot(ray.direction);
        const c = oc.dot(oc) - radius * radius;
        const discriminant = b * b - 4 * a * c;
        if(discriminant < 0){
            return -1.0;
        } else{
            return (-b - Math.sqrt(discriminant)) / (2.0*a);
        }
    }

    function rayColor(ray) {
        const t = hitSphere(new Vec3(0, 0, -1), 0.5, ray);

        if (t > 0.0) {
            const hitPoint = ray.at(t).subtract(new Vec3(0, 0, -1));
            const N = hitPoint.unitVector();
            return N.multiply(0.5).add(new Vec3(0.6, 0.5, 1));
        }

        const unitDirection = ray.getDirection().unitVector();
        const t2 = 0.5 * (unitDirection.y + 1.0);

        return new Vec3(1.0, 1.0, 1.0).multiply(1.0 - t2).add(new Vec3(0.5, 0.7, 1.0).multiply(t2));
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

















function sphereAndGround() {

    //Image
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    //Camera
    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;
    const newOrigin = new Vec3(0,0.0,-1);

    //World
    const world = new World();
    const sphere1 = new Sphere(new Vec3(0, 0, -1), 0.5);
    const sphere2 = new Sphere(new Vec3(0, -100.5, -1), 100);
    world.add(sphere1);
    world.add(sphere2);

    //Hitsphere function
    function hitSphere(center, radius, ray) {
        const oc = ray.origin().subtract(center);
        const a = ray.direction().lengthSquared();
        const half_b = oc.dot(ray.direction());
        const c = oc.lengthSquared() - radius * radius;
        const discriminant = half_b * half_b - a * c;
        if (discriminant < 0) {
            return -1.0;
        } else {
            return (-half_b - Math.sqrt(discriminant)) / a;
        }
    }
    
    //Raycolor funciton
    function rayColor(ray, world) {
        const rec = world.hit(ray, 0, Infinity);
    
        if (rec.hit) {
            const normal = rec.normal;
            const white = new Vec3(1, 1, 1);
            return normal.add(white).multiply(0.5);
        }
    
        const unitDirection = ray.getDirection().unitVector();

        const t = 0.5 * (unitDirection.getY() + 1.0);
    
        const white = new Vec3(1.0, 1.0, 1.0);
        const blue = new Vec3(0.5, 0.7, 1.0);
    
        return white.multiply(1.0 - t).add(blue.multiply(t));
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
            const pixelColor = rayColor(ray, world);

            const pixel = [];
            pixel.push(pixelColor.x);
            pixel.push(pixelColor.y);
            pixel.push(pixelColor.z);

            image.push(pixel);
        }
    }
    displayImage(imageWidth, imageHeight, image);
}

function antialiasing() {
    // todo
}

function diffuseSphere() {
    //TODO
}

function metalSpheres() {
    //TODO
}