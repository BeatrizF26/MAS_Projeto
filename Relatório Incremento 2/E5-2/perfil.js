/* CREDENCIAIS -> Email = projetomas@hotmail.com
                  Password = 2324mas*/
//localStorage.clear();

var conta = {
    email: "projetomas@hotmail.com",
    password: "2324mas",
    nome: "Rafael Pinto",
    birthday: "1991-12-12",
    gender: "Masculino",
    local: "Leiria",
    titulo: "Rafael Pinto",
    cartao: "4774091040334252",
    cvc: "524",
    expiration: "2024-01-01"
};

if (!localStorage["projetomas@hotmail.com"]) {
    localStorage.setItem(conta.email, JSON.stringify(conta));
    localStorage.setItem("current", localStorage["projetomas@hotmail.com"])
};


function mudarpag() {
    window.location.href = 'registar.html';
}

function checkProfile() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var contaArmazenada = localStorage.getItem(email);

    if (contaArmazenada) {
        var conta = JSON.parse(contaArmazenada);

        if (password === conta.password) {
            window.location.href = 'home.html';
            localStorage.setItem("current", localStorage[email])
        } else {
            alert("Senha incorreta");
        }
    } else {
        alert("Conta não encontrada");
    }
}


var nome = document.getElementById('nome');
var data = document.getElementById('data');
var email = document.getElementById('email');
var data = document.getElementById('data');
var password = document.getElementById('password');
var confpass = document.getElementById('confpassword');
var selecao = document.getElementById("options");
var morada = document.getElementById('morada'); 

function criar() {
    var contaArmazenada = localStorage.getItem(email.value);

    if (contaArmazenada) {
        alert("Já existe uma conta associada a este email");
        return;
    }

    if (nome.value.trim().length < 3) {
        alert("O nome tem de ter no mínimo três letras");
    } else if (email.value.trim().length === 0) {
        alert("Preenche o email");
    } else if (password.value.length < 4) {
        alert("A password tem de ter no mínimo quatro caracteres");
    } else if (confpass.value.trim() !== password.value.trim()) {
        alert("A password não é igual nos dois campos");
    } else if (!selecao) {
        alert("Seleciona o sexo");
    } else if (morada.value.length < 2) {
        alert("A morada tem de ter no mínimo duas letras");
    } else {
        conta = {
            email: email.value,
            password: password.value,
            nome: nome.value,
            birthday: data.value,
            gender: selecao.value,
            local: morada.value
        };

        localStorage.setItem(email.value, JSON.stringify(conta));
        localStorage.setItem("current", localStorage[email.value]);
        window.location.href = 'perfil.html';
    }
}

document.getElementById('nome-display').innerHTML = JSON.parse(localStorage["current"]).nome;
document.getElementById('data-display').innerHTML = JSON.parse(localStorage["current"]).birthday;
document.getElementById('gender-display').innerHTML = JSON.parse(localStorage["current"]).gender;
document.getElementById('local-display').innerHTML = JSON.parse(localStorage["current"]).local;

function saveCard() {
    var titulo = document.getElementById('titulo');
    var cartao = document.getElementById('cartao');
    var cvc = document.getElementById('cvc');
    var expiration = document.getElementById('expiration');

    if (titulo.value.trim().length < 3) {
        alert("O nome do titular tem de ter no mínimo três letras");
    } else if (!(cartao.value.trim().length === 16)) {
        alert("O número do cartão deve ter 16 digitos");
    } else if (!(cvc.value.trim().length === 3)) {
        alert("O CVC deve ter 3 digitos");
    } else if ((expiration.value === "")) {
        alert("Inclua a data de validade");
    } else {
        pagamento = {
            titulo: titulo.value,
            cartao: cartao.value,
            cvc: cvc.value,
            expiration: expiration.value,
        };

        localStorage.setItem(titulo.value, JSON.stringify(pagamento));
        localStorage.setItem("currentcard", localStorage[titulo.value]);
        
        var current_temp = JSON.parse(localStorage.getItem("current"));
        var currentcard_temp = JSON.parse(localStorage.getItem("currentcard"));
        var combinedValues = {
            nome: current_temp.nome,
            email: current_temp.email,
            password: current_temp.password,
            birthday: current_temp.birthday,
            gender: current_temp.gender,
            local: current_temp.local,
            titulo: currentcard_temp.titulo,
            cartao: currentcard_temp.cartao,
            cvc: currentcard_temp.cvc,
            expiration: currentcard_temp.expiration
        }
        localStorage.setItem("current", JSON.stringify(combinedValues));
        localStorage.setItem(combinedValues.email, JSON.stringify(combinedValues));
        window.location.href = 'perfil.html';
        console.log(JSON.parse(localStorage["current"]))
    }
};

