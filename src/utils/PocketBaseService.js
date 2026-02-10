import PocketBase from 'pocketbase';

class PocketBaseService {
    constructor(url = 'http://hanna127.mikrus.xyz:20127') {
        this.pb = new PocketBase(url);
    }

    
    async login(email, password) {
        return await this.pb.collection('users').authWithPassword(email, password);
    }

    logout() {
        this.pb.authStore.clear();
    }

    // Sprawdzenie czy zalogowany
    isLoggedIn() {
        return this.pb.authStore.isValid;
    }

    

    // --- CRUD NA ODREBNEJ KOLEKCJI (np. "tasks" lub "notes") ---

    // Tworzenie (Create)
    async createItem(collectionName, itemData) {
        // Automatycznie przypisujemy ID zalogowanego użytkownika jako właściciela, 
        // jeśli kolekcja ma pole 'user'
        const data = { ...itemData, user: this.pb.authStore.model.id };
        return await this.pb.collection(collectionName).create(data);
    }

    // Odczyt (Read - lista)
    async getItems(collectionName) {
        return await this.pb.collection(collectionName).getFullList({
            sort: '-created', // Sortuj od najnowszych
        });
    }

    // Aktualizacja (Update)
    async updateItem(collectionName, id, newData) {
        return await this.pb.collection(collectionName).update(id, newData);
    }

    // Usuwanie (Delete)
    async deleteItem(collectionName, id) {
        return await this.pb.collection(collectionName).delete(id);
    }
}

export const pbService = new PocketBaseService();