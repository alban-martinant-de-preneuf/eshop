window.onload = function () {
    let nameBtn = document.getElementById("nameDisplayBtn");
    let contactBtn = document.getElementById("contactDisplayBtn");
    let pwdBtn = document.getElementById("pwdDisplayBtn");
    let nameDiv = document.getElementById("profilNameDisplay");
    let contactDiv = document.getElementById("profilContactDisplay");
    let pwdDiv = document.getElementById("profilPwdDisplay");

    nameBtn.onclick = function () {
        nameDiv.style.display = "block";
        contactDiv.style.display = "none";
        pwdDiv.style.display = "none";
    };

    contactBtn.onclick = function () {
        nameDiv.style.display = "none";
        contactDiv.style.display = "block";
        pwdDiv.style.display = "none";
    };

    pwdBtn.onclick = function () {
        nameDiv.style.display = "none";
        contactDiv.style.display = "none";
        pwdDiv.style.display = "block";
    };
};


// let nameFormBtn = document.querySelector("#nameFormBtn");
// let profilNameForm = document.querySelector("#profilNameForm");

// let contactFormBtn = document.querySelector("#contactFormBtn");
// let profilContactForm = document.querySelector("#profilContactForm");

// let pwdFormBtn = document.querySelector("#pwdFormBtn");
// let profilPwdForm = document.querySelector("#profilPwdForm");



// function updateNameForm() {
//     let data = new FormData(profilNameForm);
//     data.append("updateNameForm", "ok");
//     fetch("../src/controllers/userRouter.php", {
//         method: "POST",
//         body: data,
//     })
//         .then((response) => {
//             return response.text();
//         })
//         .then((content) => {
//             profilMsg.innerHtml = content;
//         });
// }

// function updateContactForm() {
//     let data = new FormData(profilContactForm);
//     data.append("updateContactForm", "ok");
//     fetch("../src/controllers/userRouter.php", {
//         method: "POST",
//         body: data,
//     })
//         .then((response) => {
//             return response.text();
//         })
//         .then((content) => {
//             profilMsg.innerHtml = content;

//         });
// }

// function updatePwdForm() {
//     let data = new FormData(profilPwdForm);
//     data.append("updatePwdForm", "ok");
//     fetch("../src/controllers/userRouter.php", {
//         method: "POST",
//         body: data,
//     })
//         .then((response) => {
//             return response.text();
//         })
//         .then((content) => {
//             profilMsg.innerHtml = content;

//         });
// }

// pwdFormBtn.addEventListener("click", function (ev) {
//     ev.preventDefault();
//     updatePwdForm();
// });

// contactFormBtn.addEventListener("click", function (ev) {
//     ev.preventDefault();
//     updateContactForm();
// });
// nameFormBtn.addEventListener("click", function (ev) {
//     ev.preventDefault();
//     updateNameForm();
// });

async function updateForm(form, idForm) {
    let data = new FormData(form);
    data.append(idForm, "ok");
    await fetch("../src/controllers/userRouter.php", {
        method: "POST",
        body: data,
    }).then((response) => {
        return response.text();
    }).then((content) => {
        profilMsg.innerHtml = content;
    });
}

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateForm(e.target, e.target.id);
        window.location.reload();
    })
})