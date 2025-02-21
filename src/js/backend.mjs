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

export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}


export async function filterByPrix(minPrix, maxPrix) {
    try {
        let data = await db.collection('maison').getFullList({
            filter: `prix >= ${minPrix} && prix <= ${maxPrix}`,
            sort: '-created',
        });
        data = data.map((offre) => {
            offre.imgUrl = db.files.getURL(offre, offre.image);
            return offre;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant les maisons par prix', error);
        return [];
    }
}
export async function setFavori(house) {
    await pb.collection('maison').update(house.id, {favori: !house.favori});
}