function displayImage() {
    var input = document.getElementById('image-input');
            var preview = document.getElementById('image-displayer');

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    preview.innerHTML = '<img src="' + e.target.result + '" alt="Image Preview" class="rounded-circle" style="width: 100%; height: 100%">';
                };

                reader.readAsDataURL(input.files[0]);
            }
}

console.log(localStorage['current']);
if (JSON.parse(localStorage["current"]).titulo) {
    document.getElementById('titulo').hidden = true;
    document.getElementById('titulo-display').hidden = false;
    document.getElementById('titulo-display').innerHTML = JSON.parse(localStorage["current"]).titulo;
    document.getElementById('cartao').hidden = true;
    document.getElementById('cartao-display').hidden = false;
    document.getElementById('cartao-display').innerHTML = JSON.parse(localStorage["current"]).cartao;
    document.getElementById('cvc').hidden = true;
    document.getElementById('cvc-display').hidden = false;
    document.getElementById('cvc-display').innerHTML = JSON.parse(localStorage["current"]).cvc;
    document.getElementById('expiration').hidden = true;
    document.getElementById('expiration-display').hidden = false;
    document.getElementById('expiration-display').innerHTML = JSON.parse(localStorage["current"]).expiration;
    document.getElementById('submit-button-card').hidden = true;
    document.getElementById('secret').hidden = false;
};

function editarPerfil() {
    document.getElementById('nome-form').hidden = false;
    document.getElementById('nome-display').hidden = true;
    document.getElementById('nome-form').value = JSON.parse(localStorage["current"]).nome;
    document.getElementById('data-form').hidden = false;
    document.getElementById('data-display').hidden = true;
    document.getElementById('data-form').value = JSON.parse(localStorage["current"]).data;
    document.getElementById('local-display').hidden = true;
    document.getElementById('local-form').hidden = false;
    document.getElementById('local-form').value = JSON.parse(localStorage["current"]).local;
    document.getElementById('final-button').hidden = true;
    document.getElementById('real-final-button').hidden = false;
    document.getElementById('gender-form').hidden = false;
    document.getElementById('forgender').hidden = false;
    document.getElementById('gender-display').hidden = true;
    document.getElementById('secret2').hidden = false
};

function salvarPerfil() {
    var temp = JSON.parse(localStorage.getItem("current"));
    var nome_temp = document.getElementById('nome-form');
    var data_temp = document.getElementById('data-form');
    var local_temp = document.getElementById('local-form');
    var gender_temp = document.getElementById('gender-form')
    if (nome_temp.value.trim().length < 3) {
        alert("O nome tem de ter no mínimo três letras");
    } else if (local_temp.value.length < 2) {
        alert("A morada tem de ter no mínimo duas letras");
    } else if (!data_temp.value) {
        alert("Deve introduzir a data de nascimento")
    } else {
        var updated = {
            nome: nome_temp.value,
            email: temp.email,
            password: temp.password,
            birthday: data_temp.value,
            gender: gender_temp.value,
            local: local_temp.value,
            titulo: temp.titulo,
            cartao: temp.cartao,
            cvc: temp.cvc,
            expiration: temp.expiration
        }

        localStorage.setItem("current", JSON.stringify(updated))
    window.location.href = 'perfil.html';
    }
}

function getSelectedOption() {
    var selectedOption = document.getElementById("options").value;
}