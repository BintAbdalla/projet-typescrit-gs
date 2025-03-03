import * as readlineSync from 'readline-sync';

// Définition des interfaces
interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    matricule: string;
    dateNaissance: Date;
    niveauId: number;
    filiereId: number;
    classeId: number;
}

interface Niveau {
    id: number;
    libelle: string;
}

interface Filiere {
    id: number;
    libelle: string;
}

interface Classe {
    id: number;
    libelle: string;
    niveauId: number;
    filiereId: number;
}

// Bases de données simulées
const niveaux: Niveau[] = [];
const filieres: Filiere[] = [];
const classes: Classe[] = [];
const etudiants: Etudiant[] = [];

// Fonctions d'ajout
function ajouterNiveau() {
    const id = niveaux.length > 0 ? Math.max(...niveaux.map(n => n.id)) + 1 : 1;
    const libelle = readlineSync.question('Libellé du niveau (ex: Licence 1, Master 2): ');
    niveaux.push({ id, libelle });
    console.log(`Niveau ajouté avec succès ! ID: ${id}`);
}

function ajouterFiliere() {
    const id = filieres.length > 0 ? Math.max(...filieres.map(f => f.id)) + 1 : 1;
    const libelle = readlineSync.question('Libellé de la filière (ex: Informatique, Droit): ');
    filieres.push({ id, libelle });
    console.log(`Filière ajoutée avec succès ! ID: ${id}`);
}

function ajouterClasse() {
    // Afficher les niveaux disponibles
    console.log('Niveaux disponibles:');
    listerNiveaux();
    if (niveaux.length === 0) {
        console.log('Veuillez d\'abord ajouter un niveau.');
        return;
    }
    
    const niveauId = Number(readlineSync.question('ID du niveau: '));
    if (!niveaux.some(n => n.id === niveauId)) {
        console.log('ID de niveau invalide.');
        return;
    }
    
    // Afficher les filières disponibles
    console.log('Filières disponibles:');
    listerFilieres();
    if (filieres.length === 0) {
        console.log('Veuillez d\'abord ajouter une filière.');
        return;
    }
    
    const filiereId = Number(readlineSync.question('ID de la filière: '));
    if (!filieres.some(f => f.id === filiereId)) {
        console.log('ID de filière invalide.');
        return;
    }
    
    const id = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;
    const libelle = readlineSync.question('Libellé de la classe (ex: Groupe A, TD1): ');
    
    classes.push({ id, libelle, niveauId, filiereId });
    console.log(`Classe ajoutée avec succès ! ID: ${id}`);
}

function ajouterEtudiant() {
    // Afficher les classes disponibles
    console.log('Classes disponibles:');
    listerClasses();
    if (classes.length === 0) {
        console.log('Veuillez d\'abord ajouter une classe.');
        return;
    }
    
    const classeId = Number(readlineSync.question('ID de la classe: '));
    const classe = classes.find(c => c.id === classeId);
    if (!classe) {
        console.log('ID de classe invalide.');
        return;
    }
    
    const id = etudiants.length > 0 ? Math.max(...etudiants.map(e => e.id)) + 1 : 1;
    const nom = readlineSync.question('Nom de l\'étudiant: ');
    const prenom = readlineSync.question('Prénom de l\'étudiant: ');
    const email = readlineSync.question('Email: ');
    const matricule = readlineSync.question('Matricule: ');
    const dateNaissanceStr = readlineSync.question('Date de naissance (jj/mm/aaaa): ');
    
    // Conversion de la date
    const [jour, mois, annee] = dateNaissanceStr.split('/').map(Number);
    const dateNaissance = new Date(annee, mois - 1, jour);
    
    etudiants.push({ 
        id, 
        nom, 
        prenom, 
        email, 
        matricule, 
        dateNaissance, 
        niveauId: classe.niveauId, 
        filiereId: classe.filiereId, 
        classeId 
    });
    
    console.log(`Étudiant ajouté avec succès ! ID: ${id}`);
}

// Fonctions d'affichage
function listerNiveaux() {
    console.log('Liste des niveaux:');
    niveaux.forEach(n => console.log(`${n.id}. ${n.libelle}`));
    if (niveaux.length === 0) {
        console.log('Aucun niveau n\'a été ajouté.');
    }
}

function listerFilieres() {
    console.log('Liste des filières:');
    filieres.forEach(f => console.log(`${f.id}. ${f.libelle}`));
    if (filieres.length === 0) {
        console.log('Aucune filière n\'a été ajoutée.');
    }
}

function listerClasses() {
    console.log('Liste des classes:');
    classes.forEach(c => {
        const niveau = niveaux.find(n => n.id === c.niveauId);
        const filiere = filieres.find(f => f.id === c.filiereId);
        console.log(`${c.id}. ${c.libelle} - ${niveau?.libelle} ${filiere?.libelle}`);
    });
    if (classes.length === 0) {
        console.log('Aucune classe n\'a été ajoutée.');
    }
}

