import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    handleError() {
        // La gestion des erreurs de passe ici
        const errorMessage = 'Erreur détectée : ${error.message}';
        console.error(errorMessage);
    }

}