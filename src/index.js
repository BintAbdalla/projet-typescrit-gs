const readlineSync = require('readline-sync');

// Définition de l'interface Étudiant 
const etudiants = [];

// Fonctions d'ajout
function ajouterEtudiant() {
    const id = etudiants.length > 0 ? Math.max(...etudiants.map(e => e.id)) + 1 : 1;
    const nomComplet = readlineSync.question('Nom complet de l\'étudiant: ');
    const matricule = readlineSync.question('Matricule de l\'étudiant: ');
    const adresse = readlineSync.question('Adresse de l\'étudiant: ');
    const login = readlineSync.question('Login de l\'étudiant: ');
    const mdp = readlineSync.question('Mot de passe: ');
    const classe = readlineSync.question('Classe de l\'étudiant: ');
    etudiants.push({ id, nomComplet, matricule, adresse, login, mdp, classe });
    console.log(`Étudiant ajouté avec succès ! ID: ${id}`);
}

// Fonction pour afficher un étudiant par ID
function afficherEtudiant() {
    const id = Number(readlineSync.question('Entrez l\'ID de l\'étudiant à afficher: '));
    const etudiant = etudiants.find(e => e.id === id);
    if (etudiant) {
        console.log(`ID: ${etudiant.id}, Nom: ${etudiant.nomComplet}, Matricule: ${etudiant.matricule}, Adresse: ${etudiant.adresse}, Login: ${etudiant.login}, Classe: ${etudiant.classe}`);
    } else {
        console.log('Étudiant introuvable.');
    }
}

// Fonction pour lister tous les étudiants 
function listerEtudiants() {
    console.table(etudiants);
 
}

// Fonction pour filtrer les étudiants par classe
function filtrerParClasse() {
    const classe = readlineSync.question('Entrez le nom de la classe: ');
    const etudiantsParClasse = etudiants.filter(e => e.classe === classe);
    if (etudiantsParClasse.length > 0) {
        console.table(etudiantsParClasse.map(e => ({
            ID: e.id,
            "Nom Complet": e.nomComplet,
            "Matricule": e.matricule,
            "Classe": e.classe
        })));
    } else {
        console.log('Aucun étudiant trouvé dans cette classe.');
    }
}

// Fonction pour modifier un étudiant
function modifierEtudiant() {
    const id = Number(readlineSync.question('Entrez l\'ID de l\'étudiant à modifier: '));
    const etudiant = etudiants.find(e => e.id === id);
    if (!etudiant) {
        console.log('Étudiant introuvable.');
        return;
    }

    const nomComplet = readlineSync.question('Nouveau nom complet');
    const matricule = readlineSync.question('Nouveau matricule');
    const adresse = readlineSync.question('Nouvelle adresse');
    const login = readlineSync.question('Nouveau login');
    const mdp = readlineSync.question('Nouveau mot de passe');
    const classe = readlineSync.question('Nouvelle classe');

    if (nomComplet) etudiant.nomComplet = nomComplet;
    if (matricule) etudiant.matricule = matricule;
    if (adresse) etudiant.adresse = adresse;
    if (login) etudiant.login = login;
    if (mdp) etudiant.mdp = mdp;
    if (classe) etudiant.classe = classe;

    console.log('Étudiant modifié avec succès.');
}

// Fonction pour supprimer un étudiant
function supprimerEtudiant() {
    const id = Number(readlineSync.question('Entrez l\'ID de l\'étudiant à supprimer: '));
    const etudiantIndex = etudiants.findIndex(e => e.id === id);
    if (etudiantIndex !== -1) {
        etudiants.splice(etudiantIndex, 1);
        console.log('Étudiant supprimé avec succès.');
    } else {
        console.log('Étudiant introuvable.');
    }
}

// Menu principal
function menu() {
    while (true) {
        console.log('\nMenu Principal');
        console.log('1. Ajouter un étudiant');
        console.log('2. Afficher un étudiant');
        console.log('3. Lister tous les étudiants');
        console.log('4. Filtrer les étudiants par classe');
        console.log('5. Modifier un étudiant');
        console.log('6. Supprimer un étudiant');
        console.log('0. Quitter');
        
        const choix = readlineSync.question('Votre choix: ');
        switch (choix) {
            case '1': ajouterEtudiant(); break;
            case '2': afficherEtudiant(); break;
            case '3': listerEtudiants(); break;
            case '4': filtrerParClasse(); break;
            case '5': modifierEtudiant(); break;
            case '6': supprimerEtudiant(); break;
            case '0': console.log('Au revoir !'); return;
            default: console.log('Choix invalide, réessayez.');
        }
    }
}

menu();
