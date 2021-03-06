
describe("alumnos api", function() {
    it("getAll method", function(done){
        var alumnoMock = require("./alumnoMock");
        var responseMock = require("./responseMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock});
        
        alumnoMock.db = [
            {nombre: "Jonas", calificacion: 9},
            {nombre: "ro", calificacion: 8}
        ];
        
        api.getAll(null, responseMock, null);
        expect(responseMock.value).toEqual(alumnoMock.db);
        done();
    });
    
    it("getAll method error", function(done) {
        var alumnoMock = require("./alumnoMock");
        var responseMock = require("./responseMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock});
        
        alumnoMock.setError ("find", new Error("GetAll method error"));
        var next = function(err) {
            expect(err).toEqual(alumnoMock.getError("find"));
            done();
        };
        
        api.getAll(null, responseMock, next);
    });
    
    
    it("save method", function(done) {
        var alumnoMock = require("./alumnoMock");
        var alumnoFactory = require("./alumnoModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock}, alumnoFactory);
        
        
        requestMock.body = {nombre: "Juan", calificacion: 8};
        
        api.save(requestMock, responseMock, null);
        expect(responseMock.value.nombre).toBe(requestMock.body.nombre);
        expect(responseMock.value.calificacion).
        toBe(requestMock.body.calificacion);
        done();
                
    });
    
    it("save method error", function(done) {
        var alumnoMock = require("./alumnoMock");
        var alumnoFactory = require("./alumnoModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock}, alumnoFactory);
        
        alumnoMock.setError("save", new Error("save method error"));
        
        api.save(requestMock, responseMock, function(err){
            expect(err).toEqual(alumnoMock.getError("save"));
            done();
        });
    });
    
    it("getOne method", function(done) {
        var alumnoMock = require("./alumnoMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock});
        
        alumnoMock.error = undefined;
        alumnoMock.db = [
            {nombre: "Pedro", calificacion: 8, id: 1}
        ];
        requestMock.params = {id: 1};
        
        api.getOne(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(alumnoMock.db[0]);
        done();
    });

    it("getOne method error", function(done) {
        var alumnoMock = require("./alumnoMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock});
        
        alumnoMock.setError("findById", new Error("Get one error"));
        
        requestMock.params = {id: 1};
        
        api.getOne(requestMock, responseMock, function(err) {
            expect(err).toEqual(alumnoMock.getError("findById"));
            done();
        });
    });
    
    it("update method", function(done) {
        var alumnoMock = require("./alumnoMock");
        var alumnoFactory = require("./alumnoModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock}, alumnoFactory);
        
        alumnoMock.setError("save", undefined);
        alumnoMock.setError("findById", undefined);
        requestMock.body = {nombre: "Pedro", calificacion: 8, id: 3};
        
        api.save(requestMock, responseMock, null);
        
        var bodyUpdate = {nombre: "Juan", calificacion: 9, id: 3}; 
        requestMock.body = bodyUpdate;
        
        api.update(requestMock, responseMock, null);
        expect(responseMock.value.nombre).toBe(bodyUpdate.nombre);
        expect(responseMock.value.calificacion).toBe(bodyUpdate.calificacion);
        done();
    });
    
    it("update, save method error", function(done) {
        var alumnoMock = require("./alumnoMock");
        var alumnoFactory = require("./alumnoModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock}, alumnoFactory);

        alumnoMock.setError("save", new Error("save error"));
        requestMock.body = {nombre: "Pedro", calificacion: 8, id: 3};
        
        api.save(requestMock, responseMock, function(err) {
            expect(err).toBe(alumnoMock.getError("save"));
            done();
        });      
        
    });
    
    it("update, findById method error", function(done) {
        var alumnoMock = require("./alumnoMock");
        var alumnoFactory = require("./alumnoModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock}, alumnoFactory);

        alumnoMock.setError("findById", new Error("findById error"));
        requestMock.body = {nombre: "Pedro", calificacion: 8, id: 3};
        
        api.update(requestMock, responseMock, function(err) {
            expect(err).toBe(alumnoMock.getError("findById"));
            done();
        });      
        
    });
    
    it("delete method", function(done) {
        var alumnoMock = require("./alumnoMock");
        var alumnoFactory = require("./alumnoModelFactoryMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock}, alumnoFactory);
        
        
        alumnoMock.setError("save", undefined);
        alumnoMock.setError("findById", undefined);
        requestMock.body = {nombre: "Luis", calificacion: 2, id: 4};
        api.save(requestMock, responseMock, null);
        
        requestMock.params = {id: 4};
        
        api.delete(requestMock, responseMock, null);
        expect(responseMock.value.nombre).toBe(requestMock.body.nombre);
        expect(responseMock.value.calificacion).
        toBe(requestMock.body.calificacion);
        expect(responseMock.value.id).toBe(requestMock.body.id);
        
        api.getOne(requestMock, responseMock, null);
        expect(responseMock.value).toBeUndefined();
        
        done();
        
    });
    
    
    it("delete method error", function(done) {
        var alumnoMock = require("./alumnoMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock});
        
        
        alumnoMock.setError("save", undefined);
        alumnoMock.setError("findById", undefined);
        alumnoMock.setError("findByIdAndRemove", new Error("findByIdAndRemove error"));
        
        requestMock.params = {id: 4};
        
        api.delete(requestMock, responseMock, function(err) {
            expect(err).toEqual(alumnoMock.getError("findByIdAndRemove"));
            done();
        });
        
        
    });
    
});