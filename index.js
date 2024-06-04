async function getAdmin() {
    const phone = sessionStorage.getItem('phone');

    if (phone) {
        const sesStoge = await GetPersonByID(phone);

        document.getElementById('Nom_Complet').innerText = sesStoge.nom + ' ' + sesStoge.prenom;
        document.getElementById('Telphone').innerText = sesStoge.phone;
        document.getElementById('Domicile').innerText = sesStoge.address;
        document.getElementById('Metier').innerText = sesStoge.metier;
        document.getElementById('Nombre_parts').innerText = sesStoge.nombrepart;
        document.getElementById('Part_Sociale').innerText = 1000;
        document.getElementById('Droit_Adhesion').innerText = 5000;
        document.getElementById('Capital_Social').innerText = 120000;
        document.getElementById('Participer_AGC').innerText = 90000;
        document.getElementById('Reliquat').innerText = 70000;
    } else {
        window.location.href = "/";

    }
};

getAdmin();