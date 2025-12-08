import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);

  // necesario para el prerenderizado/SSR
  private isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Guarda un objeto o valor en localStorage, serializándolo a JSON.
   * @param key La clave (string) bajo la cual guardar el dato.
   * @param value El valor (de cualquier tipo T) a guardar.
   */
  public save<T>(key: string, value: T): void {
    if (this.isBrowser) {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (e) {
        console.error('Error al guardar en localStorage', e);
      }
    }
  }

  /**
   * Recupera un objeto o valor de localStorage.
   * @param key La clave (string) para buscar el dato.
   * @returns El valor deserializado de tipo T o null si no se encuentra.
   */
  public get<T>(key: string): T | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null; // No hay dato con esa clave
      }
      // Deserializa el JSON a su tipo original
      return JSON.parse(serializedValue) as T;
    } catch (e) {
      console.error('Error al leer de localStorage', e);
      return null;
    }
  }

  /**
   * Elimina un ítem de localStorage.
   * @param key La clave del ítem a eliminar.
   */
  public remove(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Limpia todo el localStorage.
   */
  public clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
