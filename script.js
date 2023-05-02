
const VERSION = 3;
import { createApp } from "./petite-vue.module.js";

createApp({
    $template: "root",
    modal: null,
    modalType: null,
    modalInput: null,
    schedule,
    scheduleScale: 2,
    tags: [ ],
    today: (new Date().getDay()),
    now: (new Date().getHours() * 60 + new Date().getMinutes()),
    tagPlaceholder: NaN,
    loaded: false,
    warning: "",

    humanTime: (time, padHours = false) => {
        return `${ Math.floor(time % 1440 / 60).toString().padStart(padHours + 1, "0") }:${ (time % 1440 % 60).toString().padStart(2, "0") }`;
    },
    humanDate: date => {
        const dayNames = [ "sön", "mån", "tis", "ons", "tors", "fre", "lör" ]
        const monthNames = [ "jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ];
        return `${ dayNames[date.getDay()] } ${ date.getDate() } ${ monthNames[date.getMonth()] }.`;
    },
    scheduleTime: (time, day) => {
        const split = time.split(":");
        return split[0] * 60 + Number(split[1]) + day * 1440;
    },
    dateToTime: date => date.getHours() * 60 + date.getMinutes(),
    template(subject) {
        if (subject.template) {
            return { ...this.schedule.templates.find(template => template.id == subject.template), ...subject };
        } else {
            return subject;
        }
    },
    uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    getInterfearData(subject) {
        const end = subject.begin + subject.length;
        const interfearing = this.schedule.subjects.map((obj, i) => {
            const aEnd = obj.begin + obj.length;
            if (subject.id == obj.id) return;
            if ((subject.begin <= aEnd) && (end >= obj.begin)) {
                return { i, subject: obj }
            }
        }).filter(a => a);

        const subjectI = this.schedule.subjects.indexOf(subject);
        const position = interfearing.reduce((a, b) => b.i < subjectI ? a + 1 : a, 1);

        return { divide: interfearing.length + 1, position: position };
    },

    showModal(type, content) {
        const split = type.split(":");
        this.modalType = split.splice(0, 1);
        this.modalArgs = split;
        this.modal = content;
    },

    closeModal() {
        this.modalType = null;
    },

    eventYToScheduleTime(y) {
        return Math.round((y + this.schedule.begin) / this.scheduleScale + 182);
    },

    tagInputModal(day, e) {
        this.modalInput = { time: this.humanTime(this.eventYToScheduleTime(e.clientY + window.scrollY), true), label: "" }
        this.showModal("input:tag", { done: this.createTag.bind(this, day) });
    },

    createTag(dayI) {
        if (!this.modalInput.label) return;

        const time = this.scheduleTime(this.modalInput.time, dayI);
        if (time < this.schedule.begin + 1440 * dayI || time > this.schedule.end + 1440 * dayI) return;
        
        this.closeModal();
        
        this.tags.push({
            id: this.uuid(),
            label: this.modalInput.label,
            time
        });

        localStorage.setItem("tags", JSON.stringify(this.tags));
    },
    
    removeTag(tagId) {
        const tagI = this.tags.findIndex(tag => tag.id == tagId);
        this.tags.splice(tagI, 1);
        
        localStorage.setItem("tags", JSON.stringify(this.tags));
        
        this.closeModal();
    },

    print() {
        print();
    },

    mounted() {
        
        this.tagPlaceholder = NaN;
        window.addEventListener("keydown", e => {
            if (e.key == "Escape") {
                this.closeModal();
            }
        });

        window.addEventListener("keyup", e => {
            if (e.key == "Control") {
                this.tagPlaceholder = NaN;
            }
        });
        window.addEventListener("mousemove", e => {
            if (e.ctrlKey && !this.modalType) {
                this.tagPlaceholder = this.eventYToScheduleTime(e.clientY + window.scrollY);
            } else {
                this.tagPlaceholder = NaN;
            }
        });

        if (!this.schedule.version || this.schedule.version < VERSION) {
            console.warn("Old schedule version");
            this.warning = "Detta schema är gjort för en äldre version och vissa delar kan sluta fungera.";
        }

        setInterval(() => this.today = (new Date().getDay()), 60000);
        setInterval(() => this.now = (new Date().getHours() * 60 + new Date().getMinutes()), 1000);

        const d = new Date();
        if (!localStorage.getItem("tagsExpire") || localStorage.getItem("tagsExpire") < d.getTime()) {
            localStorage.setItem("tags", "[]");
            const midnight = new Date(d.getTime());
            midnight.setHours(0, 0, 0, 0);
            const nextExpire = new Date(midnight.setDate(midnight.getDate() + ((7 - midnight.getDay() + 1) % 7 || 7)));
            localStorage.setItem("tagsExpire", nextExpire.getTime());
        } else {
            this.tags = JSON.parse(localStorage.getItem("tags"));
        }

        this.loaded = true;
    }
}).mount("#root");