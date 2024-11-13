import { getUniqueId } from "./utils/index.js";

const state = {
  tasks: [
    { name: 'Первая задача', id: getUniqueId(), isCompleted: true},
    { name: 'Вторая задача', id: getUniqueId(), isCompleted: false},
  ],
  filter: 'all',
};

const elements = {
  button: document.getElementById('add'),
  list: document.getElementById('list'),
  form: document.getElementById('form'),
  input: document.getElementById('input'),
  showActiveBtn: document.getElementById('showActiveBtn'),
  showCompletedBtn: document.getElementById('showCompletedBtn'),
  showAllBtn: document.getElementById('showAllBtn'),
};

const render = (state, {form, list, input}) => {
  form.reset();
  input.focus();

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'completed') return task.isCompleted;
    if (state.filter === 'active') return !task.isCompleted;
    return true; // for 'all';
  });

  const tasksElements = filteredTasks.map((task) => {
    const itemContainer = document.createElement('div');
    const liEl = document.createElement('li');
    const buttonEl = document.createElement('button');
    const textNodeButton = document.createTextNode('Удалить');
    const textNodeLi = document.createTextNode(`${task.name}`)

    liEl.append(textNodeLi);
    buttonEl.append(textNodeButton);

    itemContainer.append(liEl);
    itemContainer.append(buttonEl);
    itemContainer.style.display="flex";
    itemContainer.style.justifyContent="space-between"

    liEl.id = task.id;
    liEl.dataset.item = 'list-item';

    if (task.isCompleted) {
      liEl.classList.add('completed');
    } else {
      liEl.classList.remove('completed');
    }

    liEl.addEventListener('click', () => {
      const taskIndex = state.tasks.findIndex((t) => t.id === task.id)

      if (taskIndex !== -1) {
        state.tasks[taskIndex].isCompleted = !state.tasks[taskIndex].isCompleted
      }

      render(state, elements);
    });

    buttonEl.addEventListener('click', (e) => {
      e.stopPropagation(); // предотвращаем всплытие события
      state.tasks = state.tasks.filter((t) => t.id !== task.id);

      render(state, elements);
    });

    return itemContainer;
  });

  list.replaceChildren(...tasksElements);
};

const app = () => { 
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskName = formData.get('name');
  
    state.tasks.push({
      name: taskName, id: getUniqueId(), isCompleted: false
    });

    render(state, elements);
  });

  elements.showActiveBtn.addEventListener('click', () => {
    state.filter = 'active';

    render(state, elements);
  });

  elements.showCompletedBtn.addEventListener('click', () => {
    state.filter = 'completed';

    render(state, elements);
  });

  elements.showAllBtn.addEventListener('click', () => {
    state.filter = 'all';

    render(state, elements);
  });

  render(state, elements);
};

export default app;