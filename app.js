// (function () {
//     const { Component } = owl;
//     const { xml } = owl.tags;
//     const { whenReady } = owl.utils;
//
//     const { useRef, useSubEnv } = owl.hooks;
//
//     // -------------------------------------------------------------------------
//     // Model
//     // -------------------------------------------------------------------------
//     class TaskModel extends owl.core.EventBus {
//         nextId = 1
//         tasks = [];
//
//         constructor(tasks) {
//             super()
//             for (let task of tasks) {
//                 this.tasks.push(task);
//                 this.nextId = Math.max(this.nextId, task.id + 1);
//             }
//         }
//
//         addTask(title) {
//             const newTask = {
//                 id: this.nextId++,
//                 title: title,
//                 isCompleted: false,
//             };
//             this.tasks.unshift(newTask);
//             this.trigger('update');
//         }
//
//         toggleTask(id) {
//             const task = this.tasks.find(t => t.id === id);
//             task.isCompleted = !task.isCompleted;
//             this.tasks.sort(function (a,b) {
//                 if (a.isCompleted) {
//                     if (b.isCompleted) {
//                         a.title.localeCompare(b.title)
// 		    } else {
// 			return 1;
// 		    }
// 		} else {
//                     if (b.isCompleted) {
// 			return -1;
// 		    } else {
//                         a.title.localeCompare(b.title)
// 		    }
// 		}
// 	    });
//             this.trigger('update')
//         }
//
//         deleteTask(id) {
//             const index = this.tasks.findIndex(t => t.id === id);
//             this.tasks.splice(index, 1);
//             this.trigger('update');
//         }
//     }
//
//     class StoredTaskModel extends TaskModel {
//         constructor(storage) {
//             const tasks = storage.getItem("todoapp");
//             super(tasks ? JSON.parse(tasks) : []);
//             this.on('update', this, () => {
//                 storage.setItem("todoapp", JSON.stringify(this.tasks))
//             });
//         }
//     }
//
//     // -------------------------------------------------------------------------
//     // Task Component
//     // -------------------------------------------------------------------------
//     const TASK_TEMPLATE = xml /* xml */`
//       <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
//         <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="toggleTask"/>
//         <span><t t-esc="props.task.title"/></span>
//         <span class="delete" t-on-click="deleteTask">🗑</span>
//       </div>`;
//
//     class Task extends Component {
//         static template = TASK_TEMPLATE;
//
//         toggleTask() {
//             this.env.model.toggleTask(this.props.task.id);
//         }
//
//         deleteTask() {
//             this.env.model.deleteTask(this.props.task.id);
//         }
//     }
//
//     // -------------------------------------------------------------------------
//     // App Component
//     // -------------------------------------------------------------------------
//     const APP_TEMPLATE = xml /* xml */`
//     <div class="todo-app">
//     <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
//     <div class="task-list">
//           <t t-foreach="env.model.tasks" t-as="task" t-key="task.id">
//             <Task task="task"/>
//           </t>
//        </div>
//     </div>`;
//
//     class App extends Component {
//         static template = APP_TEMPLATE;
//         static components = { Task };
//
//         inputRef = useRef("add-input");
//
//         constructor() {
//             super();
//
//             const model = new StoredTaskModel(this.env.localStorage);
//             model.on('update', this, this.render);
//             useSubEnv({model});
//         }
//
//         mounted() {
//             this.inputRef.el.focus();
//         }
//
//         addTask(ev) {
//             // 13 is keycode for ENTER
//             if (ev.keyCode === 13) {
//                 const title = ev.target.value.trim();
//                 ev.target.value = "";
//                 if (title) {
//                     this.env.model.addTask(title);
//                 }
//             }
//         }
//
//     }
//
//     // Setup code
//     function setup() {
//       App.env.localStorage = window.localStorage;
//       const app = new App();
//       app.mount(document.body);
//     }
//
//     whenReady(setup);
// })();


