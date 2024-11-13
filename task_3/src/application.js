import { getUniqueId } from "./utils/utils.js";

const state = {
  status: 'idle', // 'loading', 'error', 'success'
  users: [],
};

const elements = {
  container: document.querySelector('.container'),
  btnLoad: document.getElementById('btnLoad'),
  list: document.getElementById('list'),
};

const fetchRandomUsers = async () => {
  const arrayOfUrls = [];

  for (let i = 0; i < 10; i += 1) {
    arrayOfUrls.push('https://randomuser.me/api/');
  }

  const arrayOfPromises = arrayOfUrls.map(async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    const { 
      name: { title, first, last },
      email,
      picture: { large, medium, thumbnail } 
    } = data.results[0];
    const firstName = [title, first, last].join(' ');

    return { name: firstName, email, photo: { large, medium, thumbnail }, id: getUniqueId() };
  });

  const result = await Promise.all(arrayOfPromises).finally();
  return result;
}

const loadHandler = () => {
  const p = document.createElement('p');
  p.id = 'feedback';
  const textNode = document.createTextNode('Загрузка...');
  p.append(textNode);
  elements.container.append(p);
  return p;
}

const renderUsers = (state, elements) => {
  const feedback = document.getElementById('feedback');
  feedback.remove();

  return state.users.map(({ name, email, photo, id}) => {
    const liEl = document.createElement('li');
    const pContainer = document.createElement('div');
    const pName = document.createElement('p');
    const pEmail = document.createElement('p');
    const nameTextNode = document.createTextNode(`${name}`);
    const emailTextNode = document.createTextNode(`${email}`);
    const img = document.createElement('img');

    liEl.append(pContainer);
    liEl.classList.add('list-item');
    liEl.id = id;

    pName.append(nameTextNode);
    pContainer.append(pName)

    pEmail.append(emailTextNode);
    pContainer.append(pEmail);

    img.src = photo.thumbnail;
    liEl.append(img);

    elements.list.append(liEl);
  });
};

const renderError = () => {
  const feedback = document.getElementById('feedback');
  console.log('feedback: ', feedback);
  feedback.textContent = 'Не удалось загрузить пользователей';
  return feedback;
};

const render = (state, elements) => {
  switch(state.status) {
    case 'loading':
      loadHandler();
      break;
    case 'success':
      renderUsers(state, elements);
      
      break;
    case 'error':
      renderError();
      break;
      case 'idle':
        console.log('Начальное состояние');
        break;
      default:
        console.log(`state.status: ${state.status}. Что-то не так!`);
    }

//   return state.users.map((user) => {
//     
//   });
};
  
const app = async () => {
  // const result = await fetchRandomUsers();
  // console.log('result: ', result);
  
  elements.btnLoad.addEventListener('click', async () => {
    state.status = 'loading';
    render(state, elements);
    
    console.log(state);
    try {
      const result = await fetchRandomUsers();
      state.status = 'success';
      state.users = result;
    } catch(err) {
      state.status = 'error';
      console.log('Не удалось загрузить пользователей');
      throw new Error(err);
    }

    console.log(state);
    render(state, elements);
  });

  console.log(state);
  render(state, elements);
};

export default app;