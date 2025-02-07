import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090/');

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        data = data.map((offre) => {
            offre.imgUrl = db.files.getURL(offre, offre.image);
            return offre;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}
export async function getOffre(id) {  
    try {
        const event = await db.collection('maison').getOne(id);
        event.imgUrl = db.files.getURL(event, event.image);
        //event.date = formatDate(event.date);
        return event;
    } catch (error) {
        console.error(error);
        return null;
    }
}