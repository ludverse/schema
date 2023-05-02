
const schedule = {
    version: 1.1,
    label: "Ludvig 8D",
    revision: "vt23.2.2",
    begin: 510,
    end: 900,
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
        MLM: "Magnus",
        CÖO: "Cecilia",
        JON: "Jonas",
        EHM: "Ebistam",
        LEN: "Lotta",
        NTL: "Niklas",
        ARL: "Annika RTX",
        ASG: "Ayla",
        RIK: "Rikard"
    },
    pupils: {
        ANGO: "Andre",
        ELBO: "Ella",
        ESOR: "Ester",
        HEFE: "Henning EXE",
        JAKO: "Jakob", // !
        JIM: "Jim", // !
        KEGO: "Keilon",
        LESK: "Lea",
        LIWE: "Livia",
        LUHE: "Ludvig",
        MAMO: "Maj",
        NIGE: "Nicholas",
        OSHE: "Oscar",
        OSWU: "Oskar",
        STIN: "Stina", // !
    },
    templates: {
        SO: {
            name: "SO",
            teacher: "MLM",
            color: "turquoise"
        },
        SV: {
            name: "SV",
            teacher: "LEN",
            color: "yellow"
        },
        NO: {
            name: "NO",
            teacher: "EHM",
            color: "green"
        },
        MA: {
            name: "MA",
            teacher: "NTL",
            color: "black"
        },
        EN: {
            name: "EN",
            teacher: "CÖO",
            color: "purple"
        }
    },
    exeptions: [
        {
            name: "Skolstart",
            date: new Date("2022-08-18")
        },
        {
            name: "Schemabryt",
            date: new Date("2022-10-24")
        },
        {
            name: "Höstlov",
            week: 44,
        },
        {
            name: "Schemabryt",
            date: new Date("2022-11-16")
        },
        {
            name: "Schemabryt",
            date: new Date("2022-12-01")
        },
        {
            name: "Julavslutning",
            date: new Date("2022-12-22")
        }
    ],
    days: [
        {
            name: "Måndag",
            subjects: [
                {
                    template: "SO",
                    pupils: [ "LUHE", "LESK", "LIWE", "ESOR", "MAMO", "ANGO" ],
                    begin: 510,
                    length: 60
                },
                {
                    template: "SV",
                    teacher: "CÖO",
                    pupils: [ "LUHE", "ELBO", "MAMO", "ANGO", "HEFE" ],
                    begin: 580,
                    length: 20
                },
                {
                    name: "Slöjd",
                    teacher: "JON",
                    color: "orange",
                    pupils: [ "LUHE", "ANGO", "HEFE" ],
                    begin: 610,
                    length: 65
                },
                {
                    template: "SO",
                    teacher: "CÖO",
                    pupils: [ "LUHE" ],
                    begin: 690,
                    length: 30
                },
                {
                    template: "NO",
                    pupils: [ "LUHE", "LESK", "ESOR", "MAMO", "HEFE", "ANGO", "NIGE", "LIWE" ],
                    begin: 760,
                    length: 50
                },
                {
                    template: "SV",
                    pupils: [ "LUHE", "MAMO", "LESK", "JAKO", "HEFE" ],
                    begin: 815,
                    length: 65
                },
            ]
        },
        {
            name: "Tisdag",
            subjects: [
                {
                    template: "MA",
                    pupils: [ "LUHE", "MAMO", "LIWE", "ESOR", "LESK", "OSWU", "ANGO" ],
                    begin: 510,
                    length: 60
                },
                {
                    template: "EN",
                    pupils: [ "LUHE", "LIWE", "ELBO", "ESOR", "MAMO", "LESK", "OSWU", "ANGO" ],
                    begin: 580,
                    length: 55
                },
                {
                    name: "Hemkunskap",
                    teacher: "ARL",
                    color: "orange",
                    pupils: [ "LUHE", "ELBO", "MAMO", "LIWE", "LESK", "ANGO", "ESOR" ],
                    begin: 650,
                    length: 60
                },
                {
                    template: "SV",
                    pupils: [ "LUHE", "LIWE", "LESK", "MAMO", "ESOR", "ELBO", "JAKO", "ANGO", "HEFE" ],
                    begin: 760,
                    length: 45
                },
            ]
        },
        {
            name: "Onsdag",
            subjects: [
                {
                    template: "NO",
                    pupils: [ "LUHE", "ANGO", "MAMO", "LESK", "ESOR", "NIGE", "STIN", "LIWE", "ELBO" ], // ? HENI
                    begin: 510,
                    length: 50
                },
                {
                    template: "SO",
                    pupils: [ "LUHE", "HEFE", "STIN", "MAMO", "ANGO", "NIGE", "LIWE", "ESOR" ],
                    begin: 580,
                    length: 70
                },
                {
                    template: "MA",
                    pupils: [ "LUHE", "HEFE", "MAMO", "ANGO", "NIGE", "LIWE", "ESOR", "JAKO", "HEFE" ],
                    begin: 660,
                    length: 60
                },
                {
                    template: "SV",
                    teacher: "LEN",
                    pupils: [ "LUHE", "ESOR" ],
                    begin: 760,
                    length: 50
                },
            ]
        },
        {
            name: "Torsdag",
            subjects: [
                {
                    template: "SV",
                    pupils: [ "LUHE", "ESOR", "HEFE", "LIWE", "LESK", "STIN", "ANGO", "MAMO", "ELBO" ],
                    begin: 510,
                    length: 50
                },
                {
                    template: "MA",
                    pupils: [ "LUHE", "ESOR", "HEFE", "LIWE", "LESK", "MAMO", "ELBO", "NIGE" ],
                    begin: 570,
                    length: 60
                },
                {
                    template: "SV",
                    teacher: "CÖO",
                    pupils: [ "LUHE", "ESOR", "HEFE", "MAMO", "ELBO", "NIGE" ],
                    begin: 640,
                    length: 20
                },
                {
                    template: "NO",
                    pupils: [ "LUHE", "ESOR", "HEFE", "LIWE", "LESK", "MAMO", "ELBO", "NIGE" ],
                    begin: 670,
                    length: 60
                },
                {
                    name: "Bild",
                    teacher: "RIK",
                    color: "dblue",
                    pupils: [ "LIWE", "LESK", "ESOR", "MAMO", "ELBO" ],
                    begin: 760,
                    length: 70
                },
                {
                    name: "Mentorstid",
                    teacher: "CÖO",
                    color: "gray",
                    pupils: [ "LUHE", "ESOR", "ANGO", "ELBO", "OSWU", "LESK" ], // ? OSWU
                    begin: 840,
                    length: 40
                },
            ]
        },
        {
            name: "Fredag",
            subjects: [
                {
                    template: "NO",
                    pupils: [ "LUHE", "MAMO", "ELBO", "ESOR", "HEFE", "LESK", "ANGO", "JAKO", "JIM" ],
                    begin: 510,
                    length: 60
                },
                {
                    template: "EN",
                    pupils: [ "LUHE", "MAMO", "ELBO", "LESK", "ANGO", "JAKO", "JIM", "HEFE" ], // ? ESOR
                    begin: 580,
                    length: 30
                },
                {
                    template: "SV",
                    teacher: "CÖO",
                    pupils: [ "LUHE", "ANGO", "JAKO" ],
                    begin: 620,
                    length: 70
                },
                {
                    template: "EN",
                    pupils: [ "LUHE", "MAMO", "LESK", "ELBO", "ANGO" ],
                    begin: 700,
                    length: 30
                },
                {
                    template: "MA",
                    pupils: [ "LUHE", "LESK", "ANGO", "MAMO", "ELBO", "OSWU" ],
                    begin: 770,
                    length: 65
                },
                {
                    template: "SO",
                    pupils: [ "LUHE", "LESK", "ANGO", "MAMO", "ELBO" ],
                    begin: 840,
                    length: 40
                },
            ]
        }
    ]
}