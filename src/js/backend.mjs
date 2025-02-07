import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        data = data.map((offre) => {
            offre.imgUrl = db.files.getURL(offre, offre.image);
            return data;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}
export async function getEventById(id) {  
    try {
        const event = await pb.collection("events").getOne(id);
        event.img = pb.files.getURL(event, event.imgUrl);
        //event.date = formatDate(event.date);
        return event;
    } catch (error) {
        console.error(error);
        return null;
    }
}