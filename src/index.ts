import * as readlineSync from 'readline-sync';

// Définition de l'interface Classe
interface Classe {
    id: number;
    libelle: string;
    effectif: number;
    idProfesseur: number;
}

// Base de données simulées
const classes: Classe[] = [];

// Fonctions d'ajout
function ajouterClasse() {
    const id = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;
    
    const niveau = readlineSync.question('Niveau (exemple: Licence3): ');
    const filiere = readlineSync.question('Filière (exemple: DevWeb): ');
    const libelle = `${niveau}.${filiere}`;
    
    const effectif = Number(readlineSync.question('Effectif de la classe: '));
    const idProfesseur = Number(readlineSync.question('ID du professeur responsable: '));
    
    classes.push({ id, libelle, effectif, idProfesseur });
    console.log(`Classe ajoutée avec succès ! ID: ${id}`);
}

// Fonction pour afficher une classe par ID
function afficherClasseParId() {
    const id = Number(readlineSync.question('Entrez l\'ID de la classe à afficher: '));
    const classe = classes.find(c => c.id === id);
    if (classe) {
        console.log(`ID: ${classe.id}, Libellé: ${classe.libelle}, Effectif: ${classe.effectif}, ID Professeur: ${classe.idProfesseur}`);
    } else {
        console.log('Classe introuvable.');
    }
}

// Fonction pour afficher une classe par libellé
function afficherClasseParLibelle() {
    const libelle = readlineSync.question('Entrez le libellé de la classe à afficher: ');
    const classe = classes.find(c => c.libelle === libelle);
    if (classe) {
        console.log(`ID: ${classe.id}, Libellé: ${classe.libelle}, Effectif: ${classe.effectif}, ID Professeur: ${classe.idProfesseur}`);
    } else {
        console.log('Classe introuvable.');
    }
}

// Lister toutes les classes
function listerClasses() {
    if (classes.length > 0) {
        console.table(classes.map(c => ({
            ID: c.id,
            "Libellé": c.libelle,
            "Effectif": c.effectif,
            "ID Professeur": c.idProfesseur
        })));
    } else {
        console.log('Aucune classe enregistrée.');
    }
}

// Fonction pour filtrer les classes par niveau
function filtrerClassesParNiveau() {
    const niveau = readlineSync.question('Entrez le niveau (exemple: Licence3): ');
    const classesFiltrees = classes.filter(c => c.libelle.startsWith(niveau));
    
    if (classesFiltrees.length > 0) {
        console.table(classesFiltrees.map(c => ({
            ID: c.id,
            "Libellé": c.libelle,
            "Effectif": c.effectif,
            "ID Professeur": c.idProfesseur
        })));
    } else {
        console.log(`Aucune classe trouvée pour le niveau ${niveau}.`);
    }
}

// Fonction pour filtrer les classes par filière
function filtrerClassesParFiliere() {
    const filiere = readlineSync.question('Entrez la filière (exemple: DevWeb): ');
    const classesFiltrees = classes.filter(c => {
        const parts = c.libelle.split('.');
        return parts.length > 1 && parts[1] === filiere;
    });
    
    if (classesFiltrees.length > 0) {
        console.table(classesFiltrees.map(c => ({
            ID: c.id,
            "Libellé": c.libelle,
            "Effectif": c.effectif,
            "ID Professeur": c.idProfesseur
        })));
    } else {
        console.log(`Aucune classe trouvée pour la filière ${filiere}.`);
    }
}

// Fonction pour modifier une classe
function modifierClasse() {
    const id = Number(readlineSync.question('Entrez l\'ID de la classe à modifier: '));
    const classe = classes.find(c => c.id === id);
    
    if (!classe) {
        console.log('Classe introuvable.');
        return;
    }

    console.log(`Modification de la classe: ${classe.libelle}`);
    
    const niveau = readlineSync.question(`Nouveau niveau (actuel: ${classe.libelle.split('.')[0]}): `);
    const filiere = readlineSync.question(`Nouvelle filière (actuelle: ${classe.libelle.split('.')[1] || ''}): `);
    
    if (niveau || filiere) {
        const parts = classe.libelle.split('.');
        const nouveauNiveau = niveau || parts[0];
        const nouvelleFiliere = filiere || parts[1] || '';
        classe.libelle = `${nouveauNiveau}.${nouvelleFiliere}`;
    }
    
    const effectifStr = readlineSync.question(`Nouvel effectif (actuel: ${classe.effectif}): `);
    if (effectifStr) {
        classe.effectif = Number(effectifStr);
    }
    
    const idProfesseurStr = readlineSync.question(`Nouvel ID du professeur (actuel: ${classe.idProfesseur}): `);
    if (idProfesseurStr) {
        classe.idProfesseur = Number(idProfesseurStr);
    }

    console.log('Classe modifiée avec succès.');
}

// Fonction pour supprimer une classe
function supprimerClasse() {
    const id = Number(readlineSync.question('Entrez l\'ID de la classe à supprimer: '));
    const classeIndex = classes.findIndex(c => c.id === id);
    
    if (classeIndex !== -1) {
        classes.splice(classeIndex, 1);
        console.log('Classe supprimée avec succès.');
    } else {
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
        
        const choix = readlineSync.question('Votre choix: ');
        switch (choix) {
            case '1': ajouterClasse(); break;
            case '2': afficherClasseParId(); break;
            case '3': afficherClasseParLibelle(); break;
            case '4': listerClasses(); break;
            case '5': filtrerClassesParNiveau(); break;
            case '6': filtrerClassesParFiliere(); break;
            case '7': modifierClasse(); break;
            case '8': supprimerClasse(); break;
            case '0': return;
            default: console.log('Choix invalide, réessayez.');
        }
    }
}

// Pour tester directement cette partie
 menuClasse();

// Pour intégrer avec le menu principal existant, vous pouvez ajouter :
// case '7': menuClasse(); break; // dans votre switch du menu principal