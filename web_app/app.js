const apiUrl = 'https://projetoapi-wz4g.onrender.com/api/auth';
let token = ''; // Token armazenado após o login

// Alternar entre páginas
function showPage(pageId) {
    document.querySelectorAll('.page').forEach((page) => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

// Registrar usuário
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        document.getElementById('register-message').textContent = response.ok
            ? data.message
            : `Erro: ${data.message}`;
    } catch (error) {
        document.getElementById('register-message').textContent = 'Erro ao conectar ao servidor.';
    }
});

// Login de usuário
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            document.getElementById('login-message').textContent = data.message;
        } else {
            document.getElementById('login-message').textContent = `Erro: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('login-message').textContent = 'Erro ao conectar ao servidor.';
    }
});

// Listar usuários
async function fetchUsers() {
    try {
        const response = await fetch(`${apiUrl}/users`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '';
        if (response.ok) {
            data.users.forEach((user) => {
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id}, Nome: ${user.username}, E-mail: ${user.email}`;
                usersList.appendChild(li);
            });
        } else {
            usersList.textContent = `Erro: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('users-list').textContent = 'Erro ao conectar ao servidor.';
    }
}

// Atualizar usuário
document.getElementById('update-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('update-id').value;
    const username = document.getElementById('update-username').value;
    const email = document.getElementById('update-email').value;

    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ username, email }),
        });
        const data = await response.json();
        document.getElementById('update-message').textContent = response.ok
            ? data.message
            : `Erro: ${data.message}`;
    } catch (error) {
        document.getElementById('update-message').textContent = 'Erro ao conectar ao servidor.';
    }
});

// Deletar usuário
document.getElementById('delete-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('delete-id').value;

    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        document.getElementById('delete-message').textContent = response.ok
            ? data.message
            : `Erro: ${data.message}`;
    } catch (error) {
        document.getElementById('delete-message').textContent = 'Erro ao conectar ao servidor.';
    }
});
