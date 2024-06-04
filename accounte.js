const Login = async () => {
    //await deletePeople();
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    if (phone && password) {
        const usera = await GetPersonByID(phone);
        if (usera && usera.password == password) {
            sessionStorage.setItem('phone', phone);
            window.location.href = "profile";
        } else {
            alert("Identifient inccorect");
        }
    } else {
        alert("Renseignez tous.");
    }
}

const Signup = async () => {
    const nom = document.getElementById('nom').value;
    const prenoms = document.getElementById('prenoms').value;
    const telephone = document.getElementById('telephone').value;
    const domicile = document.getElementById('domicile').value;
    const metier = document.getElementById('metier').value;
    const parts = document.getElementById('parts').value;
    const password = document.getElementById('password').value;
    const passwordr = document.getElementById('passwordr').value;
    if (nom && prenoms && telephone && domicile && metier && parts && password) {
        if (password === passwordr) {
            const userscop = {
                nom: nom,
                prenom: prenoms,
                phone: telephone,
                address: domicile,
                metier: metier,
                nombrepart: parts,
                partsocila: 1000,
                droitadhesion: 100,
                capitalsocila: 100,
                participeragc: 100,
                reliquat: 100,
                password: password,
            }

            const usera = await GetPersonByID(telephone);
            if (usera) {
                alert(`Le ${telephone} est déjà associé à un compte`);

            } else {
                sessionStorage.setItem('phone', telephone);
                await PostSingleScop(userscop);

                window.location.href = "profile";
            }
        } else {
            alert("Les mot de passe ne sont pas conform.");
        }
    } else {
        alert("Renseignez tous.");
    }
}