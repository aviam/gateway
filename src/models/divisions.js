const divisions = [];
// export default services;

export const all = (db) => {
    const divisionsCollectionRef = db.collection('divisions');
    return divisionsCollectionRef.get().then(snapshot => {
        const divisions = [];
        snapshot.forEach(doc => {
            divisions.push(doc.data());
        });
        return divisions;
    }).catch(err => {
        console.log('Error getting documents', err);
    });
};

export const createNew = (db, body) => {
    return db.collection('divisions').add(body).then((docRef) => {
        return docRef.id;
    }).catch((error) =>  {
        console.error('Error adding document: ', error);
    });
};

export const gatByName = (db, name) => {
    const divisionsCollectionRef = db.collection('divisions');
    return divisionsCollectionRef.where('name', '==', name).get().then(snapshot => {
        const gate = [];
        snapshot.forEach(doc => {
            gate.push(doc.data());
        });
        return gate;
    }).catch(err => {
        console.log('Error getting documents', err);
    });
};