# Angular CLI

Angular est un framework Web. Il fonctionne avec TypeScript, qui est du JavaScript avec des types
Ce framework utilise la notion de composants pour englober ses contenus. Chaque composant est hermétique,
c'est à dire que, par exemple, les styles d'un composant A ne seront pas reportés au composant B; sauf si A englobe B
. Par exemple: le composant app englobe header, home et footer, donc les styles de header ne seront pas reportés dans footer,
mais les styles dans app seront aussi appliqués à header, home et footer. Ceci permet d'avoir une page Web très fonctionnelle
bien qu'elle n'est que sur une seule page

### Créer un nouveau projet
`ng new Projet`

### Compiler et lancer le serveur local
`ng serve` ou `npm start`

Par défaut, le serveur est a l'adresse localhost:4200
La commande recompile automatiquement les sources à chaque modification sauvegardée

### Générer un composant
`ng generate component nom_composant` ou `ng g c nom_composant`

### Générer un module (à voir)
`ng generate module nom_module`

Le module le plus utile est le module *Routing*, qui permet une navigation simplifiée entre les composants de la page.
Normalement la géneration de ce module est proposée au lancement de `ng new`, mais il est toujours possible de le créer avec
`ng generate module app-routing --flat --module=app`. `--flat` indique de ne pas créer de sous-dossier et `--module=app`
signifie d'attacher le module *app-routing* au module *app*

Un deuxieme module est le module *Forms*. Il permet à Angular de lier des forms HTML aux composants.
Il est installé de base, et pour l'intégrer il faut ajouter le module *FormsModule* aux imports dans le fichier app.module.ts
(si l'éditeur est assez intelligent, il ajoute automatiquement le chemin pour trouver le fichier *FormsModule*. Sinon, il faut ajouter
`import { FormsModule } from '@angular/forms';` en haut du fichier app.module.ts). Nous avons besoin de ce module pour permettre
de lier une variable TypeScript à du code HTML.


### Lier une variable TS à de l'HTML
#### Côté TS
Il suffit de déclarer les valiables souhaitées dans la classe, avant le constructeur

#### Côté HTML
Dans les balises à lier, il faut ajouter le tag `[(ngModel)]="nom_variable"`. Par exemple, une balise input avec un nom donnera:
`<input type="text" [(ngModel)]="nom_variable"`. À chaque modification de cet input, la variable *nom_variable* sera automatiquement
modifiée pour contenir ces changements.

#### Comment passer ces changements?
Il y a plusieurs manières de faire. On a vu le tag `(ngSubmit)="func()"` qui exécutera la fonction func() dès l'envoi d'un
formulaire.
Exemple: `<form (ngSubmit)="processForm()">`

Il y a aussi le tag `(click)="func()"` qui exécuera la fonction func() au click d'un bouton par exemple.
Exemple: `<button (click)="processForm()"> Envoyer </button>`


### Le Routing
Le routing dans Angular remplace la fonctionnalité des tags *href*.
Il faut, pour implémenter cette fonctionnalité d'avoir la balise `<router-outlet></router-outlet>` à un seul endroit dans tout le code HTML.

Cette balise sera la sortie (= outlet) des routes ou seront affichés les composants séléctionnés.

#### Syntaxe
Les routes sont définies dans la module *Routing*, dans le fichier app-routing.module.ts
Elles prennent la forme d'un tableau de type *Routes*

###### Exemple:

```typescript
import { ContactComponent } from './contact.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: '/contact', component: ContactComponent },
    { path: '', pathMatch: 'full', component: HomeComponent }, // Chemin par défaut
]
```
Ici on a définit 2 routes: la route */contact* qui enverra dans le router outlet le composant ContactComponent et la route vide qui renverra HomeComponent

Pour utiliser ces routes, il faut les passer au module app. Le module app-router doit donc *exporter* ses définitions des routes à l'appli.
```typescript
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) // On importe les routes ici
  ],
  exports: [RouterModule] // On exporte les routes traitées ici
})
export class AppRoutingModule {
}
```

Ensuite, dans le module app, il suffit de chercher ces définitions en ajoutant dans le tableau des imports la ligne
`AppRoutingModule` (pareil, un éditeur intelligent importera automatiquement le bon fichier, sinon ajouter
`import { AppRoutingModule } from './app-routing.module';` en haut du fichier)

#### Utiliser ces routes
Pour créer des liens vers ces routes, il existe le tag `routerLink` à ajouter dans les balises HTML (généralement les balises `<a></a>`).

Exemple:
`<a routerLink="/contact"> Contact </a>` fait un lien vers la route */contact* préalablement crée.


### Lazy loading
Payez que ce que vous utilisez. En gros, par defaut, Angular charge tous les composants. On peut le paramétrer pour ne
charger que les composants réellement affichés ou utilisés. Pour ce faire, il faut diviser notre application en différents modules
qui, eux-mêmes contiendront leurs composants respectifs. En chargeant que les modules -- et leurs composants attachés -- nécessaires, on gagnera en performance

#### Créer un module
Comme indiqué précedemment, on crée un module via `ng generate module`

Exemple: `ng generate module users` crée le module *users*

Ensuite, on traite ce module comme le module *app* crée par défaut, on peut donc créer des composants à l'intérieur de ce module

#### Attacher des composants
`ng generate component users/user-list` créera le composant user-list rattaché au module *users*
`ng generate component users/user-single` créera le composant user-single rattaché au module *users*

