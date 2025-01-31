import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        data = data.map((event) => {
            event.img = db.files.getURL(event, event.imgUrl);
            return data;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}