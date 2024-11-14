const elements = {
  slider: document.querySelector('.slider'),
  prev: document.getElementById ('prev'),
  next: document.getElementById ('next'),
};

const state = {
  users: [
    {
        "name": "Mr Kirk Palmer",
        "email": "kirk.palmer@example.com",
        "photo": {
            "large": "https://randomuser.me/api/portraits/men/71.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/71.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/71.jpg"
        },
        "id": 0
    },
    {
        "name": "Miss Nájela Duarte",
        "email": "najela.duarte@example.com",
        "photo": {
            "large": "https://randomuser.me/api/portraits/women/46.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/46.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/46.jpg"
        },
        "id": 1
    },
    {
        "name": "Mrs Patricia Rojas",
        "email": "patricia.rojas@example.com",
        "photo": {
            "large": "https://randomuser.me/api/portraits/women/75.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/75.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/75.jpg"
        },
        "id": 2
    },
    {
        "name": "Mr Logan Ennis",
        "email": "logan.ennis@example.com",
        "photo": {
            "large": "https://randomuser.me/api/portraits/men/90.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/90.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/90.jpg"
        },
        "id": 3
    },
    {
        "name": "Mr Emiliano Esquivel",
        "email": "emiliano.esquivel@example.com",
        "photo": {
            "large": "https://randomuser.me/api/portraits/men/86.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/86.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/86.jpg"
        },
        "id": 4
    },
  ],
  activeIndex: 0,
};

const renderImages = () => {
  const photosElements = state.users.map(({id, photo: { large }}) => {
    const img = document.createElement('img');
    img.setAttribute('src', large)
    img.classList.add('image');
    img.classList.remove('active');

    if (state.activeIndex === id) {
      img.classList.add('active');
    }
    
    elements.slider.append(img);
    return img;
  });

  elements.slider.replaceChildren(...photosElements);
};

const getPrevImage = () => {
  const user = state.users.find(({id}) => id === state.activeIndex - 1);
  const lastUser = state.users[state.users.length - 1];

  user ? state.activeIndex -= 1 : state.activeIndex = lastUser.id;

  renderImages();
};

const getNextImage = () => {
  const user = state.users.find(({id}) => id === state.activeIndex + 1);
  const [firstUser] = state.users;

  user ? state.activeIndex += 1 : state.activeIndex = firstUser.id;

  renderImages();
};

let timerId;

const resetTimer = () => {
  clearInterval(timerId);
  timerId = setInterval(getNextImage, 3000);
};

const slider = () => {
  renderImages();

  timerId = setInterval(getNextImage, 3000);

  elements.prev.addEventListener('click', () => {
    getPrevImage();
    resetTimer();
  });

  elements.next.addEventListener('click', () => {
    getNextImage();
    resetTimer();
  });
};

export default slider;