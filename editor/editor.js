
const VERSION = 3;
import * as vue from "../petite-vue.module.js";

const app = vue.createApp({
    $template: "root",
    modal: null,
    modalType: null,
    modalArgs: [],
    modalInput: null,
    schedule: {
        version: 3,
        label: "",
        revision: "vt23.0.0",
        begin: 510,
        end: 900,
        colors: {
            red: "#fc5c65",
            orange: "#fd9644",
            yellow: "#fed330",
            green: "#26de81",
            turquoise: "#2bcbba",
            aqua: "#45aaf2",
            blue: "#4b7bec",
            purple: "#a55eea",
            gray: "#a3a3a3",
            black: "#4b6584"
        },
        teachers: [
            {
                id: "69f250ea-30b0-4473-b8a9-808f24397572",
                name: "Magnus"
            },
            {
                id: "d8f11ce0-1780-4d19-a560-66e4ca155686",
                name: "Cecilia"
            },
            {
                id: "e6ecf60c-daa8-404a-85ec-3b63f6f2fe5d",
                name: "Jonas"
            },
            {
                id: "c60a5a04-f0b2-4d56-9c68-edc688d789d4",
                name: "Ebistam"
            },
            {
                id: "4aeaf7cd-79c2-4d4a-a7d0-bedde322a53d",
                name: "Lotta"
            },
            {
                id: "f08759ee-9758-4d6e-ade4-1cd2a11acd46",
                name: "Bitte"
            },
            {
                id: "6dcacab8-5b1d-4445-b005-8e8eaeb60b88",
                name: "Niklas"
            },
            {
                id: "4d4c0c6f-e298-45f8-8f7e-0ce476df31ba",
                name: "Annika RTX"
            },
            {
                id: "77432400-3891-4749-9073-e8cacdfc92e5",
                name: "Ayla"
            },
            {
                id: "e7e2f7b3-5965-496a-aa96-5963e7995b43",
                name: "Rikard"
            }
        ], 
        templates: [],
        exeptions: [],
        subjects: []
    },
    scheduleScale: 2,
    scheduleTeacherInput: "",
    createPlaceholder: NaN,
    loaded: false,
    warning: "",
    templateFilter: null,
    configType: null,

    humanTime: (time, padHours = false) => {
        return `${ Math.floor(time % 1440 / 60).toString().padStart(padHours + 1, "0") }:${ (time % 1440 % 60).toString().padStart(2, "0") }`;
    },
    humanDate: date => {
        const dayNames = [ "sön", "mån", "tis", "ons", "tors", "fre", "lör" ]
        const monthNames = [ "jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ];
        return `${ dayNames[date.getDay()] } ${ date.getDate() } ${ monthNames[date.getMonth()] }.`;
    },
    scheduleTime: (time, day = 0) => {
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
    arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
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

    subjectCreateModal(day, e) {
        const begin = Math.round(this.eventYToScheduleTime(e.clientY + window.scrollY) / 5) * 5;

        this.modalInput = {
            name: "",
            begin: this.humanTime(begin, true),
            end: this.humanTime(begin + 60, true),
            timeDifference: 60,
            teachers: [ "null" ],
            color: Object.keys(this.schedule.colors)[0],
            error: null
        }
        this.showModal("input:subject", {
            label: "Nytt ämne",
            done: this.createSubject.bind(this, day),
            error: null
        });
    },

    subjectEditModal(subjectId) {
        const subject = this.schedule.subjects.find(subject => subject.id == subjectId);

        this.modalInput = {
            template: subject.template,
            name: this.template(subject).name,
            begin: this.humanTime(subject.begin, true),
            end: this.humanTime(subject.begin + subject.length, true),
            timeDifference: subject.length,
            teachers: [ ...this.template(subject).teachers, "null" ],
            color: this.template(subject).color
        }

        this.showModal("input:subject", {
            label: "Redigera ämne",
            done: this.editSubject.bind(this, subjectId),
            error: null
        });
    },

    editSubjectTemplate() {
        if (this.modalInput.template == "null") return;
        const template = this.schedule.templates.find(template => template.id == this.modalInput.template);

        let teachers = [ ...template.teachers, "null" ];
        Object.assign(this.modalInput, { ...template, teachers });
    },

    editSubjectBeginTime() {
        if (!this.modalInput.begin) return;
        console.log(this.modalInput.begin, this.scheduleTime(this.modalInput.begin) + this.modalInput.timeDifference);
        this.modalInput.end = this.humanTime(this.scheduleTime(this.modalInput.begin) + this.modalInput.timeDifference, true);
    },

    editSubjectEndTime() {
        if (!this.modalInput.end) return;
        this.modalInput.timeDifference = this.scheduleTime(this.modalInput.end) - this.scheduleTime(this.modalInput.begin);
    },

    editSubjectTeacher(i) {
        if (this.modalInput.teachers[i] == "null") {
            this.modalInput.teachers.length = i + 1;
        } else {
            if (this.modalInput.teachers[this.modalInput.teachers.length - 1] == "null") return;
            this.modalInput.teachers.push("null");
        }
    },

    createSubject(dayI) {
        if (!this.modalInput.name) return this.modal.error = "Skriv in ett namn för ämnet";
        if (this.modalInput.teachers.length <= 1) return this.modal.error = "Skriv in minst 1 lärare";

        const begin = this.scheduleTime(this.modalInput.begin, dayI - 1);
        if (begin < this.schedule.begin + 1440 * (dayI - 1) || begin > this.schedule.end + 1440 * (dayI - 1)) return this.modal.error = "Startdatumet är utanför schemat";

        const length = this.scheduleTime(this.modalInput.end, dayI - 1) - begin;
        if (length < 0) return this.modal.error = "Slutdatumet är före startdatumet";

        this.closeModal();

        let data = {};
        const template = this.schedule.templates.find(template => template.id == this.modalInput.template);

        if (this.modalInput.template) data.template = this.modalInput.template;
        if (template?.name != this.modalInput.name) data.name = this.modalInput.name;
        const inputTeachers = this.modalInput.teachers.filter(a => a != "null");
        if (!this.arrayEquals(template?.teachers, inputTeachers)) data.teachers = inputTeachers;
        if (template?.color != this.modalInput.color) data.color = this.modalInput.color;

        this.schedule.subjects.push({
            id: this.uuid(),
            ...data,
            begin,
            length
        });
    },

    editSubject(subjectId) {
        const subjectI = this.schedule.subjects.findIndex(subject => subject.id == subjectId);
        const dayI = Math.floor(this.schedule.subjects[subjectI].begin / 1440) + 1;

        this.closeModal();
    
        const begin = this.scheduleTime(this.modalInput.begin, dayI - 1);
        if (begin < this.schedule.begin + 1440 * (dayI - 1) || begin > this.schedule.end + 1440 * (dayI - 1)) return;

        const length = this.scheduleTime(this.modalInput.end, dayI - 1) - begin;
        if (length < 0) return;

        let data = {};
        const template = this.schedule.templates.find(template => template.id == this.modalInput.template);

        if (this.modalInput.template) data.template = this.modalInput.template;
        if (template?.name != this.modalInput.name) data.name = this.modalInput.name;
        const inputTeachers = this.modalInput.teachers.filter(a => a != "null");
        if (!this.arrayEquals(template?.teachers, inputTeachers)) data.teachers = inputTeachers;
        if (template?.color != this.modalInput.color) data.color = this.modalInput.color;

        this.schedule.subjects[subjectI] = {
            id: subjectId,
            ...data,
            begin,
            length
        }
    },

    removeSubject(subjectId) {
        const subjectI = this.schedule.subjects.findIndex(subject => subject.id == subjectId);
        this.schedule.subjects.splice(subjectI, 1);

        this.closeModal();
    },

    eventYToScheduleTime(y) {
        return Math.round((y + this.schedule.begin) / this.scheduleScale + 171);
    },

    importModal() {
        this.modalInput = "";
        this.showModal("input:import", {
            label: "Importera schema",
            done: this.importSchedule,
            error: null
        });
    },

    importSchedule() {
        let backup = { ...this.schedule };
        try {
            const schedule = JSON.parse(this.modalInput.replace("const schedule = ", ""));
            this.schedule = schedule;

            this.closeModal();
        } catch {
            this.schedule = backup;
            this.modal.error = "Det gick inte att läsa in schemat";
        }
    },

    exportModal() {
        this.showModal('export');
        this.modal = `const schedule = ${ JSON.stringify(this.schedule) }`
    },

    copyExportFile() {
        let textarea = document.getElementById("export");
        textarea.select();
        document.execCommand("copy");
    },

    toggleConfig(type) {
        this.configType = this.configType == type ? null : type;
    },

    addTeacher() {
        this.schedule.teachers.push({
            id: this.uuid(),
            name: this.scheduleTeacherInput
        });
        this.scheduleTeacherInput = "";
    },

    removeTeacher(teacherId) {
        const i = this.schedule.teachers.findIndex(teacher => teacher.id == teacherId);
        this.schedule.teachers.splice(i, 1);

        this.schedule.subjecs.map(subject => {
            return subject.teachers.filter(teacher => teacher.id != teacherId)
        });
    },

    startTemplateFilter(id) {
        this.templateFilter = id;
    },

    endTemplateFilter(id) {
        this.templateFilter = null;
    },

    createTemplateModal() {
        this.modalInput = {
            name: "",
            teachers: [ "null" ],
            color: Object.keys(this.schedule.colors)[0]
        }

        this.showModal("input:template", {
            done: this.createTemplate,
            error: null
        });
    },

    editTemplateModal(templateId) {
        const template = this.schedule.templates.find(template => template.id == templateId);

        this.modalInput = {
            name: template.name,
            teachers: [ ...template.teachers, "null" ],
            color: template.color
        }

        this.showModal("input:template", {
            done: this.editTemplate.bind(this, template.id),
            error: null
        });
    },

    createTemplate() {
        this.closeModal();
        
        const inputTeachers = this.modalInput.teachers.filter(a => a != "null");

        this.schedule.templates.push({
            id: this.uuid(),
            name: this.modalInput.name,
            teachers: inputTeachers,
            color: this.modalInput.color
        });
    },

    editTemplate(templateId) {
        const templateI = this.schedule.templates.findIndex(template => template.id == templateId);

        this.closeModal();
        
        const inputTeachers = this.modalInput.teachers.filter(a => a != "null");

        this.schedule.templates[templateI] = {
            id: templateId,
            name: this.modalInput.name,
            teachers: inputTeachers,
            color: this.modalInput.color
        }
    },
    
    deleteTemplate(templateId) {
        this.schedule.subjects = this.schedule.subjects.filter(subject => subject.template != templateId);
        this.templateFilter = null;
        
        const templateI = this.schedule.templates.findIndex(template => template.id == templateId);
        this.schedule.templates.splice(templateI, 1);
        
        this.closeModal();
    },
    
    mounted() {
        
        this.createPlaceholder = NaN;
        window.addEventListener("keydown", e => {
            if (e.key == "Escape") {
                this.closeModal();
            } else if (e.key == "Enter") {
                document.getElementById("form").submit();
            }
        });

        window.addEventListener("keyup", e => {
            if (e.key == "Control") {
                this.createPlaceholder = NaN;
            }
        });
        window.addEventListener("mousemove", e => {
            if (e.ctrlKey && !this.modalType) {
                this.createPlaceholder = Math.round(this.eventYToScheduleTime(e.clientY + window.scrollY) / 5) * 5;
            } else {
                this.createPlaceholder = NaN;
            }
        });

        if (!this.schedule.version || this.schedule.version < VERSION) {
            console.warn("Old schedule version");
            this.warning = "Detta schema är gjort för en äldre version och vissa delar kan sluta fungera.";
        }

        this.loaded = true;
    }
}).mount("#root");
