function sync() {
     var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');
}

modules.export = sync;