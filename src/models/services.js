const services = [];
// export default services;

export const all = (db) => {
    const serviceCollectionRef = db.collection('services');
    return serviceCollectionRef.get().then(snapshot => {
        const services = [];
        snapshot.forEach(doc => {
            services.push({id: doc.id, data: doc.data()});
        });
        return services;
    }).catch(err => {
        console.log('Error getting documents', err);
    });
};

export const createNew = (db, body) => {
    return db.collection('services').add(body).then((docRef) => {
        return docRef.id;
      }).catch((error) =>  {
        console.error('Error adding document: ', error);
      });
};

export const getById = (db, id) => {
    const serviceCollectionRef = db.collection('services').doc(id);
    return serviceCollectionRef.get().then(doc => {
        return doc;
    }).catch(err => {
        console.log('Error getting documents', err);
    });
};