import { Injectable } from '@angular/core';
import { OfflineService } from './offline.service';

var PouchDB = require('pouchdb');
PouchDB.plugin(require('relational-pouch'));

@Injectable()
export class SWIService {

    data: any;
    db: any;
    remote: any;
    username: string;
    password: string;

    constructor(private offlineService: OfflineService) {
        
        this.db = new PouchDB('swi');
        
        this.remote = "https://stevie6410.cloudant.com/swi";
        this.username = "stevie6410"
        this.password = "Sophie2009"
        let options = {
            live: true,
            retry: true,
            continuous: true,
            heartbeat: 1000,
            auth: {
                username: this.username,
                password: this.password
            }
        };

        var dbSync = this.db.sync(this.remote, options);
        this.offlineService.registerDBSync(dbSync);
    }

    getSWIs() {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.db.allDocs({ include_docs: true }).then(
                (result) => {
                    this.data = [];
                    let docs = result.rows.map((row) => {
                        this.data.push(row.doc);
                    });

                    resolve(this.data);

                    this.db.changes({ live: true, since: "now", include_docs: true }).on('change', (change) => {
                        this.handleChange(change);
                    });
                }).catch((error) => {
                    console.log(error);
                });
        });
    }

    getSWI() {

    }

    addSWI(document: any) {
        this.db.post(document);
    }

    updateSWI(document: any) {
        this.db.put(document);
    }

    public get(id: string) {
        return this.db.get(id);
    }

    handleChange(change) {

        // console.log("Change detected", change);

        let changedDoc = null;
        let changedIndex = null;

        this.data.forEach((doc, index) => {
            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }
        });

        //A document was deleted
        if (change.deleted) {
            this.data.splice(changedIndex, 1);
        }
        else {
            //A document was updated
            if (changedDoc) {
                this.data[changedIndex] = change.doc;
            }

            //A document was added
            else {
                this.data.push(change.doc);
            }

        }

    }
}