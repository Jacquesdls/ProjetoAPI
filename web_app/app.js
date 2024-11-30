const apiUrl = 'https://projetoapi-wz4g.onrender.com/api/auth';
let token = null;

// Função para exibir a tela de login
function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'none';
}

// Função para exibir a tela de registro
function showRegister() {
    document.getElementById('registerContainer').style.display = 'block';
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'none';
}

// Função para exibir o dashboard
function showDashboard(user) {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'block';

    document.getElementById('userName').textContent = user.username;
}

// Função para login
async function login(event) {
    event.preventDefault(); // Evitar o envio do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError("Preencha todos os campos.");
        return;
    }

    showLoading();

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    hideLoading();

    if (response.ok) {
        // Salvar o token no localStorage para uso futuro
        localStorage.setItem('token', data.token);
        showDashboard(data.user);
    } else {
        showError(data.message);
    }
}


// Função para login com as credenciais (email e senha)
async function loginWithCredentials(email, password) {
    showLoading();

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    hideLoading();

    if (response.ok) {
        // Salvar o token no localStorage
        localStorage.setItem('token', data.token);
        showDashboard(data.user);
    } else {
        showError(data.message);
    }
}



// Função para cadastro de usuário
async function register(event) {
    event.preventDefault(); // Evitar o envio do formulário

    const username = document.getElementById('username').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!username || !email || !password) {
        showErrorRegister("Preencha todos os campos.");
        return;
    }

    showLoading();

    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    hideLoading();

    if (response.ok) {
        alert("Usuário registrado com sucesso!");

        // Voltar para a tela de login
        showLogin();

        // Tentar fazer login automaticamente
        loginWithCredentials(email, password);
    } else {
        showErrorRegister(data.message);
    }
}


// Função para listar usuários
async function listUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
        showError("Você precisa estar logado para listar os usuários.");
        return;
    }

    showLoading();

    const response = await fetch('https://projetoapi-wz4g.onrender.com/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    hideLoading();

    if (response.ok) {
        let listHtml = '<ul>';
        data.users.forEach(user => {
            listHtml += `<li>${user.username} - ${user.email}</li>`;
        });
        listHtml += '</ul>';
        document.getElementById('usersList').innerHTML = listHtml;
    } else {
        showError(data.message);
    }
}

// Função para atualizar usuário
async function updateUser() {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();

    if (!token || !userId) {
        showError("Você precisa estar logado para atualizar seu cadastro.");
        return;
    }

    const username = prompt("Digite o novo nome de usuário:");
    const email = prompt("Digite o novo email:");

    if (!username || !email) {
        showError("Todos os campos devem ser preenchidos.");
        return;
    }

    showLoading();

    const response = await fetch(`https://projetoapi-wz4g.onrender.com/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
    });

    const data = await response.json();
    hideLoading();

    if (response.ok) {
        alert("Usuário atualizado com sucesso!");
        showDashboard();
    } else {
        showError(data.message);
    }
}

// Função para deletar usuário
async function deleteUser() {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();

    if (!token || !userId) {
        showError("Você precisa estar logado para deletar sua conta.");
        return;
    }

    if (confirm("Tem certeza que deseja deletar sua conta?")) {
        showLoading();

        const response = await fetch(`https://projetoapi-wz4g.onrender.com/api/auth/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        hideLoading();

        if (response.ok) {
            alert("Conta deletada com sucesso!");
            logout();
        } else {
            showError(data.message);
        }
    }
}

// Função para logout
function logout() {
    localStorage.removeItem('token');
    showLogin();
}

// Função para obter o ID do usuário do token
function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        showError("Token não encontrado.");
        return null;
    }

    const decoded = jwt_decode(token); // Decodifica o token
    return decoded.userId; // Supondo que o ID do usuário esteja no campo userId do payload
}

// Funções de UI
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Função para exibir a tela de login
function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'none';
}

// Função para exibir o dashboard
function showDashboard(user) {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'block';

    // Exibir o nome do usuário no dashboard
    document.getElementById('userName').textContent = user.username;
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    document.getElementById('errorMsg').innerHTML = message;
    document.getElementById('errorMsg').style.display = 'block';
}

function showErrorRegister(message) {
    document.getElementById('errorMsgRegister').innerHTML = message;
    document.getElementById('errorMsgRegister').style.display = 'block';
}

// Inicializar os eventos
function initialize() {
    // Exibir a tela de login por padrão
    showLogin();

    // Ações do botão de login
    document.getElementById('loginForm').addEventListener('submit', login);

    // Ações do botão de registro
    document.getElementById('registerBtn').addEventListener('click', () => {
        showRegister();
    });
    document.getElementById('registerForm').addEventListener('submit', register);

    // Ações do dashboard
    document.getElementById('listUsersBtn').addEventListener('click', listUsers);
    document.getElementById('updateUserBtn').addEventListener('click', updateUser);
    document.getElementById('deleteUserBtn').addEventListener('click', deleteUser);
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

// Inicializar ao carregar a página
initialize();
