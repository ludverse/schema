
const schedule = {
    label: "Ludvig 7D",
    begin: 480,
    end: 880,
    scale: 1.5,
    colors: {
        red: "#fc5c65",
        orange: "#fd9644",
        yellow: "#fed330",
        green: "#26de81",
        turquoise: "#2bcbba",
        lblue: "#45aaf2",
        dblue: "#4b7bec",
        purple: "#a55eea",
        gray: "#a3a3a3",
        black: "#4b6584"
    },
    teachers: {
        NTL: "Niklas",
        OEN: "Olof",
        CÖO: "Cecilia",
        EHM: "Ebistam",
        JGH: "Josefina",
        JON: "Jonas",
        URL: "Ulrika"
    },
    pupils: {
        ANDR: "Andrée",
        ANGE: "Angelo",
        JAKO: "Jakob",
        JIM: "Jim",
        KEIL: "Keilon",
        LEA: "Lea",
        LIVI: "Livia",
        LUDV: "Ludvig",
        MAJ: "Maj",
        NICH: "Nicholas",
        OSCA: "Oscar",
        OSKA: "Oskar",
        SVEA: "Svea",
    },
    templates: {
        MA: {
            name: "MA",
            teacher: "NTL",
            color: "black"
        },
        SO: {
            name: "SO",
            teacher: "OEN",
            color: "turquoise"
        },
        SV: {
            name: "SV",
            teacher: "CÖO",
            color: "yellow"
        },
        NO: {
            name: "NO",
            teacher: "EHM",
            color: "green"
        },
        EN: {
            name: "EN",
            teacher: "OEN",
            color: "purple"
        }
    },
    exeptions: [
        {
            name: "Studiedag",
            date: new Date("2022-01-10")
        },
        {
            name: "Sportlov",
            week: 9
        },
        {
            name: "Påsklov",
            week: 15
        },
        {
            name: "Kristi himmelsfärds",
            date: new Date("2022-05-27")
        },
        {
            name: "Skolavslutning",
            date: new Date("2022-06-10")
        }
    ],
    days: [
        {
            name: "Måndag",
            subjects: [
                {
                    template: "MA",
                    pupils: [ "LUDV", "ANGO", "JAKO", "LEA", "NICH", "OSCA" ],
                    begin: 510,
                    length: 60
                },
                {
                    template: "SO",
                    pupils: [ "LUDV", "ANGO", "LEA", "LIVI", "MAJ", "OSCA" ],
                    begin: 575,
                    length: 70
                },
                {
                    template: "SV",
                    pupils: [ "LUDV", "ANGO", "LEA", "MAJ", "OSCA" ],
                    begin: 650,
                    length: 70
                },
                {
                    template: "NO",
                    pupils: [ "LUDV", "ANGO", "LEA", "NICH" ],
                    begin: 765,
                    length: 60
                },
            ]
        },
        {
            name: "Tisdag",
            subjects: [
                {
                    template: "MA",
                    pupils: [ "LUDV", "ANGO", "JAKO", "LEA", "LIVI", "NICH", "OSCA" ],
                    begin: 510,
                    length: 60
                },
                {
                    template: "SV",
                    pupils: [ "LUDV", "ANGO", "JAKO", "MAJ" ],
                    begin: 575,
                    length: 35
                },
                {
                    template: "EN",
                    pupils: [ "LUDV", "ANGO", "LEA", "LIVI", "NICH", "MAJ", "OSCA" ],
                    begin: 635,
                    length: 70
                },
                {
                    template: "SO",
                    pupils: [ "LUDV", "ANGO", "LEA", "NICH"],
                    begin: 765,
                    length: 60
                },
            ]
        },
        {
            name: "Onsdag",
            subjects: [
                {
                    template: "MA",
                    pupils: [ "LUDV", "ANGO", "JIM", "LEA", "NICH", "OSCA", "OSKA" ],
                    begin: 510,
                    length: 60
                },
                {
                    template: "SO",
                    teacher: [ "OEN", "JGH"],
                    pupils: [ "LUDV", "ANGO", "LEA", "MAJ", "NICH", "OSCA" ],
                    begin: 580,
                    length: 60
                },
                {
                    template: "SV",
                    pupils: [ "LUDV", "ANGO", "LEA", "MAJ", "NICH", "OSCA", "OSKA" ],
                    begin: 645,
                    length: 75
                },
                {
                    template: "EN",
                    name: "EN",
                    teacher: "CÖO",
                    pupils: [ "LUDV", "ANGO" ],
                    begin: 785,
                    length: 60
                },
            ]
        },
        {
            name: "Torsdag",
            subjects: [
                {
                    template: "EN",
                    pupils: [ "LUDV", "ANGO", "JIM", "LEA", "NICH", "OSKA", "OSCA" ],
                    begin: 510,
                    length: 60
                },
                {
                    template: "SV",
                    teacher: "URL",
                    pupils: [ "LUDV", "ANGO", "JIM", "LEA", "MAJ", "NICH", "OSKA", "OSCA" ],
                    begin: 580,
                    length: 35
                },
                {
                    template: "SV",
                    teacher: [ "CÖO", "URL" ],
                    pupils: [ "LUDV", "ANGO", "JIM", "LEA", "LIVI", "MAJ", "NICH", "OSKA", "OSCA" ],
                    begin: 620,
                    length: 90
                },
                {
                    template: "NO",
                    pupils: [ "LUDV", "ANGO", "LEA", "MAJ", "NICH" ], // ? remove MAJ
                    begin: 765,
                    length: 60
                }
            ]
        },
        {
            name: "Fredag",
            subjects: [
                {
                    template: "SO",
                    teacher: [ "OEN", "JGH" ],
                    pupils: [ "LUDV", "JAKO", "LEA" ],
                    begin: 510,
                    length: 40
                },
                {
                    template: "NO",
                    pupils: [ "LUDV", "LEA", "MAJ" ], // ? remove MAJ
                    begin: 560,
                    length: 80
                },
                {
                    name: "Träslöjd",
                    teacher: "JON",
                    pupils: [ "LUDV", "ANGO", "KEIL", "NICH" ],
                    color: "orange",
                    begin: 660,
                    length: 60
                },
                {
                    template: "SV",
                    teacher: "URL",
                    pupils: [ "LUDV", "ANGO", "NICH" ],
                    begin: 765,
                    length: 60
                },
                {
                    template: "MA",
                    pupils: [ "LEA", "LIVI", "MAJ", "NICH" ],
                    begin: 765,
                    length: 60
                }
            ]
        }
    ]
}