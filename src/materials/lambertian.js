class Lambertian {
    constructor(albedo) {
        this.albedo = albedo;
    }

    scatter(ray, hit) {
        const target = hit.point.add(hit.normal).add(Vec3.randomInUnitSphere());
        const scatteredRay = new Ray(hit.point, target.subtract(hit.point));
        const attenuation = this.albedo;
        return { attenuation, scattered: scatteredRay };
    }
}