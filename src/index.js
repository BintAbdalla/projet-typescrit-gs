"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
// Base de données simulées
var classes = [];
// Fonctions d'ajout
function ajouterClasse() {
    var id = classes.length > 0 ? Math.max.apply(Math, classes.map(function (c) { return c.id; })) + 1 : 1;
    var niveau = readlineSync.question('Niveau (exemple: Licence3): ');
    var filiere = readlineSync.question('Filière (exemple: DevWeb): ');
    var libelle = "".concat(niveau, ".").concat(filiere);
    var effectif = Number(readlineSync.question('Effectif de la classe: '));
    var idProfesseur = Number(readlineSync.question('ID du professeur responsable: '));
    classes.push({ id: id, libelle: libelle, effectif: effectif, idProfesseur: idProfesseur });
    console.log("Classe ajout\u00E9e avec succ\u00E8s ! ID: ".concat(id));
}
// Fonction pour afficher une classe par ID
function afficherClasseParId() {
    var id = Number(readlineSync.question('Entrez l\'ID de la classe à afficher: '));
    var classe = classes.find(function (c) { return c.id === id; });
    if (classe) {
        console.log("ID: ".concat(classe.id, ", Libell\u00E9: ").concat(classe.libelle, ", Effectif: ").concat(classe.effectif, ", ID Professeur: ").concat(classe.idProfesseur));
    }
    else {
        console.log('Classe introuvable.');
    }
}
// Fonction pour afficher une classe par libellé
function afficherClasseParLibelle() {
    var libelle = readlineSync.question('Entrez le libellé de la classe à afficher: ');
    var classe = classes.find(function (c) { return c.libelle === libelle; });
    if (classe) {
        console.log("ID: ".concat(classe.id, ", Libell\u00E9: ").concat(classe.libelle, ", Effectif: ").concat(classe.effectif, ", ID Professeur: ").concat(classe.idProfesseur));
    }
    else {
        console.log('Classe introuvable.');
    }
}
// Lister toutes les classes
function listerClasses() {
    if (classes.length > 0) {
        console.table(classes.map(function (c) { return ({
            ID: c.id,
            "Libellé": c.libelle,
            "Effectif": c.effectif,
            "ID Professeur": c.idProfesseur
        }); }));
    }
    else {
        console.log('Aucune classe enregistrée.');
    }
}
// Fonction pour filtrer les classes par niveau
function filtrerClassesParNiveau() {
    var niveau = readlineSync.question('Entrez le niveau (exemple: Licence3): ');
    var classesFiltrees = classes.filter(function (c) { return c.libelle.startsWith(niveau); });
    if (classesFiltrees.length > 0) {
        console.table(classesFiltrees.map(function (c) { return ({
            ID: c.id,
            "Libellé": c.libelle,
            "Effectif": c.effectif,
            "ID Professeur": c.idProfesseur
        }); }));
    }
    else {
        console.log("Aucune classe trouv\u00E9e pour le niveau ".concat(niveau, "."));
    }
}
// Fonction pour filtrer les classes par filière
function filtrerClassesParFiliere() {
    var filiere = readlineSync.question('Entrez la filière (exemple: DevWeb): ');
    var classesFiltrees = classes.filter(function (c) {
        var parts = c.libelle.split('.');
        return parts.length > 1 && parts[1] === filiere;
    });
    if (classesFiltrees.length > 0) {
        console.table(classesFiltrees.map(function (c) { return ({
            ID: c.id,
            "Libellé": c.libelle,
            "Effectif": c.effectif,
            "ID Professeur": c.idProfesseur
        }); }));
    }
    else {
        console.log("Aucune classe trouv\u00E9e pour la fili\u00E8re ".concat(filiere, "."));
    }
}
// Fonction pour modifier une classe
function modifierClasse() {
    var id = Number(readlineSync.question('Entrez l\'ID de la classe à modifier: '));
    var classe = classes.find(function (c) { return c.id === id; });
    if (!classe) {
        console.log('Classe introuvable.');
        return;
    }
    console.log("Modification de la classe: ".concat(classe.libelle));
    var niveau = readlineSync.question("Nouveau niveau (actuel: ".concat(classe.libelle.split('.')[0], "): "));
    var filiere = readlineSync.question("Nouvelle fili\u00E8re (actuelle: ".concat(classe.libelle.split('.')[1] || '', "): "));
    if (niveau || filiere) {
        var parts = classe.libelle.split('.');
        var nouveauNiveau = niveau || parts[0];
        var nouvelleFiliere = filiere || parts[1] || '';
        classe.libelle = "".concat(nouveauNiveau, ".").concat(nouvelleFiliere);
    }
    var effectifStr = readlineSync.question("Nouvel effectif (actuel: ".concat(classe.effectif, "): "));
    if (effectifStr) {
        classe.effectif = Number(effectifStr);
    }
    var idProfesseurStr = readlineSync.question("Nouvel ID du professeur (actuel: ".concat(classe.idProfesseur, "): "));
    if (idProfesseurStr) {
        classe.idProfesseur = Number(idProfesseurStr);
    }
    console.log('Classe modifiée avec succès.');
}
// Fonction pour supprimer une classe
function supprimerClasse() {
    var id = Number(readlineSync.question('Entrez l\'ID de la classe à supprimer: '));
    var classeIndex = classes.findIndex(function (c) { return c.id === id; });
    if (classeIndex !== -1) {
        classes.splice(classeIndex, 1);
        console.log('Classe supprimée avec succès.');
    }
    else {
        console.log('Classe introuvable.');
    }
}
// Menu de gestion des classes
function menuClasse() {
    while (true) {
        console.log('\nGestion des Classes');
        console.log('1. Ajouter une classe');
        console.log('2. Afficher une classe par ID');
        console.log('3. Afficher une classe par libellé');
        console.log('4. Lister toutes les classes');
        console.log('5. Filtrer les classes par niveau');
        console.log('6. Filtrer les classes par filière');
        console.log('7. Modifier une classe');
        console.log('8. Supprimer une classe');
        console.log('0. Retour au menu principal');
        var choix = readlineSync.question('Votre choix: ');
        switch (choix) {
            case '1':
                ajouterClasse();
                break;
            case '2':
                afficherClasseParId();
                break;
            case '3':
                afficherClasseParLibelle();
                break;
            case '4':
                listerClasses();
                break;
            case '5':
                filtrerClassesParNiveau();
                break;
            case '6':
                filtrerClassesParFiliere();
                break;
            case '7':
                modifierClasse();
                break;
            case '8':
                supprimerClasse();
                break;
            case '0': return;
            default: console.log('Choix invalide, réessayez.');
        }
    }
}
// Pour tester directement cette partie
menuClasse();
// Pour intégrer avec le menu principal existant, vous pouvez ajouter :
// case '7': menuClasse(); break; // dans votre switch du menu principal
