const Car = {template: `
<div>
    <button type="button" class="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#thisModal" @click="addRecord()">Add a Car</button>
    <table class="table table-striped sortable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Make</th>
                <th>Name</th>
                <th>Variant</th>
                <th>Model</th>
                <th>isAutomatic</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>   
            <tr v-for="car in cars">
                <td>{{car.id}}</td>
                <td>{{car.make}}</td>
                <td>{{car.name}}</td>
                <td>{{car.variant}}</td>
                <td>{{car.model}}</td>
                <td>{{car.automatic}}</td>
                <button type="button" class="btn mr-1" data-bs-toggle="modal" data-bs-target="#thisModal" @click="editRecord(car)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button type="button" class="btn mr-1" @click="deleteRecord(car.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </tr>
        </tbody>
    </table>
    
    <div class="modal fade" id="thisModal" data-backdrop="static" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                </div>
                <form @submit="onSubmit()">
                <div class="modal-body">
                        <div class="form-group row">
                            <label for="inputID" class="col-sm-2 col-form-label">ID</label>
                            <div class="col-sm-10">
                              <input type="number" class="form-control" id="inputID" placeholder="ID" v-model="id" disabled>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputMake" class="col-sm-2 col-form-label">Make</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" id="inputMake" placeholder="Make e.g. Toyota" v-model="make" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" id="inputName" placeholder="Name e.g. Corolla" v-model="name" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputModel" class="col-sm-2 col-form-label">Model Year</label>
                            <div class="col-sm-10">
                              <input type="number" class="form-control" id="inputModel" placeholder="Model Year e.g. 2021" v-model="model" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputVariant" class="col-sm-2 col-form-label">Variant</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" id="inputVariant" placeholder="Model e.g. GLi" v-model="variant" required>
                            </div>
                        </div>
                        <fieldset class="form-group">
                            <div class="row">
                              <legend class="col-form-label col-sm-2 pt-0">Automatic</legend>
                              <div class="col-sm-10">
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="Y" v-model="automatic" required>
                                  <label class="form-check-label" for="gridRadios1">
                                    Yes
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="N" v-model="automatic">
                                  <label class="form-check-label" for="gridRadios2">
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>
                          </fieldset> 
                </div>
                <div class="modal-footer">
                    <button v-if="!id" class="btn btn-primary" type="submit">Create</button>
                    <button v-if="id" class="btn btn-primary" type="submit">Update</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</div>
`,
    data() {
        return {
            cars: [],
            modalTitle: null,
            id: null,
            make: null,
            name: null,
            model: null,
            variant: null,
            automatic: null
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL)
                .then((response) => {
                    this.cars = response.data
                });
        },
        onSubmit() {
            console.log(this.id)
            if (this.id==null) {
                this.createRecord();
            }
            else {
                this.updateRecord();
            }
        },
        addRecord() {
            this.modalTitle = "Add a Car";
            this.id = null;
            this.make = null;
            this.name = null;
            this.variant = null;
            this.model = null;
            this.automatic = null;
        },
        editRecord(car) {
            this.modalTitle = "Edit this Car";
            this.id = car.id;
            this.make = car.make;
            this.name = car.name;
            this.variant = car.variant;
            this.model = car.model;
            this.automatic = car.automatic;
        },
        createRecord() {
            axios.post(variables.API_URL, {
                make: this.make,
                name: this.name,
                variant: this.variant,
                model:this.model,
                automatic: this.automatic,
            })
                .then((response) => {
                    this.refreshData();
                    alert("New Car with ID "+response.data.id+" Created Successfully");
                });
        },
        updateRecord() {
            axios.put(variables.API_URL+this.id, {
                make: this.make,
                name: this.name,
                variant: this.variant,
                model:this.model,
                automatic: this.automatic,
            })
                .then((response) => {
                    this.refreshData();
                    alert("Details of Car with ID "+this.id+" Updated Successfully!");
                });
        },
        deleteRecord(id) {
            if(!confirm("Are you sure?")) {
                return;
            }
            axios.delete(variables.API_URL+id)
                .then((response) => {
                    this.refreshData();
                    alert("Car With ID "+id+", Deleted Successfully!");
                });
        }
    },
    mounted: function (){
        this.refreshData()
    }
}

const routes = [
    {path: '/car', component: Car}
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')