const userApis = [];
// export default services;

export const all = (db) => {
    const userApisCollectionRef = db.collection('user_apis');
    return userApisCollectionRef.get().then(snapshot => {
        const userApis = [];
        snapshot.forEach(doc => {
            userApis.push(doc.data());
        });
        return userApis;
    }).catch(err => {
        console.log('Error getting documents', err);
    });
};

export const createNew = (db, body) => {
    return db.collection('user_apis').add(body).then((docRef) => {
        return docRef.id;
    }).catch((error) =>  {
        console.error('Error adding document: ', error);
    });
};

export const gatByName = (db, name) => {
    const userApisCollectionRef = db.collection('user_apis');
    return userApisCollectionRef.where('name', '==', name).get().then(snapshot => {
        const gate = [];
        snapshot.forEach(doc => {
            gate.push(doc.data());
        });
        return gate;
    }).catch(err => {
        console.log('Error getting documents', err);
    });
};