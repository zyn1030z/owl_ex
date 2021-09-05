const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useStore, useState } = owl.hooks;

// -------------------------------------------------------------------------
// Store
// -------------------------------------------------------------------------
const actions = {
    addTask({ state }, title) {
        title = title.trim();
        if (title) {
            const task = {
                id: state.nextId++,
                title: title,
                isCompleted: false,
            };
            state.tasks.push(task);
        }
    },
    toggleTask({ state }, id) {
        const task = state.tasks.find((t) => t.id === id);
        task.isCompleted = !task.isCompleted;
    },
    deleteTask({ state }, id) {
        const index = state.tasks.findIndex((t) => t.id === id);
        state.tasks.splice(index, 1);
    },
};
const initialState = {
    nextId: 1,
    tasks: [],
};

// -------------------------------------------------------------------------
// Task Component
// -------------------------------------------------------------------------
const TASK_TEMPLATE = xml/* xml */ `
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="props.task.isCompleted"
                t-on-click="dispatch('toggleTask', props.task.id)"/>
        <span><t t-esc="props.task.title"/></span>
        <span class="delete" t-on-click="dispatch('deleteTask', props.task.id)">🗑</span>
    </div>`;

class Task extends Component {
    static template = TASK_TEMPLATE;
    static props = ["task"];
    dispatch = useDispatch();
}

// -------------------------------------------------------------------------
// App Component
// -------------------------------------------------------------------------
const APP_TEMPLATE = xml/* xml */ `
    <div class="todo-app">
        <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
        <div class="task-list">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
                <Task task="task"/>
            </t>
        </div>
        <div class="task-panel" t-if="tasks.length">
            <div class="task-counter">
                <t t-esc="displayedTasks.length"/>
                <t t-if="displayedTasks.length lt tasks.length">
                    / <t t-esc="tasks.length"/>
                </t>
                task(s)
            </div>
            <div>
                <span t-foreach="['all', 'active', 'completed']"
                    t-as="f" t-key="f"
                    t-att-class="{active: filter.value===f}"
                    t-on-click="setFilter(f)"
                    t-esc="f"/>
            </div>
        </div>
    </div>`;

class App extends Component {
    static template = APP_TEMPLATE;
    static components = { Task };

    inputRef = useRef("add-input");
    tasks = useStore((state) => state.tasks);
    dispatch = useDispatch();
    filter = useState({value:"all"})
    mounted() {
        this.inputRef.el.focus();
    }
    get displayedTasks() {
        switch (this.filter.value) {
            case "active": return this.tasks.filter(t => !t.isCompleted);
            case "completed": return this.tasks.filter(t => t.isCompleted);
            case "all": return this.tasks;
        }
    }
    setFilter(filter) {
        this.filter.value = filter;
    }
    addTask(ev) {
        // 13 is keycode for ENTER
        if (ev.keyCode === 13) {
            this.dispatch("addTask", ev.target.value);
            ev.target.value = "";
        }
    }
}
function makeStore() {
    const localState = window.localStorage.getItem("todoapp");
    const state = localState ? JSON.parse(localState) : initialState;
    const store = new Store({ state, actions });
    store.on("update", null, () => {
        localStorage.setItem("todoapp", JSON.stringify(store.state));
    });
    return store;
}
// -------------------------------------------------------------------------
// Setup code
// -------------------------------------------------------------------------
function setup() {
    owl.config.mode = "dev";
    const store = new Store({ actions, state: initialState });
    App.env.store = store;
    // mount(App, { target: document.body });
    App.env.localStorage = window.localStorage;
    const app = new App()
    const env = { store: makeStore() };
    console.log(env)
    app.mount(document.body, env)
}

whenReady(setup);