#### Créer les routes locales
Avec notre exemple précédent, nous avons deux modules hermétiques. Pour avoir un lien entre eux, on utilise à nouveau les routes.
De la même manière que dans le module *app-routing*, on crée un module *user-routing* qui gèrera toutes les routes de ce module.
Dans celui-là, on y configure les routes vers les composants liés à *users* (*user-list* et *user-single*)

```typescript
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';

const routes: Routes = [
  { path: ':username', component: UserSingleComponent },
  { path: '', pathMatch: 'full', component: UserListComponent }, // Default path
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class UserRoutingModule { }
```
On note l'utilisation de `RouterModule.forChild()` au lieu de `RouterModule.forRoot()` qui indique qu'on est pas sur la route
principale.

On a aussi le *:* dans la première route. Il permet d'indiquer à Angular que *username* est un paramètre,
c'est-à-dire qu'il n'est pas constant et qu'il va varier. Logique: c'est comme ça qu'on va différencier les utilisateurs (plus tard)

#### Attacher le module à un autre
Toujours avec les routes, on peut lier un module à un autre. Ici on va lier le module *users* au module *app*. Pour ce faire,
il faut définir la route pour aller de *app* à *users*.
*users* étant un module, on ne peut pas utiliser la même syntaxe que précedemment. Il faut utiliser la propriété `loadChildren`,
qui est en fait une fonction qu'on peut définir pour charger un module enfant à notre demande.

Exemple du tableau des routes modifié dans app-routing.module.ts:
```typescript
const routes: Routes = [
    { path: 'users', loadChildren: () => import('./users/users.module').then( (module) => module.UsersModule ) }, // Import another module
    { path: 'contact', component: ContactComponent },
    { path: '', pathMatch: 'full', component: HomeComponent }, // Default path
];
```
Ici *loadChildren* va importer tout le module *users*, et, si le chargement est ok, va l'afficher. On a attaché ce module à la route '/users'

### Les services
Les services sont des composants qui ne s'affichent pas (ils n'ont pas de .html associé). Pour en générer un, il suffit
d'exécuter la commande `ng generate service nom_service`. Ils sont très utilisés pour la communication avec les API HTTP.

Exemple: `ng generate service user`

#### Les requêtes HTTP
Comme le module *Forms*, Angular dispose d'un module existant pour la communication avec les API: *HttpClient*.
Pour l'inclure, il faut ajouter dans le fichier app.module.ts l'import suivant: `HttpClientModule` provenant de `import { HttpClientModule } from '@angular/common/http';`

Il est recommandé d'implémenter les interactions HTTP dans les services.
Le service *HttpClient* existe et implémente toutes les requêtes HTTP utilisées (GET, PUT, ...)

#### Inclure un service dans un composant
Les services étant des composants, il faut utiliser une syntaxe un peu différente pour les utliser dans les composants.
Jusqu'à maintenant, nous n'avons pas touché aux constructeurs des composants. Et bien, pour inclure un service à un composant,
il suffit de le passer en tant que paramètre au constructeur. C'est possible puisque les services ont la propriété
*@Injectable* au lieu de *@Component*, mais on y reviendra plus tard.

Exemple:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://api.github.com/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(maxUsers: number = 10): Observable<object> {
    return this.httpClient.get(`${this.apiUrl}?per_page=${maxUsers}`);
  }
}
```
Ici, on injecte le service *HttpClient* dans le service *user*
On a aussi définit une fonction qui cherche une information, ici une liste contenant le nombre d'utilisateurs dans GitHub,
via une API (protocole GET). Les paramètres de la fonction `this.httpClient.get()` dépendent donc de l'utilisation de cet API.

Les fonctions du service HttpClient retournent ce qu'on appelle un *Observable*, on y reviendra plus tard sur ses fonctionnalités mais il faut le retenir.

Exemple:
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(console.log);
  }

}
```
Ici on injecte le service *user* dans le composant *user-list*.

##### Différence entre constructor() et ngOnInit()
Un petit aparté sur leur différence: elle est utile à savoir.
- Le constructeur est appelé à la génération du composant (en général une fois au tout début)
- ngOnInit() est appelé à l'initialisation du composant (appelé une fois, *après* le constructeur)

Dans le constructeur, Angular ne connaît pas encore les propriétés de la classe, alors que dans `ngOnInit()` oui.

##### Les Observables
Dans `ngOnInit()`, on note l'utilisation de la fonction `.subscribe()`. C'est parce qu'en fait les Observables sont des types qui
permettent un travail *asynchrone* sur les données utilisées. La fonction `subscribe()` permet d'enregistrer des actions
qu'Angular devra réaliser à la réception des données (ici affichage simple sur la console -- F12 depuis le navigateur).
Elle notifiera aussi Angular qu'il faut 'rafraîchir' son affichage avec les données reçues.

### Des transferts de contrôle dans l'HTML!
Il est possible d'utiliser des transferts de contrôles dans l'HTML (conditions, boucles, ...). Il existe des directives Angular pour ça:
- Conditions: tag `*ngIf="condition"`, si *condition* est évaluée à vrai, la balise est affichée.  Exemple:
`<div *ngIf="user === 'Anass'"> Bonjour </div>` affichera la div si la variable user dans TypeScript est égale à 'Anass'
- Boucles: tag `*ngFor="let user of users"`, boucle sur tous les utilisateurs en remplissant *user* avec les informations automatiquement. On accède au contenu de la variable *user* 
en englobant *user* par deux accollades.
Exemple: `<div *ngFor="let user of users">{{ user.login }}</div>`

Contenu de user-list.component.html:
```angular2html
<div class="card" *ngFor="let user of users"> {{ user.login }} </div>
```