function listerEtudiants() {
    console.log('Liste des étudiants:');
    etudiants.forEach(e => {
        const classe = classes.find(c => c.id === e.classeId);
        const niveau = niveaux.find(n => n.id === e.niveauId);
        const filiere = filieres.find(f => f.id === e.filiereId);
        console.log(`${e.id}. ${e.prenom} ${e.nom} - Matricule: ${e.matricule} - ${niveau?.libelle} ${filiere?.libelle} - ${classe?.libelle}`);
    });
    if (etudiants.length === 0) {
        console.log('Aucun étudiant n\'a été ajouté.');
    }
}

function filtrerEtudiantsParNiveau() {
    console.log('Filtrer les étudiants par niveau:');
    listerNiveaux();
    const niveauId = Number(readlineSync.question('ID du niveau: '));
    
    const etudiantsFiltre = etudiants.filter(e => e.niveauId === niveauId);
    
    console.log(`Étudiants du niveau ${niveaux.find(n => n.id === niveauId)?.libelle}:`);
    etudiantsFiltre.forEach(e => {
        const classe = classes.find(c => c.id === e.classeId);
        console.log(`${e.id}. ${e.prenom} ${e.nom} - Matricule: ${e.matricule} - ${classe?.libelle}`);
    });
    
    if (etudiantsFiltre.length === 0) {
        console.log('Aucun étudiant trouvé pour ce niveau.');
    }
}

function filtrerEtudiantsParFiliere() {
    console.log('Filtrer les étudiants par filière:');
    listerFilieres();
    const filiereId = Number(readlineSync.question('ID de la filière: '));
    
    const etudiantsFiltre = etudiants.filter(e => e.filiereId === filiereId);
    
    console.log(`Étudiants de la filière ${filieres.find(f => f.id === filiereId)?.libelle}:`);
    etudiantsFiltre.forEach(e => {
        const niveau = niveaux.find(n => n.id === e.niveauId);
        const classe = classes.find(c => c.id === e.classeId);
        console.log(`${e.id}. ${e.prenom} ${e.nom} - Matricule: ${e.matricule} - ${niveau?.libelle} - ${classe?.libelle}`);
    });
    
    if (etudiantsFiltre.length === 0) {
        console.log('Aucun étudiant trouvé pour cette filière.');
    }
}

function filtrerEtudiantsParClasse() {
    console.log('Filtrer les étudiants par classe:');
    listerClasses();
    const classeId = Number(readlineSync.question('ID de la classe: '));
    
    const etudiantsFiltre = etudiants.filter(e => e.classeId === classeId);
    
    const classe = classes.find(c => c.id === classeId);
    const niveau = niveaux.find(n => n.id === classe?.niveauId);
    const filiere = filieres.find(f => f.id === classe?.filiereId);
    
    console.log(`Étudiants de la classe ${classe?.libelle} (${niveau?.libelle} ${filiere?.libelle}):`);
    etudiantsFiltre.forEach(e => {
        console.log(`${e.id}. ${e.prenom} ${e.nom} - Matricule: ${e.matricule} - Email: ${e.email}`);
    });
    
    if (etudiantsFiltre.length === 0) {
        console.log('Aucun étudiant trouvé pour cette classe.');
    }
}

// Menu principal
function menu() {
    
    type ActionKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11';
    
    const actions: Record<ActionKey, () => boolean | void> = {
        '1': ajouterNiveau,
        '2': ajouterFiliere,
        '3': ajouterClasse,
        '4': ajouterEtudiant,
        '5': listerNiveaux,
        '6': listerFilieres,
        '7': listerClasses,
        '8': listerEtudiants,
        '9': filtrerEtudiantsParNiveau,
        '10': filtrerEtudiantsParFiliere,
        '11': filtrerEtudiantsParClasse,
        '0': () => {
            console.log('Au revoir !');
            return true; 
        }
    };

    while (true) {
        console.log('\nMenu Principal - Gestion des Étudiants');
        console.log('1. Ajouter un niveau');
        console.log('2. Ajouter une filière');
        console.log('3. Ajouter une classe');
        console.log('4. Ajouter un étudiant');
        console.log('5. Lister les niveaux');
        console.log('6. Lister les filières');
        console.log('7. Lister les classes');
        console.log('8. Lister tous les étudiants');
        console.log('9. Filtrer les étudiants par niveau');
        console.log('10. Filtrer les étudiants par filière');
        console.log('11. Filtrer les étudiants par classe');
        console.log('0. Quitter');
        
        const choix = readlineSync.question('Votre choix: ');
        
      
        if (choix in actions) {
            const quitter = actions[choix as ActionKey]();
            if (quitter) break;
        } else {
            console.log('Choix invalide, réessayez.');
        }
    }
}

menu();