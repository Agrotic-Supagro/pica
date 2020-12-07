import * as L from "leaflet"

export class Parcelle {
    constructor(
        private name: string,
        private center: L.LatLng,
        private bounds: L.LatLngBounds,
        private area: number,
        private interrang: number,
        private interpied:number,
        private cepage : string,
        private pica2017 : L.ImageOverlay,
        private pica2018 : L.ImageOverlay,
        private pica2019 : L.ImageOverlay,
        private rdt2017 : L.ImageOverlay,
        private rdt2018 : L.ImageOverlay,
        private rdt2019 : L.ImageOverlay,
        private optimal2017,
        private optimal2018,
        private optimal2019,
        private emprise,
        private points,
    ){}

    public get_name(): string {
        return this.name;
    }

    public get_center() : L.LatLng {
        return this.center;
    }

    public get_bounds() : L.LatLngBounds {
        return this.bounds;
    }

    public get_area() : number {
        return this.area;
    }

    public get_interrang() : number {
        return this.interrang;
    }

    public get_interpied() : number {
        return this.interpied;
    }

    public get_cepage() : string {
        return this.cepage;
    }

    public get_oenoview(millesime) : L.GeoJSON {
        return this[millesime];
    }
}
