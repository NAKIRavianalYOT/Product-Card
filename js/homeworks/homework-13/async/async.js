let users = undefined;
 
const userCardTemp = document.getElementById('user-card-template');
const containerData = document.getElementById('container-data');
const containerUsers = document.getElementById('container-users');
const userList = document.getElementById('user-list');
const deleteAllButton = document.getElementById('delete-button-all');
const addAllButton = document.getElementById('add-button-all');

const changeOfClasses = (value, add, close) => {
  value.classList.add(add);
  value.classList.remove(close);
}

async function initUsers() {
  const savedUsers = localStorage.getItem("users");

  if(savedUsers) {
    users = JSON.parse(savedUsers);
    renderUsers(users);
    return;
  } else {
    await new Promise(resolve => {
      setTimeout(resolve, 3000)
    })
    .catch(error => {
      console.log("Ошибка при отправке данных на LS", error);
    })

    const response = await fetch("./users.json");
    users = await response.json();
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers(users);
  }
}

const renderUsers = users => {
  userList.innerHTML = "";
  changeOfClasses(containerData, "close-data__loading", "show-data__loading");
  changeOfClasses(containerUsers, "show-container__users", "close-container__users");
  
  users.forEach(user => {
    const userClone = userCardTemp.content.cloneNode(true);
    userClone.querySelector('.avatar-user').src = `/image/avatars/${ user.avatar }.jpg`;
    userClone.querySelector('.avatar-user').alt = 'Аватарка пользователя';
    userClone.querySelector('.authentication-info').textContent = `ID: ${ user.id }`;
    userClone.querySelector('.name-info').textContent = `Имя: ${ user.name }`;
    userClone.querySelector('.surname-info').textContent = `Фамилия: ${ user.surname }`;
    userClone.querySelector('.email-info').textContent = `Почта: ${ user.email }`;
    userClone.querySelector('.city-info').textContent = `Город: ${ user.city }`;
    userClone.querySelector('.profession-info').textContent = `Профессия: ${ user.profession }`;
    userClone.querySelector('.button-delete').textContent = 'Удалить';
    
    const deleteBtn = userClone.querySelector('.button-delete');
    deleteBtn.dataset.id = user.id;
    userList.appendChild(userClone);
  });
}

deleteAllButton.addEventListener("click", () => {
  localStorage.removeItem("users");
  userList.innerHTML = 'Список пользователей пустой';
});

addAllButton.addEventListener("click", async () => {
  const response = await fetch("./users.json");
  users = await response.json();
  const saved = localStorage.getItem("users");
  const savedUsers = saved ? JSON.parse(saved) : [];

	if (savedUsers.length !== users.length) {
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers(users);
  } else {
    alert("Все пользователи уже отображены!");
  }
});

userList.addEventListener("click", event => {
  if (event.target.classList.contains("button-delete")) {
    const userId = +event.target.dataset.id;
    users = users.filter(user => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers(users);
  } else {
    return;
  }
});

initUsers();