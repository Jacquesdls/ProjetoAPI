const apiUrl = 'https://projetoapi-wz4g.onrender.com/api/auth';
let token = null;

// Selecionando elementos da DOM
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const userNameSpan = document.getElementById('userName');
const loadingDiv = document.getElementById('loading');
const errorMsgDiv = document.getElementById('errorMsg');
const usersListDiv = document.getElementById('usersList');
const listUsersBtn = document.getElementById('listUsersBtn');
const updateUserBtn = document.getElementById('updateUserBtn');
const deleteUserBtn = document.getElementById('deleteUserBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');

// Função para exibir mensagens
const showError = (msg) => {
    errorMsgDiv.textContent = msg;
    errorMsgDiv.style.display = 'block';
};

const showLoading = () => {
    loadingDiv.style.display = 'block';
};

const hideLoading = () => {
    loadingDiv.style.display = 'none';
};

// Função para ir para a tela de cadastro
registerBtn.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

// Função para login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        showLoading();
        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        hideLoading();

        if (res.ok) {
            token = data.token;
            userNameSpan.textContent = email;
            loginContainer.style.display = 'none';
            dashboardContainer.style.display = 'block';
        } else {
            showError(data.message || 'Erro ao fazer login');
        }
    } catch (err) {
        hideLoading();
        showError('Erro de rede. Tente novamente.');
    }
});

// Função para cadastro
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        showLoading();
        const res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        hideLoading();

        if (res.ok) {
            alert('Cadastro realizado com sucesso! Faça o login.');
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        } else {
            showError(data.message || 'Erro ao cadastrar');
        }
    } catch (err) {
        hideLoading();
        showError('Erro de rede. Tente novamente.');
    }
});

// Função para listar usuários
listUsersBtn.addEventListener('click', async () => {
    try {
        showLoading();
        const res = await fetch(`${apiUrl}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await res.json();
        hideLoading();

        if (res.ok) {
            usersListDiv.innerHTML = '';
            const users = data.users;
            const ul = document.createElement('ul');
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username} (${user.email})`;
                ul.appendChild(li);
            });
            usersListDiv.appendChild(ul);
        } else {
            showError(data.message || 'Erro ao listar usuários');
        }
    } catch (err) {
        hideLoading();
        showError('Erro de rede. Tente novamente.');
    }
});

// Função para atualizar o usuário
updateUserBtn.addEventListener('click', async () => {
    const username = prompt('Novo nome de usuário:');
    const email = prompt('Novo email:');

    if (username && email) {
        try {
            showLoading();
            const res = await fetch(`${apiUrl}/users/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ username, email }),
            });

            const data = await res.json();
            hideLoading();

            if (res.ok) {
                alert('Cadastro atualizado com sucesso');
            } else {
                showError(data.message || 'Erro ao atualizar cadastro');
            }
        } catch (err) {
            hideLoading();
            showError('Erro de rede. Tente novamente.');
        }
    }
});

// Função para deletar usuário
deleteUserBtn.addEventListener('click', async () => {
    if (confirm('Tem certeza que deseja deletar seu cadastro?')) {
        try {
            showLoading();
            const res = await fetch(`${apiUrl}/users/${token}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.json();
            hideLoading();

            if (res.ok) {
                alert('Cadastro deletado com sucesso!');
                token = null;
                dashboardContainer.style.display = 'none';
                loginContainer.style.display = 'block';
            } else {
                showError(data.message || 'Erro ao deletar cadastro');
            }
        } catch (err) {
            hideLoading();
            showError('Erro de rede. Tente novamente.');
        }
    }
});

// Função para logout
logoutBtn.addEventListener('click', () => {
    token = null;
    dashboardContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});
