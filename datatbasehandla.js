function initUserDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "scopUser";
        const dbVersion = 1;

        const request = indexedDB.open(dbName, dbVersion);
        let copine;

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            copine = event.target.result;
            resolve(copine);
        };

        request.onupgradeneeded = (event) => {
            copine = event.target.result;

            if (!copine.objectStoreNames.contains("scopContent")) {
                copine.createObjectStore("scopContent", { keyPath: "phone" });
            }
        };
    });
};



async function PostSingleScop(person) {
    return new Promise((resolve, reject) => {
        initUserDatabase().then(persondb => {
            const PpTransaction = persondb.transaction(["scopContent"], "readwrite");
            const PpStore = PpTransaction.objectStore("scopContent");

            const adding = PpStore.add(person);

            adding.onsuccess = () => {
                resolve(true);
            };

            adding.onerror = (event) => {
                console.error("Error adding object to PostSingleJob store:", event.target.error);
                reject(event.target.error);
            };

            PpTransaction.oncomplete = () => {
                console.log("Transaction completed: database modification finished.");
            };

            PpTransaction.onerror = (event) => {
                console.error("Transaction error:", event.target.error);
                reject(event.target.error);
            };

            PpTransaction.onabort = (event) => {
                console.error("Transaction aborted:", event.target.error);
                reject(event.target.error);
            };
        }).catch(error => {
            console.error("Error opening database:", error);
            reject(error);
        });
    });
}

async function GetPersonByID(id) {
    return new Promise(async (resolve, reject) => {
        const peopledb = await initUserDatabase();
        const GPTransation = peopledb.transaction(["scopContent"], "readonly");
        const GPStore = GPTransation.objectStore("scopContent");

        const requestingByID = GPStore.get(id);

        requestingByID.onsuccess = (event) => {
            const personphone = event.target.result;
            resolve(personphone);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetPersonByID store:", event.target.error);
            reject(event.target.error);
        };
    })

}



async function PutPeople(people) {
    return new Promise(async (resolve, reject) => {
        const panierdb = await initUserDatabase();
        const PuPTransation = panierdb.transaction(["scopContent"], "readwrite");
        const PuPStore = PuPTransation.objectStore("scopContent");

        const update = PuPStore.put(people);

        update.onsuccess = () => {
            resolve(true);
        };

        update.onerror = (event) => {
            console.error("Error accessing object PutPeople store:", event.target.error);
            reject(false);
        };
    });
}


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ putting systme as get end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ deleting systme as delete start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


async function deletePeople() {
    const peopledb = await initUserDatabase();
    const CPTransation = peopledb.transaction(["scopContent"], "readwrite");
    const CPStore = CPTransation.objectStore("scopContent");

    const clearPeople = CPStore.clear();

    let deleted = false;
    clearPeople.onsuccess = () => {
        deleted = true;
    };

    clearPeople.onerror = (event) => {
        console.error("Error accessing object deletePeople store:", event.target.error);
    };

    return deleted
}