// (function () {
//     const {Component, mount} = owl;
//     const {xml} = owl.tags;
//     const {whenReady} = owl.utils;
//     const { useRef } = owl.hooks;
//
//     const TASK_TEMPLATE = xml /* xml */`
//     <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
//         <input type="checkbox" t-att-checked="props.task.isCompleted"/>
//         <span><t t-esc="props.task.title"/></span>
//     </div>`;
//
//     class Task extends Component {
//         static template = TASK_TEMPLATE;
//         static props = ["task"];
//     }
//
//     const APP_TEMPLATE = xml /* xml */`
//     <div class="todo-app">
//         <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
//     <div class="task-list">
//         <t t-foreach="tasks" t-as="task" t-key="task.id">
//             <Task task="task"/>
//         </t>
//     </div>
//     </div>`;
//     class App extends Component {
//         static template = APP_TEMPLATE;
//         static components = { Task };
//         inputRef = useRef("add-input");
//
//         mounted() {
//             this.inputRef.el.focus();
//         }
//         nextId = 1;
//         tasks = [];
//         addTask(ev) {
//             // 13 is keycode for ENTER
//             if (ev.keyCode === 13) {
//                 const title = ev.target.value.trim();
//                 ev.target.value = "";
//                 if (title) {
//                     const newTask = {
//                         id: this.nextId++,
//                         title: title,
//                         isCompleted: false,
//                     };
//                     this.tasks.push(newTask);
//                 }
//             }
//         }
//         tasks = [
//             {
//                 id: 1,
//                 title: "buy milk",
//                 isCompleted: true,
//             },
//             {
//                 id: 2,
//                 title: "clean house",
//                 isCompleted: false,
//             },
//         ];
//     }
// // Setup code
//     function setup() {
//         App.env.localStorage = window.localStorage;
//         const app = new App();
//         inputRef = useRef("add-input");
//         app.mount(document.body);
//     }
//
//     whenReady(setup);
// })();


(function () {
    const {Component, mount} = owl;
    const {xml} = owl.tags;
    const {whenReady} = owl.utils;
    const {useRef,useState} = owl.hooks;

    const TASK_TEMPLATE = xml /* xml */`
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="props.task.isCompleted"
        t-on-click="toggleTask"/>
        <span><t t-esc="props.task.title"/></span>
        <span class="delete" t-on-click="deleteTask">🗑</span>
    </div>`;

    class Task extends Component {
        static template = TASK_TEMPLATE;
        static props = ["task"];
        toggleTask() {
            this.trigger('toggle-task', {id: this.props.task.id});
        }

        deleteTask() {
            this.trigger('delete-task', {id: this.props.task.id});
        }
    }

    // -------------------------------------------------------------------------
// App Component
// -------------------------------------------------------------------------
    const APP_TEMPLATE = xml /* xml */`
    <div class="todo-app">
        <input placeholder="Enter a new task" t-on-keyup="addTask"
        t-ref="add-input"/>
        <div class="task-list" t-on-toggle-task="toggleTask" t-on-delete-task="deleteTask">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
                <Task task="task"/>
            </t>
        </div>
    </div>`;

    class App extends Component {
        static template = APP_TEMPLATE;
        static components = {Task};

        inputRef = useRef("add-input");

        mounted() {
            this.inputRef.el.focus();
        }
        toggleTask(ev) {
            const task = this.tasks.find(t => t.id === ev.detail.id);
            task.isCompleted = !task.isCompleted;
        }
        nextId = 1;
        tasks = useState([]);
        addTask(ev) {
            // 13 is keycode for ENTER
            if (ev.keyCode === 13) {
                const title = ev.target.value.trim();
                ev.target.value = "";
                if (title) {
                    const newTask = {
                        id: this.nextId++,
                        title: title,
                        isCompleted: false,
                    };
                    this.tasks.push(newTask);
                }
            }
        }

        deleteTask(ev) {
            const index = this.tasks.findIndex(t => t.id === ev.detail.id);
            this.tasks.splice(index, 1);
        }
    }

// Setup code
    function setup() {
        App.env.localStorage = window.localStorage;
        const app = new App()
        app.mount(document.body)
    }

    whenReady(setup);


})();
