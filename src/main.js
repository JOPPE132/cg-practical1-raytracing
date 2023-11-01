//firstImage();
//blueWhiteGradient();
//redSphere();
//normalsSphere();
//sphereAndGround();
//antialiasing();
diffuseSphere();
//metalSpheres();

function firstImage() {
    //Initialize image width, height and array to store the data
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    //Iterate through each row and column and compute value
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
    //Initialize image width, height and array to store the data
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    //Create a camera object and gather its properties
    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.horizontal;

    //Compute color based on rays direction
    function rayColor(ray) {
        const unitDirection = ray.getDirection().unitVector();
        const t = 0.5 * (unitDirection.getY() + 1.0);
        const white = new Vec3(1.0, 1.0, 1.0);
        const blue = new Vec3(0.5, 0.7, 1.0);
        return white.multiply(1.0 - t).add(blue.multiply(t));
    }

    //Generate image by casting rays from the camera and calculate color
    for (let j = imageHeight - 1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            const u = i / (imageWidth - 1);
            const v = j / (imageHeight - 1);

            //Create a ray from the camera
            const direction = lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)).subtract(origin);
            const ray = new Ray(origin, direction);

            //Calculate the pixel color
            const pixelColor = rayColor(ray);

            //Create pixel array then push it into the image
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
    //Initialize image width, height and array to store the data
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    //Create a camera object and gather its properties
    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;
    const newOrigin = new Vec3(0,0.0,-1);

    //Determine if a ray intersects with the sphere
    function hitSphere(center, radius, ray) {
        const oc = ray.origin.subtract(center);
        const a = ray.direction.dot(ray.direction);
        const b = 2.0 * oc.dot(ray.direction);
        const c = oc.dot(oc) - radius * radius;
        const discriminant = b * b - 4 * a * c;
        return discriminant > 0;
    }

    //Compute color based on rays direction
    function rayColor(ray) {
        if(hitSphere(newOrigin, 0.5, ray)){
            return new Vec3(1,0,0); //Return red color
        }
        const unitDirection = ray.getDirection().unitVector();
        const t = 0.5 * (unitDirection.getY() + 1.0);
        const white = new Vec3(1.0, 1.0, 1.0);
        const blue = new Vec3(0.5, 0.7, 1.0);
        return white.multiply(1-0 - t).add(blue.multiply(t));
    }

    //Generate image by casting rays from the camera and calculate color
    for (let j = imageHeight - 1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            const u = i / (imageWidth - 1);
            const v = j / (imageHeight - 1);

            //Create a ray from the camera
            const direction = lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)).subtract(origin);
            const ray = new Ray(origin, direction);

            //Calculate the pixel color
            const pixelColor = rayColor(ray);

            //Create pixel array then push it into the image
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
    //Initialize image width, height and array to store the data
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    //Create a camera object and gather its properties
    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;

    //Determine if a ray intersects with the sphere
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

    //Compute color based on rays direction
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

    //Generate image by casting rays from the camera and calculate color
    for (let j = imageHeight - 1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            const u = i / (imageWidth - 1);
            const v = j / (imageHeight - 1);

            // Create a ray from the camera
            const direction = lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)).subtract(origin);
            const ray = new Ray(origin, direction);

            // Calculate the pixel color
            const pixelColor = rayColor(ray);

            //Create pixel array then push it into the image
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
    //Initialize image width, height and array to store the data
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    //Create a camera object and gather its properties
    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;

    //Create a world object and push spheres to the objects array
    const world = new World();
    const sphere1 = new Sphere(new Vec3(0, 0, -1), 0.5); //Center sphere
    const sphere2 = new Sphere(new Vec3(0, -100.5, -1), 100); //Ground sphere
    world.add(sphere1);
    world.add(sphere2);

    //Compute color based on rays direction
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

    //Generate image by casting rays from the camera and calculate color
    for (let j = imageHeight - 1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            const u = i / (imageWidth - 1);
            const v = j / (imageHeight - 1);

            // Create a ray from the camera
            const direction = lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)).subtract(origin);
            const ray = new Ray(origin, direction);

            // Calculate the pixel color
            const pixelColor = rayColor(ray, world);

            //Create pixel array then push it into the image
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
    //Initialize image width, height and array to store the data
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];
    const number_of_pixles = 100;

    //Create a camera object and gather its properties
    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;

    //Create a world object and push spheres to the objects array
    const world = new World();
    const sphere1 = new Sphere(new Vec3(0, 0, -1), 0.5);
    const sphere2 = new Sphere(new Vec3(0, -100.5, -1), 100);
    world.add(sphere1);
    world.add(sphere2);

    //Compute color based on rays direction
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

    //Generate image by casting rays from the camera and calculate color
    for (let j = imageHeight - 1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            let pixelColor = new Vec3(0, 0, 0);

            for (let s = 0; s < number_of_pixles; ++s) {
                const u = (i + Math.random()) / (imageWidth - 1);
                const v = (j + Math.random()) / (imageHeight - 1);

                // Create a ray from the camera
                const direction = lowerLeftCorner
                    .add(horizontal.multiply(u))
                    .add(vertical.multiply(v))
                    .subtract(origin);
                const ray = new Ray(origin, direction);

                //Calculate the pixel color
                pixelColor = pixelColor.add(rayColor(ray, world));
            }

            //Average the pixel colors
            pixelColor = pixelColor.divide(number_of_pixles);

            //Create pixel array then push it into the image
            const pixel = [];
            pixel.push(pixelColor.x);
            pixel.push(pixelColor.y);
            pixel.push(pixelColor.z);
            image.push(pixel);
        }
    }
    displayImage(imageWidth, imageHeight, image);
}

