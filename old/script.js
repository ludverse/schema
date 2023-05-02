
const humanTime = time => {
    return `${ Math.floor(time / 60) }:${ (time % 60).toString().padStart(2, "0") }`;
}

const humanDate = date => {
    const dayNames = [ "sön", "mån", "tis", "ons", "tors", "fre", "lör" ]
    const monthNames = [ "jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ];
    return `${ dayNames[date.getDay()] } ${ date.getDate() } ${ monthNames[date.getMonth()] }`;
}

const dateToTime = date => date.getHours() * 60 + date.getMinutes()

const App = Vue.createApp({
    template: `
        <main>
            <Modal :subject="subject" v-if="subject" @close="closeSubjectPopup" />
            <h1 class="title">Schema</h1>
            <div class="label">
                <span class="print-label">{{ schedule.label }}</span>
                <span class="revision">rev: {{ schedule.revision }}</span>
            </div>
            <button href="javascript:void(0);" class="print-button" @click="print">
                <i class="fa-solid fa-print"></i>
                Skriv ut
            </button>
            <ScheduleComponent @subjectPopup="showSubjectPopup" id="schedule" />
            <SchemaExeptions :exeptions="schedule.exeptions" />
        </main>
    `,
    data() {
        return {
            schedule,
            subject: null
        }
    },
    mounted() {
        window.addEventListener("keydown", e => {
            console.log(e.key)
            if (e.key == "Escape") {
                this.closeSubjectPopup();
            }
        });
    },
    methods: {
        print() {
            print();
        },
        showSubjectPopup(subject) {
            this.subject = subject;
        },
        closeSubjectPopup() {
            this.subject = null;
        }
    }
});

const Modal = App.component("Modal", {
    template: `
        <div class="modal">
            <button class="modal-close" @click="$emit('close')"><i class="fa-solid fa-xmark"></i></button>
            <div class="modal-top">
                <span class="modal-name">{{ template.name }}</span>
                <span class="modal-times">{{ humanTime(template.begin) }} - {{ humanTime(template.begin + template.length) }}</span>
            </div>
            <div class="modal-prop">
                <i class="modal-prop-icon fa-solid fa-chalkboard-user"></i>
                {{ (template.teacher instanceof Array ? template.teacher : [template.teacher]).map(a => schedule.teachers[a]).join(", ") }}
            </div>
            <div class="modal-prop" v-if="template.pupils">
                <i class="modal-prop-icon fa-solid fa-users"></i>
                {{ template.pupils.sort().map(a => schedule.pupils[a]).join(", ") }}
            </div>
        </div>
    `,
    data() {
        return {
            schedule,
            template: null
        }
    },
    beforeMount() {
        this.template = Object.assign(Object.create(schedule.templates[this.subject.template] || {}), this.subject);
    },
    methods: {
        humanTime
    },
    watch: {
        subject(a) {
            this.template = Object.assign(Object.create(schedule.templates[a.template] || {}), a);
        }
    },
    props: [ "subject"],
    emits: [ "close" ]
});

const ScheduleComponent = App.component("ScheduleComponent", {
    template: `
        <div class="schedule" :style="{'height': (schedule.end - schedule.begin) * scheduleScale + 16 + 'px'}">
            <ScheduleColumn v-for="(day, i) in schedule.days" :day="day" :i="i" @subjectPopup="a => $emit('subjectPopup', a)" />
        </div>
    `,
    data() {
        return {
            schedule
        }
    },
    emits: [ "subjectPopup" ]
});

ScheduleComponent.component("ScheduleColumn", {
    template: `
        <div class="schedule-col">
            <Subject v-for="subject in day.subjects" :subject="subject" :divide="getInterfearData(subject).divide" :position="getInterfearData(subject).position" @subjectPopup="a => $emit('subjectPopup', a)" />
            <NowCursor v-if="today - 1 == i && now > schedule.begin && now < schedule.end" />
        </div>
    `,
    data() {
        return {
            schedule,
            today: (new Date().getDay()),
            now: (dateToTime(new Date()))
        }
    },
    mounted() {
        setInterval(() => this.today = (new Date().getDay()), 60000);
    },
    methods: {
        getInterfearData(subject) {
            const end = subject.begin + subject.length;
            const subjectI = this.day.subjects.indexOf(subject);
            const interfearing = this.day.subjects.map((a, i) => {
                const aEnd = a.begin + a.length;
                if (subjectI != i) {
                    if ((subject.begin <= aEnd) && (end >= a.begin)) {
                        return { index: i, subject: a }
                    }
                }
            }).filter(a => a);

            const position = interfearing.reduce((a, b) => b.index < subjectI ? a + 1 : a, 1);

            return { divide: interfearing.length + 1, position: position };
        }
    },
    props: [ "day", "i" ],
    emits: [ "subjectPopup" ]
});

ScheduleComponent.component("Subject", {
    template: `
        <div class="subject-container">
            <div class="schedule-row subject" @click="showSubjectPopup" :style="{'--background': schedule.colors[template(subject).color], '--divide': divide || 1, '--position': position || 1, 'top': (subject.begin - schedule.begin) * scheduleScale - 1 + 'px', '--height': subject.length * scheduleScale + 'px'}">
                <span class="subject-name">{{ template(subject).name }}</span>
                <span class="subject-times">{{ humanTime(subject.begin) }} - {{ humanTime(subject.begin + subject.length) }}</span>
                <span class="subject-teacher">{{ (template(subject).teacher instanceof Array ? template(subject).teacher : [template(subject).teacher]).map(a => schedule.teachers[a]).join(", ") }}</span>
            </div>
        </div>
    `,
    data() {
        return {
            schedule
        }
    },
    methods: {
        humanTime,
        showSubjectPopup() {
            this.$emit("subjectPopup", this.subject);
        },
        template(subject) {
            return Object.assign(Object.create(schedule.templates[subject.template] || {}), subject);
        }
    },
    props: [ "subject", "divide", "position" ],
    emits: [ "subjectPopup" ]
});

const SchemaExeptions = ScheduleComponent.component("SchemaExeptions", {
    template: `
        <div class="exeptions-container">
            <Exeption :exeption="exeption" v-for="exeption in exeptions">{{ exeption.name }}</Exeption>
        </div>
    `,
    props: [ "exeptions" ]
});

ScheduleComponent.component("NowCursor", {
    template: `
        <div class="subject-container">
            <span class="schedule-now" :style="{top: (now - schedule.begin) * scheduleScale + 'px'}"></span>
        </div>
    `,
    data() {
        return {
            schedule,
            now: (new Date().getHours() * 60 + new Date().getMinutes()),
        }
    },
    mounted() {
        setInterval(() => this.now = (new Date().getHours() * 60 + new Date().getMinutes()), 1000);
    }
});

SchemaExeptions.component("Exeption", {
    template: `
        <div class="exeption">
            <p class="exeption-text">
                <slot />
                <span class="exeption-date" v-if="exeption.week">
                    -
                    v.
                    {{ exeption.week }}
                </span>
                <span class="exeption-date" v-else-if="exeption.date">
                    -
                    {{ humanDate(exeption.date) }}
                </span>
                <span class="exeption-date" v-else-if="exeption.start && exeption.end">
                    -
                    {{ humanDate(exeption.start) }}
                    -
                    {{ humanDate(exeption.end) }}
                </span>
            </p>
        </div>
    `,
    methods: {
        humanTime,
        humanDate,
        dateToTime
    },
    props: [ "exeption" ]
});

App.mount("#root");