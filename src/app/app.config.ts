import { ApplicationConfig } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"mmuh-pharmacy","appId":"1:42159664167:web:c43d934018b73daf533202","storageBucket":"mmuh-pharmacy.appspot.com","apiKey":"AIzaSyCFha3ImxAokO3hF40pjxWrWzeCY0ZgkBg","authDomain":"mmuh-pharmacy.firebaseapp.com","messagingSenderId":"42159664167","measurementId":"G-FHB2LSCWZW"}))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
