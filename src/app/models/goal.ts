export class Goal {
    id : string;
    title : string;
    description : string;
}

export class Indicator {
    target : string;
    indicator : string;
    description : string;
}

export class Series {
    indicator : string;
    series : string;
    description : string;
    unit? : string;
}