function diffuseSphere() {
    //Initialize image width, height and array to store the data
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];
    const number_of_pixels = 50;
    const max_depth = 20;

    //Create a camera object and gather its properties
    const camera = new Camera();
    const lowerLeftCorner = camera.lowerLeftCorner;
    const horizontal = camera.horizontal;
    const vertical = camera.vertical;
    const origin = camera.origin;

    //Create a world object and push spheres to the objects array
    const world = new World();
    const sphere1 = new Sphere(new Vec3(0, 0, -1), 0.5);
    const sphere2 = new Sphere(new Vec3(0, -100.5, -1), 100);
    world.add(sphere1);
    world.add(sphere2);

    //Utility class to generate random point in sphere
    function randomInSphere(){
        while(true){
            const p = Vec3.random(-1,1);
            if(p.squaredLength() >= 1) continue;
            return p;
        }
    }

    //Compute color based on rays direction
    function rayColor(ray, world, depth) {
        const rec = world.hit(ray, 0, Infinity);

        if(depth <= 0){
            return new Vec3(0,0,0);
        }

        if (rec && rec.hit) {
            const target = rec.point.add(rec.normal).add(randomInSphere());
            return rayColor(new Ray(rec.point, target.subtract(rec.point)), world, depth - 1);
        }

        const unitDirection = ray.getDirection().unitVector();
        const t = 0.5 * (unitDirection.getY() + 1.0);
        const white = new Vec3(1.0, 1.0, 1.0);
        const blue = new Vec3(0.5, 0.7, 1.0);

        return white.multiply(1.0 - t).add(blue.multiply(t));
    }

    //Generate image by casting rays from the camera and calculate color
    for (let j = imageHeight - 1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            let pixelColor = new Vec3(0, 0, 0);

            for (let s = 0; s < number_of_pixels; ++s) {
                const u = (i + Math.random()) / (imageWidth - 1);
                const v = (j + Math.random()) / (imageHeight - 1);

                // Create a ray from the camera
                const direction = lowerLeftCorner
                    .add(horizontal.multiply(u))
                    .add(vertical.multiply(v))
                    .subtract(origin);
                const ray = new Ray(origin, direction);

                //Calculate the pixel color
                pixelColor = pixelColor.add(rayColor(ray, world, max_depth));
            }

            //Average the pixel colors
            pixelColor = pixelColor.divide(number_of_pixels);

            //Create pixel array then push it into the image
            const pixel = [];
            pixel.push(pixelColor.x);
            pixel.push(pixelColor.y);
            pixel.push(pixelColor.z);
            image.push(pixel);
        }
    }
    displayImage(imageWidth, imageHeight, image);
}


function metalSpheres() {

}